// Load the shared navigation and footer on every page.
document.addEventListener("DOMContentLoaded", async () => {
  const savedTheme = (() => {
    try {
      return localStorage.getItem("portfolio-theme");
    } catch {
      return null;
    }
  })();

  if (savedTheme === "dark") {
    document.documentElement.dataset.theme = "dark";
  }

  async function loadSharedContent(targetId, file) {
    const target = document.getElementById(targetId);
    if (!target) return false;

    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Could not load ${file}: ${response.status}`);
      target.innerHTML = await response.text();
      return true;
    } catch (error) {
      console.error("Failed to load shared page content:", error);
      return false;
    }
  }

  if (await loadSharedContent("header-container", "header.html")) {
    const page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((link) => {
      if (link.getAttribute("href") === page) {
        link.setAttribute("aria-current", "page");
      }
    });

    const themeButton = document.getElementById("dark-mode-toggle");
    function updateThemeButton() {
      const dark = document.documentElement.dataset.theme === "dark";
      themeButton.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      themeButton.setAttribute("aria-pressed", String(dark));
    }
    if (themeButton) {
      updateThemeButton();
      themeButton.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("portfolio-theme", next);
        } catch {
          // Browsers may block storage. The theme still works for this page.
        }
        updateThemeButton();
      });
    }
  }

  if (await loadSharedContent("footer-container", "footer.html")) {
    const year = document.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  // Create one accessible Back to top button (rather than duplicating IDs).
  const backToTop = document.createElement("button");
  backToTop.type = "button";
  backToTop.id = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.textContent = "↑";
  document.body.appendChild(backToTop);

  function updateBackToTop() {
    backToTop.classList.toggle("is-visible", window.scrollY > 280);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});