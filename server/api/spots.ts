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
    .filter((item) => ['Contribué', 'Public'].includes(String(item['Statut / Status'])))
    .map<Spot>((item) => {
      return {
        id: item.id,
        nom: item['Nom / Name'],
        popupData: {
          type: item['Type de site / Type of site'],
          level: item['Niveau minimal requis / Minimum level required'],
          depth: item['Profondeur / Depth'],
        },
        type: item['Type de site / Type of site'],
        statut: item['Statut / Status'],
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
    'Type de site / Type of site': string | boolean | null
    'Niveau minimal requis / Minimum level required': string | boolean | null
    'Profondeur / Depth': string | boolean | null
  }
  type: string | boolean | null
  statut: string | boolean | null
  amarrage: string | boolean | null
  lien: string | boolean | null
  geojson: GeoJSONPoint | null
}
