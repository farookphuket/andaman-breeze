import React from "react";
import { Metadata } from "next";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { createPageMetadata } from "@/core/seo/metadata.helper";
import "@/app/globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// 🌟 สร้าง Dynamic Metadata สำหรับ Root Layout โดยอ่านจาก Reusable Helper
export async function generateMetadata({
  params,
}: RootLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    //namespace: "common",
    namespace: "home",
    path: "",
  });
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale} data-theme="blue">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
