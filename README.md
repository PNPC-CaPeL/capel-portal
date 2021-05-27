<h1 align="center">
  CaPeL
</h1>

La dispositif est constitué de plusieurs outils et services connectés les uns aux autres.

- [Site public](https://capel.netlify.app/) (généré avec GatsbyJS)
- …

Ce dépôt git contient uniquement les fichiers de la partie publique (site internet).

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

```sh
# Installer une première fois les dépendances
npm ci
# Installer un Ghost sur votre machine (si ce n'est pas déjà fait)
npm i -g ghost-cli
# Créer un répertoire qui hébergera une instance ghost
mkdir /tmp/where-you-want && cd /tmp/where-you-want
# Installer une instance ghost dans ce répertoire
ghost install local
# Revenir dans votre répertoire du projet
cd -
# Copier coller le fichier .env.dist
cp .env.dist .env
# Vous devez maintenant créer un token (Content API key)
# qu'il vous faudra coller dans le fichier .env
# pour la variable GHOST_API_KEY
# En allant sur localhost:2368/ghost, vous pourrez créer le compte administrateur, 
# puis en allant sur http://localhost:2368/ghost/#/integrations/new
# vous pourrez créer une nouvelle intégration, 
# et récupérer la variable Content API key
# Copier coller le fichier .env.dist pour la variable GATSBY_N8N_WEBHOOK_HUB_URL
cp .env.dist .env.development
# Supprimer les 2 variables GHOST, inutiles
# Renseigner la variable GATSBY_N8N_WEBHOOK_HUB_URL, 
# si vous souhaitez tester l'inscription des utilisateurs
# Démarrer gatsby ! (enfin !)
npm run develop
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
