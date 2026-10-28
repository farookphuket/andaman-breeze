import React from "react";

interface HeroBannerProps {
  welcome: string;
  title: string;
  subtitle: string;
}

export function HeroBanner({ welcome, title, subtitle }: HeroBannerProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-primary to-primary-hover text-white py-16 px-4 text-center md:py-24">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="relative max-w-4xl mx-auto space-y-4">
        <span className="inline-block bg-secondary text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">
          {welcome}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-xs md:text-lg text-sky-100 max-w-xl mx-auto leading-relaxed font-light">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
