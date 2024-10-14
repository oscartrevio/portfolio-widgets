import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

// Export component as image content type so it can be used as favicon
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#008BF5",
        width: "100%",
        height: "100%",
        // transform so it is placed in the center
        // transform: "translate(80%, 80%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
      }}
    />,
    {
      ...size,
    },
  );
}
