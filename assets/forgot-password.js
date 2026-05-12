(() => {
  const form = document.getElementById("resetForm");
  const email = document.getElementById("email");
  const submitBtn = document.getElementById("submitBtn");
  const emailError = document.getElementById("emailError");
  const formError = document.getElementById("formError");
  const successMsg = document.getElementById("successMsg");

  function setText(el, text) {
    if (!el) return;
    el.textContent = text || "";
  }

  function validate() {
    const e = (email.value || "").trim();
    setText(emailError, "");
    setText(formError, "");
    setText(successMsg, "");
    if (!e) {
      setText(emailError, "Email is required.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(e)) {
      setText(emailError, "Enter a valid email.");
      return false;
    }
    return true;
  }

  form?.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    const e = email.value.trim();
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send reset link";
      setText(formError, "");
      setText(
        successMsg,
        `If an account exists for ${e}, you’ll receive an email with password reset instructions.`
      );
    }, 350);
  });
})();

