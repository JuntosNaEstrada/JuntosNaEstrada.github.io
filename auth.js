const cfg = window.BL_CONFIG;
const configured = cfg && !cfg.SUPABASE_URL.includes("SEU-PROJETO") && !cfg.SUPABASE_ANON_KEY.includes("SUA_CHAVE");
const blSupabase = configured ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;

async function requireAuth() {
  if (!configured) return location.replace("login.html?setup=1");
  const { data } = await blSupabase.auth.getSession();
  if (!data.session) {
    location.replace(`login.html?next=${encodeURIComponent(location.pathname.split('/').pop() || 'index.html')}`);
    return null;
  }
  return data.session;
}
async function signOut() { await blSupabase.auth.signOut(); location.replace("login.html"); }
function photoUrl(path) { return blSupabase.storage.from("trip-photos").createSignedUrl(path, 3600).then(r => r.data?.signedUrl || ""); }
