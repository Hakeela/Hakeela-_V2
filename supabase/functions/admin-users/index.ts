// Supabase Edge Function: admin-users
// Privileged staff operations that require the service role and therefore
// cannot run from the browser: inviting staff and deleting user accounts.
//
// Security: the caller's JWT is verified and their profile role must be 'admin'.
//
// Deploy:
//   supabase functions deploy admin-users
// (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

    // 1) Identify + authorize the caller
    const jwt = (req.headers.get("Authorization") || "").replace("Bearer ", "");
    if (!jwt) return json({ error: "Missing authorization" }, 401);
    const { data: caller, error: authErr } = await admin.auth.getUser(jwt);
    if (authErr || !caller?.user) return json({ error: "Unauthorized" }, 401);

    const { data: profile } = await admin
      .from("profiles").select("role").eq("id", caller.user.id).single();
    if (profile?.role !== "admin") return json({ error: "Admin access required" }, 403);

    // 2) Perform the requested action
    const { action, email, role, full_name, userId } = await req.json();

    if (action === "invite") {
      if (!email) return json({ error: "email is required" }, 400);
      const { data, error } = await admin.auth.admin.inviteUserByEmail(email, { data: { full_name } });
      if (error) return json({ error: error.message }, 400);
      // The signup trigger creates a 'student' profile; promote to the chosen role.
      await admin.from("profiles")
        .update({ role: role === "Admin" ? "admin" : "staff", full_name, email })
        .eq("id", data.user.id);
      return json({ ok: true, id: data.user.id });
    }

    if (action === "delete") {
      if (!userId) return json({ error: "userId is required" }, 400);
      if (userId === caller.user.id) return json({ error: "You cannot delete your own account" }, 400);
      const { error } = await admin.auth.admin.deleteUser(userId);
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
