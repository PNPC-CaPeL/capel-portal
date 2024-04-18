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

  const rawSpots = await client.query<Array<RawLckData>>(LCK_TABLES.SPOTS, {
    $limit: -1,
  })

  const spots = rawSpots
    .filter((item) => ['Contribué', 'Public'].includes(String(item['Statut'])))
    .map<Spot>((item) => {
      return {
        id: item.id,
        nom: item.Nom,
        popupData: {
          type: item['Type de site'],
          level: item['Niveau minimal requis'],
          depth: item['Profondeur'],
        },
        type: item['Type de site'],
        statut: item.Statut,
        amarrage: item["Dispositif d'amarrage"],
        lien: item['Lien'],
        geojson: wktParse(String(item.Position ?? '')) as GeoJSONPoint | null,
      }
    })

  return spots
})

export type Spot = {
  id: string | boolean | null
  nom: string | boolean | null
  popupData: {
    'Type de site': string | boolean | null
    'Niveau minimal requis': string | boolean | null
    Profondeur: string | boolean | null
  }
  type: string | boolean | null
  statut: string | boolean | null
  amarrage: string | boolean | null
  lien: string | boolean | null
  geojson: GeoJSONPoint | null
}
