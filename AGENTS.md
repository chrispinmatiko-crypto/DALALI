# AGENTS.md — DALALI

> This file defines the tech stack, conventions, and rules for the DALALI project.
> Any AI agent or contributor MUST read this before writing code.
> This file is updated over time as the project evolves.

---

## Expo Version

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Expo v57 (React Native 0.86) |
| Language | TypeScript (strict mode) |
| Navigation | Expo Router (native tabs) |
| Styling | NativeWind v4 + Tailwind CSS |
| Database | Neon (PostgreSQL) |
| ORM | Drizzle ORM |
| Authentication | Clerk (`@clerk/expo`) |
| Background Jobs | Inngest |
| Error Tracking | Sentry (`@sentry/react-native`) |
| Real-time Chat | Firebase Firestore |
| Push Notifications | Firebase Cloud Messaging (FCM) |
| Image Storage | Cloudinary |

---

## Native Tabs — MANDATORY

This project uses **native platform tabs only**. No exceptions.

- Always use `expo-router` native `<Tabs>` component.
- Never use JavaScript-based tab implementations (no `react-native-tab-view`, no custom `ScrollView`/`FlatList` tab bars, no gesture-based swipe tabs).
- If a tab screen needs a custom look, style the native tab — do not replace it.
- The root layout (`_layout.tsx`) must use `<Tabs>` for all bottom navigation screens.

---

## Drizzle + Neon

- Schema files go in `src/db/schema/`.
- Use `@neondatabase/serverless` as the driver.
- Run `npx drizzle-kit generate` after schema changes.
- Run `npx drizzle-kit push` to apply to Neon.
- Use Drizzle's relational query API (`db.query.table.findMany()`) for reads.
- Use Drizzle's insert/update/delete APIs for writes.
- Always type query results — no `any` from database calls.

---

## Clerk Auth

- Provider wraps the app in the root layout with `tokenCache` from `@clerk/expo/token-cache`.
- Use `useAuth()` and `useUser()` hooks — never read tokens directly.
- Protected routes check `isSignedIn` from `useAuth()` with an `isLoaded` gate first.
- For custom sign-in/sign-up flows, use the method-based API: `signIn.password()`, `signIn.phoneCode.sendCode()`.
- Never use the legacy `signIn.create()` + `prepareFirstFactor()` pattern.
- Use `useSSO()` for social login — `useOAuth()` is deprecated.
- Native components (`AuthView`, `UserButton`) require a dev build, not Expo Go.

---

## Inngest

- Define Inngest functions in `src/inngest/functions/`.
- Create the Inngest client in `src/inngest/client.ts`.
- Use step functions (`step.run()`, `step.sleep()`, `step.waitForEvent()`) for multi-step jobs.
- Trigger events via `inngest.send()` from API routes or server actions.
- Common jobs: listing moderation, image processing, notification dispatch, data sync.

---

## Sentry

- Sentry is already initialized in `src/app/_layout.tsx`.
- Use `Sentry.captureException()` for manual error reporting.
- Wrap screen components in `Sentry.Native.withErrorBoundary()` for automatic boundary.
- Use `Sentry.startTransaction()` for performance traces on critical flows (listing creation, search, chat).
- The DSN comes from `EXPO_PUBLIC_SENTRY_DSN`.

---

## Firebase

### Firestore (Real-time Chat)
- Chat conversations and messages live in Firestore — not in Neon.
- Use `@react-native-firebase/firestore` for reads/writes.
- Implement presence via Firestore's `onSnapshot` + document timestamps.
- Never join Neon data with Firestore data in a single query — keep them separate.

### FCM (Push Notifications)
- Use `@react-native-firebase/messaging` for push token registration and handling.
- Server-side sends go through the Firebase Admin SDK.
- Store FCM tokens in Neon (on the User table) — not in Firestore.

---

## Code Conventions

- **TypeScript**: Strict mode. No `any` types. Use `unknown` and narrow.
- **Imports**: Use the `@/` path alias (maps to `src/`).
- **Styling**: NativeWind `className` props. Never use `StyleSheet.create()` for new components.
- **Components**: Functional components only. No class components.
- **Exports**: Named exports for components. Default exports only for screen files.
- **Env vars**: `EXPO_PUBLIC_` prefix for client-side. Private keys have no prefix.
- **Error handling**: Use try/catch. Log to Sentry. Never swallow errors silently.
- **File naming**: `PascalCase.tsx` for components, `camelCase.ts` for utilities/lib.

---

*Last updated: July 2026*
