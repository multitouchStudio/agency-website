(function () {
  // Mobile nav toggle
  const toggle = document.querySelector(".mobile-nav-toggle");
  const nav = document.getElementById("mobile-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.style.display = expanded ? "none" : "block";
    });

    nav.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.style.display = "none";
      }
    });
  }

  // Card-level scroll animation removed to prevent any perceived background shifts.

  const yearTarget = document.getElementById("current-year");
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
})();


  (function () {
    const form = document.getElementById("project-inquiry-form");
    const statusEl = document.getElementById("form-status");
    if (!form || !statusEl) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      statusEl.textContent = "Sending…";
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          statusEl.textContent = "Thanks — your inquiry was sent. We’ll reply within 1–2 business days.";
          form.reset();
        } else {
          statusEl.textContent = "Something went wrong. Please email elli@multitouch.studio.";
        }
      } catch (err) {
        statusEl.textContent = "Network error. Please email elli@multitouch.studio.";
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  })();
