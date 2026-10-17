// =============================================================================
// Impressum und Datenschutzerklärung – die EINZIGE Quelle für alle Portfolios.
// Jede Version rendert die Abschnitte im eigenen Design:
//   section.title → <h2>, block.h3 → <h3>, block.p → <p set:html>, block.ul → <ul><li set:html>
// p- und ul-Einträge enthalten Inline-HTML (Links, Zeilenumbrüche).
// Wird per `npm run sync:projects` in alle Portfolios kopiert – nur hier ändern.
// =============================================================================
import { contact as c } from "./contact.js";

export const LEGAL_STAND = "Oktober 2026";

const mail = `<a href="mailto:${c.email}">${c.email}</a>`;
const tel = `<a href="${c.phoneHref}">${c.phone}</a>`;
const ext = (href, text) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
const anschrift = `${c.name}<br />${c.street}<br />${c.postalCode} ${c.city}`;

/** @typedef {{ h3?: string, p?: string, ul?: string[] }} LegalBlock */
/** @typedef {{ title: string, blocks: LegalBlock[] }} LegalSection */

/** @type {LegalSection[]} */
export const impressum = [
  {
    title: "Angaben gemäß § 5 DDG",
    blocks: [{ p: `${c.name}<br />${c.company} – Webdesign und Webentwicklung<br />${c.street}<br />${c.postalCode} ${c.city}<br />${c.countryName}` }],
  },
  {
    title: "Kontakt",
    blocks: [{ p: `Telefon: ${tel}<br />E-Mail: ${mail}` }],
  },
  {
    title: "Umsatzsteuer",
    blocks: [{ p: "Als Kleinunternehmer im Sinne von § 19 UStG berechne ich keine Umsatzsteuer." }],
  },
  {
    title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    blocks: [{ p: `${c.name}, Anschrift wie oben` }],
  },
  {
    title: "Verbraucherstreitbeilegung",
    blocks: [{ p: "Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen." }],
  },
  {
    title: "Haftung für Inhalte",
    blocks: [
      { p: "Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen." },
      { p: "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entferne ich diese Inhalte umgehend." },
    ],
  },
  {
    title: "Haftung für Links",
    blocks: [
      { p: "Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren nicht erkennbar." },
      { p: "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen entferne ich derartige Links umgehend." },
    ],
  },
  {
    title: "Urheberrecht",
    blocks: [
      { p: "Die von mir erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet." },
      { p: "Soweit Inhalte auf dieser Seite nicht von mir erstellt wurden, werden die Urheberrechte Dritter beachtet und Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen entferne ich derartige Inhalte umgehend." },
    ],
  },
];

