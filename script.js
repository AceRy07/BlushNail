/* ============================================================
   BLUSH NAIL BEAUTY — Main Script
   Pure ES6+, no framework dependencies.
   All configurable values live in config.js → SITE_CONFIG.
   ============================================================ */

// Guard: SITE_CONFIG must be loaded before this script.
if (typeof SITE_CONFIG === "undefined") {
    console.error("[Blush] config.js must be loaded before script.js");
}

// ============================================================
// UTILITIES
// ============================================================

/**
 * Builds a wa.me URL with a pre-filled message.
 * Uses SITE_CONFIG.business.whatsappNumber set in config.js.
 * @param {string} message - Plain text message to encode.
 * @returns {string} Full wa.me URL.
 */
function buildWhatsAppURL(message) {
    const number = SITE_CONFIG?.business?.whatsappNumber ?? "";
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Smooth scroll to an element with a slight offset for the fixed nav.
 * @param {string} id - Element ID (without #).
 */
function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ============================================================
// WHATSAPP LINKS — set all href values from the WHATSAPP_NUMBER
// constant so nothing is hard-coded in HTML.
// ============================================================
function initWhatsAppLinks() {
    // Hero CTA
    const heroBtn = document.querySelector(".js-whatsapp-hero");
    if (heroBtn) {
        heroBtn.href = buildWhatsAppURL("Merhaba! Randevu almak istiyorum.");
    }

    // Service-card "WhatsApp'tan Sor" buttons
    document.querySelectorAll(".js-whatsapp-service").forEach((btn) => {
        const service = btn.dataset.service || "";
        const msg = `Merhaba! "${service}" hizmeti hakkında bilgi almak istiyorum.`;
        btn.href = buildWhatsAppURL(msg);
    });

    // Floating WhatsApp button
    const floatBtn = document.querySelector(".js-whatsapp-float");
    if (floatBtn) {
        floatBtn.href = buildWhatsAppURL("Merhaba! Size ulaşmak istedim.");
    }
}

// ============================================================
// NAVIGATION — mobile toggle
// ============================================================
function initNav() {
    const toggle  = document.querySelector(".nav-toggle");
    const menu    = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        menu.classList.toggle("nav-links--open", !isOpen);
    });

    // Close on any nav link click (mobile UX)
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            toggle.setAttribute("aria-expanded", "false");
            menu.classList.remove("nav-links--open");
        });
    });

    // Also close on appointment CTA click inside nav
    const navCta = document.querySelector(".nav-cta");
    navCta?.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("nav-links--open");
    });
}

// ============================================================
// NAVIGATION — add scrolled class for backdrop-blur background
// ============================================================
function initNavScroll() {
    const header = document.querySelector(".nav-header");
    if (!header) return;

    const update = () => {
        header.classList.toggle("nav-header--scrolled", window.scrollY > 40);
    };

    // Initialise immediately in case page is loaded mid-scroll
    update();
    window.addEventListener("scroll", update, { passive: true });
}

// ============================================================
// SHADE SWATCHES — click → smooth scroll to service card + highlight
// ============================================================
function initSwatches() {
    document.querySelectorAll(".swatch").forEach((swatch) => {
        swatch.addEventListener("click", () => {
            const targetId = swatch.dataset.target;
            if (!targetId) return;

            const card = document.getElementById(targetId);
            if (!card) return;

            card.scrollIntoView({ behavior: "smooth", block: "center" });

            // Remove any existing highlight class first (so re-trigger works)
            card.classList.remove("service-card--highlight");

            // Force reflow so the animation restarts cleanly
            void card.offsetWidth;

            card.classList.add("service-card--highlight");
            card.addEventListener(
                "animationend",
                () => card.classList.remove("service-card--highlight"),
                { once: true }
            );
        });
    });
}

