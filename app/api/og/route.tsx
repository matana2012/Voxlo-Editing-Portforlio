import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0A09",
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
            background: "linear-gradient(100deg, #F5A623, #E8620A)",
            marginBottom: "32px",
            borderRadius: "3px",
          }}
        />
        <div
          style={{
            fontSize: "84px",
            fontWeight: "700",
            color: "#F4EEE4",
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
            color: "#A69684",
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
            color: "#F5A623",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: "500",
          }}
        >
          voxloediting.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
