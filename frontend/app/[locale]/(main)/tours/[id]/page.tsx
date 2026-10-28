import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { TourService } from "@/core/services/tour.service";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

function localizedText(
  value: Record<string, string> | null,
  locale: string,
): string {
  if (!value) return "";
  return value[locale] ?? value.en ?? Object.values(value)[0] ?? "";
}

function formatPrice(value: number, locale: string): string {
  const numberLocale =
    locale === "th" ? "th-TH" : locale === "zh" ? "zh-CN" : "en-US";

  return new Intl.NumberFormat(numberLocale, {
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function TourDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  const tourId = Number(id);

  if (!/^\d+$/.test(id) || !Number.isSafeInteger(tourId) || tourId < 1) {
    notFound();
  }

  const [dict, tour] = await Promise.all([
    getDictionary(locale),
    TourService.getTourById(tourId),
  ]);

  if (!tour) notFound();

  const text = dict.tour_detail;
  const name = localizedText(tour.name, locale);
  const description = localizedText(tour.description, locale);
  const startingPrice = tour.price_promo ?? tour.price_adult;

  const prices = [
    { label: text.adult_price, value: tour.price_adult },
    { label: text.child_price, value: tour.price_child },
    ...(tour.price_promo !== null
      ? [{ label: text.promo_price, value: tour.price_promo }]
      : []),
    ...(tour.price_low_season !== null
      ? [{ label: text.low_season_price, value: tour.price_low_season }]
      : []),
    ...(tour.private_charter_price !== null
      ? [{ label: text.charter_price, value: tour.private_charter_price }]
      : []),
  ];

  return (
    <div className="pb-12">
      <section className="bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <p className="text-secondary text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3">
            {text.eyebrow}
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            {name}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            ⭐ {tour.rating.toFixed(1)}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="overflow-hidden rounded-2xl bg-muted">
            <img
              src={tour.image}
              alt={name}
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-muted-foreground mb-2">
                {text.description}
              </p>
              <p className="leading-relaxed whitespace-pre-line">
                {description || name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">{text.duration}</p>
                <p className="mt-1 font-bold">
                  {tour.duration_days} {text.days}
                  {tour.duration_nights > 0
                    ? ` / ${tour.duration_nights} ${text.nights}`
                    : ""}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">{text.max_seats}</p>
                <p className="mt-1 font-bold">{tour.max_seats}</p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">{text.tour_type}</p>
                <p className="mt-1 font-bold">{tour.tour_type}</p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">{text.group_type}</p>
                <p className="mt-1 font-bold">{tour.group_type}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                {dict.common?.starting_from || "Starting from"}
              </p>
              <p className="mt-1 text-3xl font-black text-primary">
                ฿{formatPrice(startingPrice, locale)}
              </p>
              <div className="mt-4 divide-y divide-border">
                {prices.map((price) => (
                  <div
                    key={price.label}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <span className="text-muted-foreground">{price.label}</span>
                    <span className="font-bold">
                      ฿{formatPrice(price.value, locale)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={`/${locale}/tours`}
              className="inline-flex rounded-xl border border-border px-4 py-3 text-sm font-bold hover:bg-muted transition"
            >
              ← {text.back_to_tours}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
