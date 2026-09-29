"""Meldê packshot: wraps the flat front label onto the blank label of the
generated jar photo (cylindrical projection, multiplied so the photo's own
light and shadow stay on the print) and cuts the jar out with its contact
shadow as a transparent RGBA master.

Inputs : .impeccable/raw/jar-squat.png          (Higgsfield Z Image, blank label)
         brand/embalagem/rotulo-frente@2x.png   (flat label artwork, 2108x800)
Output : brand/embalagem/pote-original.png      (RGBA master, same size as photo)
Run    : python tools/jar_composite.py
"""
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PHOTO = ROOT / ".impeccable/raw/jar-squat.png"
ART = ROOT / "brand/embalagem/rotulo-frente@2x.png"
OUT = ROOT / "brand/embalagem/pote-original.png"

# Measured on the photo (see README in brand/embalagem): jar axis, radius and label box.
JAR_CX, JAR_R = 1080.0, 677.0
JAR_AXIS = 1081  # silhouette symmetry axis, from lid and shoulder rows
LBL_X0, LBL_X1, LBL_Y0, LBL_Y1 = 588, 1538, 703, 1103


def flood(mask, seeds):
    h, w = mask.shape
    seen = np.zeros_like(mask)
    q = deque()
    for y, x in seeds:
        if mask[y, x] and not seen[y, x]:
            seen[y, x] = True
            q.append((y, x))
    while q:
        y, x = q.popleft()
        for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
            if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True
                q.append((ny, nx))
    return seen


def bilinear(img, xs, ys):
    h, w = img.shape[:2]
    xs = np.clip(xs, 0, w - 1.001)
    ys = np.clip(ys, 0, h - 1.001)
    x0 = np.floor(xs).astype(int)
    y0 = np.floor(ys).astype(int)
    fx = (xs - x0)[..., None]
    fy = (ys - y0)[..., None]
    a = img[y0, x0]
    b = img[y0, x0 + 1]
    c = img[y0 + 1, x0]
    d = img[y0 + 1, x0 + 1]
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy


