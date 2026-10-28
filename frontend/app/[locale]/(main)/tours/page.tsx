import React from "react";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { TourService } from "@/core/services/tour.service";
import { TourGrid } from "../_components/tour-grid";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ToursPage({ params }: PageProps) {
  const { locale } = await params;

  const [dict, tours] = await Promise.all([
    getDictionary(locale),
    TourService.getAllTours(),
  ]);

  const pageText = dict.tours;

  return (
    <div className="pb-12">
      <section className="bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <p className="text-secondary text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3">
            {pageText.eyebrow}
          </p>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            {pageText.title}
          </h1>

          <p className="mt-4 max-w-2xl text-muted-foreground text-sm md:text-base leading-relaxed">
            {pageText.description}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-8 md:pt-12 space-y-6">
        <div className="border-l-4 border-secondary pl-3">
          <h2 className="text-xl md:text-2xl font-black tracking-tight">
            {pageText.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {pageText.description}
          </p>
        </div>

        <TourGrid tours={tours} dict={dict} locale={locale} />
      </section>
    </div>
  );
}
