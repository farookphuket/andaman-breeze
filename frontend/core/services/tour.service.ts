// frontend/core/services/tour.service.ts
import { getApiUrl } from "@/core/api/client";

/**
 * ข้อความหลายภาษาใน PostgreSQL JSONB
 * ตัวอย่าง: { en: "Phi Phi Island Tour", th: "ทัวร์เกาะพีพี" }
 */
export type LocalizedText = Record<string, string>;

/**
 * ข้อมูลทัวร์หลังตรวจสอบและแปลงจาก Laravel API แล้ว
 * ราคาทั้งหมดเป็น number เพื่อให้หน้าเว็บนำไปคำนวณหรือจัดรูปแบบได้
 */
export interface TourPackage {
  id: number;
  name: LocalizedText;
  description: LocalizedText | null;
  tour_type: string;
  group_type: string;
  duration_days: number;
  duration_nights: number;
  max_seats: number;
  price_adult: number;
  price_child: number;
  price_promo: number | null;
  price_low_season: number | null;
  private_charter_price: number | null;
  metadata: unknown;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  rating: number;
  image: string;
}

/**
 * พจนานุกรมเฉพาะส่วนที่ใช้ในหน้ารายการทัวร์
 */
export interface TourDictionary {
  common?: {
    no_tours?: string;
    starting_from?: string;
    book_now?: string;
    view_details?: string;
  };
}

/**
 * รูปแบบข้อมูลดิบที่ได้รับจาก Laravel
 * Laravel อาจส่ง decimal มาเป็น string เช่น "2500.00"
 */
interface ApiTourPackage {
  id: number;
  name: LocalizedText;
  description: LocalizedText | null;
  tour_type: string;
  group_type: string;
  duration_days: number;
  duration_nights: number;
  max_seats: number;
  price_adult: string | number;
  price_child: string | number;
  price_promo: string | number | null;
  price_low_season: string | number | null;
  private_charter_price: string | number | null;
  metadata: unknown;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  rating?: unknown;
  image?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLocalizedText(value: unknown): value is LocalizedText {
  return (
    isRecord(value) &&
    Object.values(value).every((item) => typeof item === "string")
  );
}

function parseRequiredNumber(value: unknown, fieldName: string): number {
  if (
    (typeof value !== "number" && typeof value !== "string") ||
    (typeof value === "string" && value.trim() === "")
  ) {
    throw new Error(`Invalid numeric field: ${fieldName}`);
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid numeric value: ${fieldName}`);
  }

  return parsed;
}

function parseNullableNumber(value: unknown, fieldName: string): number | null {
  if (value === null) {
    return null;
  }

  return parseRequiredNumber(value, fieldName);
}

function parseApiTourPackage(value: unknown): ApiTourPackage {
  if (!isRecord(value)) {
    throw new Error("Invalid tour item: expected an object");
  }

  if (
    typeof value.id !== "number" ||
    !Number.isInteger(value.id) ||
    !isLocalizedText(value.name) ||
    !(value.description === null || isLocalizedText(value.description)) ||
    typeof value.tour_type !== "string" ||
    typeof value.group_type !== "string" ||
    typeof value.duration_days !== "number" ||
    typeof value.duration_nights !== "number" ||
    typeof value.max_seats !== "number" ||
    typeof value.is_active !== "boolean" ||
    typeof value.created_at !== "string" ||
    typeof value.updated_at !== "string" ||
    !("metadata" in value) ||
    !("price_adult" in value) ||
    !("price_child" in value) ||
    !("price_promo" in value) ||
    !("price_low_season" in value) ||
    !("private_charter_price" in value)
  ) {
    throw new Error(
      "Invalid tour item: required fields are missing or invalid",
    );
  }

  // ตรวจสอบราคา ณ จุดรับข้อมูล เพื่อไม่ให้ NaN หลุดไปถึง UI
  parseRequiredNumber(value.price_adult, "price_adult");
  parseRequiredNumber(value.price_child, "price_child");

  parseNullableNumber(value.price_promo, "price_promo");
  parseNullableNumber(value.price_low_season, "price_low_season");
  parseNullableNumber(value.private_charter_price, "private_charter_price");

  return value as unknown as ApiTourPackage;
}

export const TourService = {
  /**
   * ดึงรายการทัวร์ที่เปิดใช้งานจาก Laravel API
   * ใช้ revalidate 60 วินาทีตามพฤติกรรมเดิมของระบบ
   */
  /**
   * ดึงรายละเอียดทัวร์ที่เปิดใช้งานด้วย ID
   * คืน null เมื่อ API แจ้งว่าไม่พบรายการ (404)
   */
  async getTourById(id: number): Promise<TourPackage | null> {
    if (!Number.isInteger(id) || id < 1) {
      return null;
    }

    const response = await fetch(getApiUrl(`/api/tours/${id}`), {
      next: { revalidate: 60 },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch tour ${id}: ${response.status} ${response.statusText}`,
      );
    }

