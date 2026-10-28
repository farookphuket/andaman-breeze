/**
 * ฟังก์ชันสำหรับแปลง Path ให้เป็น Absolute URL รองรับสถาปัตยกรรม Docker Gateway
 * แยกแยะเส้นทางระหว่างฝั่ง Server-Side (Next.js Node) และ Client-Side (Browser)
 */
export function getApiUrl(path: string): string {
  // ตรวจสอบว่าทำงานอยู่ที่ฝั่ง Server หรือฝั่ง Browser
  const isServer = typeof window === "undefined";

  if (isServer) {
    // ฝั่ง Server: คุยภายใน Docker Network วิ่งหาตู้ reverse-proxy โดยตรง
    const serverUrl = process.env.NEXT_API_URL || "http://reverse-proxy";
    // ทำความสะอาด path ป้องกันการซ้ำซ้อนของเครื่องหมาย /
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${serverUrl}${cleanPath}`;
  }

  // ฝั่ง Client (Browser): คุยจากภายนอกผ่านพอร์ตหน้าบ้านปกติของเครื่อง Host
  const clientUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${clientUrl}${cleanPath}`;
}
