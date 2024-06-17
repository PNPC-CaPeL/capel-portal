import lckClient, { LCK_TABLES, type RawLckData } from '~/services/lckClient'
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
        item.Type === 'Structure de plongée' &&
        item[
          'Je donne mon accord pour apparaître sur la carte CaPeL des structures / I agree to appear on the CaPeL organisation map'
        ],
    )
    .map<Structure>((item) => {
      return {
        id: item.id,
        nom: item['Nom / Name'],
        adresse: item['Adresse / Address'],
        codePostal: item['Code postal / Postcode'],
        ville: item['Ville / City'],
        tel: item['Téléphone principal / Main telephone'],
        site: item['Site web / Website'],
        geojson: wktParse(
          String(item['Coordonnées GPS / GPS coordinates'] ?? ''),
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
