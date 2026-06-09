-- Leads table for contact form submissions
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  project_type text,
  budget      text,
  timeline    text,
  message     text,
  status      text not null default 'new'
                check (status in ('new','contacted','quoted','won','lost','archived')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at
  before update on public.leads
  for each row execute procedure public.set_updated_at();

-- Row Level Security
alter table public.leads enable row level security;

-- Authenticated admin can do anything
create policy "Admin full access"
  on public.leads
  for all
  using (auth.role() = 'authenticated');

-- Anonymous users can INSERT only (public contact form)
create policy "Public can submit lead"
  on public.leads
  for insert
  with check (true);

-- Index for dashboard queries
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
