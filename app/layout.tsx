import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GLS Aero AWB Tracking",
  description: "Premium PWA-like AWB cargo tracking prototype for airlines"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