    const result: unknown = await response.json();

    if (!isRecord(result) || !("data" in result)) {
      throw new Error("Invalid tour API response: expected data object");
    }

    const tour = parseApiTourPackage(result.data);
    const priceAdult = parseRequiredNumber(tour.price_adult, "price_adult");
    const priceChild = parseRequiredNumber(tour.price_child, "price_child");
    const pricePromo = parseNullableNumber(tour.price_promo, "price_promo");
    const priceLowSeason = parseNullableNumber(
      tour.price_low_season,
      "price_low_season",
    );
    const privateCharterPrice = parseNullableNumber(
      tour.private_charter_price,
      "private_charter_price",
    );

    return {
      id: tour.id,
      name: tour.name,
      description: tour.description,
      tour_type: tour.tour_type,
      group_type: tour.group_type,
      duration_days: tour.duration_days,
      duration_nights: tour.duration_nights,
      max_seats: tour.max_seats,
      price_adult: priceAdult,
      price_child: priceChild,
      price_promo: pricePromo,
      price_low_season: priceLowSeason,
      private_charter_price: privateCharterPrice,
      metadata: tour.metadata,
      is_active: tour.is_active,
      created_at: tour.created_at,
      updated_at: tour.updated_at,
      rating:
        typeof tour.rating === "number" && Number.isFinite(tour.rating)
          ? tour.rating
          : 4.5,
      image:
        typeof tour.image === "string" && tour.image.trim() !== ""
          ? tour.image
          : getRandomTourImage(0),
    };
  },

  async getAllTours(): Promise<TourPackage[]> {
    try {
      const response = await fetch(getApiUrl("/api/tours"), {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch tours: ${response.status} ${response.statusText}`,
        );
      }

      const result: unknown = await response.json();

      if (!isRecord(result) || !Array.isArray(result.data)) {
        throw new Error("Invalid tours API response: expected data array");
      }

      return result.data.map((item: unknown, index: number) => {
        const tour = parseApiTourPackage(item);

        const priceAdult = parseRequiredNumber(tour.price_adult, "price_adult");
        const priceChild = parseRequiredNumber(tour.price_child, "price_child");

        const pricePromo = parseNullableNumber(tour.price_promo, "price_promo");
        const priceLowSeason = parseNullableNumber(
          tour.price_low_season,
          "price_low_season",
        );
        const privateCharterPrice = parseNullableNumber(
          tour.private_charter_price,
          "private_charter_price",
        );

        const rating =
          typeof tour.rating === "number" && Number.isFinite(tour.rating)
            ? tour.rating
            : 4.5 + (index % 6) * 0.1;

        const image =
          typeof tour.image === "string" && tour.image.trim() !== ""
            ? tour.image
            : getRandomTourImage(index);

        return {
          id: tour.id,
          name: tour.name,
          description: tour.description,
          tour_type: tour.tour_type,
          group_type: tour.group_type,
          duration_days: tour.duration_days,
          duration_nights: tour.duration_nights,
          max_seats: tour.max_seats,
          price_adult: priceAdult,
          price_child: priceChild,
          price_promo: pricePromo,
          price_low_season: priceLowSeason,
          private_charter_price: privateCharterPrice,
          metadata: tour.metadata,
          is_active: tour.is_active,
          created_at: tour.created_at,
          updated_at: tour.updated_at,
          rating,
          image,
        };
      });
    } catch (error) {
      console.error("TourService Error:", error);
      return [];
    }
  },
};

/**
 * ภาพสำรองสำหรับการ์ดทัวร์
 * ใช้เมื่อ API ยังไม่ได้ส่ง URL รูปภาพมา
 */
function getRandomTourImage(index: number): string {
  const images = [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600&auto=format&fit=crop",
  ];

  return images[index % images.length];
}
