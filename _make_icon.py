"""Create a transparent-background icon from the ADF logo.
Flood-fills white from the image borders so the logo's grey ring survives.
Outputs src/app/icon.png (Next.js auto-favicon, 512px) and a 64px copy."""
from PIL import Image
import sys

SRC = "public/brand/logo.jpeg"
OUT_512 = "src/app/icon.png"

img = Image.open(SRC).convert("RGB")
img = img.resize((512, 512), Image.LANCZOS)

# Flood fill from the four corners, treating near-white as background.
width, height = img.size
visited = [[False] * width for _ in range(height)]
stack = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
TOL = 30  # near-white tolerance

def is_white(px):
    return px[0] > 255 - TOL and px[1] > 255 - TOL and px[2] > 255 - TOL

for sx, sy in stack:
    if visited[sy][sx] or not is_white(img.getpixel((sx, sy))):
        continue
    frontier = [(sx, sy)]
    while frontier:
        x, y = frontier.pop()
        if visited[y][x] or not is_white(img.getpixel((x, y))):
            continue
        visited[y][x] = True
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height and not visited[ny][nx]:
                frontier.append((nx, ny))

rgba = img.convert("RGBA")
pixels = rgba.load()
for y in range(height):
    for x in range(width):
        if visited[y][x]:
            r, g, b, a = pixels[x, y]
            pixels[x, y] = (r, g, b, 0)

rgba.save(OUT_512)
rgba.resize((64, 64), Image.LANCZOS).save("public/favicon-64.png")
print("icon.png:", OUT_512, "ok")
