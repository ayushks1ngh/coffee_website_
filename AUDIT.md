# AUDIT.md — Coffee Crave Engineering Audit

**Date:** 2026-06-18  
**Auditor:** Senior Staff Engineer  
**Repository:** `coffee_website_`

---

## 1. Product Analysis

### What Is This Project?
A premium coffee brand marketing and e-commerce website for "Coffee Crave" — a fictional (or early-stage) specialty coffee company. Heavy emphasis on cinematic brand experience with scroll-driven animations, a product catalog, shopping cart, checkout flow, and informational pages.

### Target Users
- Premium coffee consumers (25–45, design-savvy, urban)
- Brand visitors exploring Coffee Crave's identity and locations
- Online shoppers placing pickup orders

### Core Features
- ✅ Cinematic home page with scroll-linked frame sequence animation (120 frames)
- ✅ Product catalog with filtering, detail modals, size selection
- ✅ Shopping cart with add/remove/quantity controls
- ✅ Checkout with form validation and pickup location selection
- ✅ Order success confirmation
- ✅ Locations page with Google Maps embed
- ✅ Contact form
- ✅ About page with company story and timeline
- ✅ Process page with ingredient journey and brewing experience
- ✅ Responsive design with mobile navigation
- ✅ Dark/light theme system
- ✅ Framer Motion animations throughout

### Missing Features
- ❌ No real backend — orders go nowhere (simulated with `setTimeout`)
- ❌ No user authentication/accounts
- ❌ No payment integration (Stripe, Razorpay, etc.)
- ❌ No order history or tracking
- ❌ No search functionality
- ❌ No wishlist/favorites
- ❌ No real-time inventory management
- ❌ No reviews/ratings
- ❌ No newsletter/email capture
- ❌ No blog/content marketing pages
- ❌ No internationalization (i18n) — hardcoded English and USD
- ❌ No sitemap.xml or robots.txt

---

## 2. Architecture Analysis

### Frontend Architecture
- **Pattern:** Next.js App Router with client-heavy rendering
- **Page structure:** Each route has a thin `page.tsx` (metadata + re-export) and a `*Page.tsx` client component
- **Component model:** Flat — all components in `src/components/` (no sub-directories)
- **Lazy loading:** Homepage sections use `next/dynamic` with `{ ssr: false }` to reduce initial bundle

### Backend Architecture
- **None.** This is a purely frontend application. No API routes exist (`/api` directory absent).
- Checkout "submits" via `setTimeout` — no server communication.
- Contact form sets a local state flag — no email/webhook integration.

### Data Flow
```
Static Data (hardcoded in components)
  → React State (CartContext)
    → UI renders
```
All product data, locations, and pricing are hardcoded in component files. No external data fetching.

### API Flow
- **None.** No API calls are made. No fetch/axios usage. No data from a CMS or database.

### State Management
- **CartContext** — React Context + useState for cart items, toast notifications
- **Local component state** — form inputs, UI toggles, active category filters
- **No persistent state** — cart is lost on page refresh (no localStorage, no cookies)

### Authentication
- **None.** No auth system exists.

---

## 3. Tech Stack

### Frameworks
| Framework | Version | Notes |
|-----------|---------|-------|
| Next.js | 14.2.35 | App Router, React 18 |
| React | ^18 | Client components predominant |
| TypeScript | ^5 | Strict mode enabled |

### Libraries
| Library | Purpose |
|---------|---------|
| framer-motion ^12.34.3 | Animations (scroll, spring, layout) |
| lucide-react ^0.575.0 | Icons (imported but usage unclear) |
| clsx ^2.1.1 | Conditional classnames |
| tailwind-merge ^3.5.0 | Tailwind class deduplication |

### Build Tools
| Tool | Version |
|------|---------|
| Tailwind CSS | ^3.4.1 |
| PostCSS | ^8 |
| ESLint | ^8 (eslint-config-next) |

### Notable Absences
- No testing framework (jest, vitest, playwright, cypress)
- No Prettier / formatting config
- No Husky / lint-staged / pre-commit hooks
- No bundler analyzer
- No Storybook

---

## 4. Code Quality

### Dead Code
| Issue | Location |
|-------|----------|
| `copy_images.ps1` — Windows-only dev utility committed to repo | Root |
| `lucide-react` in dependencies but zero imports found in components | package.json |
| `tailwind-merge` imported in package.json — likely unused (inline styles dominate) | package.json |
| `clsx` imported — unclear if used given inline style pattern | package.json |
| README references Geist font but project uses Inter from Google Fonts | README.md |
| Font files `GeistVF.woff` and `GeistMonoVF.woff` present but unused | src/app/fonts/ |

