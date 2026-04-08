# PES Pro X Architecture

## Stack
- **Frontend:** Next.js 15 + TypeScript + TailwindCSS.
- **Backend:** NestJS 10 + Prisma + PostgreSQL.
- **Caching/Queues:** Redis adapters and queue-ready service boundaries.
- **Payments:** Gateway abstraction (Stripe, PayPal baseline).

## Modular backend domains
- Auth & Identity
- User/Profile/Session security
- Wallet + immutable ledger
- Task Engine (surf, social, proof-based)
- Campaign/Ads marketplace
- Referral & affiliate rewards
- Membership + subscription lifecycle
- Withdrawals/deposits/billing
- Fraud detection and moderation queues
- Support ticketing
- Notifications (in-app/email architecture)
- CMS/Blog/FAQ
- Admin intelligence center + settings engine

## Verification strategy for constrained integrations
- Social actions that cannot be API-verified use **proof + moderation** workflow.
- Offerwalls use signed callbacks, provider secret checks, duplicate callback protection.
- Fraud intelligence connectors are implemented as provider hooks/placeholders.