// ============================================================
// SCROLL REVEAL — IntersectionObserver
// ============================================================
function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    // Check prefers-reduced-motion; skip observer if true
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach((el) => el.classList.add("revealed"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    elements.forEach((el) => observer.observe(el));
}

// ============================================================
// APPOINTMENT FORM — build a WhatsApp message and open wa.me
// ============================================================
function initAppointmentForm() {
    const form = document.getElementById("appointment-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validate using built-in HTML5 constraint API
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const name    = form.elements["name"].value.trim();
        const service = form.elements["service"].value;
        const date    = form.elements["date"].value;
        const time    = form.elements["time"].value;
        const note    = form.elements["note"].value.trim();

        // Format date as DD.MM.YYYY for readability in the message
        const dateFormatted = formatDate(date);

        const lines = [
            "Merhaba! Randevu talep etmek istiyorum.",
            `İsim: ${name}`,
            `Hizmet: ${service}`,
            `Tarih: ${dateFormatted}`,
            `Saat: ${time}`,
        ];

        if (note) {
            lines.push(`Not: ${note}`);
        }

        const message = lines.join("\n");
        window.open(buildWhatsAppURL(message), "_blank", "noopener,noreferrer");
    });
}

/**
 * Converts an ISO date string (YYYY-MM-DD) to DD.MM.YYYY.
 * Returns the original string if parsing fails.
 * @param {string} isoDate
 * @returns {string}
 */
function formatDate(isoDate) {
    if (!isoDate) return isoDate;
    const parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;
    const [year, month, day] = parts;
    return `${day}.${month}.${year}`;
}

/**
 * Builds a star string (★) for a given rating out of 5.
 * @param {number} rating
 * @returns {string}
 */
function buildStars(rating) {
    const full  = Math.round(rating);
    const empty = 5 - full;
    return "★".repeat(Math.max(0, full)) + "☆".repeat(Math.max(0, empty));
}

/**
 * Safely escapes a string for use in HTML text content.
 * Returns a DocumentFragment via a text node — no innerHTML used.
 * @param {string} str
 * @returns {string} Escaped string.
 */
function escapeHTML(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str ?? ""));
    return div.innerHTML;
}

// ============================================================
// WHATSAPP LINKS — populate all hrefs from config
// ============================================================
function initWhatsAppLinks() {
    const heroBtn = document.querySelector(".js-whatsapp-hero");
    if (heroBtn) {
        heroBtn.href = buildWhatsAppURL("Merhaba! Randevu almak istiyorum.");
    }

    document.querySelectorAll(".js-whatsapp-service").forEach((btn) => {
        const service = btn.dataset.service || "";
        btn.href = buildWhatsAppURL(`Merhaba! "${service}" hizmeti hakkında bilgi almak istiyorum.`);
    });

    const floatBtn = document.querySelector(".js-whatsapp-float");
    if (floatBtn) {
        floatBtn.href = buildWhatsAppURL("Merhaba! Size ulaşmak istedim.");
    }
}

// ============================================================
// DYNAMIC BUSINESS INFO — address, phone, hours from config
// ============================================================
function initBusinessInfo() {
    const biz = SITE_CONFIG?.business;
    if (!biz) return;

    // Address — location section
    if (biz.address) {
        const locAddr = document.getElementById("loc-address");
        if (locAddr) {
            locAddr.innerHTML = escapeHTML(biz.address).replace(/\n/g, "<br>");
        }
        const footerAddr = document.getElementById("footer-address-text");
        if (footerAddr) {
            footerAddr.textContent = biz.address;
            footerAddr.classList.remove("site-footer__todo");
        }
    }

    // Phone — location section + footer
    if (biz.phone) {
        const locPhone = document.getElementById("loc-phone");
        if (locPhone) {
            locPhone.innerHTML = `<a href="tel:${escapeHTML(biz.phone.replace(/\s/g, ""))}" class="location__ig-link">${escapeHTML(biz.phone)}</a>`;
            locPhone.classList.remove("mono-label", "location__todo");
        }
        const footerPhone = document.getElementById("footer-phone-text");
        if (footerPhone) {
            footerPhone.textContent = biz.phone;
            footerPhone.classList.remove("site-footer__todo");
        }
    }

    // Hours table
    if (biz.hours && biz.hours.length > 0) {
        const tbody = document.getElementById("hours-tbody");
        if (tbody) {
            tbody.innerHTML = biz.hours
                .map(
                    (row) =>
                        `<tr>
                            <th class="hours-table__day" scope="row">${escapeHTML(row.days)}</th>
                            <td class="hours-table__time mono-label">${escapeHTML(row.time)}</td>
                        </tr>`
                )
                .join("");
        }
    }
}

