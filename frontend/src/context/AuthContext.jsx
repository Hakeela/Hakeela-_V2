import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

const AuthContext = createContext(null);

const DEMO_KEY = "hak_demo_user";

/**
 * Auth for the student/learner portal.
 * - When Supabase is configured, uses real Supabase Auth + the `profiles` table.
 * - When not configured, falls back to a local demo mode so the UI still works.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---- profile loader (real mode) ----
  const loadProfile = useCallback(async (uid) => {
    if (!uid) return setProfile(null);
    const { data } = await supabase.from("profiles").select("*").eq("id", uid).single();
    setProfile(data || null);
  }, []);

  useEffect(() => {
    let sub;
    (async () => {
      if (isSupabaseConfigured) {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user ?? null);
        if (data.session?.user) await loadProfile(data.session.user.id);
        const res = supabase.auth.onAuthStateChange((_e, session) => {
          setUser(session?.user ?? null);
          if (session?.user) loadProfile(session.user.id);
          else setProfile(null);
        });
        sub = res.data.subscription;
      } else {
        // demo mode — restore any fake session
        const raw = localStorage.getItem(DEMO_KEY);
        if (raw) {
          const u = JSON.parse(raw);
          setUser(u);
          setProfile(u.profile);
        }
      }
      setLoading(false);
    })();
    return () => sub?.unsubscribe?.();
  }, [loadProfile]);

  // ---- actions ----
  const signIn = useCallback(async ({ email, password }) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message || null };
    }
    // demo
    const u = { id: "demo", email, profile: { id: "demo", full_name: email.split("@")[0], role: "student" } };
    localStorage.setItem(DEMO_KEY, JSON.stringify(u));
    setUser(u); setProfile(u.profile);
    return { error: null };
  }, []);

  const signUp = useCallback(async ({ email, password, meta }) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: meta },
      });
      if (error) return { error: error.message, needsConfirmation: false };
      // If email confirmation is on, there's no session yet.
      return { error: null, needsConfirmation: !data.session };
    }
    // demo
    const u = { id: "demo", email, profile: { id: "demo", full_name: meta?.full_name || email.split("@")[0], role: "student" } };
    localStorage.setItem(DEMO_KEY, JSON.stringify(u));
    setUser(u); setProfile(u.profile);
    return { error: null, needsConfirmation: false };
  }, []);

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    else { localStorage.removeItem(DEMO_KEY); setUser(null); setProfile(null); }
  }, []);

  const requestPasswordReset = useCallback(async (email) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error: error?.message || null };
    }
    return { error: null };
  }, []);

  const verifyResetOtp = useCallback(async (email, token) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: String(token).trim(),
        type: "recovery",
      });
      return { error: error?.message || null };
    }
    return { error: null };
  }, []);

  const updatePassword = useCallback(async (password) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.updateUser({ password });
      return { error: error?.message || null };
    }
    return { error: null };
  }, []);

  // Finalize an invited account: set the password + save details to user metadata.
  const completeInvite = useCallback(async ({ password, meta }) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.updateUser({ password, data: meta });
      if (error) return { error: error.message };
      if (user) await loadProfile(user.id);
      return { error: null };
    }
    return { error: null };
  }, [user, loadProfile]);

  const refreshProfile = useCallback(async () => {
    if (isSupabaseConfigured && user) await loadProfile(user.id);
  }, [user, loadProfile]);

  const value = {
    user,
    profile,
    loading,
    demo: !isSupabaseConfigured,
    isAuthenticated: !!user,
    refreshProfile,
    signIn,
    signUp,
    signOut,
    requestPasswordReset,
    verifyResetOtp,
    updatePassword,
    completeInvite,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
