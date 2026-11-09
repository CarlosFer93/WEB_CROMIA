import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "CromIA — Automatización inteligente para un mundo en evolución";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const extraBold = await readFile(join(process.cwd(), "assets/fonts/Poppins-ExtraBold.ttf"));
const medium = await readFile(join(process.cwd(), "assets/fonts/Poppins-Medium.ttf"));
const isotipo = await readFile(join(process.cwd(), "public/brand/cromia-isotipo.png"));
const logoSrc = `data:image/png;base64,${isotipo.toString("base64")}`;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          backgroundColor: "#0B2D5B",
          backgroundImage:
            "radial-gradient(circle at 88% 20%, rgba(37,99,235,0.55) 0%, rgba(11,45,91,0) 45%), radial-gradient(circle at 75% 95%, rgba(16,185,129,0.40) 0%, rgba(11,45,91,0) 45%)",
          fontFamily: "Poppins",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={logoSrc} width={120} height={120} alt="" />
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, letterSpacing: -2 }}>
            <span style={{ color: "white" }}>Crom</span>
            <span style={{ color: "#10B981" }}>IA</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: 950,
          }}
        >
          Automatizamos procesos con IA para impulsar el futuro de tu negocio
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 26, fontWeight: 500, color: "#CBD5E1" }}>
          Inteligencia que transforma procesos.
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 10,
            backgroundImage: "linear-gradient(90deg, #2563EB, #10B981)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: extraBold, weight: 800, style: "normal" },
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