// ============================================================
// NAVIGATION — mobile hamburger toggle
// ============================================================
function initNav() {
    const toggle   = document.querySelector(".nav-toggle");
    const menu     = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        menu.classList.toggle("nav-links--open", !isOpen);
    });

    const close = () => {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("nav-links--open");
    };

    navLinks.forEach((link) => link.addEventListener("click", close));
    document.querySelector(".nav-cta")?.addEventListener("click", close);
}

// ============================================================
// NAVIGATION — backdrop-blur when scrolled
// ============================================================
function initNavScroll() {
    const header = document.querySelector(".nav-header");
    if (!header) return;
    const update = () => header.classList.toggle("nav-header--scrolled", window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
}

// ============================================================
// SHADE SWATCHES — scroll to service card + highlight
// ============================================================
function initSwatches() {
    document.querySelectorAll(".swatch").forEach((swatch) => {
        swatch.addEventListener("click", () => {
            const card = document.getElementById(swatch.dataset.target ?? "");
            if (!card) return;

            card.scrollIntoView({ behavior: "smooth", block: "center" });
            card.classList.remove("service-card--highlight");
            void card.offsetWidth; // force reflow
            card.classList.add("service-card--highlight");
            card.addEventListener("animationend", () => card.classList.remove("service-card--highlight"), { once: true });
        });
    });
}

// ============================================================
// SCROLL REVEAL — IntersectionObserver (with reduced-motion guard)
// ============================================================
function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach((el) => el.classList.add("revealed"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
}

// ============================================================
// APPOINTMENT FORM — compose WhatsApp message from fields
// ============================================================
function initAppointmentForm() {
    const form = document.getElementById("appointment-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }

        const name    = form.elements["name"].value.trim();
        const service = form.elements["service"].value;
        const date    = form.elements["date"].value;
        const time    = form.elements["time"].value;
        const note    = form.elements["note"].value.trim();

        const lines = [
            "Merhaba! Randevu talep etmek istiyorum.",
            `İsim: ${name}`,
            `Hizmet: ${service}`,
            `Tarih: ${formatDate(date)}`,
            `Saat: ${time}`,
        ];
        if (note) lines.push(`Not: ${note}`);

        window.open(buildWhatsAppURL(lines.join("\n")), "_blank", "noopener,noreferrer");
    });
}

// ============================================================
// INSTAGRAM GALLERY
// Fetches real posts via Instagram Graph API.
// Falls back silently to existing placeholder tiles if:
//   – accessToken / userId not set in config.js
//   – API call fails (CORS, expired token, network error)
// ============================================================

/**
 * Attempts to refresh the long-lived token so it doesn't expire.
 * Silently fails — a failed refresh doesn't block image loading.
 * @param {string} token  Current access token.
 * @returns {Promise<void>}
 */
async function refreshInstagramToken(token) {
    try {
        const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
        await fetch(url);
    } catch (_) {
        // Non-critical; ignore silently
    }
}

/**
 * Fetches user media from Instagram Graph API.
 * @param {string} token
 * @param {string} userId
 * @param {string} version  API version string e.g. "v21.0"
 * @param {number} limit
 * @returns {Promise<Array>} Array of media objects.
 */
async function fetchInstagramMedia(token, userId, version, limit) {
    const fields = "id,media_type,media_url,thumbnail_url,permalink,timestamp,caption";
    const url    = `https://graph.instagram.com/${version}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;
    const res    = await fetch(url);
    if (!res.ok) throw new Error(`Instagram API ${res.status}`);
    const json = await res.json();
    if (json.error) throw new Error(json.error.message);
    return json.data ?? [];
}

/**
 * Renders Instagram media items into the gallery grid.
 * Replaces existing placeholder tiles.
 * @param {Array}   items      Array from fetchInstagramMedia.
 * @param {Array}   allowed    Allowed media_type values.
 */
function renderInstagramGallery(items, allowed) {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;

    // Filter to allowed types (skip Reels/video with no static image)
    const filtered = items
        .filter((item) => allowed.includes(item.media_type))
        .filter((item) => item.media_url); // must have a usable URL

    if (!filtered.length) return;

    // Indices that get the tall (2-row-span) treatment in the grid
    const tallIndices = new Set([1, 4]);

    const fragment = document.createDocumentFragment();

    filtered.slice(0, 8).forEach((item, index) => {
        const isTall   = tallIndices.has(index);
        const altText  = item.caption
            ? item.caption.replace(/\s+/g, " ").slice(0, 120)
            : `Blush Nail Beauty Instagram gönderisi`;

        const a = document.createElement("a");
        a.href             = item.permalink;
        a.target           = "_blank";
        a.rel              = "noopener noreferrer";
        a.className        = "gallery-item gallery-item--loaded reveal" + (isTall ? " gallery-item--tall" : "");
        a.setAttribute("aria-label", `Instagram'da görüntüle: ${altText.slice(0, 60)}`);

        const img = document.createElement("img");
        img.src         = item.media_url;
        img.alt         = altText;
        img.loading     = "lazy";
        img.decoding    = "async";
        img.className   = "gallery-item__img";

        const label = document.createElement("span");
        label.className = "gallery-item__label mono-label";
        label.textContent = "Instagram Görseli";

        a.appendChild(img);
        a.appendChild(label);
        fragment.appendChild(a);
    });

    // Swap in real content
    grid.innerHTML = "";
    grid.appendChild(fragment);

    // Re-run scroll reveal on newly created elements
    initScrollReveal();
}

