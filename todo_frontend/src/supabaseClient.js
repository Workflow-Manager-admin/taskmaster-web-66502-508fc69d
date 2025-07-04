import { createClient } from '@supabase/supabase-js';

/**
 * Configure Supabase client for the frontend.
 *
 * Uses environment variables REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY if set.
 * Falls back to the project values as a safety net for local/dev.
 * 
 * If you deploy, always set these variables in your deployment environment for security.
 * 
 * REQUIRED for working configuration:
 * REACT_APP_SUPABASE_URL=https://rdjzmoeeanmboktgnpyv.supabase.co
 * REACT_APP_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkanptb2VlYW5tYm9rdGducHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MjE4MDMsImV4cCI6MjA2NzE5NzgwM30.t1UPoi9_4buVZMUy1WSR2FejOOLjWSfalaIsoqtXft4
 */

const SUPABASE_URL =
  process.env.REACT_APP_SUPABASE_URL ||
  'https://rdjzmoeeanmboktgnpyv.supabase.co'; // fallback to correct URL

const SUPABASE_KEY =
  process.env.REACT_APP_SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkanptb2VlYW5tYm9rdGducHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MjE4MDMsImV4cCI6MjA2NzE5NzgwM30.t1UPoi9_4buVZMUy1WSR2FejOOLjWSfalaIsoqtXft4'; // fallback to correct Key

// PUBLIC_INTERFACE
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
