<template>
  <footer class="relative">
    <div class="-translate-y-1/2 container mx-auto">
      <ul class="list-none flex justify-end gap-4">
        <li
          v-for="item in sociales"
          :key="item.url"
        >
          <a
            target="_blank"
            rel="noreferrer"
            :href="item.url"
          >
            <component
              :is="item.component"
              class="h-16"
            />
          </a>
        </li>
      </ul>
    </div>
    <div class="container mx-auto flex justify-between py-8 text-white">
      <div>
        <p>Les ressources documentaires :</p>
        <ul>
          <li
            v-for="item in ressourcesDocumentaires"
            :key="item.url"
          >
            <a :href="item.url">
              {{ item.libelle }}
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul class="text-center">
          <li
            v-for="item in liensInstitutionnels"
            :key="item.url"
          >
            <a :href="item.url">
              {{ item.libelle }}
            </a>
          </li>
        </ul>
      </div>
      <div>
        Nous contacter : Parc national de Port-Cros<br />
        181 Allée du Castel Sainte Claire<br />
        BP 70220<br />
        83406 - HYERES cedex<br />
        Tél. 04 94 12 82 30<br />
        Formulaire de contact :<br />
        <a href="http://www.portcros-parcnational.fr/fr/formulaire-contact">
          portcros-parcnational.fr/fr/formulaire-contact
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  SvgFacebookLogo,
  SvgTwitterLogo,
  SvgInstagramLogo,
  SvgYoutubeLogo,
  SvgPinterestLogo,
} from '#components'

const sociales = [
  {
    url: 'https://www.facebook.com/PNPC83',
    component: SvgFacebookLogo,
  },
  {
    url: 'https://twitter.com/PNPC83',
    component: SvgTwitterLogo,
  },
  {
    url: 'https://www.instagram.com/parcnationaldeportcros',
    component: SvgInstagramLogo,
  },
  {
    url: 'https://www.youtube.com/user/PNPC83',
    component: SvgYoutubeLogo,
  },
  {
    url: 'https://www.pinterest.fr/pnpc83',
    component: SvgPinterestLogo,
  },
]

const ressourcesDocumentaires = [
  {
    url: 'http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/se-renseigner-sur-les-reglementations',
    libelle: 'Textes réglementaires',
  },
  {
    url: 'http://map.parcsnationaux.fr/?=PNPC',
    libelle: 'Carte du Parc national de Port-Cros',
  },
  {
    url: 'https://www.ecologique-solidaire.gouv.fr/',
    libelle: 'Ministère de la Transition écologique et solidaire',
  },
  {
    url: 'https://ofb.gouv.fr/',
    libelle: 'Office français de la biodiversité',
  },
  {
    url: 'http://www.sanctuaire-pelagos.org/fr/',
    libelle: 'Sanctuaire Pelagos, Partie française',
  },
]

const liensInstitutionnels = [
  {
    url: 'http://www.portcros-parcnational.fr/',
    libelle: 'Le Parc national de Port-Cros',
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/un-territoire-reconnu',
    libelle: 'Le Parc national en bref',
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/letablissement-public',
    libelle: "L'établissement public",
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/la-charte-du-parc-national-de-port-cros',
    libelle: 'La charte du PNPC',
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/marches-publics-en-cours',
    libelle: 'Marchés publics',
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/offres-emploi',
    libelle: "Offres d'emploi",
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/raa',
    libelle: 'Recueil des actes administratifs',
  },
]
</script>

<style scoped>
footer {
  background: #f78181;
  /* background: linear-gradient(0deg, #F78181 50%, transparent 50%); */
}
</style>
