# Supabase Setup for API Keys

Follow these steps to connect the API Keys dashboard to your Supabase database.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project (or use an existing one)
3. Wait for the project to finish provisioning

## 2. Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Create a new query and paste the contents of `supabase/migrations/001_create_api_keys.sql`
3. Run the query to create the `api_keys` table

Alternatively, if you have the Supabase CLI installed:

```bash
supabase db push
```

## 3. Add Environment Variables

Create or update `.env.local` in the **project root** (not in `app/`) with:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Find these values in Supabase: **Project Settings** → **API** → **Project URL** and **anon public** key.

## 4. Install Dependencies

```bash
npm install
```

## 5. Restart the Dev Server

```bash
npm run dev
```

Your API keys will now be stored in Supabase instead of localStorage.
