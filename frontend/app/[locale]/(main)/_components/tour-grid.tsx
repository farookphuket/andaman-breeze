import React from "react";
import { TourCard } from "./tour-card";
import type { TourDictionary, TourPackage } from "@/core/services/tour.service";

interface TourGridProps {
  tours: TourPackage[];
  dict: TourDictionary;
  locale: string;
}

export function TourGrid({ tours, dict, locale }: TourGridProps) {
  if (tours.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
        <p className="text-slate-400 text-sm font-medium">
          {dict.common?.no_tours || "No luxury tours available right now."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} dict={dict} locale={locale} />
      ))}
    </div>
  );
}
