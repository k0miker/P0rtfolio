"""Erzeugt das CB-Webdevelopment-Logo als SVG (Text in Pfade umgewandelt, Schrift: Archivo aus P0rtfolio5).

Aufruf: python scripts/brand-logo.py public/brand   (braucht: pip install fonttools brotli)
PNG-Exporte in public/brand/ sind aus den SVGs gerendert (resvg)."""
import sys, pathlib
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

OUT = pathlib.Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)
SRC = "K:/Work/P0rtfolio5/public/fonts/archivo-latin.woff2"

ORANGE = "#EB5E28"
INK = "#252422"
PAPER = "#FFFCF2"


def font(w):
    f = TTFont(SRC)
    return instantiateVariableFont(f, {"wght": w})


F = {w: font(w) for w in (400, 500, 800, 900)}


def kern_pairs(f):
    """Paar-Kerning aus GPOS (nur Format-1/2 PairPos, reicht für Großbuchstaben)."""
    pairs = {}
    gpos = f["GPOS"].table
    for li in gpos.LookupList.Lookup:
        subs = li.SubTable
        for st in subs:
            if li.LookupType == 9:
                st = st.ExtSubTable
            if getattr(st, "LookupType", li.LookupType) != 2:
                continue
            cov = st.Coverage.glyphs
            if st.Format == 1:
                for i, first in enumerate(cov):
                    for pvr in st.PairSet[i].PairValueRecord:
                        v = getattr(pvr.Value1, "XAdvance", 0) or 0
                        if v:
                            pairs.setdefault((first, pvr.SecondGlyph), v)
            elif st.Format == 2:
                c1 = st.ClassDef1.classDefs
                c2 = st.ClassDef2.classDefs
                for first in cov:
                    k1 = c1.get(first, 0)
                    for second, k2 in c2.items():
                        v = getattr(st.Class1Record[k1].Class2Record[k2].Value1, "XAdvance", 0) or 0
                        if v:
                            pairs.setdefault((first, second), v)
    return pairs


KERN = {w: kern_pairs(f) for w, f in F.items()}


def text_path(text, w, size, x0, y0, tracking=0.0):
    """Gibt (d, breite) zurück. y0 = Grundlinie, size = Schriftgröße in px, tracking in em."""
    f = F[w]
    cmap = f.getBestCmap()
    gs = f.getGlyphSet()
    scale = size / f["head"].unitsPerEm
    ds, x = [], 0.0
    names = [cmap[ord(ch)] for ch in text]
    for i, g in enumerate(names):
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (scale, 0, 0, -scale, x0 + x, y0))
        gs[g].draw(tp)
        ds.append(pen.getCommands())
        adv = f["hmtx"][g][0]
        if i + 1 < len(names):
            adv += KERN[w].get((g, names[i + 1]), 0)
            x += (adv + tracking * f["head"].unitsPerEm) * scale
        else:
            x += adv * scale
    return " ".join(ds), x


def ink_bounds(text, w, size, tracking=0.0):
    """Tatsächliche Farb-Ausdehnung (ohne Seitenabstände des 1. und letzten Glyphen)."""
    f = F[w]
    gs = f.getGlyphSet()
    cmap = f.getBestCmap()
    scale = size / f["head"].unitsPerEm
    first, last = cmap[ord(text[0])], cmap[ord(text[-1])]
    bp = BoundsPen(gs); gs[first].draw(bp); lsb = bp.bounds[0] * scale
    bp = BoundsPen(gs); gs[last].draw(bp); rsb = (f["hmtx"][last][0] - bp.bounds[2]) * scale
    _, adv = text_path(text, w, size, 0, 0, tracking)
    return lsb, adv - rsb  # links, rechts


def glyph(ch, w, size, x, y):
    d, adv = text_path(ch, w, size, x, y)
    f = F[w]; gs = f.getGlyphSet(); g = f.getBestCmap()[ord(ch)]
    bp = BoundsPen(gs); gs[g].draw(bp)
    s = size / 1000
    b = bp.bounds
    return d, (x + b[0] * s, y - b[3] * s, x + b[2] * s, y - b[1] * s)


