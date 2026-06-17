/* ============================================================
   BLUSH NAIL BEAUTY — Main Script
   Pure ES6+, no framework, no external API dependencies.
   All business configuration lives in config.js → SITE_CONFIG.
   ============================================================ */

if (typeof SITE_CONFIG === "undefined") {
    console.error("[BlushNailBeauty] config.js must be loaded before script.js");
}

// ============================================================
// UTILITIES
// ============================================================

function buildWhatsAppURL(message) {
    const number = SITE_CONFIG?.business?.whatsappNumber ?? "";
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
}

function formatDate(isoDate) {
    if (!isoDate) return isoDate;
    const parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;
    return parts[2] + "." + parts[1] + "." + parts[0];
}

// ============================================================
// WHATSAPP LINKS — set all hrefs from SITE_CONFIG
// ============================================================
function initWhatsAppLinks() {
    // Hero CTAs
    document.querySelectorAll(".js-whatsapp-hero").forEach(function(btn) {
        btn.href = buildWhatsAppURL("Merhaba Blush Nail Beauty, randevu almak istiyorum.");
    });

    // Service card buttons — each carries data-service attribute
    document.querySelectorAll(".js-whatsapp-service").forEach(function(btn) {
        var service = btn.dataset.service || "";
        btn.href = buildWhatsAppURL(
            "Merhaba Blush Nail Beauty,\n" + service + " hizmeti için randevu almak istiyorum."
        );
    });

    // Floating WhatsApp button
    var floatBtn = document.querySelector(".js-whatsapp-float");
    if (floatBtn) {
        floatBtn.href = buildWhatsAppURL("Merhaba Blush Nail Beauty, bilgi almak istiyorum.");
    }
}

// ============================================================
// NAVIGATION — mobile hamburger toggle + outside-click close
// ============================================================
function initNav() {
    var toggle   = document.querySelector(".nav-toggle");
    var menu     = document.querySelector(".nav-links");
    var navLinks = document.querySelectorAll(".nav-link");
    var navCta   = document.querySelector(".nav-cta");

    if (!toggle || !menu) return;

    function closeMenu() {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("nav-links--open");
    }

    toggle.addEventListener("click", function() {
        var isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        menu.classList.toggle("nav-links--open", !isOpen);
    });

    navLinks.forEach(function(link) { link.addEventListener("click", closeMenu); });
    if (navCta) navCta.addEventListener("click", closeMenu);

    // Close on outside click
    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            closeMenu();
        }
    });
}

// ============================================================
// NAVIGATION — glass/blur effect on scroll
// ============================================================
function initNavScroll() {
    var header = document.querySelector(".nav-header");
    if (!header) return;
    function update() {
        header.classList.toggle("nav-header--scrolled", window.scrollY > 40);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
}

// ============================================================
// SCROLL REVEAL — IntersectionObserver, respects prefers-reduced-motion
// ============================================================
function initScrollReveal() {
    var elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach(function(el) { el.classList.add("revealed"); });
        return;
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    elements.forEach(function(el) { observer.observe(el); });
}

// ============================================================
// GALLERY — fallback handler when local images are missing
// ============================================================
function initGalleryFallback() {
    document.querySelectorAll(".gallery-item__img").forEach(function(img) {
        function markFallback() {
            var item = img.closest(".gallery-item");
            if (item) item.classList.add("gallery-item--fallback");
        }
        // Image might have already failed before this script runs
        if (img.complete && img.naturalWidth === 0) {
            markFallback();
        } else {
            img.addEventListener("error", markFallback);
        }
    });
}

// ============================================================
// APPOINTMENT FORM — builds and sends WhatsApp message
// ============================================================
function initAppointmentForm() {
    var form = document.getElementById("appointment-form");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }

        var name    = form.elements["name"].value.trim();
        var phone   = form.elements["phone"].value.trim();
        var service = form.elements["service"].value;
        var date    = form.elements["date"].value;
        var time    = form.elements["time"].value;
        var note    = form.elements["note"].value.trim();

        var lines = [
            "Merhaba Blush Nail Beauty,",
            "Randevu almak istiyorum.",
            "",
            "Ad Soyad: " + name,
            "Telefon: " + phone,
            "Hizmet: " + service,
            "Tarih: " + formatDate(date),
            "Saat: " + time
        ];
        if (note) lines.push("Not: " + note);

        window.open(buildWhatsAppURL(lines.join("\n")), "_blank", "noopener,noreferrer");
    });
}

// ============================================================
// ACTIVE NAV LINK — highlight section in viewport
// ============================================================
function initActiveNav() {
    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll(".nav-link");
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            navLinks.forEach(function(link) {
                link.classList.toggle(
                    "nav-link--active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        });
    }, { rootMargin: "-30% 0px -60% 0px" });

    sections.forEach(function(s) { observer.observe(s); });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", function() {
    initWhatsAppLinks();
    initNav();
    initNavScroll();
    initScrollReveal();
    initGalleryFallback();
    initAppointmentForm();
    initActiveNav();
});
