<h1 align="center">
  CaPeL
</h1>

La dispositif est constitué de plusieurs outils et services connectés les uns
aux autres.

- [Site public](https://capel.netlify.app/) (généré avec Nuxt)
- Gestion des contenus publics (avec Decap CMS et nuxt/content)
- Comptes CaPeL (avec LocoKit)
- …

Ce dépôt git contient uniquement les fichiers de la partie publique (site
internet).

## Fonctionnement

### Pré-requis

- `node` *(testé avec node 20, aucun test réalisé avec les autres versions)*
- …

Copier le fichier `.env.dist` dans un fichier `.env` avec les paramètres liés au back office CaPeL.

### Générer le site

```shell
# Installer une première fois les dépendances
npm ci
# Lancer la version de développement
npm run dev
# Générer le site statique dans `public/`
npm run generate
```
