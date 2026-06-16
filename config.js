/* ============================================================
   BLUSH NAIL BEAUTY — Site Configuration
   Edit this single file to update ALL business details and
   API credentials.  No other file needs to change.
   ============================================================ */

const SITE_CONFIG = {

  // ── Business Information ──────────────────────────────────────
  business: {
    name:     "Blush Nail Beauty",
    tagline:  "Ankara Çankaya'da tırnak bakım stüdyosu.",
    location: "Ankara · Çankaya",

    // TODO: Paste the WhatsApp number (country code + number, no "+" or spaces).
    // Turkey format: "905XXXXXXXXX"
    whatsappNumber: "905XXXXXXXXX",

    instagramHandle: "blush_nailbeauty",
    instagramUrl:    "https://www.instagram.com/blush_nailbeauty/",

    googleMapsUrl: "https://www.google.com/maps/place/Blush+Nail+Beauty/@39.8875413,32.8892574,19.73z/data=!4m6!3m5!1s0x14d34f8fbf13970b:0x8eb2d6bc916949c1!8m2!3d39.887811!4d32.888967!16s%2Fg%2F11sb96x5gz",

    coordinates: { lat: 39.887811, lng: 32.888967 },

    // TODO: Full street address.  Example:
    // address: "Kızılay Mah. Atatürk Bulvarı No:XX, Çankaya / Ankara"
    address: null,

    // TODO: Phone number shown on the site.  Example:
    // phone: "+90 5XX XXX XX XX"
    phone: null,

    // TODO: Working hours.  Uncomment and fill the array.
    hours: [
      // { days: "Pzt – Cum", time: "10:00 – 20:00" },
      // { days: "Cumartesi", time: "10:00 – 18:00" },
      // { days: "Pazar",     time: "Kapalı" },
    ],
  },

  // ── Instagram Graph API ───────────────────────────────────────
  //
  // HOW TO GET AN ACCESS TOKEN (one-time setup, ~10 min):
  //  1. Visit: https://developers.facebook.com/  → Create App → Business
  //  2. Add product: "Instagram Graph API"
  //  3. Connect the Instagram Business / Creator account
  //     (Settings → Instagram → Add account)
  //  4. Open Graph API Explorer → select your app →
  //     choose "Get User Access Token" with scopes:
  //       instagram_basic, pages_show_list
  //  5. Exchange for a Long-Lived Token (valid 60 days):
  //     GET https://graph.instagram.com/access_token
  //       ?grant_type=ig_exchange_token
  //       &client_id={your-app-id}
  //       &client_secret={your-app-secret}
  //       &access_token={short-lived-token}
  //  6. Get your numeric User ID:
  //     GET https://graph.instagram.com/me?fields=id&access_token={token}
  //
  // SECURITY NOTE:
  //   This token has READ-ONLY access to your own public posts.
  //   It cannot post, delete, or access DMs.  Exposing it in a
  //   static site is an accepted trade-off.  Restrict the app's
  //   scopes to "instagram_basic" only for minimal exposure.
  //   The token is automatically refreshed on every page load
  //   (see script.js → refreshInstagramToken).
  //
  instagram: {
    // TODO: Paste your Long-Lived Instagram Graph API access token.
    accessToken: "",

    // TODO: Your numeric Instagram User ID (e.g. "17841400008460056").
    userId: "",

    apiVersion:   "v21.0",
    mediaLimit:   8,
    // Only these types are shown (videos/Reels are skipped).
    allowedTypes: ["IMAGE", "CAROUSEL_ALBUM"],
  },

  // ── Google Maps / Places API ──────────────────────────────────
  //
  // HOW TO SET UP (one-time, ~10 min):
  //  1. Visit: https://console.cloud.google.com/
  //  2. Create (or select) a project.
  //  3. Enable: "Maps JavaScript API" and "Places API".
  //  4. Go to Credentials → Create API Key.
  //     Under "Application restrictions" → HTTP referrers → add:
  //       https://yourdomain.com/*
  //       http://localhost/*  (for local testing)
  //     Under "API restrictions" → restrict to Maps JS API + Places API.
  //  5. Find the Place ID:
  //     Open: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
  //     Search "Blush Nail Beauty Ankara" — copy the ID that starts with "ChIJ".
  //
  // SECURITY NOTE:
  //   Restricting the API key to your domain (HTTP referrer) prevents
  //   unauthorised use.  Never use an unrestricted key on a public site.
  //
  google: {
    // TODO: Your Google Maps / Places API key (restrict to your domain!).
    apiKey: "",

    // TODO: Google Place ID for Blush Nail Beauty (starts with "ChIJ…").
    placeId: "",

    reviewsLimit: 4,   // How many reviews to show (Places API returns max 5).
    minRating:    4,   // Skip reviews below this star count.
    language:     "tr",
  },

};
