// frontend/app/[locale]/dictionaries.ts
import "server-only";

const dictionaries: { [key: string]: () => Promise<any> } = {
  en: () => import("../../locales/en.json").then((module) => module.default),
  th: () => import("../../locales/th.json").then((module) => module.default),
  zh: () => import("../../locales/zh.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  // หากภาษาที่ส่งมาไม่รองรับ ให้ดีดกลับไปเป็นภาษาอังกฤษ (en) ป้องกันระบบล่ม
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries["en"]();
};
