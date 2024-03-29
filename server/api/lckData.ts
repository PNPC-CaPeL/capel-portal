import lckClient, { LCK_TABLES } from '~/services/lckClient'
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

  const rawSpots = await client.query<Array<RawLckData>>(LCK_TABLES.SPOTS, {
    $limit: -1,
  })

  const spots = rawSpots.map<Spot>((spot) => {
    return {
      id: spot.id,
      nom: spot.Nom,
      popupData: {
        'Type de site': spot['Type de site'],
        'Niveau minimal requis': spot['Niveau minimal requis'],
        Profondeur: spot['Profondeur'],
      },
      type: spot['Type de site'],
      statut: spot.Statut,
      amarrage: spot["Dispositif d'amarrage"],
      lien: spot['Lien'],
      geojson: wktParse(String(spot.Position)) as GeoJSONPoint | null,
    }
  })

  return {
    spots: spots,
    clubs: await client.query<Array<RawLckData>>(LCK_TABLES.ACCOUNTS, {
      $limit: -1,
    }),
  }
})

type RawLckData = {
  [key: string]: string | boolean
}

export type Spot = {
  id: string | boolean
  nom: string | boolean
  popupData: {
    'Type de site': string | boolean
    'Niveau minimal requis': string | boolean
    Profondeur: string | boolean
  }
  type: string | boolean
  statut: string | boolean
  amarrage: string | boolean
  lien: string | boolean
  geojson: GeoJSONPoint | null
}

export type Club = RawLckData
