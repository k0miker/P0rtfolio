<?php
/**
 * Kontaktformular-Versand für alle Portfolios auf STRATO.
 * ⚠ Wird per `npm run sync:projects` aus dem Haupt-Portfolio in alle Portfolios
 * kopiert – nur dort (P0rtfolio/public/kontakt.php) bearbeiten!
 *
 * Datensparsam: Die Anfrage wird ausschließlich per E-Mail weitergeleitet und
 * NICHT auf dem Server gespeichert. Keine Cookies, keine Sessions, kein Captcha-Dienst.
 *
 * Spam-Schutz (ohne Drittanbieter):
 *  1. Honeypot-Feld "bot-field", das nur Bots ausfüllen
 *  2. Zeit-Token: vom Server signiert (GET ?token, geholt von /kontakt.js),
 *     frühestens nach MIN_SECONDS gültig. Bots, die direkt hierher senden, haben keins.
 *  3. Herkunftsprüfung (Origin-Header muss die eigene Domain sein)
 *  4. Inhaltsprüfung (Links, HTML/BBCode)
 *  5. Mengenbegrenzung pro IP – nur als Hash gespeichert, nach 1 Stunde gelöscht
 *
 * Antwort:
 *  - Anfrage mit "Accept: application/json" (fetch)  → JSON {"ok": true|false}
 *  - normales Absenden                               → Weiterleitung auf /?kontakt=danke|fehler
 */
declare(strict_types=1);

// ===================== Konfiguration =====================
// Empfänger der Anfragen
const MAIL_TO = 'info@cb-webdevelopment.de';
// Absender – muss ein existierendes Postfach der Domain bei STRATO sein
// (sonst werden Mails abgelehnt oder landen im Spam)
const MAIL_FROM = 'webseite@cb-webdevelopment.de';
// Spam-Schutz: Formulare, die schneller als X Sekunden nach dem ersten Klick ins Formular
// abgeschickt werden, sind Bots. Ein Token ist höchstens TOKEN_MAX_AGE Sekunden gültig.
const MIN_SECONDS = 4;
const TOKEN_MAX_AGE = 86400;
// Höchstens so viele Anfragen pro IP-Adresse und Stunde (gilt für alle Portfolios zusammen)
const RATE_LIMIT = 5;
// Mehr Links als hier in der Nachricht → Spam
const MAX_LINKS = 1;
date_default_timezone_set('Europe/Berlin');
// =========================================================

$wantsJson = str_contains((string) ($_SERVER['HTTP_ACCEPT'] ?? ''), 'application/json');
$host = strtolower((string) preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')));

function respond(bool $ok): never
{
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($ok ? 200 : 422);
        header('Content-Type: application/json; charset=UTF-8');
        header('Cache-Control: no-store');
        echo json_encode(['ok' => $ok]);
    } else {
        header('Location: /?kontakt=' . ($ok ? 'danke' : 'fehler'), true, 303);
    }
    exit;
}

/** Spam: still "Danke" melden, damit Bots nichts lernen */
function spam(): never
{
    respond(true);
}

/** Ordner außerhalb der Webroots – gemeinsam für alle Portfolios auf dem Webspace */
function private_dir(): string
{
    foreach ([dirname(__DIR__) . '/portfolio-private', sys_get_temp_dir() . '/portfolio-kontakt'] as $dir) {
        if (is_dir($dir) || @mkdir($dir, 0700, true)) {
            if (is_writable($dir)) {
                return $dir;
            }
        }
    }
    return sys_get_temp_dir();
}

/** Geheimer Schlüssel für Token und IP-Hashes – wird beim ersten Aufruf erzeugt */
function secret(): string
{
    $file = private_dir() . '/kontakt.key';
    $key = is_file($file) ? trim((string) file_get_contents($file)) : '';
    if (strlen($key) < 32) {
        $key = bin2hex(random_bytes(32));
        file_put_contents($file, $key, LOCK_EX);
        @chmod($file, 0600);
    }
    return $key;
}

function sign(string $value): string
{
    return hash_hmac('sha256', $value, secret());
}

/** Mehrzeiliger Text, gekürzt und mit einheitlichen Zeilenumbrüchen */
function text(string $key, int $max): string
{
    $value = trim((string) ($_POST[$key] ?? ''));
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    return mb_substr($value, 0, $max);
}

/** Einzeiliger Wert – Zeilenumbrüche entfernt (verhindert Header-Injection) */
function line(string $key, int $max): string
{
    return trim((string) preg_replace('/[\r\n\t]+/', ' ', text($key, $max)));
}

