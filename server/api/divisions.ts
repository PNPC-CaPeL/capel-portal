import lckClient, { LCK_TABLES, type RawLckData } from '~/services/lckClient'
import {
  parse as wktParse,
  type GeoJSONMultiPolygon,
  type GeoJSONPolygon,
} from 'wellknown'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const client = new lckClient(
    config.LCK_BASE_PATH,
    config.LCK_DB_UUID,
    config.LCK_SETTINGS_UUID,
    config.LCK_USERNAME,
    config.LCK_PASSWORD,
  )

  const rawDivisions = await client.query<Array<RawLckData>>(
    LCK_TABLES.DIVISIONS,
    {
      $limit: -1,
    },
  )

  const divisions = rawDivisions.map<Division>((item) => {
    let geojson = wktParse(String(item['Zone géographique'] ?? '')) as
      | GeoJSONPolygon
      | GeoJSONMultiPolygon
      | null

    if (geojson && geojson?.type === 'Polygon') {
      geojson = {
        type: 'MultiPolygon',
        coordinates: [geojson.coordinates],
      } as GeoJSONMultiPolygon
    }

    return {
      id: item.id,
      nom: item.Nom,
      style: item.Style,
      geojson: geojson,
    }
  })

  return divisions
})

export type Division = {
  id: string | boolean | null
  nom: string | boolean | null
  style: string | boolean | null
  geojson: GeoJSONMultiPolygon | null
}