/**
 * Orchestrates Instagram initialisation.
 * Called from DOMContentLoaded.
 */
async function initInstagramGallery() {
    const ig = SITE_CONFIG?.instagram;
    if (!ig?.accessToken || !ig?.userId) return; // Not configured — keep placeholders

    try {
        // Attempt silent token refresh (non-blocking)
        refreshInstagramToken(ig.accessToken); // fire-and-forget

        const items = await fetchInstagramMedia(
            ig.accessToken,
            ig.userId,
            ig.apiVersion ?? "v21.0",
            ig.mediaLimit ?? 8
        );

        renderInstagramGallery(items, ig.allowedTypes ?? ["IMAGE", "CAROUSEL_ALBUM"]);

    } catch (err) {
        console.warn("[Blush] Instagram gallery not loaded:", err.message);
        // Placeholders remain — no user-visible error
    }
}

// ============================================================
// GOOGLE PLACES REVIEWS
// Uses the Maps JavaScript API (Places library) client-side.
// Falls back silently to placeholder review cards if:
//   – apiKey / placeId not set in config.js
//   – Script load or Places API call fails
// ============================================================

/**
 * Dynamically loads the Google Maps JavaScript API with the
 * Places library.  Resolves when the global google.maps is ready.
 * @param {string} apiKey
 * @param {string} language
 * @returns {Promise<void>}
 */
