"""Meldê image pipeline: crop, grade and export the direction photography as
responsive WebP files in assets/img/.

Grading pulls caramel/doce-de-leite browns toward honey gold (hue ~40deg) only
on the product pixels, so backdrops keep their chocolate tone.

Run: python tools/process_images.py
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / ".impeccable/raw"
OUT = ROOT / "assets/img"
OUT.mkdir(parents=True, exist_ok=True)

# name: (source, crop box as fractions (l, t, r, b) or None, gold pull 0..1, widths)
PHOTOS = {
    "colher-puxa":     ("hero-pull3.png",     None,                      0.15, (720, 1200, 1600)),
    "colher-pote":     ("pull-01.png",        (0, 0, 1, 0.92),           0.25, (720, 1200)),
    "textura-dobra":   ("texture-fold.png",   (0.12, 0, 1, 1),           0.20, (800, 1400)),
    "textura-macro":   ("texture-macro.png",  None,                      0.55, (800, 1400)),
    "textura-faca":    ("spread2.png",        None,                      0.70, (800, 1400)),
    "colherada":       ("dollop-spoon.png",   None,                      0.25, (720, 1200, 1800)),
    "momento-banana":  ("banana2.png",        None,                      0.30, (720, 1200)),
    "momento-pao":     ("torrada2.png",       None,                      0.75, (720, 1200)),
    "momento-panqueca": ("panqueca2.png",     None,                      0.30, (720, 1200)),
    "momento-iogurte": ("iogurte2.png",       None,                      0.30, (720, 1200)),
    "momento-aveia":   ("aveia2.png",         None,                      0.55, (720, 1200)),
    "momento-pre":     ("pre-treino.png",     (0, 0.12, 0.66, 1),        0.40, (720, 1200)),
    "protein-teaser":  ("protein2.png",       (0, 0, 0.72, 1),           0.20, (800, 1400)),
}
JAR = ROOT / "brand/embalagem/pote-original.png"


def rgb_to_hsv(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(-1), a.min(-1)
    d = mx - mn + 1e-6
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    s = np.where(mx > 0, (mx - mn) / (mx + 1e-6), 0)
    return h, s, mx


def hsv_to_rgb(h, s, v):
    c = v * s
    hp = (h % 360) / 60
    x = c * (1 - np.abs(hp % 2 - 1))
    z = np.zeros_like(h)
    conds = [(hp < 1), (hp < 2), (hp < 3), (hp < 4), (hp < 5), (hp >= 5)]
    rgbs = [(c, x, z), (x, c, z), (z, c, x), (z, x, c), (x, z, c), (c, z, x)]
    r = np.select(conds, [t[0] for t in rgbs])
    g = np.select(conds, [t[1] for t in rgbs])
    b = np.select(conds, [t[2] for t in rgbs])
    m = v - c
    return np.stack([r + m, g + m, b + m], -1)


def grade(img, pull):
    """Pull product hues (18-40deg, saturated, mid-bright) toward honey gold."""
    a = np.asarray(img.convert("RGB")).astype(np.float32) / 255
    h, s, v = rgb_to_hsv(a)
    lo = 0.28 if pull <= 0.5 else 0.16
    w = np.clip((s - lo) / 0.22, 0, 1) * np.clip((v - 0.30) / 0.25, 0, 1)
    w *= np.clip(1 - np.abs(h - 30) / 22, 0, 1)
    w *= pull
    h2 = h + (41 - h) * w
    v2 = np.clip(v * (1 + 0.10 * w), 0, 1)
    s2 = np.clip(s * (1 + (0.06 if pull <= 0.5 else 0.42) * w), 0, 1)
    out = hsv_to_rgb(h2, s2, v2)
    return Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))


def export(im, name, widths, quality=80):
    for wd in widths:
        wd = min(wd, im.width)
        hd = round(im.height * wd / im.width)
        im.resize((wd, hd), Image.LANCZOS).save(OUT / f"{name}-{wd}.webp", "WEBP", quality=quality, method=6)
    print(f"{name}: {im.size} -> {[min(w, im.width) for w in widths]}")


def main():
    for name, (src, crop, pull, widths) in PHOTOS.items():
        im = Image.open(RAW / src).convert("RGB")
        if crop:
            l, t, r, b = crop
            im = im.crop((round(l * im.width), round(t * im.height), round(r * im.width), round(b * im.height)))
        if pull:
            im = grade(im, pull)
        export(im, name, widths)
    jar = Image.open(JAR)
    a = np.asarray(jar)[..., 3]
    jar.putalpha(Image.fromarray(np.where(a < 6, 0, a).astype(np.uint8)))
    jar = jar.crop(jar.getbbox())
    export(jar, "pote-original", (640, 1100, 1518), quality=84)


if __name__ == "__main__":
    main()
