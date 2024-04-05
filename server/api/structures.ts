import lckClient, { LCK_TABLES, type RawLckData } from '~/services/lckClient'
import { parse as wktParse, type GeoJSONPoint } from 'wellknown'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const client = new lckClient(
    config.LCK_BASE_PATH,
    config.LCK_DB_UUID,
    config.LCK_SETTINGS_UUID,
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
          'Je donne mon accord pour apparaître sur la carte CaPeL des structures'
        ],
    )
    .map<Structure>((item) => {
      return {
        id: item.id,
        nom: item.nom,
        adresse: item.Adresse,
        codePostal: item['Code postal'],
        ville: item.Ville,
        tel: item['Téléphone principal'],
        site: item['Site web'],
        geojson: wktParse(
          String(item['Coordonnées GPS'] ?? ''),
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
