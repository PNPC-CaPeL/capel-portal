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
# Copier coller le fichier .env.dist
cp .env.dist .env
# Vous devez maintenant créer un token (Content API key)
# qu'il vous faudra coller dans le fichier .env
# pour la variable GHOST_API_KEY
# En allant sur localhost:2368/ghost, vous pourrez créer le compte administrateur, 
# puis en allant sur http://localhost:2368/ghost/#/integrations/new
# vous pourrez créer une nouvelle intégration, 
# et récupérer la variable Content API key
# Copier coller le fichier .env.dist pour la variable N8N_WEBHOOK_HUB_URL
cp .env.dist .env.development
# Supprimer les 2 variables GHOST, inutiles
# Renseigner la variable N8N_WEBHOOK_HUB_URL, 
# si vous souhaitez tester l'inscription des utilisateurs
# Démarrer gatsby ! (enfin !)
npm run develop
```
