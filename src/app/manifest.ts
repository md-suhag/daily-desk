import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DailyDesk | Ultimate Daily Productivity & Typing Skills Platform",
    short_name: "DailyDesk",
    description:
      "Forge flawless muscle memory through sentence speed racing and arcade falling words with real-time telemetry.",
    start_url: "/",
    id: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#F39C12",
    orientation: "any",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
