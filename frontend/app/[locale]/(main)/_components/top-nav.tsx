"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/core/providers/theme-provider";

export function TopNav({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border px-3 sm:px-4 py-2.5 flex items-center justify-between shadow-xs">
      {/* ⚓ Left Side: Responsive Brand Logo */}
      <Link href={`/${locale}`} className="flex items-center gap-1.5 shrink-0">
        {/* 📱 ตัวเลือกที่ 1: แสดงตัวย่อ "A.BREEZE" หรือ "AP" บนจอมือถือ และชื่อเต็มบนจอใหญ่ */}
        <span className="text-sm sm:text-lg font-black uppercase tracking-wider text-primary">
          {/* แสดงบนจอมือถือ (< sm) */}
          <span className="inline sm:hidden">
            A.<span className="text-secondary">BREEZE</span>
          </span>
          {/* แสดงบนจอใหญ่ (>= sm) */}
          <span className="hidden sm:inline">
            Andaman <span className="text-secondary">Breeze</span>
          </span>
        </span>
      </Link>

      {/* ⚙️ Right Side: Global Settings Only */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* 🎨 Theme Switcher Dropdown */}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as any)}
          className="bg-background text-foreground text-[11px] sm:text-xs font-bold border border-border px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg focus:outline-hidden cursor-pointer"
        >
          <option value="blue">🔵 Blue</option>
          <option value="green">🟢 Green</option>
          <option value="red">🔴 Red</option>
          <option value="gray">⚫ Gray</option>
          <option value="dark">🌙 Dark</option>
        </select>

        {/* 🌐 Language Switcher Buttons */}
        <div className="flex gap-0.5 sm:gap-1 bg-background p-0.5 sm:p-1 rounded-lg border border-border">
          {["en", "th", "zh"].map((lang) => (
            <button
              key={lang}
              onClick={() => changeLocale(lang)}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[10px] font-black uppercase transition-all cursor-pointer ${
                locale === lang
                  ? "bg-primary text-white shadow-xs"
                  : "text-slate-400 hover:text-foreground"
              }`}
            >
              {lang === "zh" ? "中" : lang}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
