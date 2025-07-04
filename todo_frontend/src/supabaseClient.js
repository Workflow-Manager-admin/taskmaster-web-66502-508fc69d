import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://rdjzmoeeanmboktgnpyv.supabase.co';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkanptb2VlYW5tYm9rdGducHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2Mjg4MDMsImV4cCI6MjA2NzE5NzgwM30.t1UPoi9_4buVZMUy1WSR2FejOOLjWSfalaIsoqtXft4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
