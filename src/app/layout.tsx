import type React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";
import { DirectionProvider } from "@/components/ui/direction";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"], // IMPORTANT
  weight: ["300", "400", "500", "600", "700", "800", "900"], // choose what you need
});

export const metadata: Metadata = {
  title: "Chapter-14 Tutor",
  description: "AI-powered learning platform",
  icons: {
    icon: [
      {
        url: "/logo.ico",
        type: "image/x-icon",
      },
    ],
    apple: "/apple-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={arSA}>
      <html lang="ar" className="dark" dir="rtl">
        <body className={`${cairo.className} font-sans antialiased`}>
          <DirectionProvider dir="rtl">{children}</DirectionProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
