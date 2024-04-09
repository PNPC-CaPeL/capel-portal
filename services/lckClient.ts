import { COLUMN_TYPE } from '@locokit/lck-glossary'
import auth from '@feathersjs/authentication-client'
import feathers from '@feathersjs/feathers'
import restClient from '@feathersjs/rest-client'

export const enum LCK_TABLES {
  SIGNATURES = 'ce3f9e5d-98a3-477c-83ef-2edd12e84e85',
  PLONGEES = '4178742a-eebc-4c7c-8856-5a66089d8d05',
  SPOTS = 'e6ef266a-3d25-4740-b3da-9a13eb51f97c',
  ACCOUNTS = '91d61d43-be08-4c28-96d3-89560141c18c',
  ZONES = '088ca36b-8021-458b-b76a-ff38c2d518d3',
  AIRES = 'a4858ddd-18b8-42d1-9ac5-07ed234dc052',
  DIVISIONS = 'db2410a5-eb4e-4add-98c3-e690212d2ab5',
}

export default class lckClient {
  basePath: string
  dbUuid: string
  username: string
  password: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  feathersClient: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null = null
  groupId: string | null = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: LckSchema | null = null

  constructor(
    basePath: string,
    dbUuid: string,
    username: string,
    password: string,
  ) {
    this.basePath = basePath
    this.dbUuid = dbUuid
    this.username = username
    this.password = password

    this.feathersClient = feathers()
    const lckRestClient = restClient(basePath)
    this.feathersClient.configure(lckRestClient.fetch(fetch))
    this.feathersClient.configure(auth())
    this.feathersClient.set('connection', lckRestClient)
  }

  async init() {
    const { user } = await this.feathersClient.authenticate({
      strategy: 'local',
      email: this.username,
      password: this.password,
    })

    this.user = user

    if (this.user) {
      const { groups } = await this.feathersClient
        .service('user')
        .get(this.user.id, {
          query: {
            $eager: 'groups',
          },
        })
      this.groupId = groups[0].id
    }

    this.schema = await this.feathersClient
      .service('database')
      .get(this.dbUuid, {
        query: {
          $eager: '[tables.[columns,views.[columns]]]',
        },
      })
  }

  async getRows(tableId: string, query = {}) {
    if (!this.schema) {
      await this.init()
    }

    const tableSchema = this.schema?.tables.find(({ id }) => id === tableId)
    if (tableSchema) {
      const tableRows = await this.feathersClient.service('row').find({
        query: {
          table_id: tableSchema.id,
          $lckGroupId: this.groupId,
          ...query,
        },
      })

      return { tableSchema, tableRows }
    } else {
      throw new Error()
    }
  }

  async query<T>(table: string, query = {}): Promise<T> {
    const { tableSchema, tableRows } = await this.getRows(table, query)

    return transposeByLabel(tableRows.data ?? tableRows, tableSchema)
  }

  async count(table: string, query = {}) {
    const { tableRows } = await this.getRows(table, { $limit: 0, ...query })

    return tableRows.total
  }
}

const getOriginalColumn = (column: LckColumn): LckColumn => {
  if (
    column.column_type_id !== COLUMN_TYPE.LOOKED_UP_COLUMN ||
    (column.parents && column.parents.length === 0) ||
    !column.parents
  ) {
    return column
  }

  return getOriginalColumn(column.parents[0])
}

const getColumnValue = (
  column: LckColumn,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): string | undefined => {
  if (data === '' || data === undefined || data === null) {
    return data ?? ''
  }

  try {
    switch (column.column_type_id) {
      case COLUMN_TYPE.USER:
      case COLUMN_TYPE.GROUP:
      case COLUMN_TYPE.RELATION_BETWEEN_TABLES:
        return data.value

      case COLUMN_TYPE.LOOKED_UP_COLUMN: {
        const originalColumn = getOriginalColumn(column)

        if (
          [
            COLUMN_TYPE.DATE,
            COLUMN_TYPE.SINGLE_SELECT,
            COLUMN_TYPE.MULTI_SELECT,
          ].includes(originalColumn.column_type_id)
        ) {
          return getColumnValue(originalColumn, data.value)
        }
        if (originalColumn.column_type_id === COLUMN_TYPE.MULTI_USER) {
          return getColumnValue(originalColumn, data)
        }

        return data.value
      }

      case COLUMN_TYPE.MULTI_USER:
        return data.value.join(', ')

      case COLUMN_TYPE.SINGLE_SELECT:
        return column.settings.values?.[data].label

      case COLUMN_TYPE.MULTI_SELECT: {
        if (data.length > 0) {
          return data
            .map((d: string) => column.settings.values?.[d]?.label)
            .join(', ')
        }

        return ''
      }

      case COLUMN_TYPE.FORMULA:
      case COLUMN_TYPE.DATE:
      default:
        return data
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Field with bad format', data, error)

    return ''
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transposeByLabel = (tableRows: any, tableSchema: LckTable) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transposedTable = tableRows.map((row: any) =>
    tableSchema.columns.reduce(
      (acc, currentColumn) => ({
        ...acc,
        [currentColumn.text]: getColumnValue(
          currentColumn,
          row.data[currentColumn.id],
        ),
      }),
      { id: row.id },
    ),
  )

  return transposedTable
}

export type RawLckData = {
  [key: string]: string | boolean | null
}

interface LckSettings {
  key: string
  text_value: string
}

interface LckSchema {
  id: string
  text: string
  workspace_id: string
  tables: Array<LckTable>
}
interface LckTable {
  id: string
  text: string
  database_id: string
  slug: string | null
  columns: Array<LckColumn>
  views: { [key: string]: LckView }
}
interface LckView {
  id: string
  text: string
  table_id: string
  // filter: null,
  columns: Array<LckColumn>
}
interface LckColumn {
  id: string
  text: string
  settings: LckSettings
  // "position": null,
  // "reference": false,
  // "reference_position": 0,
  table_id: string
  column_type_id: number
  slug: string | null
  parents: Array<LckColumn> // @todo à vérifier
}
interface LckSettings {
  tableId: string | null
  localField: string | null
  foreignField: string | null
  values: Record<
    string,
    {
      color: string
      label: string
      position: number
      backgroundColor: string
    }
  > | null
}
