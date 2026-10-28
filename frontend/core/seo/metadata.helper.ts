import { Metadata } from "next";
import { getDictionary } from "@/app/[locale]/dictionaries";

export interface PageMetadataOptions {
  locale: string;
  /** Key ใน Dictionary เช่น "home" หรือ "tours" */
  namespace?: string;
  /** fallbackTitle ในกรณีที่ไม่เจอ Key ใน Dictionary */
  fallbackTitle?: string;
  /** fallbackDescription ในกรณีที่ไม่เจอ Key ใน Dictionary */
  fallbackDescription?: string;
  /** กรณีเป็นหน้าทัวร์หรือบทความ สามารถส่งข้อมูลตรงเข้ามาทับได้ */
  override?: {
    title?: string;
    description?: string;
    images?: string[];
  };
  /** กำหนด Path ของหน้าปัจจุบัน เช่น "/tours" หรือ "/contact" */
  path?: string;
}

/**
 * Reusable Helper สำหรับสร้าง Dynamic SEO Metadata รองรับ i18n & OpenGraph
 */
export async function createPageMetadata({
  locale,
  namespace = "common",
  fallbackTitle = "Andaman Breeze Tours - Luxury Cruise & Yacht Service",
  fallbackDescription = "Ultra-luxury marine experiences in the Andaman Sea",
  override,
  path = "",
}: PageMetadataOptions): Promise<Metadata> {
  let title = fallbackTitle;
  let description = fallbackDescription;

  try {
    // ดึง Dictionary แปลภาษาตาม locale ปัจจุบัน
    const dict = await getDictionary(locale);
    const ns = dict[namespace] || dict["common"] || {};

    // อ่านค่าจาก Dictionary
    title = override?.title || ns?.meta_title || ns?.title || fallbackTitle;
    description =
      override?.description ||
      ns?.meta_description ||
      ns?.subtitle ||
      fallbackDescription;
  } catch (error) {
    console.warn(
      `[SEO Metadata Warning]: Could not load dictionary for locale "${locale}"`,
    );
  }

  // สร้าง Absolute Canonical URL สำหรับ SEO
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost";
  const canonicalUrl = `${baseUrl}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en${path}`,
        th: `${baseUrl}/th${path}`,
        zh: `${baseUrl}/zh${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Andaman Breeze Tours",
      locale: locale === "th" ? "th_TH" : locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: override?.images || [
        {
          url: `${baseUrl}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
