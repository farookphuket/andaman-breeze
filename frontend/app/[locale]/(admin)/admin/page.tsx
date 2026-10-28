import React from "react";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  // ในอนาคตดึง Session เช็ก Spatie Roles จากหลังบ้าน Laravel
  const hasAdminAccess = true;

  if (!hasAdminAccess) {
    redirect("/login");
  }

  return (
    <div className="p-8 bg-card border border-border rounded-xl">
      <h1 className="text-2xl font-black text-primary">
        🏢 Operations & Admin Management Center
      </h1>
      <p className="text-slate-500 text-sm mt-1">
        สิทธิ์สำหรับกลุ่มพนักงาน แอดมิน ผู้บัญชาการ
        และฝ่ายบัญชีในการควบคุมหลังบ้าน
      </p>
    </div>
  );
}
