# DALALI — Product Spec

## Product
A mobile real estate marketplace for Tanzania where users discover, rent, buy, sell, and discuss properties in a social feed-style interface. Think "Instagram meets Airbnb for Africa."

## Users
- **Buyers/renters**: Browse feed, search, filter, save, share, comment, and contact listing owners via in-app chat.
- **Sellers/landlords**: Post property listings, respond to messages.
- Both roles are the same user — anyone can buy and sell.

## Scope (v1)

### In scope
- Feed of property listings
- Post listing (rent/sale)
- In-app chat (real-time via Firebase Firestore + FCM)
- Search + filters (full-text + city/property type/listing type)
- Like, comment, save, share
- Push notifications
- Auth (Google/email via Clerk)
- Map view (Google Maps or OSM, TBD)
- 4–20 photos per listing via Cloudinary

### Out of scope
- Monetization / IAP
- Video walkthroughs
- Escrow / payments
- Reviews & ratings
- Admin dashboard
- Verified agent accounts
- Offline posting / offline drafts
- Multi-currency
- Swahili localization

## Core flows

1. **First launch**: Feed of property listings → tap to view detail → contact owner via chat
2. **Post a listing**: Form → title, description, price, location (city), property type, listing type (rent/sale), tags, optional specs (bedrooms, bathrooms, area), 4–20 photos → publish
3. **Search**: Full-text PostgreSQL search ("2 bedroom house for rent in Arusha") + filters (city, property type, rent/sale)
4. **Chat**: Buyer taps "Contact" → Firestore real-time chat thread → typing indicators, online status, push notifications

## Data model (core entities)

- **User** — Clerk ID, name, email, avatar, phone (optional), saved listings, created listings
- **Listing** — title, description, price, currency (TZS), property_type (enum), listing_type (rent/sale), city, tags[], specs (optional: bedrooms, bathrooms, area), photos[] (Cloudinary URLs), owner_id, created_at, status
- **Chat** (Firestore) — conversations collection, messages collection per conversation, user presence/online status
- **SavedListing** — user_id, listing_id
- **Like/Comment** — tied to listing, with user reference

## Architecture

| Layer | Choice |
|---|---|
| Mobile framework | Expo (React Native) |
| Auth | Clerk |
| Core database | Neon (PostgreSQL) |
| Chat real-time | Firebase Firestore |
| Push notifications | Firebase Cloud Messaging |
| Image storage/transforms | Cloudinary |
| Search | PostgreSQL full-text search |
| Error tracking | Sentry |

## Key integrations

- **Clerk**: Auth, session management, user profile
- **Cloudinary**: Upload, optimize, deliver listing photos
- **Firebase**: Firestore for chat + presence, FCM for push
- **Sentry**: Crash reporting + performance
- **Neon**: Serverless Postgres for structured data

---

## ASSUMPTIONS

| # | Assumption |
|---|---|
| A1 | v1 is completely free, no IAP, no fees. Revisit post-launch. |
| A2 | PostgreSQL full-text search is sufficient for v1 at Tanzanian scale. Swap to Algolia/Meilisearch if performance degrades. |
| A3 | Chat is text-only — images in chat are nice-to-have, not v1 critical. |
| A4 | Online status derived from Firestore presence system (built-in). |
| A5 | No admin/moderation panel — reported content and listing approval are manual via Neon SQL or a future admin build. |
| A6 | Map provider TBD between Google Maps and OSM, decided during implementation. |
| A7 | Offline drafts not in v1. Must have internet to post. |
| A8 | TZS (Tanzanian Shilling) as default currency, no multi-currency in v1. |
| A9 | English only for v1. Swahili localization is post-v1. |
| A10 | Share uses native share sheet (WhatsApp, Telegram, etc.) with a DALALI deep link. |

---

## OPEN RISKS

| # | Risk | Mitigation |
|---|---|---|
| R1 | Dual-database complexity (Neon + Firebase) — two ORMs, no cross-collection joins | Keep data boundaries clean: listings/users in Neon, messages/presence in Firebase. Never join across DBs in one query. |
| R2 | Firestore query limits — complex chat queries at scale | Firestore is fine for per-conversation queries at v1 scale. Monitor. |
| R3 | Push notification delivery in Tanzania — FCM reliability varies by carrier/device | Implement polling fallback when push fails; inform users to disable battery optimization. |
| R4 | Cloudinary cost at scale — free tier is 25GB/25GB | Set up budget alerts. Evaluate paid plan or alternative when approaching limits. |
| R5 | No admin tools — spam/fake listings can't be moderated in-app | Build a minimal "report listing" flag in v1 writing to a table. Consider admin screen before public launch. |
| R6 | Solo dev scope risk — feed + chat + search + push + maps + auth is ambitious | Build chat last. Ship feed + post + search first, then add real-time features. |
