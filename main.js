/* Editorial/Magazine Landing — Main JS */
(function () {
  "use strict";

  /* ---- 1. Header scroll ---- */
  const header = document.getElementById("site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 60);
    }, { passive: true });
  }

  /* ---- 2. Mobile menu (slide-from-right) ---- */
  const menuBtn   = document.getElementById("mobile-menu-btn");
  const closeBtn  = document.getElementById("mobile-menu-close");
  const panel     = document.getElementById("mobile-panel");
  const overlay   = document.getElementById("mobile-overlay");

  function openMenu() {
    if (!panel) return;
    panel.classList.add("open");
    document.body.classList.add("overflow-hidden");
    if (overlay) overlay.classList.remove("hidden");
  }

  function closeMenu() {
    if (!panel) return;
    panel.classList.remove("open");
    document.body.classList.remove("overflow-hidden");
    if (overlay) overlay.classList.add("hidden");
  }

  if (menuBtn)  menuBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay)  overlay.addEventListener("click", closeMenu);

  if (panel) {
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---- 3. Cookie consent ---- */
  document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("cookie-consent")) return;
    var banner = document.getElementById("cookie-banner");
    if (!banner) return;

    setTimeout(function () {
      banner.classList.remove("hidden");
    }, 800);

    var acceptBtn = document.getElementById("cookie-accept");
    var rejectBtn = document.getElementById("cookie-reject");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        localStorage.setItem("cookie-consent", "all");
        banner.classList.add("hidden");
        console.log("Analytics loaded");
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener("click", function () {
        localStorage.setItem("cookie-consent", "necessary");
        banner.classList.add("hidden");
      });
    }
  });

  /* ---- 4. Scroll animations (fade-in only) ---- */
  document.addEventListener("DOMContentLoaded", function () {
    var items = document.querySelectorAll("[data-animate]");
    if (!items.length) return;

    items.forEach(function (el) { el.classList.add("animate-hidden"); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
          entry.target.classList.remove("animate-hidden");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(function (el) { observer.observe(el); });
  });

  /* ---- 5. Smooth scroll for anchor links ---- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href");
    if (id.length < 2) return;
    var target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.pageYOffset - 120;
    window.scrollTo({ top: top, behavior: "smooth" });
  });
})();
