<template>
  <div>
    <div
      v-for="spot in spots"
      :key="spot.id"
    >
      {{ spot.Nom }}
    </div>
  </div>
</template>

<script setup lang="ts">
const lckClient = useNuxtApp().$lckClient
const spots = await lckClient.query('e6ef266a-3d25-4740-b3da-9a13eb51f97c')

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
</script>
