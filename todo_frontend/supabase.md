# Supabase Configuration for Todo App

## Supabase Project
- **URL:** https://rdjzmoeeanmboktgnpyv.supabase.co

## Table: `todos`
The main table for user to-do tasks.

| Column      | Type      | Description                                    | Default                     |
|-------------|-----------|------------------------------------------------|-----------------------------|
| id          | uuid      | Primary key, unique todo identifier            | gen_random_uuid()           |
| user_id     | uuid      | References auth.users(id), task owner          |                             |
| title       | text      | Description of the to-do item                  |                             |
| completed   | boolean   | Whether the task is completed                  | false                       |
| created_at  | timestamptz | Row creation time                           | now()                       |
| updated_at  | timestamptz | Last update time                            | now()                       |

- The table uses `user_id` to associate tasks to the specific signed-in user.

## Row Level Security (RLS)
Enabled - Each user can only access their own todos.

### Policies:

- **Read:** Only owner can select
- **Insert:** Only if user_id matches authenticated user
- **Update:** Only if user_id matches authenticated user
- **Delete:** Only if user_id matches authenticated user

## Schema SQL applied

```sql
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  title text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.todos enable row level security;

create policy "Users can read their own todos" on public.todos
  for select using (auth.uid() = user_id);

create policy "Users can insert their own todos" on public.todos
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own todos" on public.todos
  for update using (auth.uid() = user_id);

create policy "Users can delete their own todos" on public.todos
  for delete using (auth.uid() = user_id);
```

## Notes

- Users must be authenticated to create, read, update, or delete any todos.
- Only the owner can view or modify their own todos.