/** Zählt Links (http://, www., <a, [url) in einem Text */
function count_links(string $value): int
{
    return preg_match_all('~https?://|www\.|<a[\s>]|\[url~i', $value);
}

/**
 * Mengenbegrenzung: speichert pro IP nur einen gesalzenen Hash mit Zeitstempeln
 * der letzten Stunde. Ältere Einträge werden bei jedem Aufruf gelöscht.
 */
function rate_limited(): bool
{
    $file = private_dir() . '/kontakt-limit.json';
    $now = time();
    $ip = sign('ip|' . ($_SERVER['REMOTE_ADDR'] ?? ''));

    $fp = fopen($file, 'c+');
    if ($fp === false) {
        return false;
    }
    flock($fp, LOCK_EX);
    $data = json_decode((string) stream_get_contents($fp), true);
    $data = is_array($data) ? $data : [];

    foreach ($data as $hash => $times) {
        $data[$hash] = array_values(array_filter((array) $times, fn($t) => is_int($t) && $t > $now - 3600));
        if ($data[$hash] === []) {
            unset($data[$hash]);
        }
    }
    $limited = count($data[$ip] ?? []) >= RATE_LIMIT;
    if (!$limited) {
        $data[$ip][] = $now;
    }

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data));
    flock($fp, LOCK_UN);
    fclose($fp);
    return $limited;
}

// ---------- Token ausgeben (wird beim ersten Klick ins Formular geholt) ----------
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET' && isset($_GET['token'])) {
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex');
    $ts = (string) time();
    echo json_encode(['token' => $ts . '.' . sign('token|' . $ts)]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /', true, 303);
    exit;
}

// ---------- 1. Honeypot ----------
if (line('bot-field', 200) !== '') {
    spam();
}

// ---------- 2. Herkunft: nur Formulare von der eigenen Website ----------
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && $origin !== 'null'
    && strcasecmp((string) parse_url($origin, PHP_URL_HOST), $host) !== 0) {
    spam();
}

// ---------- 3. Zeit-Token ----------
$token = line('token', 120);
if (!preg_match('/^(\d{9,11})\.([a-f0-9]{64})$/', $token, $m)) {
    // Kein Token: Bot, der direkt sendet – oder (sehr selten) Browser ohne JavaScript.
    // Die Fehlermeldung nennt die E-Mail-Adresse, echte Anfragen gehen also nicht verloren.
    respond(false);
}
if (!hash_equals(sign('token|' . $m[1]), $m[2])) {
    spam();
}
$age = time() - (int) $m[1];
if ($age < MIN_SECONDS) {
    spam();
}
if ($age > TOKEN_MAX_AGE) {
    respond(false); // Seite sehr lange offen – Mensch, bitte neu laden
}

// ---------- Felder (die Portfolios benennen die Nachricht unterschiedlich) ----------
$name    = line('name', 100);
$email   = line('email', 120);
$subject = line('subject', 120);
$message = text('message', 3000);
if ($message === '') {
    $message = text('text', 3000);
}

// ---------- 4. Inhalt ----------
if (count_links($name . ' ' . $subject) > 0
    || count_links($message) > MAX_LINKS
    || preg_match('~</?[a-z][^>]*>|\[/?(url|link|b|img)\b~i', $message)) {
    spam();
}

$valid = $name !== '' && $message !== ''
    && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;

if (!$valid) {
    respond(false);
}

// ---------- 5. Mengenbegrenzung (erst hier, damit Tippfehler nicht mitzählen) ----------
if (rate_limited()) {
    respond(false);
}

$mailSubject = "Anfrage über $host" . ($subject !== '' ? ": $subject" : '');

$body = implode("\n", [
    "Neue Anfrage über das Kontaktformular von $host",
    str_repeat('-', 50),
    "Name:     $name",
    "E-Mail:   $email",
    "Betreff:  " . ($subject !== '' ? $subject : '–'),
    '',
    'Nachricht:',
    $message,
    '',
    str_repeat('-', 50),
    'Gesendet am: ' . date('d.m.Y H:i'),
]);

$headers = [
    'From: =?UTF-8?B?' . base64_encode('CB-Webdevelopment Website') . '?= <' . MAIL_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = mail(
    MAIL_TO,
    '=?UTF-8?B?' . base64_encode($mailSubject) . '?=',
    $body,
    implode("\r\n", $headers),
    '-f' . MAIL_FROM
);

respond($sent);
