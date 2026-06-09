import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Blue accent line */}
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "#3B82F6",
            marginBottom: "32px",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            fontSize: "80px",
            fontWeight: "700",
            color: "#FAFAFA",
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
            color: "#71717A",
            fontWeight: "500",
          }}
        >
          Every frame, intentional.
        </div>
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "80px",
            fontSize: "16px",
            color: "#3B82F6",
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
