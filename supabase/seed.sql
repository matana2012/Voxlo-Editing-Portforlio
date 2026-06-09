-- Run this in your Supabase SQL Editor to create the admin user.
-- Replace the password with your actual password before running.
--
-- NOTE: This uses the Supabase auth admin API. The easiest way to create
-- the admin user is via the Supabase Dashboard → Authentication → Users → Add User.
--
-- Admin credentials:
--   Email:    griersonanakin@gmail.com
--   Password: (set in Supabase Dashboard → Auth → Users)
--
-- After creating the user in the dashboard, they can log in at /dashboard/login

-- Optional: seed a test lead to verify the dashboard is working
insert into public.leads (name, email, project_type, budget, timeline, message, status)
values (
  'Test Client',
  'test@example.com',
  'YouTube long-form',
  '$500 – $1k',
  '2 – 4 weeks',
  'This is a test lead to verify the dashboard is working correctly.',
  'new'
);
