// Einwilligung & Google Analytics – zentrale Logik für Banner und Footer.
// Vor einer Einwilligung wird nichts von Google geladen.

export const CONSENT_KEY = "cookie-consent";
export const GA_ID = "G-DPXY96XYN3";
const COOKIE_DAYS = 28;

export function readConsent() {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveConsent(analytics) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ essential: true, analytics, timestamp: new Date().toISOString() }),
  );
  if (!analytics) disableAnalytics();
}

// GA4 mit Consent Mode v2: Werbe-Speicher/-Signale bleiben dauerhaft verweigert,
// nur analytics_storage wird nach Einwilligung erlaubt.
export function loadAnalytics() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  window[`ga-disable-${GA_ID}`] = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("set", {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    cookie_expires: COOKIE_DAYS * 24 * 60 * 60,
    cookie_flags: "SameSite=Lax;Secure",
  });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

// Widerruf: weitere Messung stoppen und vorhandene GA-Cookies entfernen
export function disableAnalytics() {
  window[`ga-disable-${GA_ID}`] = true;
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }
  deleteAnalyticsCookies();
}

export function deleteAnalyticsCookies() {
  const host = location.hostname;
  const parts = host.split(".");
  const domains = ["", host, `.${host}`];
  if (parts.length > 2) domains.push(`.${parts.slice(-2).join(".")}`);

  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => /^_ga($|_)|^_gid$|^_gat/.test(name))
    .forEach((name) => {
      domains.forEach((d) => {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      });
    });
}

// Footer-Link „Cookie-Einstellungen": Einwilligung zurücknehmen, Banner neu zeigen
export function revokeConsent() {
  localStorage.removeItem(CONSENT_KEY);
  disableAnalytics();
}
