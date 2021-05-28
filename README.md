<h1 align="center">
  CaPeL
</h1>

La dispositif est constitué de plusieurs outils et services connectés les uns
aux autres.

- [Site public](https://capel.netlify.app/) (généré avec GatsbyJS)
- Gestion des contenus publics (avec Ghost CMS)
- Comptes CaPeL (avec LocoKit)
- …

Ce dépôt git contient uniquement les fichiers de la partie publique (site
internet).

## Fonctionnement

### Pré-requis

- `node` *(testé avec node 14, aucun test réalisé avec les autres versions)*
- …

### Générer le site

```shell
# Installer une première fois les dépendances
npm ci
# Lancer la version de développement
npm start
# Générer le site statique dans `public/`
npm run build
```

### Démarrer le projet en développement

#### Fournir des contenus

Via le paramétrage des variables d'environnement `GHOST_API_URL` et
`GHOST_API_KEY`, une instance Ghost doit fournir les contenus.

On peut utiliser une instance existante, ou en installer une en local :

```sh
npm i -g ghost-cli

# Créer un répertoire qui hébergera une instance ghost
mkdir ~/your-ghost
cd ~/your-ghost

# Installer une instance ghost dans ce répertoire
ghost install local
```

Il faut alors disposer d'une clé d'API à générer et copier depuis l'interface de
Ghost :

- Se rendre à l'adresse `<ghost_host>/ghost/#/integrations/new`
- Valider la création d'une intégration
- Copier la chaîne `Content API key`.

### Lancer le site

Une fois de retour dans le dossier du projet `capel-portal` :

```sh
# Installer une première fois les dépendances
npm ci

# Créer le fichier .env à partir de .env.dist
cp .env.dist .env
# …et contribuer dans ce fichier les variables d'environnement GHOST_API_URL et
# GHOST_API_KEY pour les contenus Ghost,
# ainsi que la variable GATSBY_N8N_WEBHOOK_HUB_URL pour l'inscription des
# utilisateurs au CaPeL.

# Lancer le site en mode développement
npm start
```

## Mise à jour dynamique du contenu

### En mode développement

Il est possible de faire en sorte que les modifications de
contenu sur Ghost provoque la mise à jour des données de Gatsby :

#### Côté GatsbyJS

Il faut activer le *endpoint* de rafraîchissement grâce à la variable
d'environnement `ENABLE_GATSBY_REFRESH_ENDPOINT=true`.

Elle peut être placée dans le fichier `.env` à la racine du projet, ou ajoutée à
la ligne de commande de lancement de Gatsby :

```shell
ENABLE_GATSBY_REFRESH_ENDPOINT=true gatsby develop
```

#### Côté Ghost

Dans [les intégrations](http://localhost:2368/ghost/#/integrations), créer une
*custom integration* (ou éditer une éxistante), et y ajouter un *webhook* pour
l'événement *Site changed*, et indiquer `http://localhost:8000/__refresh` comme
URL.

### En mode production

En production, Gatsby n'est pas lui même accessible, il n'y a donc rien à
configurer de ce côté.

#### Côté Ghost

De la même manière que pour le mode développement, il faut créer/éditer une
*custom integration*. Cette fois l'URL de webhook à utiliser sera celle fournie
par le service de déploiement/intégration continue *(Pipeline Gitlab, Github
Actions, Netlify, etc.)*.

Les modifications de contenus de Ghost provoqueront alors le *build* et
redéploiement complet du site statique.

*N.B. : Attention, dans ce cas de figure, de nombreuses modifications
consécutives de contenus sur Ghost risque de provoquer un grand nombre de
processus (build/déploiement) potentiellement superflus ou coûteux.*
