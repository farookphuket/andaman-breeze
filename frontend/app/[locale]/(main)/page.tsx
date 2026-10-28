import React from "react";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { TourService } from "@/core/services/tour.service";
import { HeroBanner } from "./_components/hero-banner";
import { TourGrid } from "./_components/tour-grid";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // โหลดพจนานุกรมและรายการทัวร์พร้อมกัน
  const [dict, tours] = await Promise.all([
    getDictionary(locale),
    TourService.getAllTours(),
  ]);

  return (
    <div className="space-y-10 pb-12">
      <HeroBanner
        welcome={dict.common?.welcome || "Andaman Breeze Tours"}
        title={dict.home?.hero_title || "Discover Andaman with Andaman Breeze"}
        subtitle={
          dict.common?.subtitle || "Experience ultra-luxury yacht escape."
        }
      />

      <section className="max-w-7xl mx-auto px-4 w-full space-y-6">
        <div className="border-l-4 border-secondary pl-3">
          <h2 className="text-xl md:text-2xl font-black tracking-tight">
            {dict.home?.featured_tours || "Featured Packages"}
          </h2>
        </div>

        <TourGrid tours={tours} dict={dict} locale={locale} />
      </section>
    </div>
  );
}
