import React from "react";
import Link from "next/link";
import type { TourDictionary, TourPackage } from "@/core/services/tour.service";

interface TourCardProps {
  tour: TourPackage;
  dict: TourDictionary;
  locale: string;
}

/**
 * เลือกข้อความตามภาษาที่เว็บไซต์กำลังใช้งาน
 * หากไม่มีภาษานั้น ให้ลองภาษาอังกฤษ แล้วใช้ภาษาแรกที่มี
 */
function localizedText(
  value: Record<string, string> | null,
  locale: string,
): string {
  if (!value) {
    return "";
  }

  return value[locale] ?? value.en ?? Object.values(value)[0] ?? "";
}

export function TourCard({ tour, dict, locale }: TourCardProps) {
  const name = localizedText(tour.name, locale);
  const description = localizedText(tour.description, locale);

  // แสดงราคาโปรโมชันถ้ามี มิฉะนั้นใช้ราคาผู้ใหญ่
  const startingPrice = tour.price_promo ?? tour.price_adult;

  const numberLocale =
    locale === "th" ? "th-TH" : locale === "zh" ? "zh-CN" : "en-US";

  return (
    <div className="group bg-card text-card-foreground border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Tour image */}
      <div className="relative h-44 md:h-52 bg-slate-100 overflow-hidden">
        <img
          src={tour.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <span className="absolute top-4 right-4 bg-card/95 backdrop-blur-xs text-foreground text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs">
          ⭐ {tour.rating.toFixed(1)}
        </span>
      </div>

      {/* Tour details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-extrabold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[2.75rem]">
            {name}
          </h3>

          <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Price and booking action */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">
              {dict.common?.starting_from || "Starting from"}
            </span>

            <span className="text-lg font-black text-primary">
              ฿
              {startingPrice.toLocaleString(numberLocale, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/${locale}/tours/${tour.id}`}
              className="border border-border hover:bg-muted text-foreground text-xs font-bold py-2 px-3 rounded-xl transition"
            >
              {dict.common?.view_details || "View Details"}
            </Link>
            <button
              type="button"
              className="bg-secondary hover:bg-amber-600 text-white text-xs font-bold py-2 px-3 rounded-xl transition cursor-pointer"
            >
              {dict.common?.book_now || "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
