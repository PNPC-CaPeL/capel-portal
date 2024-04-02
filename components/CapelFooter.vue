<template>
  <footer class="relative text-white">
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
    <div class="container mx-auto flex justify-between py-8">
      <div>
        <p>{{ t('footer.documentaryResources') }}</p>
        <ul>
          <li
            v-for="item in ressourcesDocumentaires"
            :key="item.url"
          >
            <a :href="item.url">
              {{ t(item.libelle) }}
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
              {{ t(item.libelle) }}
            </a>
          </li>
        </ul>
      </div>
      <div>
        {{ $t('footer.contactUs') }} Parc national de Port-Cros<br />
        181 Allée du Castel Sainte Claire<br />
        BP 70220<br />
        83406 - HYERES cedex<br />
        {{ $t('footer.tel') }} 04 94 12 82 30<br />
        {{ $t('footer.contactForm') }}<br />
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
import { useI18n } from '#imports'

const { t } = useI18n()

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
    libelle: 'footer.regulatoryTexts',
  },
  {
    url: 'http://map.parcsnationaux.fr/?=PNPC',
    libelle: 'footer.mapPortCrosNationalPark',
  },
  {
    url: 'https://www.ecologique-solidaire.gouv.fr/',
    libelle: 'footer.ministryEcologicalTransition',
  },
  {
    url: 'https://ofb.gouv.fr/',
    libelle: 'footer.frenchOfficeBiodiversity',
  },
  {
    url: 'http://www.sanctuaire-pelagos.org/fr/',
    libelle: 'footer.pelagosSanctuary',
  },
]

const liensInstitutionnels = [
  {
    url: 'http://www.portcros-parcnational.fr/',
    libelle: 'footer.portCrosNationalPark',
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/un-territoire-reconnu',
    libelle: 'footer.nationalParkInBrief',
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/letablissement-public',
    libelle: 'footer.publicEstablishment',
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/la-charte-du-parc-national-de-port-cros',
    libelle: 'footer.pnpcCharter',
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/marches-publics-en-cours',
    libelle: 'footer.publicContracts',
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/offres-emploi',
    libelle: 'footer.jobOffers',
  },
  {
    url: 'http://www.portcros-parcnational.fr/fr/raa',
    libelle: 'footer.compendiumAdministrativeActs',
  },
]
</script>

<style scoped>
footer {
  background: #f78181;
  /* background: linear-gradient(0deg, #F78181 50%, transparent 50%); */
  a {
    @apply hover:underline;
  }
}
</style>