# ---------------------------------------------------------------- Bildmarke
def mark(size=100.0, ox=0.0, oy=0.0, weight=800, stroke_ratio=1.0, compact=False):
    """<c/b> – Grundlinie bei oy + size*0.78. Rückgabe: (svg-elemente, bbox)."""
    fs = size  # Schriftgröße für c und b
    base = oy + size * 0.80
    stem = 0.135 * fs * stroke_ratio  # Strichstärke ~ Archivo-800-Stamm
    xh = 0.526 * fs
    asc = 0.72 * fs
    mid = base - xh / 2

    parts = []
    x = ox
    # linke Klammer
    bh = xh * 1.05 if not compact else xh * 1.0
    bw = bh * 0.55
    if not compact:
        x += stem * 0.6
        parts.append(f'<path d="M{x+bw:.2f} {mid-bh/2:.2f} L{x:.2f} {mid:.2f} L{x+bw:.2f} {mid+bh/2:.2f}" fill="none" stroke-width="{stem:.2f}" stroke-linejoin="miter" stroke-miterlimit="10"/>')
        x += bw + stem * 0.55
    # c
    d, bb = glyph("c", weight, fs, 0, base)
    shift = x - bb[0]
    d, bb = glyph("c", weight, fs, shift, base)
    parts.append(f'<path d="{d}"/>')
    x = bb[2] + stem * 0.35
    # Schrägstrich – überragt b nach oben und c nach unten
    top = base - asc - fs * 0.10
    bot = base + fs * 0.16
    slant = (bot - top) * 0.36
    parts.append(f'<path d="M{x:.2f} {bot:.2f} L{x+slant:.2f} {top:.2f}" fill="none" stroke-width="{stem:.2f}" stroke-linecap="butt"/>')
    x += slant + stem * 0.55
    # b
    d, bb = glyph("b", weight, fs, 0, base)
    shift = x - bb[0]
    d, bb = glyph("b", weight, fs, shift, base)
    parts.append(f'<path d="{d}"/>')
    x = bb[2]
    if not compact:
        x += stem * 0.55
        parts.append(f'<path d="M{x:.2f} {mid-bh/2:.2f} L{x+bw:.2f} {mid:.2f} L{x:.2f} {mid+bh/2:.2f}" fill="none" stroke-width="{stem:.2f}" stroke-linejoin="miter" stroke-miterlimit="10"/>')
        x += bw + stem * 0.6
    # Ausdehnung (Gehrungsspitzen der Klammern ~ stem*0.6 je Seite eingerechnet)
    return parts, (ox, top - stem * 0.35, x, bot + stem * 0.35), base


def mark_group(parts, color):
    return f'<g fill="{color}" stroke="{color}" stroke-width="0">' + "".join(
        p.replace("<path ", '<path ' if 'fill="none"' in p else '<path stroke="none" ') for p in parts) + "</g>"


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" width="{w:.0f}" height="{h:.0f}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{body}</svg>\n')


# ---------------------------------------------------------------- Wortmarke (horizontal)
def horizontal(text_color, name):
    H1 = 100.0                       # Versalhöhe CBWEB
    s1 = H1 / 0.686
    line2 = "DEVELOPMENT"
    l1a, l1b = ink_bounds("CBWEB", 800, s1)
    w1 = l1b - l1a
    # Zeile 2: Größe so, dass sie mit leichter Sperrung exakt die Breite von CBWEB trifft
    s2 = s1 * 0.46
    lo, hi = -0.05, 0.4
    for _ in range(60):
        t = (lo + hi) / 2
        a, b = ink_bounds(line2, 500, s2, t)
        if b - a < w1: lo = t
        else: hi = t
    tr = (lo + hi) / 2
    H2 = s2 * 0.686
    gap = H1 * 0.30

    # Bildmarke so hoch wie der gesamte Schriftblock
    block_h = H1 + gap + H2
    mparts, mb, _ = mark(size=block_h / 1.08)
    mh = mb[3] - mb[1]
    mw = mb[2] - mb[0]
    pad = H1 * 0.25
    # Marke vertikal auf den Schriftblock zentrieren
    my = pad + (block_h - mh) / 2 - mb[1]
    mx = pad - mb[0]
    tx = pad + mw + H1 * 0.42

    y1 = pad + H1
    y2 = y1 + gap + H2
    d1, _ = text_path("CBWEB", 800, s1, tx - l1a, y1)
    a2, _ = ink_bounds(line2, 500, s2, tr)
    d2, _ = text_path(line2, 500, s2, tx - a2, y2, tr)

    W = tx + w1 + pad
    Hh = pad * 2 + block_h
    body = (f'<g transform="translate({mx:.2f} {my:.2f})">{mark_group(mparts, ORANGE)}</g>'
            f'<path fill="{text_color}" d="{d1}"/><path fill="{text_color}" d="{d2}"/>')
    (OUT / name).write_text(svg(W, Hh, body, "CB Webdevelopment"), encoding="utf-8")


