# HOMIQIO – Source Next.js

Projet Next.js (export statique) contenant la page **Langues et devise** en React.

## Page Langues et devise

- **Route :** `/(main)/client-space/languages` → build : `out/client-space/languages/index.html`
- **Fonctionnalités :** onglets « Langue et région » / « Devise », toggle traduction automatique, liste des langues et régions, sélection de devise
- **Stockage :** `localStorage` avec les clés `homiqio_lang`, `homiqio_autoTranslate`, `homiqio_currency` (compatible avec la version statique actuelle du site)

## Développement

```bash
cd homiqio-src
npm install
npm run dev
```

Ouvrir [http://localhost:3000/client-space/languages](http://localhost:3000/client-space/languages).

## Simulation Réservation → Paiement Stripe

Flux de simulation pour tester le parcours **réservation → paiement Stripe** :

1. **Page Réservation** : [http://localhost:3000/booking](http://localhost:3000/booking)  
   Récapitulatif factice d’une réservation avec un bouton « Payer avec Stripe ».

2. **Page Paiement Stripe** : [http://localhost:3000/stripe-simulation](http://localhost:3000/stripe-simulation)  
   - Récupération de la clé publique Stripe depuis `api.homiqio.com/api/payments/config`.  
   - Saisie d’un token Bearer (Sanctum) puis clic sur « Simuler la réservation » pour obtenir un `client_secret` via `POST /api/payments/create-intent`.  
   - Affichage du formulaire carte Stripe (Elements) et confirmation du paiement avec une carte de test.  
   - Après succès, redirection vers la page réservation.

**Prérequis :**  
- API `api.homiqio.com` configurée avec les clés Stripe (`.env`).  
- Token d’authentification obtenu via `/api/auth/login` (ex. Postman) pour créer le Payment Intent.  
- Cartes de test : [Stripe – Cartes de test](https://stripe.com/docs/testing#cards).

## Build (export statique)

```bash
npm run build
```

Les fichiers sont générés dans `out/`. Pour déployer uniquement la page Langues et devise sur le site existant, copier par exemple :

- `out/client-space/languages/index.html` → `homiqio.com/client-space/languages/index.html`
- les chunks et assets référencés par cette page depuis `out/_next/` vers `homiqio.com/_next/`

## Structure des routes (recréée pour correspondre au site en production)

Toutes les routes du site homiqio.com ont été recréées en squelettes modifiables :

| Groupe | Routes |
|--------|--------|
| **Auth** | `/login`, `/signup`, `/check-email`, `/verify-email`, `/set-password` |
| **Legal** | `/company-info`, `/how-it-works`, `/privacy`, `/terms` |
| **Main** | `/` (accueil), `/annonces`, `/booking`, `/search`, `/property/[id]`, `/experiences`, `/experience/[id]`, `/experience-onboarding`, `/services`, `/service/[id]`, `/host-onboarding`, `/host-onboarding/[step]`, `/identity-verification`, `/messages`, `/phone-verification` |
| **Espace client** | `/client-space`, `/client-space/profile`, `/client-space/languages`, `/client-space/notifications`, `/client-space/payments`, `/client-space/reservations`, `/client-space/reservations/[reservationId]`, `/client-space/security` |
| **Aide** | `/help-center` |

Chaque page squelette utilise le composant `app/components/PlaceholderPage.tsx`. Vous pouvez modifier le contenu de chaque fichier `page.tsx` pour personnaliser les pages (boutons, formulaires, etc.) et les faire correspondre au site en production.
