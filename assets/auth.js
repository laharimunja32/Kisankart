(() => {
  const AUTH_KEY = "kisankart_auth_v1";

  function nowIso() {
    return new Date().toISOString();
  }

  function setAuth(auth, persist) {
    const payload = { ...auth, updatedAt: nowIso() };
    const storage = persist ? localStorage : sessionStorage;
    storage.setItem(AUTH_KEY, JSON.stringify(payload));
    if (persist) sessionStorage.removeItem(AUTH_KEY);
    if (!persist) localStorage.removeItem(AUTH_KEY);
  }

  function clearAuth() {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
  }

  function getAuth() {
    const raw = sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      clearAuth();
      return null;
    }
  }

  function isAuthed() {
    const a = getAuth();
    return !!(a && a.token && a.email);
  }

  function requireAuth({ redirectTo = "login.html" } = {}) {
    if (!isAuthed()) {
      const next = encodeURIComponent(window.location.pathname.split("/").pop() || "dashboard.html");
      window.location.replace(`${redirectTo}?next=${next}`);
    }
  }

  function bestNameFromEmail(email) {
    const left = (email || "").split("@")[0] || "";
    const cleaned = left.replace(/[._-]+/g, " ").trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (!parts.length) return "User";
    return parts
      .slice(0, 2)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(" ");
  }

  function makeToken() {
    // Not a security token; just a demo session id.
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    return `kk_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
  }

  function login(email, remember) {
    const e = (email || "").trim();
    setAuth(
      {
        email: e,
        name: bestNameFromEmail(e),
        token: makeToken(),
      },
      remember
    );

    return { ok: true };
  }

  window.KKAuth = {
    getAuth,
    isAuthed,
    requireAuth,
    login,
    clearAuth,
  };
})();