function loadGoogleMapsScript(apiKey, language) {
    return new Promise((resolve, reject) => {
        if (window.google?.maps?.places) { resolve(); return; }

        const callbackName = "__blushGoogleMapsReady";
        window[callbackName] = () => {
            delete window[callbackName];
            resolve();
        };

        const script   = document.createElement("script");
        script.src     = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&language=${encodeURIComponent(language)}&callback=${callbackName}`;
        script.async   = true;
        script.defer   = true;
        script.onerror = () => reject(new Error("Google Maps script failed to load"));
        document.head.appendChild(script);
    });
}

/**
 * Fetches place details (reviews) via PlacesService.
 * @param {string} placeId
 * @param {string} language
 * @returns {Promise<google.maps.places.PlaceResult>}
 */
function fetchGooglePlaceDetails(placeId, language) {
    return new Promise((resolve, reject) => {
        // PlacesService requires a DOM node (used as attribution container)
        const attrNode = document.getElementById("reviews-attribution") ?? document.createElement("div");

        const service = new google.maps.places.PlacesService(attrNode);
        service.getDetails(
            {
                placeId,
                fields: ["reviews", "rating", "user_ratings_total"],
                language,
            },
            (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(place);
                } else {
                    reject(new Error(`PlacesService status: ${status}`));
                }
            }
        );
    });
}

/**
 * Renders Google Place reviews into the reviews grid.
 * @param {Array}  reviews   Array of google.maps.places.PlaceReview
 * @param {number} limit     Max reviews to show.
 * @param {number} minRating Minimum star count to include.
 */
function renderGoogleReviews(reviews, limit, minRating) {
    const grid = document.getElementById("reviews-grid");
    if (!grid) return;

    const filtered = reviews
        .filter((r) => r.rating >= minRating)
        .slice(0, limit);

    if (!filtered.length) return;

    const fragment = document.createDocumentFragment();

    filtered.forEach((review) => {
        const ratingLabel = `5 üzerinden ${review.rating} yıldız`;
        const timeText    = review.relative_time_description ?? "";

        const article = document.createElement("article");
        article.className = "review-card reveal";
        article.setAttribute("aria-label", "Müşteri yorumu");

        article.innerHTML = `
            <div class="review-card__stars" aria-label="${escapeHTML(ratingLabel)}">
                <span aria-hidden="true">${escapeHTML(buildStars(review.rating))}</span>
            </div>
            <blockquote class="review-card__text">
                "${escapeHTML(review.text ?? "")}"
            </blockquote>
            <footer class="review-card__footer">
                <cite class="review-card__name">${escapeHTML(review.author_name ?? "")}</cite>
                <span class="review-card__meta mono-label">
                    <span class="review-card__source">Google Yorumu</span>
                    ${timeText ? `<span class="review-card__time">${escapeHTML(timeText)}</span>` : ""}
                </span>
            </footer>`;

        fragment.appendChild(article);
    });

    grid.innerHTML = "";
    grid.appendChild(fragment);

    // Re-run scroll reveal on new cards
    initScrollReveal();
}

/**
 * Orchestrates Google Places review initialisation.
 */
async function initGoogleReviews() {
    const cfg = SITE_CONFIG?.google;
    if (!cfg?.apiKey || !cfg?.placeId) return; // Not configured — keep placeholders

    try {
        await loadGoogleMapsScript(cfg.apiKey, cfg.language ?? "tr");
        const place = await fetchGooglePlaceDetails(cfg.placeId, cfg.language ?? "tr");

        if (place.reviews?.length) {
            renderGoogleReviews(
                place.reviews,
                cfg.reviewsLimit ?? 4,
                cfg.minRating   ?? 4
            );
        }
    } catch (err) {
        console.warn("[Blush] Google reviews not loaded:", err.message);
        // Placeholder cards remain — no user-visible error
    }
}

// ============================================================
// INIT — run everything after DOM is ready
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    initBusinessInfo();       // dynamic address / phone / hours
    initWhatsAppLinks();      // populate all wa.me hrefs
    initNav();                // mobile hamburger
    initNavScroll();          // backdrop blur on scroll
    initSwatches();           // swatch → service card scroll
    initScrollReveal();       // IntersectionObserver fade-in
    initAppointmentForm();    // form → WhatsApp message

    // Dynamic API integrations (graceful degradation on failure)
    initInstagramGallery();   // replaces gallery placeholders with real posts
    initGoogleReviews();      // replaces review placeholders with real reviews
});