### Duplicate Code
| Pattern | Occurrences |
|---------|-------------|
| TAX_RATE = 0.08 + tax calculation | CartPage.tsx, CheckoutPage.tsx |
| Hero section pattern (span + h1 + divider + p) | Every page (6+ instances) |
| Inline styles for color, background, border | Ubiquitous — should use CSS variables/Tailwind |
| PICKUP_LOCATIONS data | Only in CheckoutPage but should be shared |
| Page metadata pattern | Could use a utility function |

### Security Issues
| Severity | Issue |
|----------|-------|
| 🟡 Medium | Contact form has no CSRF protection or rate limiting (currently non-functional) |
| 🟡 Medium | No input sanitization on checkout form fields |
| 🟡 Medium | Google Maps iframe loaded without CSP headers |
| 🟢 Low | No Content Security Policy configured |
| 🟢 Low | `NEXT_PUBLIC_SITE_URL` env var referenced but not defined in any .env file |

### Performance Issues
| Severity | Issue |
|----------|-------|
| 🔴 Critical | **33MB of JPEG frame sequence in /public/sequence/** — 120 frames loaded client-side for scroll animation. No WebP/AVIF, no CDN, no lazy loading strategy for frames |
| 🔴 Critical | Drink images (500KB+ each, 9 images ≈ 5MB) in /public/drinks/ — no optimization, no srcset/responsive sizes |
| 🔴 Critical | Location images (670–790KB each, 6 images ≈ 4.3MB) — unoptimized PNGs |
| 🟡 Medium | Homepage is entirely `"use client"` — zero SSR benefit, no streaming |
| 🟡 Medium | `backface-visibility: hidden` applied to ALL elements via `* {}` in globals.css — forces GPU layer on every DOM node |
| 🟡 Medium | Scrollbar hidden globally — accessibility issue and unexpected UX on some platforms |
| 🟡 Medium | No image optimization pipeline (next.config.mjs is empty) |
| 🟢 Low | Heavy framer-motion bundle (~40KB gzipped) loaded on every page |

### TypeScript Issues
| Issue | Location |
|-------|----------|
| Missing `ReactNode` import type in Providers | providers.tsx (uses `React.ReactNode` without explicit import) |
| `eslint-disable react-hooks/exhaustive-deps` suppression | OrderSuccessPage.tsx |
| No strict null checks on `useContext` — context could be undefined if used outside provider | CartContext.tsx |

### Accessibility Issues
| Severity | Issue |
|----------|-------|
| 🟢 Good | Skip-to-content link present |
| 🟢 Good | `prefers-reduced-motion` media query exists |
| 🟢 Good | Focus-visible styles defined |
| 🟢 Good | Mobile tap targets enforced (44px min) |
| 🟡 Medium | Cart badge and interactive elements use `cursor-pointer` without proper button role in some cases |
| 🟡 Medium | No `aria-live` region for toast notifications — screen readers won't announce them |
| 🟡 Medium | Modal (DrinkDetailModal) likely missing focus trap and Escape key handling |
| 🟡 Medium | Category filter buttons have no `aria-pressed` state |
| 🟡 Medium | Mobile menu overlay lacks `aria-expanded`, `aria-controls` |
| 🟡 Medium | Color contrast of `rgba(94,80,63,0.4)` labels on light background likely fails WCAG AA |
| 🟢 Low | iframe missing descriptive title (has generic one) |

---

## 5. Production Readiness

| Area | Status | Notes |
|------|--------|-------|
| Environment Variables | ❌ | `NEXT_PUBLIC_SITE_URL` referenced but no .env file exists |
| Error Handling | ❌ | No error boundaries, no try/catch, no error.tsx pages |
| Logging | ❌ | No logging infrastructure |
| Monitoring | ❌ | No Sentry, DataDog, or similar |
| Analytics | ❌ | No GA, Vercel Analytics, Plausible, or similar |
| Testing | ❌ | Zero tests — no unit, integration, or e2e tests |
| CI/CD | ❌ | No GitHub Actions, no Vercel config, no deployment pipeline |
| SEO | 🟡 | Good metadata setup, but no sitemap.xml, robots.txt, or structured data (JSON-LD) |
| PWA | ❌ | No service worker, no manifest.json |
| Caching | ❌ | No Cache-Control headers configured |

---

## 6. Missing Backend Design

Since this project is frontend-only, here's a recommended backend architecture:

### Database Schema (PostgreSQL)

```sql
-- Users & Auth
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products (Drinks)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  origin VARCHAR(255),
  temp VARCHAR(50),
  flavor_notes TEXT[],
  ingredients TEXT[],
  tags TEXT[],
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Size Pricing
CREATE TABLE product_sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  size VARCHAR(20) NOT NULL, -- Small, Medium, Large
  price_multiplier DECIMAL(3,2) NOT NULL
);

-- Locations
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  hours VARCHAR(255),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  image_url VARCHAR(500),
  active BOOLEAN DEFAULT TRUE
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  location_id UUID REFERENCES locations(id),
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, preparing, ready, picked_up
  subtotal DECIMAL(10,2),
  tax DECIMAL(10,2),
  total DECIMAL(10,2),
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  size VARCHAR(20) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL
);

-- Contact Messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  email VARCHAR(255),
  subject VARCHAR(500),
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Backend Architecture

```
┌─────────────────────────────────────────────┐
│            Vercel Edge Network               │
│  (Next.js App Router — Static + Serverless) │
└─────────────┬───────────────────────────────┘
              │
    ┌─────────▼─────────┐
    │  Next.js API Routes │  ← /api/*
    │  (Route Handlers)   │
    └─────────┬───────────┘
              │
    ┌─────────▼─────────┐
    │   Service Layer     │  ← Business logic
    └─────────┬───────────┘
              │
    ┌─────────▼─────────────────────┐
    │  Supabase / Neon PostgreSQL   │
    │  + Supabase Auth              │
    │  + Supabase Storage (images)  │
    └───────────────────────────────┘
```

### API Endpoints

```
Auth:
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/logout
  GET    /api/auth/me

Products:
  GET    /api/products          — list all (with category filter)
  GET    /api/products/:id      — single product detail

Orders:
  POST   /api/orders            — create order
  GET    /api/orders            — user's order history (authenticated)
  GET    /api/orders/:id        — order detail + status

Locations:
  GET    /api/locations         — list all active locations

Contact:
  POST   /api/contact           — submit contact form (rate-limited)

Admin (future):
  GET    /api/admin/orders      — all orders (admin only)
  PATCH  /api/admin/orders/:id  — update order status
  CRUD   /api/admin/products    — manage products
```

### Authentication
- **Provider:** Supabase Auth (or NextAuth.js)
- **Strategy:** JWT stored in HTTP-only cookies
- **Flows:** Email/password + optional Google/Apple OAuth
- **Guest checkout:** Supported (no account required to place order)

### Authorization
- **Roles:** customer, admin
- **Middleware:** Next.js middleware.ts for route protection
- **Admin panel:** Protected routes under `/admin/*`

### File Storage
- **Provider:** Supabase Storage or Vercel Blob
- **Assets:** Product images, location images
- **Optimization:** On-upload compression + WebP conversion
- **CDN:** Served via Vercel/Supabase CDN with immutable cache headers

### Deployment Architecture
```
GitHub → Vercel (auto-deploy on push)
  ├── Production: main branch → coffeecrave.vercel.app
  ├── Preview: PR branches → unique URLs
  └── Env vars: managed in Vercel dashboard

Database: Supabase (managed PostgreSQL)
  ├── Connection pooling via Supavisor
  └── Row Level Security policies

Monitoring: Vercel Analytics + Sentry
Email: Resend (transactional order confirmations)
```

---

## 7. Vercel Readiness

| Check | Status | Notes |
|-------|--------|-------|
| Build configuration | ✅ | `next build` works out of the box |
| Framework detection | ✅ | Vercel auto-detects Next.js |
| Output mode | ✅ | Default (serverless) — fine for this project |
| Environment variables | ⚠️ | `NEXT_PUBLIC_SITE_URL` must be set in Vercel dashboard |
| Routing | ✅ | App Router, no custom rewrites needed |
| API routes | N/A | None exist yet |
| Edge functions | N/A | Not used |
| Static assets | ⚠️ | 42MB in /public — will deploy but slow initial uploads; recommend moving to Vercel Blob or external CDN |
| Image optimization | ⚠️ | Using `next/image` but source images are massive; add `images.remotePatterns` when moving to CDN |
| Build time | ⚠️ | Large static assets will slow builds; sequence frames should be served from external storage |
| Bundle size | ⚠️ | All pages are client-rendered — no ISR/SSG benefit. Homepage bundle likely 200KB+ |

---

## 8. Issues & Recommendations

### 🔴 Critical Issues (Fix Before Launch)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 1 | **33MB frame sequence served from /public** | Page load >10s on 3G, massive bandwidth costs | 4h |
| 2 | **No cart persistence** — refresh loses all items | Users lose cart data constantly | 1h |
| 3 | **Checkout does nothing** — no backend/payment | Core business flow is non-functional | 2–5 days |
| 4 | **No error boundaries** — any component crash shows white screen | Complete UX failure on errors | 2h |
| 5 | **Unoptimized images** — drinks (5MB), locations (4.3MB) all PNGs | Terrible mobile performance | 3h |

### 🟠 High Impact Improvements

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 6 | Add localStorage persistence for cart | Prevents data loss, expected UX | 1h |
| 7 | Convert images to WebP/AVIF with proper sizing | 70–90% size reduction | 3h |
| 8 | Add `error.tsx` and `not-found.tsx` pages | Graceful error handling | 1h |
| 9 | Move frame sequence to external CDN (Cloudinary/Vercel Blob) | Reduce deploy size from 42MB to <5MB | 3h |
| 10 | Add SEO fundamentals (sitemap.xml, robots.txt, JSON-LD) | Discoverability | 2h |
| 11 | Add Vercel Analytics or Plausible | Understand user behavior | 30min |
| 12 | Add aria-live to toast, focus trap to modal | WCAG compliance | 2h |

### ⚡ Quick Wins (<1 hour)

| # | Task | Effort |
|---|------|--------|
| Q1 | Add `.env.local.example` with `NEXT_PUBLIC_SITE_URL` | 5min |
| Q2 | Remove unused `lucide-react`, `clsx`, `tailwind-merge` if confirmed unused | 10min |
| Q3 | Delete `copy_images.ps1` and unused Geist font files | 5min |
| Q4 | Add `robots.txt` and basic `sitemap.xml` | 20min |
| Q5 | Add localStorage cart persistence in CartContext | 30min |
| Q6 | Fix `backface-visibility: hidden` on `*` selector — move to specific animated elements only | 10min |
| Q7 | Add `loading.tsx` skeleton pages for each route | 45min |
| Q8 | Add `not-found.tsx` global 404 page | 15min |

### 🟡 Medium Tasks (<1 day)

| # | Task | Effort |
|---|------|--------|
| M1 | Image optimization pipeline — compress, convert to WebP, generate srcsets | 4h |
| M2 | Implement contact form backend (API route + Resend email) | 3h |
| M3 | Add basic testing setup (Vitest + React Testing Library) | 3h |
| M4 | Extract hardcoded product data to JSON/CMS | 2h |
| M5 | Add Sentry for error monitoring | 2h |
| M6 | CI/CD with GitHub Actions (lint + typecheck + build) | 2h |
| M7 | Lazy-load frame sequence images progressively (IntersectionObserver) | 4h |
| M8 | Add proper CSP headers via next.config.mjs | 2h |

### 🟣 Major Features (Multi-day)

| # | Feature | Effort |
|---|---------|--------|
| F1 | Backend: Supabase integration — products from DB | 2–3 days |
| F2 | Backend: Order placement with real persistence | 2–3 days |
| F3 | Payment integration (Stripe/Razorpay) | 3–4 days |
| F4 | User authentication (NextAuth / Supabase Auth) | 2–3 days |
| F5 | Admin dashboard (order management, product CRUD) | 5–7 days |
| F6 | Order status tracking & email notifications | 3–4 days |
| F7 | Search with Algolia or native full-text | 2 days |
| F8 | PWA support (offline menu, service worker) | 2 days |
| F9 | Internationalization (i18n — Hindi, Arabic for target markets) | 3–4 days |

---

## 9. Effort Summary

| Category | Items | Estimated Total |
|----------|-------|-----------------|
| Quick Wins | 8 | ~3 hours |
| Medium Tasks | 8 | ~3 days |
| Major Features | 9 | ~25–35 days |
| **Total to Production-Ready MVP** | — | **~6–8 weeks (1 dev)** |

---

## 10. Priority Roadmap

### Phase 1 — Stabilize (Week 1)
- All Quick Wins (Q1–Q8)
- Critical issues #1, #2, #4, #5
- Medium tasks M5, M6

### Phase 2 — Functional Backend (Weeks 2–3)
- F1 (Supabase products)
- F2 (Real orders)
- M2 (Contact form)
- F4 (Authentication)

### Phase 3 — Commerce (Weeks 4–5)
- F3 (Payments)
- F6 (Order tracking)
- M3 (Testing)

### Phase 4 — Polish (Weeks 6–8)
- F5 (Admin)
- F7 (Search)
- F9 (i18n)
- Performance tuning
- Security audit pass

---

*End of audit.*
