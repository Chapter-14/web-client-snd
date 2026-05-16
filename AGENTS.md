# web-client-snd Development Guidelines

## Package Manager

**Always use `pnpm`.** Never use `npm`, `yarn`, or any other package manager for any operation (install, run, add, etc.).

## Commands

- `pnpm dev` — start dev server (port 3000)
- `pnpm build` — production build (`next build`)
- `pnpm lint` — lint the project. **This is the only lint command.** Never install or use any other linting tool or linter — always run `pnpm lint`.
- `pnpm update-db-types` — regenerate Supabase TypeScript types into `src/types/database.types.ts`

There is no test runner configured. Do not attempt to run tests.

## Node Version

v24.12.0 (see `.nvmrc`). Use `nvm use` before running any command.

## Architecture

Arabic-first RTL education platform ("سند"). Next.js 16 App Router with React 19 + TypeScript 5.

### Path Alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

### Route Groups (`src/app/`)

- `(app)/` — main authenticated area: courses (`[course]/[chapter]/study/`), onboarding, settings, my-library
- `(auth)/` — Clerk auth pages
- `(legal)/` — legal/privacy pages
- `(feedback)/` — feedback flow
- `admin/` — admin pages
- `api/` — API routes: `complete-onboarding`, `enroll`, `feedback`, `fetch-bunny`, `get-lk-token`, `webhooks`

### Key Directories

- `src/components/ui/` — Shadcn/ui components (new-york style)
- `src/components/study/` — study session components (LiveKit voice, AI chat)
- `src/components/landing/` — landing page
- `src/lib/supabaseClient.ts` — browser Supabase client
- `src/lib/supabaseAdmin.ts` — server-side Supabase admin client
- `src/context/databaseContext.tsx` — shared DB context
- `src/database/db-schema.ts` / `db-config.ts` — DB schema definitions
- `src/types/database.types.ts` — auto-generated Supabase types (do not edit manually)

### External Services

- **Clerk** — auth (Arabic localization, `arSA`)
- **Supabase** — database & storage
- **LiveKit** — real-time voice/video
- **Bunny.net** — CDN (images served from `snd-zone.b-cdn.net`)
- **OpenAI / ElevenLabs** — AI via `ai` SDK
- **Langfuse** — observability

## Conventions

- RTL layout (`dir="rtl"`, `lang="ar"`), Cairo font — maintain RTL support in all UI changes
- Shadcn/ui new-york style with `lucide-react` icons — add new UI components via `npx shadcn@latest add <component>`
- Tailwind CSS 4.x with `@tailwindcss/postcss` plugin
- Global styles in `src/styles/globals.css`
- `components.json` configured with `rtl: true`

## Gotchas

- `src/types/database.types.ts` is auto-generated — regenerate with `pnpm update-db-types` after Supabase schema changes
- There is no `middleware.ts` file
- No `.env.example` is committed — env vars are required for Clerk, Supabase, LiveKit, OpenAI, Langfuse, and Bunny.net
- ESLint config extends `next/core-web-vitals` and `next/typescript`
