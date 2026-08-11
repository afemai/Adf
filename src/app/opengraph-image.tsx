import { ImageResponse } from "next/og";
import { promises as fs } from "fs";
import path from "path";

export const size = { width: 1200, height: 630 };
export const alt = "Afemai Descendants Forum — Unity is Power";
export const contentType = "image/png";
export const runtime = "nodejs";

// Auto-generated share card: navy + gold brand, the official logo, org name.
// The logo is read from disk at build time and embedded as a data URL so the
// card is always self-contained (satori cannot fetch relative/localhost URLs).
export default async function OpengraphImage() {
  let logo = "/brand/logo.jpeg";
  try {
    const file = path.join(process.cwd(), "public", "brand", "logo.jpeg");
    const buf = await fs.readFile(file);
    logo = `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    // keep URL reference (renders only if an absolute origin is configured)
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #060f22 0%, #0b2447 55%, #123363 100%)",
          fontFamily: "Georgia, serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 96px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <img
              src={logo}
              width={132}
              height={132}
              style={{ borderRadius: 132, objectFit: "cover", border: "3px solid #F2B705" }}
              alt=""
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: 1, lineHeight: 1.15 }}>
                AFEMHAI DESCENDANT FORUM
              </div>
              <div style={{ fontSize: 24, color: "#F2B705", letterSpacing: 10, marginTop: 12, fontWeight: 600 }}>
                UNITY IS POWER
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 44,
              display: "flex",
              gap: 14,
              fontSize: 20,
              color: "#dbe6f5",
              letterSpacing: 2,
            }}
          >
            <span>ONE PEOPLE</span>
            <span style={{ color: "#F2B705" }}>•</span>
            <span>DIVERSE COMMUNITIES</span>
            <span style={{ color: "#F2B705" }}>•</span>
            <span>SHARED HERITAGE</span>
            <span style={{ color: "#F2B705" }}>•</span>
            <span>COMMON FUTURE</span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background:
              "repeating-linear-gradient(45deg, #F2B705 0 12px, transparent 12px 24px), repeating-linear-gradient(-45deg, #123363 0 12px, transparent 12px 24px)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}