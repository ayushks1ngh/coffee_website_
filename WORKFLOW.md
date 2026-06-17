# Project Improvement Workflow — Kiro Playbook

This is the exact workflow used to take `coffee_website_` from a frontend-only demo to a production-ready full-stack app in one session. Use this as a prompt template for other repos.

---

## The Prompt (copy this for other repos)

```
You are a senior staff engineer.

Perform a COMPLETE engineering audit of this repository.

Analyze:

1. Product — what is it, target users, core features, missing features
2. Architecture — frontend, backend, data flow, state management, auth
3. Tech Stack — frameworks, libraries, dependencies, build tools
4. Code Quality — dead code, duplicates, security, performance, TypeScript, accessibility
5. Production Readiness — env vars, error handling, logging, monitoring, testing, CI/CD
6. Missing Backend — if frontend-only, design: database schema, API endpoints, auth, deployment
7. Deployment Readiness — build config, env vars, routing, API routes

Generate AUDIT.md with:
- Critical Issues
- High Impact Improvements
- Quick Wins (<1 hour)
- Medium Tasks (<1 day)
- Major Features
- Estimated effort
- Priority roadmap (Phase 1-4)

Do not modify code yet.
```

---

## Phase Execution (after audit)

### Phase 1 — Stabilize (tell Kiro)
```
Execute Phase 1 from AUDIT.md. Do all quick wins and critical fixes:
- Image optimization (WebP conversion)
- Cart persistence (localStorage)
- Error boundaries
- Loading skeletons
- 404 page, robots.txt, sitemap
- Remove dead code/unused deps
- CI/CD pipeline (GitHub Actions)
- Fix performance issues flagged in audit

Build must pass. Do not break existing functionality.
```

### Phase 2 — Backend (tell Kiro)
```
Based on the AUDIT.md, design and implement a complete backend.

Requirements:
- Production ready, scalable, cheapest possible, deployable today
- Frontend: existing stack
- Backend: Supabase (PostgreSQL + Auth + Storage)
- Hosting: Vercel

Do:
1. Run SQL migrations (schema, seed, RLS) against Supabase
2. Create Supabase client utilities (browser, server, admin)
3. Implement all API routes
4. Add auth (email + Google OAuth) with login/signup pages
5. Add middleware for session refresh + route protection
6. Wire frontend to fetch from API instead of hardcoded data
7. Wire forms (checkout, contact) to submit to real API
8. Add email notifications (Resend)

I'll provide: Supabase URL, anon key, service role key, Resend API key.
```

### Phase 3 — Commerce (tell Kiro)
```
Implement Phase 3: payments, order tracking, testing.
```

### Phase 4 — Polish (tell Kiro)
```
Implement Phase 4: admin dashboard, search, ISR/SSG optimization.
```

---

## What You Provide Each Phase

| Phase | You Provide |
|-------|-------------|
| Audit | Just the repo |
| Phase 1 | Nothing — Kiro does it all |
| Phase 2 | Supabase project URL + keys, Resend API key, OAuth preference |
| Phase 3 | Stripe API keys (if adding payments) |
| Phase 4 | Nothing — uses existing backend |

---

## Key Learnings

1. **Always audit first** — don't jump into code. The audit reveals the real priorities.
2. **Images are usually the #1 performance killer** — optimize before anything else.
3. **Env vars must be set BEFORE Vercel deploy** — otherwise build fails silently.
4. **Supabase free tier is enough** — 500MB DB, auth, storage, all free.
5. **Guest checkout is important** — don't force login to buy.
6. **RLS policies are critical** — never skip row-level security.
7. **Test APIs with curl after deploy** — don't trust the UI alone.
8. **Domain/redirect URLs must match everywhere** — Supabase auth config, Vercel env vars, and code fallbacks.

---

## File Structure of a Completed Project

```
├── AUDIT.md              # Full engineering audit
├── NEXT_STEPS.md         # What to do next
├── docs/migrations/      # SQL files for DB setup
├── .github/workflows/    # CI pipeline
├── .env.local.example    # Env var template
├── src/
│   ├── app/api/          # Backend API routes
│   ├── app/(auth)/       # Login/signup
│   ├── lib/supabase/     # DB client utilities
│   ├── lib/types.ts      # Shared types
│   ├── middleware.ts     # Auth middleware
│   └── ...
```
