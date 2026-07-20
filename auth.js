const cfg = window.BL_CONFIG;
const configured = cfg && !cfg.SUPABASE_URL.includes("SEU-PROJETO") && !cfg.SUPABASE_ANON_KEY.includes("SUA_CHAVE");
const supabase = configured ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;

async function requireAuth() {
  if (!configured) return location.replace("login.html?setup=1");
  const { data } = await supabase.auth.getSession();
  if (!data.session) location.replace(`login.html?next=${encodeURIComponent(location.pathname.split('/').pop() || 'index.html')}`);
  return data.session;
}
async function signOut() { await supabase.auth.signOut(); location.replace("login.html"); }
function photoUrl(path) { return supabase.storage.from("trip-photos").createSignedUrl(path, 3600).then(r => r.data?.signedUrl || ""); }
