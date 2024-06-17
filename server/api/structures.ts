import lckClient, { LCK_COLUMNS, LCK_TABLES, type RawLckData } from '~/services/lckClient'
import { parse as wktParse, type GeoJSONPoint } from 'wellknown'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const client = new lckClient(
    config.LCK_BASE_PATH,
    config.LCK_DB_UUID,
    config.LCK_USERNAME,
    config.LCK_PASSWORD,
  )

  const rawAccounts = await client.query<Array<RawLckData>>(
    LCK_TABLES.ACCOUNTS,
    {
      $limit: -1,
    },
  )

  const structures = rawAccounts
    .filter(
      (item) =>
        item[LCK_COLUMNS.ACCOUNTS_TYPE] === 'Structure de plongée' &&
        item[LCK_COLUMNS.ACCOUNTS_JE_DONNE_ACCORD_APPARAITRE_CARTE_CAPEL_STRUCTURES],
    )
    .map<Structure>((item) => {
      return {
        id: item.id,
        nom: item[LCK_COLUMNS.ACCOUNTS_NOM],
        adresse: item[LCK_COLUMNS.ACCOUNTS_ADRESSE],
        codePostal: item[LCK_COLUMNS.ACCOUNTS_CODE_POSTAL],
        ville: item[LCK_COLUMNS.ACCOUNTS_VILLE],
        tel: item[LCK_COLUMNS.ACCOUNTS_TELEPHONE_PRINCIPAL],
        site: item[LCK_COLUMNS.ACCOUNTS_SITE_WEB],
        geojson: wktParse(
          String(item[LCK_COLUMNS.ACCOUNTS_COORDONNEES_GPS] ?? ''),
        ) as GeoJSONPoint | null,
      }
    })

  return structures
})

export type Structure = {
  id: string | boolean | null
  nom: string | boolean | null
  adresse: string | boolean | null
  codePostal: string | boolean | null
  ville: string | boolean | null
  tel: string | boolean | null
  site: string | boolean | null
  geojson: GeoJSONPoint | null
}
