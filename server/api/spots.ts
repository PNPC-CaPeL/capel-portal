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

  const rawSpots = await client.query<Array<RawLckData>>(LCK_TABLES.SPOTS, {
    $limit: -1,
  })

  const spots = rawSpots
    .filter((item) => ['Contribué', 'Public'].includes(String(item[LCK_COLUMNS.SPOTS_STATUT])))
    .map<Spot>((item) => {
      return {
        id: item.id,
        nom: item[LCK_COLUMNS.SPOTS_NOM],
        popupData: {
          type: item[LCK_COLUMNS.SPOTS_TYPE_SITE],
          level: item[LCK_COLUMNS.SPOTS_NIVEAU_MINIMAL_REQUIS],
          depth: item[LCK_COLUMNS.SPOTS_PROFONDEUR],
        },
        type: item[LCK_COLUMNS.SPOTS_TYPE_SITE],
        statut: item[LCK_COLUMNS.SPOTS_STATUT],
        amarrage: item[LCK_COLUMNS.SPOTS_DISPOSITIF_AMARRAGE],
        lien: item[LCK_COLUMNS.SPOTS_LIEN],
        geojson: wktParse(String(item[LCK_COLUMNS.SPOTS_POSITION] ?? '')) as GeoJSONPoint | null,
      }
    })

  return spots
})

export type Spot = {
  id: string | boolean | null
  nom: string | boolean | null
  popupData: {
    type: string | boolean | null
    level: string | boolean | null
    depth: string | boolean | null
  }
  type: string | boolean | null
  statut: string | boolean | null
  amarrage: string | boolean | null
  lien: string | boolean | null
  geojson: GeoJSONPoint | null
}
