import { createClient } from "@supabase/supabase-js";

// Read from Vite env. Set these in frontend/.env.local (and in Vercel project
// settings) once your Supabase project exists:
//   VITE_SUPABASE_URL=https://xxxx.supabase.co
//   VITE_SUPABASE_ANON_KEY=eyJ...   (the public "anon" key — safe in the client)
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when real Supabase credentials are present. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * The Supabase client, or null when not configured. When null, the app runs in
 * a local "demo" auth mode (see AuthContext) so the UI still works without keys.
 */
export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
