(() => {
  window.KKAuth.requireAuth({ redirectTo: "login.html" });

  const auth = window.KKAuth.getAuth();
  const userPill = document.getElementById("userPill");
  const logoutBtn = document.getElementById("logoutBtn");

  if (userPill) {
    const label = auth?.name ? `${auth.name} • ${auth.email}` : auth?.email || "Signed in";
    userPill.textContent = label;
  }

  logoutBtn?.addEventListener("click", () => {
    window.KKAuth.clearAuth();
    window.location.replace("login.html");
  });

  document.querySelectorAll(".category-card").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
})();