horizontal(INK, "logo.svg")
horizontal(PAPER, "logo-dark.svg")

# ---------------------------------------------------------------- Nur Bildmarke
parts, b, _ = mark(size=100)
pad = 6
w, h = b[2] - b[0] + 2 * pad, b[3] - b[1] + 2 * pad
body = f'<g transform="translate({pad - b[0]:.2f} {pad - b[1]:.2f})">{mark_group(parts, ORANGE)}</g>'
(OUT / "logo-mark.svg").write_text(svg(w, h, body, "CB Webdevelopment"), encoding="utf-8")

# ---------------------------------------------------------------- Favicon: c/b ohne Klammern, fetter, auf dunkler Kachel
parts, b, _ = mark(size=100, weight=900, stroke_ratio=1.25, compact=True)
mw, mh = b[2] - b[0], b[3] - b[1]
T = max(mw, mh) * 1.06
body = (f'<rect width="{T:.2f}" height="{T:.2f}" rx="{T*0.22:.2f}" fill="{INK}"/>'
        f'<g transform="translate({(T-mw)/2 - b[0]:.2f} {(T-mh)/2 - b[1]:.2f})">{mark_group(parts, ORANGE)}</g>')
(OUT / "favicon.svg").write_text(svg(T, T, body, "CB Webdevelopment"), encoding="utf-8")


# ================================================================ Einzeilige Wortmarke „cbwebdevelopment“
def vbounds(ch, w, size):
    f = F[w]; gs = f.getGlyphSet(); g = f.getBestCmap()[ord(ch)]
    bp = BoundsPen(gs); gs[g].draw(bp)
    return bp.bounds[1] * size / 1000, bp.bounds[3] * size / 1000  # unten, oben (über Grundlinie positiv)


def wordmark(x, base, size, color, bold_color=None):
    """„cb“ fett + „webdevelopment“ regular. Rückgabe: (svg, rechte Kante)."""
    a, _ = ink_bounds("cb", 800, size)
    d1, w1 = text_path("cb", 800, size, x - a, base)
    d2, w2 = text_path("webdevelopment", 400, size, x - a + w1 + size * 0.005, base)
    _, r = ink_bounds("webdevelopment", 400, size)
    return (f'<path fill="{bold_color or color}" d="{d1}"/><path fill="{color}" d="{d2}"/>',
            x - a + w1 + size * 0.005 + r)


_uid = [0]


def cb_mark(size, ox, oy, c_color, b_color):
    """Monogramm „CB“ mit diagonalem Schnitt (greift den / aus </> auf). oy = Grundlinie."""
    _uid[0] += 1
    mid_id = f"cbcut{_uid[0]}"
    capH = size * 0.686
    dc, bc = glyph("C", 900, size, 0, oy)
    dc, bc = glyph("C", 900, size, ox - bc[0], oy)
    stem = size * 0.17
    db, bb = glyph("B", 900, size, 0, oy)
    shift = bc[2] - stem * 0.55 - bb[0]
    db, bb = glyph("B", 900, size, shift, oy)
    # Schnitt: Parallelogramm, unten links → oben rechts
    xj = (bc[2] + bb[0]) / 2
    g = stem * 0.6
    sl = capH * 0.42
    y0, y1 = oy + size * 0.05, oy - capH - size * 0.05
    poly = (f"{xj - sl/2 - g/2:.2f},{y0:.2f} {xj - sl/2 + g/2:.2f},{y0:.2f} "
            f"{xj + sl/2 + g/2:.2f},{y1:.2f} {xj + sl/2 - g/2:.2f},{y1:.2f}")
    # Die Teile links/rechts der Schnittlinie getrennt einfärben: C-Seite und B-Seite
    left = (f"{bc[0]-10:.2f},{y0+10:.2f} {xj - sl/2:.2f},{y0+10:.2f} {xj + sl/2:.2f},{y1-10:.2f} {bc[0]-10:.2f},{y1-10:.2f}")
    right = (f"{xj - sl/2:.2f},{y0+10:.2f} {bb[2]+10:.2f},{y0+10:.2f} {bb[2]+10:.2f},{y1-10:.2f} {xj + sl/2:.2f},{y1-10:.2f}")
    body = (f'<defs><mask id="{mid_id}" maskUnits="userSpaceOnUse" x="{bc[0]-20:.2f}" y="{y1-20:.2f}" '
            f'width="{bb[2]-bc[0]+40:.2f}" height="{y0-y1+40:.2f}">'
            f'<rect x="{bc[0]-20:.2f}" y="{y1-20:.2f}" width="{bb[2]-bc[0]+40:.2f}" height="{y0-y1+40:.2f}" fill="#fff"/>'
            f'<polygon points="{poly}" fill="#000"/></mask>'
            f'<clipPath id="{mid_id}l"><polygon points="{left}"/></clipPath>'
            f'<clipPath id="{mid_id}r"><polygon points="{right}"/></clipPath></defs>'
            f'<g mask="url(#{mid_id})">'
            f'<g clip-path="url(#{mid_id}l)" fill="{c_color}"><path d="{dc}"/><path d="{db}"/></g>'
            f'<g clip-path="url(#{mid_id}r)" fill="{b_color}"><path d="{dc}"/><path d="{db}"/></g></g>')
    return body, (bc[0], oy - capH, bb[2], oy)


