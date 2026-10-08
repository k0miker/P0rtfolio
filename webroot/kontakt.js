// =============================================================================
// Kontaktformular-Helfer für alle Portfolios (gehört zu /kontakt.php).
// ⚠ Wird per `npm run sync:projects` aus dem Haupt-Portfolio in alle Portfolios
// kopiert – nur dort (P0rtfolio/webroot/kontakt.js) bearbeiten!
//
// Einbinden: <form data-kontakt action="/kontakt.php" method="POST"> … </form>
//            <script is:inline src="/kontakt.js" defer></script>
//  1. Holt beim ersten Klick ins Formular einen signierten Zeit-Token (Spam-Schutz)
//     und legt ihn in ein verstecktes Feld "token".
//  2. Nach normalem Absenden leitet kontakt.php auf /?kontakt=danke|fehler zurück –
//     dann wird unter dem Formular eine Rückmeldung angezeigt.
// Formulare, die per fetch senden, schicken "Accept: application/json" und
// bekommen {"ok": true|false} zurück.
// =============================================================================
(() => {
  const forms = document.querySelectorAll("form[data-kontakt]");

  forms.forEach((form) => {
    let field = form.querySelector('input[name="token"]');
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = "token";
      form.appendChild(field);
    }
    let loading = false;
    const load = () => {
      if (loading) return;
      loading = true;
      fetch("/kontakt.php?token", { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => { field.value = d.token || ""; })
        .catch(() => { loading = false; });
    };
    form.addEventListener("focusin", load);
    form.addEventListener("pointerdown", load);
  });

  const status = new URLSearchParams(location.search).get("kontakt");
  if (!status || !forms.length) return;

  const ok = status === "danke";
  const msg = document.createElement("p");
  msg.className = "kontakt-status";
  msg.setAttribute("role", "status");
  msg.textContent = ok
    ? "Danke für deine Nachricht! Ich melde mich so schnell wie möglich."
    : "Die Nachricht konnte leider nicht gesendet werden. Bitte schreib mir direkt an info@cb-webdevelopment.de.";
  msg.style.cssText =
    "margin:1rem 0;padding:.9rem 1.1rem;border-radius:.6rem;font-weight:600;" +
    (ok ? "background:#dcfce7;color:#14532d;" : "background:#fee2e2;color:#7f1d1d;");
  forms[0].insertAdjacentElement("afterend", msg);
  msg.scrollIntoView({ block: "center" });
  history.replaceState(null, "", location.pathname + location.hash);
})();
