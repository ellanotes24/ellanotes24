# PES Pro X (Pro Exchange Suite)

Production-oriented monorepo for a next-generation traffic exchange + rewards + advertiser marketplace platform.

## Final architecture

- `apps/api`: NestJS API-first backend with modular domains and Swagger docs.
- `apps/web`: Next.js App Router frontend (public marketing + member dashboard).
- `prisma/schema.prisma`: relational schema for wallets, tasks, campaigns, fraud, referrals, CMS, support, analytics.
- `docs/`: architecture notes + ERD summary.

## Implemented modules

- Authentication and account bootstrap (registration/login, hash-based passwords, JWT issuance).
- User profile, wallet, task, campaign, referral, membership, withdrawal, deposit, support, notifications, CMS, settings, health modules.
- Wallet architecture with separate wallet types and immutable `wallet_ledger` model.
- Fraud center primitives: user risk score + fraud event tables + blacklist model.
- Offerwall adapter-ready data models and callback logs with unique callback IDs.
- Public marketing pages + dashboard shell with SaaS-style sidebar UX.
- Dockerized local environment (PostgreSQL, Redis, API, Web).
- OpenAPI/Swagger endpoint at `/docs`.

## Folder map

```
apps/
  api/
    src/modules/*      # Domain modules
    src/prisma/*       # Prisma service and module
    prisma/seed.ts     # Seeders
  web/
    src/app/(public)   # Marketing pages
    src/app/(auth)     # Auth pages
    src/app/(dashboard)# Logged-in app shell
prisma/
  schema.prisma

docs/
  ARCHITECTURE.md
  ERD-SUMMARY.md
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment values:
   ```bash
   cp .env.example .env
   ```
3. Start infrastructure:
   ```bash
   docker compose up -d postgres redis
   ```
4. Generate Prisma client and run migration:
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```
5. Run services:
   ```bash
   npm run dev
   ```

## Security posture included

- DTO input validation + strict transform whitelist.
- Argon2 hashing for credentials.
- JWT auth scaffolding with room for refresh/session rotation.
- Ledger-first balance tracking and audit-friendly models.
- Fraud events and blacklist entities for adaptive controls.
- Callback idempotency via unique provider callback IDs.

## Scheduled jobs planned

- membership expiry
- held reward release
- fraud rescoring
- campaign cap/schedule enforcement
- streak/leaderboard maintenance
- offerwall reconciliation
- digest notifications

## Assumptions

- Social API verification is not universally available; proof + moderation is the authoritative strategy.
- Payment gateways run through pluggable provider adapters and idempotent webhooks.
- KYC is optional and configurable per withdrawal method/risk threshold.

## Extensibility roadmap

- add BullMQ queue processors for notifications/fraud scans/payments.
- complete RBAC permission matrix enforcement guards.
- wire Stripe/PayPal webhook handlers with signed verification.
- add full e2e flow tests for task completion and payout lifecycle.
- add admin analytics charts and export endpoints.
