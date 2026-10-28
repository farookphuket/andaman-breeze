"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav({ dict }: { dict: any }) {
  const pathname = usePathname();

  const navItems = [
    { label: dict.menu?.home || "Home", path: "", icon: "🏠" },
    { label: dict.menu?.tours || "Tours", path: "/tours", icon: "🏝️" },
    { label: dict.menu?.contact || "Contact", path: "/contact", icon: "📞" },
  ];

  return (
    <>
      {/* 📱 Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-card/90 backdrop-blur-md border-t border-border flex items-center justify-around py-2 shadow-xl">
        {navItems.map((item) => {
          const fullPath = pathname.startsWith("/th")
            ? `/th${item.path}`
            : pathname.startsWith("/zh")
              ? `/zh${item.path}`
              : `/en${item.path}`;
          const isActive =
            pathname === fullPath ||
            (item.path === "" && pathname.endsWith("/th")) ||
            pathname.endsWith("/en") ||
            pathname.endsWith("/zh");

          return (
            <Link
              key={item.label}
              href={fullPath}
              className="flex flex-col items-center space-y-0.5"
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className={`text-[10px] font-bold tracking-tight ${isActive ? "text-primary font-black" : "text-slate-400"}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* 💻 Desktop Main Navigation Bar (แสดงด้านบนสุดใต้ TopNav บนจอคอม) */}
      <div className="hidden md:block bg-card border-b border-border py-2 px-6">
        <div className="max-w-7xl mx-auto flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={`/${pathname.split("/")[1]}${item.path}`}
              className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
