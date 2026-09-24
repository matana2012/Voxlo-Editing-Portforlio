import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B1550",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Amber accent line */}
        <div
          style={{
            width: "72px",
            height: "5px",
            background: "linear-gradient(100deg, #E8B94F, #D2A54F)",
            marginBottom: "32px",
            borderRadius: "3px",
          }}
        />
        <div
          style={{
            fontSize: "84px",
            fontWeight: "700",
            color: "#FAF8E1",
            letterSpacing: "-0.03em",
            lineHeight: "0.95",
            marginBottom: "24px",
          }}
        >
          Voxlo Editing.
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#93A2BC",
            fontWeight: "500",
          }}
        >
          Editing that keeps them watching.
        </div>
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "80px",
            fontSize: "16px",
            color: "#E8B94F",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: "500",
          }}
        >
          voxlo.org
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
