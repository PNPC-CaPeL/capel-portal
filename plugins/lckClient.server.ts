import { COLUMN_TYPE } from '@locokit/lck-glossary'
import { defineNuxtPlugin } from '#app'
import { useRuntimeConfig } from '#imports'
import auth from '@feathersjs/authentication-client'
import feathers from '@feathersjs/feathers'
import restClient from '@feathersjs/rest-client'

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

class lckClientServer {
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

  async query(table: string, query = {}) {
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

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()

  const client = new lckClientServer(
    config.LCK_BASE_PATH,
    config.LCK_DB_UUID,
    config.LCK_USERNAME,
    config.LCK_PASSWORD,
  )
  client.init()

  return {
    provide: {
      lckClient: client,
    },
  }
})
