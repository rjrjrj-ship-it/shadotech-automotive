import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Renders the brand icon as a favicon using the brand red + dark split
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          background: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Left half — brand dark */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 16, height: 32, background: "#333233" }} />
        {/* Right half — brand red */}
        <div style={{ position: "absolute", right: 0, top: 0, width: 16, height: 32, background: "#C62D36" }} />
        {/* S letter on top */}
        <div style={{ position: "relative", color: "white", fontSize: 18, fontWeight: 700, fontFamily: "sans-serif", zIndex: 1 }}>
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
