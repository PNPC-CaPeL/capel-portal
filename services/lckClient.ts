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

export const enum LCK_COLUMNS {
  // Signatures
  SIGNATURES_AIRE_CONCERNEE = '068edfcf-2329-42cf-b585-c7c36e6c837f',
  SIGNATURES_ANNEE_REGLEMENT = 'd5f08500-bfb6-40b3-9613-d59c8225f125',
  SIGNATURES_BLOQUER_SIGNATURE = '880ea913-5a3e-48c6-bd9c-273e2969f1da',
  SIGNATURES_DATE = '7e376e9e-362b-4bc4-b151-497a7193d8e5',
  SIGNATURES_GROUPE_UTILISATEUR = 'fb9f9464-1750-4f71-babd-05450ce62407',
  SIGNATURES_JE_M_ENGAGE_A_REMPLIR = 'e5e061fd-7d4d-4d65-b756-9615131d6411',
  SIGNATURES_JE_M_ENGAGE_A_RESPECTER_REGLEMENTATION = '478de360-bd6d-48c1-bb03-8f711227571a',
  SIGNATURES_JE_M_ENGAGE_A_RESPECTER_CONDITIONS_REGLEMENT = 'a5c47952-21a9-4db4-9f9f-1fb8ce93de71',
  SIGNATURES_NB_PLONGEES_2023_AIRE_MARITIME_ADJACENTE = '0d763fd3-aa8f-41ab-9a7e-b946957ba2e5',
  SIGNATURES_NB_PLONGEES_2023_COEUR_PORQUEROLLES = '384654ae-b646-4b76-b67a-cd82d8be5671',
  SIGNATURES_NB_PLONGEES_2023_COEUR_PORT_CROS = '140054df-a8ec-467d-85fc-8b95daaed565',
  SIGNATURES_NB_INFRACTION = '25f224d3-1730-48ea-8d36-e2783efb8a1d',
  SIGNATURES_NUM_AUTORISATION = 'd21a5e94-2606-4153-89a9-a96f3b44ac97',
  SIGNATURES_PDF_REGLEMENT_SIGNE = '0de2234f-14ea-4d89-b35b-acef99a5bf38',
  SIGNATURES_PI_BLOQUER_SIGNATURE = 'f26a324f-e3f5-431b-8be3-d26544e56720',
  SIGNATURES_PI_PEUT_SIGNER = '8b581ce1-c6d2-46b8-a4b7-2847726b5c1e',
  SIGNATURES_PROFIL_UTILISATEUR = '8e22ef53-7e0e-447e-b455-4d8023ab4941',
  SIGNATURES_REFERENCE = 'f5b66e0c-108d-4648-92e4-c98aa009f5f1',
  SIGNATURES_REGLEMENT = 'b25b4a6e-c2b5-441a-a566-4e4f9941ad1b',
  SIGNATURES_REGULATION_SCUBA_DIVING = 'b343b3d5-834f-41af-9470-48a699b083e5',
  SIGNATURES_SANCTION_EN_COURS = '67e66b57-0df8-47d4-8438-29ed0507d917',
  SIGNATURES_SANCTION_EN_COURS_JUSQU_AU  = '529ad82b-9a7b-4623-a17b-4d3f3b612d81',
  SIGNATURES_SIGNATAIRE = 'd0689dcb-e722-4418-84dc-a7720c8b26c8',
  SIGNATURES_SIGNE = 'b70ba85b-7e7f-4073-9c96-36f20fc8b84e',
  SIGNATURES_SP_A_FOURNI_DONNEES_ANNEE_N_1 = 'b6e6fbc8-9198-448f-9678-c0e76416a045',
  SIGNATURES_SP_STRUCTURE_PEUT_SIGNER = 'ab2618d0-7822-4319-ace5-0251a59f187a',
  SIGNATURES_STRUCTURE = 'd5f0f9c3-b915-4dfb-842c-96dc15d8108c',
  SIGNATURES_TEXTE_REGLEMENT = 'f9e67b0a-e4fd-4f43-9f0e-0941d100877b',
  SIGNATURES_TYPE_PROFIL = 'd316793c-d5ab-487e-8c56-94303ca6a721',
  SIGNATURES_UTILISATEUR = 'f28b0928-bdf8-4ebf-9ba5-18d69acff083',
  // Plongées
  PLONGEES_APNEE_NB_PLONGEURS = 'a7177ed7-e4d8-41e4-9e48-c63143609391',
  PLONGEES_AUTRE_NB_PLONGEURS = 'b98e87aa-4cb0-4283-8cf8-a3e37b5fe705',
  PLONGEES_AUTRE_STRUCTURE_ACCOMPAGNANTE = '02cb1cea-1213-417a-bea6-566b63d38fda',
  PLONGEES_BAPTEME_NB_PLONGEURS = '4a6776ee-23fb-45d6-ae7f-b8d0370f472b',
  PLONGEES_BATEAU_LOUE = '6582e7c8-9702-479e-97d9-9d78357f6950',
  PLONGEES_BATEAU_UTILISE = '17151d1b-2414-4f45-a870-e74c532a8487',
  PLONGEES_CIEL = 'ada3a864-6a55-4c4c-972a-0cccb989bbb4',
  PLONGEES_CODE_POSTAL_ENTREPRISE_LOCATION = '77dcbeb2-1ae6-4943-9a14-81612498f173',
  PLONGEES_COMMUNE_ENTREPRISE_LOCATION = '926365d1-57bb-48c2-9e0f-f531ec13b379',
  PLONGEES_COORDONNEES_GPS_SPOT = 'f3cfb9a1-7ba2-48c7-b61c-f147294b8853',
  PLONGEES_DATE_HEURE_DEBUT = '7de25c38-90c7-4565-a242-fa632e97b8b7',
  PLONGEES_DATE_HEURE_FIN = '47e90490-573e-464f-9418-f92d1a5cd7c5',
  PLONGEES_DECLARANT = 'e0055367-5025-4c4c-829f-b9f3394424da',
  PLONGEES_DUREE_PLONGEE_EN_MINUTES = '70207683-f6b3-459a-8c81-192c3a122028',
  PLONGEES_ENTREPRISE_LOCATION_BATEAU = '2bf75e1e-4687-46ac-9d2c-158852ad56f3',
  PLONGEES_ETAT_MER = 'ad3823a0-798c-4533-88e5-34aff8090109',
  PLONGEES_EXPLORATION_NB_PLONGEURS= '46a2b752-b932-4fcb-830a-2643d92c77ea',
  PLONGEES_FORCE_VENT = '57f3cfb7-3f68-4d82-9c2a-24b635d38cd5',
  PLONGEES_GROUPE_PROFIL_UTILISATEUR = 'f34b0527-0d41-48d9-bdbd-ef154fe41a89',
  PLONGEES_LOUE_A_PARTICULIER = 'e104b98e-1517-4a1d-8471-19fe9cb3e502',
  PLONGEES_OBSERVATIONS = '31715499-a088-4f07-a892-9bf1b82e43d9',
  PLONGEES_PLONGEE_NON_AUTORISEE = 'ef1df8b1-e9ac-4eca-ac25-8b4fca1362e9',
  PLONGEES_PROFIL_UTILISATEUR = '7b1002cf-8869-4d99-bd87-908f8c699939',
  PLONGEES_RANDO_PALMEE_NB_PLONGEURS = '4db32f17-5a21-4631-bc96-0a0d187a944a',
  PLONGEES_RESSENTI_FREQUENTATION = '7634f2f3-65c5-4535-b5cc-0f6a26fb036d',
  PLONGEES_SPOT = '6d4b0019-e7b8-44f5-a149-560a1fe85a05',
  PLONGEES_STRUCTURE_ACCOMPAGNANTE  = '74d5e1f6-8f2b-41e1-afb7-6f7d03b34515',
  PLONGEES_TECHNIQUE_NB_PLONGEURS = '1499a9a1-2e66-4fb1-816e-f01b08850b0c',
  PLONGEES_TEMPERATURE_AIR = '3860d95d-8043-4898-92fe-78b855e4cff2',
  PLONGEES_TEMPERATURE_EAU = 'b7cd0121-ef79-487e-a64f-16ca3d26894d',
  PLONGEES_TRANCHE_HORAIRE = 'ae9efa4a-83c1-4e98-a913-3549847147c4',
  PLONGEES_TYPE_PLONGEE = '276931ae-a7ce-4070-b57b-2fe1f87f3486',
  PLONGEES_TYPE_PROFIL = 'f1afdce6-d0a6-4e0e-8671-fc2828ad62e5',
  PLONGEES_TYPE_SPOT = 'bb58a84f-ad6e-4691-b3b4-5b12c1a04b0b',
  PLONGEES_UTILISATEUR_PROFIL = '95b7a4f0-9448-4f92-a60c-51699b99f256',
  PLONGEES_VENT = '7782bc53-373e-4263-8f47-7d5d24a762c9',
  PLONGEES_VISIBILITE_SOUS_EAU = '3e6610e4-d33d-4c92-b340-c79ad2be8e11',
  // Spots
  SPOTS_AMP_CORRESPONDANTE = 'cf736125-cf98-4024-a60c-8859625f73d6',
  SPOTS_CREATEUR = 'b4b3e539-a4a2-4ae7-ada9-ade97826e6f5',
  SPOTS_DISPOSITIF_AMARRAGE = '6ede1d88-55e5-4744-92c3-ec0281991932',
  SPOTS_GROUPE_PROFIL_UTILISATEUR = '0ac1a23b-5ed7-4bd6-accb-76fec8921680',
  SPOTS_IDENTIFIANT_IMPORT_GEOJSON = '64a7438f-27c1-4e8d-9b1c-f7bebd3a49bb',
  SPOTS_LIEN = 'cfc19c3a-e4f5-4229-8b11-3121f65f52ac',
  SPOTS_LIMITE_AMP = 'f98e47a4-a684-44e3-bdf6-555c0cfaff94',
  SPOTS_NIVEAU_REGROUPEMENT_1 = 'ebdb5af8-6653-4177-978a-ed968d63de2b',
  SPOTS_NIVEAU_REGROUPEMENT_2 = 'e92dfaa2-b27f-4ce8-88b1-92c3aebfcc86',
  SPOTS_NIVEAU_MINIMAL_REQUIS = '721f3a2f-9b3a-4ecc-ba7e-fa227200e4f4',
  SPOTS_NOM = '32a42b4b-a78e-46a7-955d-6d3004c316cb',
  SPOTS_POSITION = 'daf4289c-0b75-4fdc-88f0-e1b7bd133d7a',
  SPOTS_PROFIL_CREATEUR = 'f93cb16d-de9e-4ffc-91cd-d0df5770f6a9',
  SPOTS_PROFONDEUR = 'aaa71dd5-75f4-448c-a372-2af829c59de1',
  SPOTS_PUBLICATION_DEMANDABLE = '24f774cd-ef6e-4d4b-985c-c6834a91aa0b',
  SPOTS_STATUT = '245c7498-5d15-4396-9541-252664be5c06',
  SPOTS_TYPE_SITE = '367b6249-a3e2-4a3e-be3b-9b5decbb580a',
  SPOTS_UTILISATEUR_PROFIL_CREATEUR = 'eb35745d-f233-47b4-8142-2d912ef4c367',
  SPOTS_VISIBLE_TOUS = 'e8567296-34df-4912-89f9-20fdf22c5d07',
  SPOTS_ZONE_GEOGRAPHIQUE = '3e8c4496-43ec-4661-a938-383f4e0128f2',
  // Accounts
  ACCOUNTS_ADRESSE = '3dd6ee01-1ac5-460f-8493-5cfd4d00ede2',
  ACCOUNTS_CODE_POSTAL = 'ca5da03e-5339-49cf-b85e-a1d2f3591e58',
  ACCOUNTS_CODE_POSTAL_VILLE = 'caa08f00-6473-41fb-b296-d7ba84fda61f',
  ACCOUNTS_COORDONNEES_GPS = '3b136f3d-1ada-48d9-9269-1164cfb17f5b',
  ACCOUNTS_DETAILS_COMPLETION_PROFIL = 'dba9ba57-f7bc-4996-aac5-0c4cc6fb1d0f',
  ACCOUNTS_GROUPE_UTILISATEUR = 'deba4355-97b5-43e9-81d0-0f6d5f89c0ac',
  ACCOUNTS_IDENTIFIANT_IMPORT_GEOJSON = 'd3fcbb38-968a-41e2-a328-076b6c50a9de',
  ACCOUNTS_INSCRIPTION_FINALISEE = '76c9bfdc-65f3-4493-b870-6e341764d594',
  ACCOUNTS_JE_DONNE_ACCORD_APPARAITRE_CARTE_CAPEL_STRUCTURES = '805f9150-85bb-4d1d-b2f7-9f4a32bcd923',
  ACCOUNTS_NE_POSSEDE_PAS_DE_BATEAUX = 'a59ed9ed-c770-4809-86ab-c603e6505a48',
  ACCOUNTS_NOM__RESPONSABLE = '4392a17a-439f-491e-ac7e-e02b8758b15a',
  ACCOUNTS_NOM = 'e6a1237f-6572-4b43-94cf-2d6479701138',
  ACCOUNTS_OBSERVATIONS = 'eae31901-3cb5-4a99-b602-dcba64b89ab9',
  ACCOUNTS_OUBLI_BATEAUX = '8e3d6222-d271-485c-b53c-a16e6f60f285',
  ACCOUNTS_PAYS = '01d4b6a8-fac5-4c06-b004-dd5c956550a8',
  ACCOUNTS_PEUT_FINALISER_INSCRIPTION = 'c985685e-a80b-42a2-bf22-3cd69904d51f',
  ACCOUNTS_PRENOM = 'ac4cdbf5-917d-4617-b708-03f4ef6e14a5',
  ACCOUNTS_SITE_WEB = 'f0039978-d841-49f5-b1b7-b01ac37f77ce',
  ACCOUNTS_TELEPHONE_PRINCIPAL = 'e298f951-dc04-4c2e-b32d-fdd4d09a77dc',
  ACCOUNTS_TELEPHONE_SECONDAIRE = '24301d5b-6392-457f-b4fc-5847b0fbbfbf',
  ACCOUNTS_TYPE = '16b9033c-6c84-4039-884f-723e6d7b826a',
  ACCOUNTS_UTILISATEUR = 'd12d8dc7-83fb-48f6-8257-818a865d9730',
  ACCOUNTS_VILLE = 'd1dac070-c92c-4258-b83f-fa938702a1be',
  // Zones
  ZONES_AMP = 'bcb54295-e1d6-4829-b25d-42a4d0043153',
  ZONES_GEOMETRIE = '951211d5-63df-44d0-a4ff-54d57db345a6',
  ZONES_INFORMATION = '13b94fe2-4884-47db-8553-9fcb336a2556',
  ZONES_NOM = '6488840c-3b09-4907-ad61-a1cf782a1249',
  ZONES_PROTECTION = 'dfbbe563-9164-4d30-83c2-54395f858a85',
  ZONES_SOUS_TYPE = 'e4c94e1d-a740-4654-a766-58d8ff554862',
  ZONES_STYLE = '1b9e2898-5b14-448d-9a08-7266ed5e9413',
  // Aires
  AIRES_NOM = 'd84c6e50-d9fd-45cc-8445-589b043a04bf',
  AIRES_STYLE = 'ae328fdf-3f5a-4fda-b06c-998b0d18c028',
  AIRES_ZONE_GEOGRAPHIQUE = '948e25ce-7c05-4e79-8664-d3fad1c9c627',
  //Divisions
  DIVISIONS_LIE_AMP = '4f712ce5-a803-47ce-90e1-16fb0f1e00c2',
  DIVISIONS_NIVEAU_REGROUPEMENT_1 = '095241aa-d2ac-4293-9504-1f9831f738c5',
  DIVISIONS_NIVEAU_REGROUPEMENT_2 = '1427bb04-0a0d-4ecc-b5a5-20b735cb2160',
  DIVISIONS_NOM = '561d5857-4b73-4d20-a48f-1bc603a21a50',
  DIVISIONS_STYLE = 'dd95eef7-e0d5-44a3-9650-c9fcad2ca821',
  DIVISIONS_ZONE_GEOGRAPHIQUE = 'e9033a41-3df2-45cb-8e2a-d0af67ed7990',
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
    if (!this.user) {
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
        [currentColumn.id]: getColumnValue(
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
  [key: string]: string | boolean | null,
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
