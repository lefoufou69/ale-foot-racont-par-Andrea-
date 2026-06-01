# Le foot raconté par Andrea Planet

Magazine web d'analyse footballistique : analyses tactiques, histoire, récits longs, revues de livres, podcasts, newsletters. Positionnement assumé : **l'inverse de l'info instantanée**. On prend le temps d'écrire et de raconter.

**Signature : « L'analyse a le temps. »**

---

## 1. Stack technique

- **Next.js 16** (App Router) en TypeScript
- **Payload CMS 3** (admin et front dans le même projet)
- **PostgreSQL** (en local via service système, en production via [Neon](https://neon.tech))
- **Tailwind CSS** pour le style
- Stockage des médias : local en dev (`public/media`), à brancher sur Vercel Blob ou S3 en production
- Déploiement cible : **Vercel**

Point de départ : le template officiel `payloadcms/payload/templates/website`, adapté à Postgres et personnalisé.

---

## 2. Démarrer le projet en local

### Prérequis

- **Node.js ≥ 22**
- **pnpm ≥ 9**
- **PostgreSQL ≥ 14** (lancé en local)

### Première installation

```bash
# 1. Installer les dépendances
pnpm install

# 2. Créer le fichier d'environnement
cp .env.example .env
# puis ouvrir .env et remplir DATABASE_URL et PAYLOAD_SECRET

# 3. Générer la carte d'import de l'admin Payload
pnpm payload generate:importmap

# 4. Lancer le serveur
pnpm dev
```

Le site est disponible sur **<http://localhost:3000>** et l'administration sur **<http://localhost:3000/admin>**.

À la première visite de `/admin`, Payload crée automatiquement les tables Postgres et propose de créer le **premier utilisateur administrateur**.

### Base de données locale (rappel)

Si PostgreSQL est déjà installé sur la machine :

```bash
sudo -u postgres psql -c "CREATE USER andrea WITH PASSWORD 'andrea' SUPERUSER;"
sudo -u postgres psql -c "CREATE DATABASE andrea_planet OWNER andrea;"
```

Puis dans `.env` :

```
DATABASE_URL=postgresql://andrea:andrea@127.0.0.1:5432/andrea_planet
```

---

## 3. Se connecter à l'administration

1. Aller sur <http://localhost:3000/admin>
2. Au premier lancement, créer le compte administrateur (email + mot de passe)
3. L'interface s'affiche **en français** (locale par défaut `fr`)

---

## 4. Ajouter / organiser le contenu

> Cette section sera complétée à la fin de chaque phase de livraison.

À ce stade (fin de la **Phase 2 — Charte graphique**), l'administration expose toujours les collections du template (Pages, Posts, Catégories, Médias, Utilisateurs). Elles seront entièrement repensées en **Phase 3**.

Le front, lui, est passé à la charte « Andrea Planet » :

- **Couleurs** : papier crème (`--paper`), encre `--ink`, vert bouteille `--green`, vermillon `--vermilion`. Tokens exposés en utilities Tailwind : `bg-paper`, `text-ink`, `text-green`, `text-vermilion`, `border-line`, etc.
- **Typographies** : Fraunces (titres), Newsreader (corps), Archivo (UI/chiffres) — chargées via `next/font/google`. Utility `.tabular` pour chiffres tabulaires.
- **Grain papier** : overlay SVG fixe ~5 % d'opacité.
- **Animations** : `.appear` (apparition décalée via `--i`), `.link-underline` (soulignement vermillon au survol), `.img-zoom` (zoom lent au survol). Respect de `prefers-reduced-motion`.
- **Logo** : texte (Fraunces + Archivo), « Planet » en vert. Variantes `compact` / `full` et `tone` `ink` / `paper`.
- **Header** : papier translucide, sticky, recherche en accent.
- **Footer** : vert profond, bloc YouTube unique (`https://www.youtube.com/@dédéap69`).
- **Page d'accueil vide** : composant `EmptyHome` (« Bientôt » → « Rien n'est *encore* écrit. » + newsletter + lien YouTube). Disparaîtra dès qu'une page `home` sera publiée dans l'admin.

---

## 5. Déploiement (à venir, Phase 6)

Le déploiement Vercel + Neon sera documenté en détail dans la dernière phase. Aperçu :

1. Créer une base Neon (offre gratuite) → copier l'URL de connexion
2. Importer le projet sur Vercel
3. Définir les variables d'environnement (`DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `CRON_SECRET`, `PREVIEW_SECRET`)
4. Brancher Vercel Blob (ou S3) pour les médias

---

## 6. Plan de livraison

Le projet est livré en **6 phases**, avec une démonstration et une pause après chaque étape :

| Phase | Contenu | État |
|-------|---------|------|
| 1 | Échafaudage : projet, base, admin accessible | ✅ terminée |
| 2 | Charte graphique : couleurs, typos, header, footer, état vide | ✅ terminée |
| 3 | Modèle de contenu : collections, rôles, admin FR | à venir |
| 4 | Blocs riches (texte, tableau, **schéma tactique**, etc.) | à venir |
| 5 | Front : article, rubrique, podcast, recherche, accueil libre | à venir |
| 6 | Finitions : SEO, performance, accessibilité, déploiement | à venir |

---

## 7. Scripts disponibles

```bash
pnpm dev                          # serveur de développement (Next + Payload)
pnpm build                        # build de production
pnpm start                        # serveur de production
pnpm lint                         # ESLint
pnpm payload                      # CLI Payload (ex: payload migrate)
pnpm payload generate:importmap   # régénère la carte d'import de l'admin
pnpm payload generate:types       # régénère src/payload-types.ts
```
