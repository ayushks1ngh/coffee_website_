# ☕ Coffee Crave

A premium coffee brand website with a full e-commerce flow — cinematic scroll animations, real-time ordering, and a Supabase-powered backend.

**Live:** [coffeecrave.vercel.app](https://coffeecrave.vercel.app)

---

## Features

- 🎬 Cinematic scroll-linked frame sequence animation (120 frames)
- 🛒 Full shopping cart with localStorage persistence
- 📦 Real order placement with email confirmations
- 🔐 Authentication (Email/Password + Google OAuth)
- 📍 6 global locations with interactive map
- 🎨 Dark/light theme system with smooth transitions
- 📱 Fully responsive with mobile navigation
- ⚡ Optimized images (WebP, 90% size reduction)
- ♿ Accessible (skip-link, focus-visible, reduced-motion)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase Auth + Google OAuth |
| Email | Resend |
| Hosting | Vercel |
| CI/CD | GitHub Actions |

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Resend](https://resend.com) API key (for emails)

### 1. Clone & Install

```bash
git clone https://github.com/ayushks1ngh/coffee_website_.git
cd coffee_website_
npm install
```

### 2. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (secret) |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (`http://localhost:3000` for dev) |
| `RESEND_API_KEY` | Resend API key for order emails |
| `EMAIL_FROM` | Sender address (e.g. `Coffee Crave <onboarding@resend.dev>`) |
| `NEXT_PUBLIC_TAX_RATE` | Tax rate as decimal (e.g. `0.08`) |

### 3. Database Setup

Run these SQL files in your Supabase SQL Editor (Dashboard → SQL → New Query):

1. **Schema** — create tables, indexes, triggers:
   ```
   See: docs/migrations/001_schema.sql
   ```

2. **Seed data** — products and locations:
   ```
   See: docs/migrations/002_seed.sql
   ```

3. **RLS policies** — row-level security:
   ```
   See: docs/migrations/003_rls.sql
   ```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes (products, orders, contact, admin)
│   ├── (auth)/           # Login & signup pages
│   ├── account/          # User account & order history
│   ├── menu/             # Product catalog
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Order placement
│   ├── contact/          # Contact form
│   ├── locations/        # Store locations
│   ├── process/          # Brewing process showcase
│   └── about/            # Brand story
├── components/           # Shared UI components
├── context/              # React Context (Cart)
├── lib/
│   ├── supabase/         # Supabase clients (browser, server, admin)
│   ├── types.ts          # Shared TypeScript types
│   ├── email.ts          # Resend email utility
│   └── constants.ts      # App constants
└── middleware.ts         # Auth session refresh & route protection
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | Public | List all products |
| GET | `/api/products/[slug]` | Public | Single product detail |
| GET | `/api/locations` | Public | All active locations |
| POST | `/api/orders` | Optional | Place an order |
| GET | `/api/orders` | Required | User's order history |
| GET | `/api/orders/[id]` | Required | Order detail |
| POST | `/api/contact` | Public | Submit contact form |
| GET | `/api/admin/orders` | Admin | All orders |
| PATCH | `/api/admin/orders/[id]` | Admin | Update order status |

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint check
```

## Deployment

The project auto-deploys to Vercel on push to `master`. The CI pipeline runs lint + typecheck + build before deploy.

### Vercel Setup

1. Import repo in Vercel
2. Add all environment variables from `.env.local.example`
3. Deploy

### Making Yourself Admin

1. Sign up on the live site
2. Go to Supabase Dashboard → Authentication → Users
3. Copy your user UUID
4. Run in SQL Editor:
   ```sql
   UPDATE public.profiles SET role = 'admin' WHERE id = 'your-uuid';
   ```

## License

MIT

---

Built by [@ayushks1ngh](https://github.com/ayushks1ngh)
