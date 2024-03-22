<template>
  <footer class="relative">
    <div class="-translate-y-1/2 container mx-auto">
      <ul class="list-none flex justify-end gap-4">
        <li
          v-for="(item, key) in sociales"
          :key="key"
        >
          <a
            target="_blank"
            rel="noreferrer"
            href="{{ item.url }}"
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
          <li>
            <a
              href="http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/se-renseigner-sur-les-reglementations"
            >
              Textes réglementaires
            </a>
          </li>
          <li>
            <a href="http://map.parcsnationaux.fr/?=PNPC">
              Carte du Parc national de Port-Cros
            </a>
          </li>
          <li>
            <a href="https://www.ecologique-solidaire.gouv.fr/">
              Ministère de la Transition écologique et solidaire
            </a>
          </li>
          <li>
            <a href="https://ofb.gouv.fr/">
              Office français de la biodiversité
            </a>
          </li>
          <li>
            <a href="http://www.sanctuaire-pelagos.org/fr/">
              Sanctuaire Pelagos, Partie française
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul class="text-center">
          <li>
            <a
              class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary"
              href="http://www.portcros-parcnational.fr/"
            >
              Le Parc national de Port-Cros
            </a>
          </li>
          <li>
            <a
              class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary"
              href="http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/un-territoire-reconnu"
            >
              Le Parc national en bref
            </a>
          </li>
          <li>
            <a
              class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary"
              href="http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/letablissement-public"
            >
              L'établissement public
            </a>
          </li>
          <li>
            <a
              class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary"
              href="http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/la-charte-du-parc-national-de-port-cros"
            >
              La charte du PNPC
            </a>
          </li>
          <li>
            <a
              class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary"
              href="http://www.portcros-parcnational.fr/fr/marches-publics-en-cours"
            >
              Marchés publics
            </a>
          </li>
          <li>
            <a
              class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary"
              href="http://www.portcros-parcnational.fr/fr/offres-emploi"
            >
              Offres d'emploi
            </a>
          </li>
          <li>
            <a
              class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary"
              href="http://www.portcros-parcnational.fr/fr/raa"
            >
              Recueil des actes administratifs
            </a>
          </li>
        </ul>
      </div>
      <div
        class="MuiGrid-root jss51 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-4"
      >
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

<script setup>
import FacebookLogo from './Svg/FacebookLogo.vue'
import TwitterLogo from './Svg/TwitterLogo.vue'
import InstagramLogo from './Svg/InstagramLogo.vue'
import YoutubeLogo from './Svg/YoutubeLogo.vue'
import PinterestLogo from './Svg/PinterestLogo.vue'

const sociales = {
  facebook: {
    url: 'https://www.facebook.com/PNPC83',
    component: FacebookLogo,
  },
  twitter: {
    url: 'https://www.twitter.com/PNPC83',
    component: TwitterLogo,
  },
  instagram: {
    url: 'https://www.instagram.com/parcnationaldeportcros',
    component: InstagramLogo,
  },
  youtube: {
    url: 'https://www.youtube.com/user/PNPC83',
    component: YoutubeLogo,
  },
  pinterest: {
    url: 'https://www.pinterest.fr/pnpc83',
    component: PinterestLogo,
  },
}
</script>
<style scoped>
footer {
  background: #f78181;
  /* background: linear-gradient(0deg, #F78181 50%, transparent 50%); */
}
</style>
