(() => {
  // Return to login with a fresh form: login.html?logout=1
  const paramsBoot = new URLSearchParams(window.location.search);
  if (paramsBoot.get("logout") === "1") {
    window.KKAuth?.clearAuth?.();
    const file = window.location.pathname.split("/").pop() || "login.html";
    window.history.replaceState({}, "", file);
  }

  // If already logged in, go to dashboard
  if (window.KKAuth?.isAuthed?.()) {
    window.location.replace("dashboard.html");
    return;
  }

  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const rememberMe = document.getElementById("rememberMe");
  const submitBtn = document.getElementById("submitBtn");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const formError = document.getElementById("formError");

  const fillDemo = document.getElementById("fillDemo");
  const togglePassword = document.getElementById("togglePassword");
  const forgotLink = document.getElementById("forgotLink");

  function setText(el, text) {
    if (!el) return;
    el.textContent = text || "";
  }

  function validate() {
    const e = (email.value || "").trim();
    const p = password.value || "";

    let ok = true;
    setText(emailError, "");
    setText(passwordError, "");
    setText(formError, "");

    if (!e) {
      ok = false;
      setText(emailError, "Email is required.");
    } else if (!/^\S+@\S+\.\S+$/.test(e)) {
      ok = false;
      setText(emailError, "Enter a valid email.");
    }

    if (!p) {
      ok = false;
      setText(passwordError, "Password is required.");
    } else if (p.length < 8) {
      ok = false;
      setText(passwordError, "Password must be at least 8 characters.");
    } else if (!/[a-z]/.test(p) || !/[A-Z]/.test(p) || !/[0-9]/.test(p) || !/[^\w\s]/.test(p)) {
      ok = false;
      setText(
        passwordError,
        "Password must include uppercase, lowercase, number, and special character."
      );
    }

    return ok;
  }

  function nextTarget() {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    if (!next) return "dashboard.html";
    // allow only same-folder targets
    if (next.includes("/") || next.includes("\\") || next.includes("..")) return "dashboard.html";
    return next;
  }

  function setSubmitting(isSubmitting) {
    submitBtn.disabled = isSubmitting;
    submitBtn.textContent = isSubmitting ? "Signing in…" : "Sign in";
  }

  fillDemo?.addEventListener("click", () => {
    email.value = "user@example.com";
    password.value = "Kisan@1234";
    email.focus();
  });

  // Forgot password is now a real page (no red error line).
  // Keep JS handler only if link is missing/misconfigured.
  forgotLink?.addEventListener("click", () => {
    // allow normal navigation
    setText(formError, "");
  });

  togglePassword?.addEventListener("click", () => {
    const isHidden = password.type === "password";
    password.type = isHidden ? "text" : "password";
    togglePassword.textContent = isHidden ? "Hide" : "Show";
    togglePassword.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // No backend yet — we accept any credentials that pass validation.
    window.KKAuth.login(email.value.trim(), !!rememberMe.checked);

    window.location.replace(nextTarget());
  });
})();

