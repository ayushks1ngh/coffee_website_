# Next Steps — Coffee Crave

## Immediate (when you're back)

### 1. Fix Vercel deployment domain
- Go to Vercel Dashboard → Settings → Environment Variables
- Update `NEXT_PUBLIC_SITE_URL` to your actual Vercel URL (e.g. `https://coffee-website-one-gamma.vercel.app`)

### 2. Fix Supabase redirect URLs
- Go to: https://supabase.com/dashboard/project/jepqvpvktmospvtphmha/auth/url-configuration
- Set **Site URL**: `https://coffee-website-one-gamma.vercel.app`
- Add **Redirect URL**: `https://coffee-website-one-gamma.vercel.app/**`

### 3. Test the live site
- Visit `/login` — try email signup and Google OAuth
- Visit `/menu` — verify products load from Supabase
- Add items to cart → checkout → confirm order goes to DB
- Check Supabase dashboard → Table Editor → `orders` table

### 4. Make yourself admin
- Sign up on the live site
- Go to: https://supabase.com/dashboard/project/jepqvpvktmospvtphmha/auth/users
- Copy your UUID
- Run in SQL Editor:
  ```sql
  UPDATE public.profiles SET role = 'admin' WHERE id = 'your-uuid';
  ```

---

## Phase 3 — What to tell Kiro next

```
Phase 3 from the AUDIT.md. Implement:

1. Payment integration (Stripe) — add Stripe checkout to the order flow
2. Order status tracking — real-time status updates on the account page
3. Add basic tests (Vitest + React Testing Library) for:
   - Cart context
   - API routes (products, orders, contact)
   - Checkout flow

Use existing Supabase backend. Don't break existing functionality.
```

## Phase 4 — What to tell Kiro after Phase 3

```
Phase 4 from the AUDIT.md. Implement:

1. Admin dashboard at /admin — order management (view all orders, update status)
2. Product CRUD for admins
3. Search functionality on the menu page
4. Performance: add ISR/SSG for products and locations pages

Use existing Supabase backend and RLS policies. Admin role is already in profiles table.
```

---

## Google OAuth — if it's not working

Make sure in Google Cloud Console:
- Authorized redirect URI is exactly: `https://jepqvpvktmospvtphmha.supabase.co/auth/v1/callback`
- OAuth consent screen is set to "External" and status is "Testing" or "Published"
- Your email is added as a test user (if still in Testing mode)
