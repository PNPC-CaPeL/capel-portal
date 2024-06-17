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

  const rawAires = await client.query<Array<RawLckData>>(LCK_TABLES.AIRES, {
    $limit: -1,
  })

  const aires = rawAires.map<Aire>((item) => {
    let geojson = wktParse(String(item[LCK_COLUMNS.AIRES_ZONE_GEOGRAPHIQUE] ?? '')) as
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
      nom: item[LCK_COLUMNS.AIRES_NOM],
      style: item[LCK_COLUMNS.AIRES_STYLE],
      geojson: geojson,
    }
  })

  return aires
})

export type Aire = {
  id: string | boolean | null
  nom: string | boolean | null
  style: string | boolean | null
  geojson: GeoJSONMultiPolygon | null
}
