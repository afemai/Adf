"""Prepare X/Facebook profile assets: transparent logo + plantation banner."""
from PIL import Image
import os

OUT = r"C:\Users\LENOVO\Documents\Gig\_handover"
os.makedirs(OUT, exist_ok=True)

# 1. Profile photo: transparent logo (already made for the favicon)
icon = Image.open(r"C:\Users\LENOVO\Documents\adf-repo\src\app\icon.png").convert("RGBA")
icon.resize((512, 512), Image.LANCZOS).save(os.path.join(OUT, "X-FB-profile-logo.png"))
print("profile:", os.path.join(OUT, "X-FB-profile-logo.png"))

# 2. X banner: plantation aerial cropped to 1500x500 (3:1)
banner_src = Image.open(r"C:\Users\LENOVO\Documents\adf-repo\public\images\poster-plantation-aerial.jpg").convert("RGB")
w, h = banner_src.size
target_ratio = 1500 / 500
cur_ratio = w / h
if cur_ratio > target_ratio:
    nw = int(h * target_ratio)
    x0 = (w - nw) // 2
    banner = banner_src.crop((x0, 0, x0 + nw, h))
else:
    nh = int(w / target_ratio)
    y0 = (h - nh) // 2
    banner = banner_src.crop((0, y0, w, y0 + nh))
banner = banner.resize((1500, 500), Image.LANCZOS)
# subtle navy tint for brand consistency
overlay = Image.new("RGB", banner.size, (11, 36, 71))
banner = Image.blend(banner, overlay, 0.15)
banner.save(os.path.join(OUT, "X-banner-plantation.jpg"), quality=88)
print("banner:", os.path.join(OUT, "X-banner-plantation.jpg"))