/** @type {LegalSection[]} */
export const datenschutz = [
  {
    title: "1. Datenschutz auf einen Blick",
    blocks: [
      { p: `Diese Erklärung informiert Sie darüber, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden. Sie gilt für alle Seiten unter ${c.url.replace("https://", "")} – also für die Hauptseite und für die Portfolio-Versionen unter /v1/, /v2/, /v3/, /v4/ und /b2b/.` },
      { p: "Technische Daten fallen beim Seitenaufruf automatisch beim Hosting-Anbieter an. Weitere Angaben erhalte ich nur, wenn Sie das Kontaktformular nutzen, mich anrufen oder mir eine E-Mail schreiben. Eine Webanalyse oder ein Tracking Ihres Nutzungsverhaltens findet nicht statt, Cookies werden nicht gesetzt." },
    ],
  },
  {
    title: "2. Verantwortliche Stelle",
    blocks: [
      { p: `${anschrift}<br />Telefon: ${tel}<br />E-Mail: ${mail}` },
      { p: "Verantwortliche Stelle ist die Person, die über Zwecke und Mittel der Verarbeitung personenbezogener Daten entscheidet." },
    ],
  },
  {
    title: "3. Hosting und E-Mail bei STRATO",
    blocks: [
      { p: "Diese Website und mein E-Mail-Postfach werden bei der STRATO GmbH, Otto-Ostrowski-Straße 7, 10249 Berlin, betrieben. Die Server stehen in Deutschland. Mit STRATO besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO." },
      { p: `Die Verarbeitung ist für eine zuverlässige, schnelle und sichere Bereitstellung erforderlich. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; soweit der Besuch der Anbahnung oder Erfüllung eines Vertrags dient, zusätzlich Art. 6 Abs. 1 lit. b DSGVO. Weitere Informationen: ${ext("https://www.strato.de/datenschutz/", "Datenschutzerklärung von STRATO")}.` },
    ],
  },
  {
    title: "4. Server-Protokolle",
    blocks: [
      { p: "Beim Aufruf jeder Seite verarbeitet der Webserver automatisch IP-Adresse, Datum und Uhrzeit, angeforderte Datei, übertragene Datenmenge, Zugriffsstatus, Referrer-URL sowie Browsertyp, Betriebssystem und Hostname. Diese Daten dienen der Auslieferung der Seiten, der Stabilität, der Fehleranalyse und der Abwehr missbräuchlicher Zugriffe. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO." },
    ],
  },
  {
    title: "5. Allgemeine Hinweise zur Verarbeitung",
    blocks: [
      { h3: "Speicherdauer" },
      { p: "Sofern nachfolgend keine besondere Frist genannt ist, speichere ich personenbezogene Daten nur so lange, wie sie für den jeweiligen Zweck erforderlich sind. Danach werden sie gelöscht, es sei denn, gesetzliche Aufbewahrungspflichten oder die Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erfordern eine längere Speicherung." },
      { h3: "Empfänger" },
      { p: "Daten erhalten nur Stellen, die sie für die genannten Zwecke benötigen. Dienstleister werden – soweit erforderlich – auf Grundlage eines Vertrags zur Auftragsverarbeitung eingesetzt. Eine Weitergabe erfolgt außerdem, wenn sie gesetzlich vorgeschrieben ist oder Sie eingewilligt haben." },
      { h3: "Widerruf und Widerspruch" },
      { p: "Eine Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen; die bis dahin erfolgte Verarbeitung bleibt rechtmäßig. Beruht eine Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO, können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, nach Art. 21 DSGVO widersprechen." },
      { h3: "Verschlüsselung" },
      { p: "Die Website wird ausschließlich verschlüsselt über HTTPS übertragen. Dadurch sind Inhalte und Formulareingaben auf dem Transportweg vor unbefugtem Mitlesen geschützt. Ein vollständiger Schutz jeder Internetübertragung kann dennoch nicht garantiert werden." },
    ],
  },
  {
    title: "6. Kontaktformular, Telefon und E-Mail",
    blocks: [
      { p: "Bei einer Anfrage über das Kontaktformular verarbeite ich die eingegebenen Angaben: Name beziehungsweise Unternehmen, E-Mail-Adresse und Nachricht sowie – je nach Formular – Telefonnummer und Betreff oder Thema. Die Angaben werden verschlüsselt übertragen und vom Webserver ausschließlich per E-Mail an mein Postfach weitergeleitet; eine Speicherung auf dem Webserver findet nicht statt." },
      { p: "Zum Schutz vor Spam setze ich ein unsichtbares Prüffeld, eine Zeitprüfung und eine Prüfung des Nachrichteninhalts ein. Es wird kein Captcha-Dienst eines Drittanbieters verwendet und es werden keine Cookies gesetzt. Um massenhafte Anfragen zu begrenzen, wird Ihre IP-Adresse höchstens eine Stunde lang und nur als nicht umkehrbarer Hashwert gespeichert. Wird in einem Formular eine Bestätigung abgefragt, dokumentiert sie lediglich, dass Sie diese Datenschutzinformationen zur Kenntnis genommen haben." },
      { p: "Rufen Sie mich an oder schreiben Sie mir eine E-Mail, verarbeite ich Ihre Telefonnummer beziehungsweise E-Mail-Adresse und die Angaben aus Gespräch oder Nachricht, um Ihr Anliegen zu bearbeiten." },
      { p: "Die Daten dienen der Prüfung und Beantwortung Ihrer Anfrage. Geht es um ein Angebot oder einen Auftrag, ist Art. 6 Abs. 1 lit. b DSGVO die Rechtsgrundlage; in sonstigen Fällen mein berechtigtes Interesse an einer sachgerechten Kommunikation nach Art. 6 Abs. 1 lit. f DSGVO. Die Angaben werden gelöscht, wenn die Anfrage abschließend erledigt ist und keine gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für eine weitere Speicherung bestehen." },
    ],
  },
  {
    title: "7. Lokal eingebundene Schriftarten",
    blocks: [
      { p: "Zur einheitlichen Darstellung verwendet diese Website Schriftarten, die zusammen mit der Website von meinem Hosting-Anbieter ausgeliefert werden. Es wird keine Verbindung zu Google Fonts oder anderen Schriftarten-Diensten hergestellt; dafür werden also keine Daten an Dritte übermittelt." },
    ],
  },
  {
    title: "8. Keine Cookies – nur lokale Einstellungen",
    blocks: [
      { p: "Diese Website setzt keine Cookies und verwendet keine Analyse-, Tracking- oder Marketingdienste. Wenn Sie in einer der Versionen das Farbschema umschalten oder die Animationen reduzieren, speichert Ihr Browser diese Wahl im Local Storage (Schlüssel <code>theme</code>, <code>performance-mode</code>, <code>performance-mode-v2</code>). Diese Informationen bleiben auf Ihrem Gerät und werden nicht an mich übertragen; Sie können sie jederzeit über die Browser-Einstellungen löschen." },
      { p: "Diese Speicherzugriffe sind für die von Ihnen ausdrücklich gewünschte Einstellung erforderlich und erfolgen nach § 25 Abs. 2 Nr. 2 TDDDG; die anschließende Verarbeitung stützt sich auf Art. 6 Abs. 1 lit. f DSGVO." },
    ],
  },
  {
    title: "9. Links zu anderen Websites",
    blocks: [
      { p: "Diese Website verlinkt auf externe Angebote, etwa GitHub, LinkedIn, mein Google-Unternehmensprofil und die Websites von Kundenprojekten. Eine Verbindung zu diesen Anbietern entsteht erst, wenn Sie einen Link anklicken; ab dann gilt die Datenschutzerklärung des jeweiligen Anbieters." },
    ],
  },
  {
    title: "10. Ihre Rechte",
    blocks: [
      { p: "Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf:" },
      {
        ul: [
          "Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)",
          "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
          "Löschung, soweit keine vorrangigen Gründe entgegenstehen (Art. 17 DSGVO)",
          "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
          "Datenübertragbarkeit (Art. 20 DSGVO)",
          "Widerspruch gegen Verarbeitungen nach Art. 6 Abs. 1 lit. e oder f DSGVO (Art. 21 DSGVO)",
        ],
      },
      { p: `Zur Ausübung Ihrer Rechte genügt eine Nachricht an ${mail}. Außerdem können Sie sich nach Art. 77 DSGVO bei einer Datenschutzaufsichtsbehörde beschweren, zum Beispiel bei der für meinen Sitz zuständigen ${ext("https://www.lfd.niedersachsen.de/", "Landesbeauftragten für den Datenschutz Niedersachsen")}, Prinzenstraße 5, 30159 Hannover.` },
    ],
  },
  {
    title: "11. Aktualität",
    blocks: [
      { p: `Diese Datenschutzerklärung hat den Stand ${LEGAL_STAND}. Ich passe sie an, wenn sich eingesetzte Dienste, technische Abläufe oder rechtliche Anforderungen ändern.` },
    ],
  },
];
