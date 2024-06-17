import lckClient, { LCK_COLUMNS, LCK_TABLES, type RawLckData } from '~/services/lckClient'
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
    config.LCK_USERNAME,
    config.LCK_PASSWORD,
  )

  const rawZones = await client.query<Array<RawLckData>>(LCK_TABLES.ZONES, {
    $limit: -1,
  })

  const zones = rawZones.map<Zone>((item) => {
    let geojson = wktParse(String(item[LCK_COLUMNS.ZONES_GEOMETRIE] ?? '')) as
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
      nom: item[LCK_COLUMNS.ZONES_NOM],
      protection: item[LCK_COLUMNS.ZONES_PROTECTION],
      style: item[LCK_COLUMNS.ZONES_STYLE],
      geojson: geojson,
    }
  })
  return zones
})

export type Zone = {
  id: string | boolean | null
  nom: string | boolean | null
  protection: string | boolean | null
  style: string | boolean | null
  geojson: GeoJSONMultiPolygon | null
}
