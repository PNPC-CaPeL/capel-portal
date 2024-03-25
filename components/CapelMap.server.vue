<template>
  <div class="border m-2 p-2">
    <h2>Map !</h2>
    <h3 class="text-lg font-bold">Spots:</h3>
    <ul class="flex flex-wrap gap-2">
      <li
        v-for="spot in spots"
        :key="spot.id"
      >
        {{ spot.Nom }}
      </li>
    </ul>
    <hr />
    <h3 class="text-lg font-bold">Clubs:</h3>
    <ul class="flex flex-wrap gap-2">
      <li
        v-for="club in clubs"
        :key="club.id"
      >
        {{ club.Nom }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { LCK_TABLES } from '~/plugins/lckClient.server'

const lckClient = useNuxtApp().$lckClient
const spots = await lckClient.query(LCK_TABLES.SPOTS, { $limit: -1 })
// Spot {
//   id: '7e6eed0c-b766-4bc4-ba2a-29abf3e706c8',
//   'Type de site': '',
//   Nom: 'TRAFFICK',
//   "Dispositif d'amarrage": '',
//   'Créateur': '',
//   'Profil créateur': " Club de Plongée de L'Escalet",
//   'Groupe profil utilisateur': "Club de Plongée de L'Escalet",
//   'Utilisateur profil créateur': '',
//   'Niveau minimal requis': '',
//   Profondeur: '',
//   'Identifiant import GeoJSON': '',
//   Statut: 'Privé',
//   'AMP correspondante': 'Coeurs marins PNPC',
//   Lien: '',
//   'Visible de tous': '',
//   'Zone géographique': 'AMA PNPC',
//   'Publication demandable': true,
//   Position: 'SRID=4326;POINT(6.6714726923021885 43.16780944036009)',
//   "Limite d'AMP": '',
//   'Niveau de regroupement 1 (limite AMP)': '',
//   'Niveau de regroupement 2 (limite AMP)': '' },
// }

let clubs = await lckClient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .query<Array<any>>(LCK_TABLES.ACCOUNTS, { $limit: -1 })

clubs = clubs.filter(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (item: any) =>
    item.Type === 'Structure de plongée' && item['Inscription finalisée'],
)

// Club: { id: '36f58320-5b17-4aa0-92a6-3f96be4eceda',
//     "Groupe d'utilisateur": 'Plongeurs Individuels',
//     Adresse: '140 avenue Jean Mermoz ',
//     'Ne possède pas de bateaux': false,
//     'Nom du responsable': '',
//     'Je donne mon accord pour apparaître sur la carte CaPeL des structures': false,
//     Nom: 'Lapalus',
//     'Code postal': '',
//     Ville: '',
//     'Téléphone secondaire': '',
//     'Détails de complétion du profil': '',
//     'Inscription finalisée': true,
//     Utilisateur: 'Lapalus Bernard',
//     'Coordonnées GPS': '',
//     'Téléphone principal': '689014103',
//     'Site web': '',
//     Type: 'Plongeur individuel',
//     'Identifiant import GeoJSON': '',
//     'Oubli de bateaux': false,
//     'Prénom': 'Bernard',
//     'Observations (pour les administrateurs)': '',
//     'Peut finaliser son inscription': false,
//     Pays: 'FRA France',
//     'Code postal - Ville': '63100 Clermont-Ferrand' },
</script>