def main():
    photo = np.asarray(Image.open(PHOTO).convert("RGB")).astype(np.float32)
    art = np.asarray(Image.open(ART).convert("RGB")).astype(np.float32)
    h, w, _ = photo.shape
    lum = photo.mean(2)
    sat = photo.max(2) - photo.min(2)

    # 1. Label: wrap the flat artwork around the cylinder and multiply it in.
    white = (lum > 170) & (sat < 30)
    label = flood(white, [((LBL_Y0 + LBL_Y1) // 2, 900)])
    ys, xs = np.nonzero(label)
    th0 = np.arcsin((LBL_X0 - JAR_CX) / JAR_R)
    th1 = np.arcsin((LBL_X1 - JAR_CX) / JAR_R)
    th = np.arcsin(np.clip((xs - JAR_CX) / JAR_R, -1, 1))
    u = (th - th0) / (th1 - th0)
    v = (ys - LBL_Y0) / (LBL_Y1 - LBL_Y0)
    ink = bilinear(art, u * (art.shape[1] - 1), v * (art.shape[0] - 1)) / 255.0
    # Paper is never perfectly white in the photo: keep its shading, print the ink over it.
    out = photo.copy()
    out[ys, xs] = photo[ys, xs] * (0.06 + 0.94 * ink)

    # 2. Matte. Backdrop = smooth quadratic fitted on clean bright neutral pixels.
    yy, xx = np.mgrid[0:h:8, 0:w:8]
    ls, ss = lum[::8, ::8], sat[::8, ::8]
    m = (ls > 225) & (ss < 10)
    basis = lambda x, y: np.stack([np.ones_like(x), x, y, x * x, y * y, x * y], -1)
    coef, *_ = np.linalg.lstsq(basis(xx[m], yy[m]), ls[m], rcond=None)
    gy, gx = np.mgrid[0:h, 0:w].astype(np.float32)
    lbg = basis(gx, gy) @ coef.astype(np.float32)
    lbg = np.maximum(lbg, lum)
    # The jar is a solid of revolution lit from the left: its left edge is clean,
    # the right one is buried in shadow and honey caustics. Take the left edge per
    # row and mirror it about the axis (lid top reflections are kept this way).
    cand = (sat >= 24) | (lum < lbg - 22)
    obj = np.zeros((h, w), bool)
    for y in range(h):
        r = np.nonzero(cand[y])[0]
        if len(r) == 0:
            continue
        xl = r[0]
        if xl >= JAR_AXIS:
            continue
        xr = min(r[-1], int(2 * JAR_AXIS - xl) + 4)
        obj[y, xl:xr + 1] = True
    # Cut the base at the glass foot: the bright low-saturation line of the glass
    # bottom. Below it is only honey-coloured light on the floor.
    cols, feet = [], []
    for x in range(520, 1680, 8):
        # scan upward: backdrop -> caustic band (saturated) -> glass line (neutral)
        y = 1300
        while y > 1150 and sat[y, x] < 45:
            y -= 1
        while y > 1150 and sat[y, x] >= 45:
            y -= 1
        if y > 1150 and lum[y, x] > 110:
            cols.append(x)
            feet.append(y)
    cols, feet = np.array(cols, float), np.array(feet, float)
    fit = np.polyfit(cols, feet, 2)
    for _ in range(2):  # drop outliers, refit
        keep = np.abs(np.polyval(fit, cols) - feet) < 14
        fit = np.polyfit(cols[keep], feet[keep], 2)
    foot = np.polyval(fit, np.arange(w)) + 2
    obj &= gy <= foot[None, :]
    obj_img = Image.fromarray((obj * 255).astype(np.uint8))
    obj_img = obj_img.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    obj = np.asarray(obj_img) > 127
    bg = ~obj
    a_obj = np.asarray(obj_img.filter(ImageFilter.GaussianBlur(1.3))).astype(np.float32) / 255.0

    # 3. Shadow: how much darker than the backdrop each background pixel is,
    # re-coloured as a neutral brown shadow (caustics become shadow, not glow).
    # A small bias drops backdrop noise; the long cast shadow is faded out
    # beyond the jar's footprint so it never ends in a hard frame edge.
    a_sh = np.clip(((lbg - lum) / np.maximum(lbg, 1) - 0.035) * 1.7, 0, 0.62) * bg
    xs_obj = np.nonzero(obj.any(0))[0]
    x0, x1 = xs_obj.min(), xs_obj.max()
    fall_x = np.clip(1 - np.maximum(0, gx - x1) / 150, 0, 1) * np.clip(1 - np.maximum(0, x0 - gx) / 150, 0, 1)
    fall_y = np.clip((gy - (foot[None, :] - 150)) / 60, 0, 1)
    a_sh *= fall_x * fall_y
    a_sh = np.asarray(Image.fromarray((a_sh * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2))).astype(np.float32) / 255.0

    alpha = np.maximum(a_obj, a_sh)
    shadow_rgb = np.array([30, 23, 18], np.float32)
    # decontaminate the object's soft edge from the white backdrop
    bgc = np.stack([lbg] * 3, -1)
    a3 = np.clip(a_obj, 1e-3, 1)[..., None]
    obj_rgb = np.clip((out - (1 - a3) * bgc) / a3, 0, 255)
    obj_rgb = np.where(a_obj[..., None] > 0.98, out, obj_rgb)
    wobj = (a_obj / np.maximum(alpha, 1e-3))[..., None]
    rgb = obj_rgb * wobj + shadow_rgb * (1 - wobj)

    rgba = np.dstack([np.clip(rgb, 0, 255), alpha * 255]).astype(np.uint8)
    im = Image.fromarray(rgba, "RGBA")
    bbox = im.getbbox()
    im = im.crop((max(bbox[0] - 24, 0), max(bbox[1] - 24, 0), min(bbox[2] + 24, w), min(bbox[3] + 24, h)))
    im.save(OUT)
    print("saved", OUT, im.size)


if __name__ == "__main__":
    main()
