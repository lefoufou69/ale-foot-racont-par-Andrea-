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

L'administration est entièrement en français et organisée en quatre groupes dans la barre latérale :

| Groupe | Collections / globals |
|---|---|
| **Publications** | Articles · Podcasts · Pages |
| **Taxonomies** | Rubriques · Compétitions · Auteurs |
| **Bibliothèque** | Médias |
| **Compte** | Utilisateurs |
| **Réglages** | Identité · Navigation · Pied de page |

### Articles

Champs (onglet Contenu) : surtitre, titre, chapô, image de une + légende + crédit, corps de l'article (texte riche + blocs).
Champs (onglet Méta) : format (analyse / récit / revue / dossier), rubrique(s), compétition, signatures (Auteurs), articles liés.
Sidebar : état éditorial (en rédaction → en relecture → prêt à publier), date de publication, **temps de lecture calculé automatiquement** depuis le corps, rédacteur(s) (compte Utilisateurs).
SEO : titre, description, image OG (via plugin SEO).

### Rubriques

Nom, description, **ordre d'affichage** (les plus petits nombres apparaissent en premier), couleur d'accent en hexadécimal. Les rubriques sont triées par ordre par défaut.

### Compétitions

Nom, pays/zone, logo. Sert à filtrer les articles par compétition.

### Auteurs

Signatures publiques : nom, biographie, portrait, liens externes (YouTube, site perso…), slug. Optionnellement reliées à un compte Utilisateur. **Indépendant des comptes** : une signature peut exister sans compte de connexion.

### Podcasts

Titre + numéro d'épisode (sidebar), fichier audio (upload) **ou** URL d'embed (Ausha, Acast…), durée, visuel, show notes (texte riche), date de publication.

### Rôles & workflow

Trois rôles définissables sur Utilisateurs :

- **Administrateur** : tout, peut créer et gérer les comptes.
- **Éditeur** : peut relire, publier, supprimer les articles.
- **Auteur** : peut créer et éditer ses articles, ne publie pas.

Cycle éditorial : le champ « État éditorial » (En rédaction → En relecture → Prêt à publier) accompagne le statut Payload (brouillon / publié). Seul un éditeur peut faire passer un article en publié. Drafts, versions et prévisualisation en direct sont fournis par Payload.

### Composer la page d'accueil

Tant qu'aucune page de slug `home` n'est créée, l'accueil affiche l'état vide « Rien n'est *encore* écrit. ». Pour composer une vraie page d'accueil :

1. Aller dans **Publications → Pages**, cliquer sur « Créer ».
2. Donner le slug `home`.
3. Empiler les blocs dans l'onglet **Composition**.
4. Publier.

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
| 3 | Modèle de contenu : collections, rôles, admin FR | ✅ terminée |
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