def line_logo(kind, text_color, c_color):
    """kind = 'tag' (<c/b>) oder 'cb' (Monogramm). Gibt (body, breite, höhe) zurück."""
    s = 100.0
    lo, hi = vbounds("p", 400, s)[0], vbounds("b", 800, s)[1]  # Unterlänge, Oberlänge
    pad = s * 0.18
    base = pad + hi
    text_mid = base - (hi * 0.5)  # optische Mitte: zwischen Grundlinie und Oberlänge
    if kind == "tag":
        mparts, mb, _ = mark(size=s * 1.25)
        mh = mb[3] - mb[1]
        my = text_mid - (mb[1] + mh / 2)
        mx = pad - mb[0]
        body = f'<g transform="translate({mx:.2f} {my:.2f})">{mark_group(mparts, ORANGE)}</g>'
        right = mx + mb[2]
        top, bottom = my + mb[1], my + mb[3]
    else:
        size = s * 1.3
        capH = size * 0.686
        mbase = text_mid + capH / 2
        body, bb = cb_mark(size, pad, mbase, c_color, ORANGE)
        right = bb[2]
        top, bottom = bb[1], bb[3]
    wm, wr = wordmark(right + s * 0.38, base, s, text_color)
    y_top = min(top, base - hi) - pad
    y_bot = max(bottom, base - lo) + pad
    body = f'<g transform="translate(0 {-y_top:.2f})">{body}{wm}</g>'
    return body, wr + pad, y_bot - y_top


for kind, nm in (("tag", "logo-line"), ("cb", "logo-cb-line")):
    for suffix, tc, cc in (("", INK, INK), ("-dark", PAPER, PAPER)):
        b, w, h = line_logo(kind, tc, cc)
        (OUT / f"{nm}{suffix}.svg").write_text(svg(w, h, b, "cbwebdevelopment"), encoding="utf-8")

# Monogramm allein (für Favicon/Profilbild)
for suffix, cc, bg in (("", INK, None), ("-tile", PAPER, INK)):
    body, bb = cb_mark(100, 0, 0, cc, ORANGE)
    w, h = bb[2] - bb[0], bb[3] - bb[1]
    if bg:
        T = max(w, h) * 1.45
        body = (f'<rect width="{T:.2f}" height="{T:.2f}" rx="{T*0.22:.2f}" fill="{bg}"/>'
                f'<g transform="translate({(T-w)/2 - bb[0]:.2f} {(T-h)/2 - bb[1]:.2f})">{body}</g>')
        w = h = T
    else:
        p = 6
        body = f'<g transform="translate({p - bb[0]:.2f} {p - bb[1]:.2f})">{body}</g>'
        w, h = w + 2 * p, h + 2 * p
    (OUT / f"mark-cb{suffix}.svg").write_text(svg(w, h, body, "CB"), encoding="utf-8")

print("ok", sorted(p.name for p in OUT.iterdir()))
