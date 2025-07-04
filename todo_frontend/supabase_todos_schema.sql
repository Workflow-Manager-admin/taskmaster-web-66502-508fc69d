-- PUBLIC_INTERFACE
-- Supabase SQL for the 'todos' table required by the frontend app

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  title text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- To enable Supabase RLS so each user can only access their own todos:
alter table public.todos enable row level security;

create policy "Users can read their own todos" on public.todos
  for select using (auth.uid() = user_id);

create policy "Users can insert their own todos" on public.todos
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own todos" on public.todos
  for update using (auth.uid() = user_id);

create policy "Users can delete their own todos" on public.todos
  for delete using (auth.uid() = user_id);
