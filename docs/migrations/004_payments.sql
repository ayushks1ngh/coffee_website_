-- Phase 3: Add payment fields and enable realtime
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_id TEXT,
  ADD COLUMN IF NOT EXISTS payment_provider TEXT; -- 'stripe' | 'razorpay'

-- Enable realtime for orders table (for live status tracking)
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- Make user admin (replace with your UUID)
UPDATE public.profiles SET role = 'admin' WHERE id = '3b44d151-ba31-447e-b54c-6fef7bca3ff8';
