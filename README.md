<h1 align="center">
  CaPeL (prototype *nocode*)
</h1>

Le dispositif *CaPeL proto* offre les fonctionnalités suivantes :

- Un·e plongeu·r·se ou organisme de plongée, peut remplir un formulaire signifiant sa signature du
  règlement du parc, et ainsi recevoir un PDF d'autorisation par e-mail.
- Un·e plongeu·r·se ou organisme de plongée, peut remplir un formulaire pour déclarer une plongée.
- Un·e plongeu·r·se ou organisme de plongée, peut remplir un formulaire pour demander à recevoir
  l'historique (fichier CSV) de ses déclarations de plongées.
- Un·e administrat·eur·rice peut remplir un formulaire pour recevoir les listes de toutes les
  signatures et toutes les déclarations de plongées.

La dispositif est constitué de plusieurs outils et services connectés les uns aux autres.

- [Site public](https://capel.netlify.app/) (généré avec GatsbyJS)
- Formulaires (généré avec Tripetto) intégrés dans le site public
- Des contenu textes provenant (pour la majorité) d'un dépôt tiers
- [Interface d'administration *(sur `/admin`)*](https://capel.netlify.app/admin) permettant d'éditer les contenus du
  dépôt tiers
  - Les droits d'accès correspondent à ceux du dépôt tiers.
- Orchestration et traitements via des [Integromat](https://www.integromat.com/scenarios/734126)
  - [Signature du règlement](https://www.integromat.com/scenario/1988846/edit)
  - [Déclaration de plongée](https://www.integromat.com/scenario/1967565/edit)
  - [Obtention d'un historique](https://www.integromat.com/scenario/1967879/edit)
- Services externes pour
  - Le stockage des données : [Airtable](https://airtable.com/appwosEetH7gWIHO2)
  - La génération des PDF : [PDFMonkey](https://dashboard.pdfmonkey.io/templates/2acc345a-f198-43ba-a198-2ed6a27344c2)
  - L'expedition d'e-mail : [Sendinblue](https://fr.sendinblue.com/)

Ce dépôt git contient uniquement les fichiers de la partie publique (site internet).

## Fonctionnement

### Pré-requis

- `node` *(testé avec node 14, aucun test réalisé avec les autres versions)*
- Un fichier `.env` sur le modèle de `.env.dist` contenant les endpoints vers
  lesquels les formulaires envoient.

### Modifier les formulaires

```shell
npx tripetto src/forms/history.json
npx tripetto src/forms/regulation.json
npx tripetto src/forms/declaration.json
```

### Générer le site

```shell
# Installer une première fois les dépendances
npm ci
# Lancer la version de développement
npm start
# Générer le site statique dans `public/`
npm run build
```
