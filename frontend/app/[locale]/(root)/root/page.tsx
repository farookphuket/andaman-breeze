import React from "react";

export default async function RootSecretConsolePage() {
  // สิทธิ์ระดับสูงสุด ถูกล็อกด้วยสิทธิ์ตรงจากระบบ Database (ฮาร์ดโค้ดป้องกันสิทธิ์หลุด)
  return (
    <div className="min-h-screen bg-slate-950 text-emerald-400 p-8 font-mono space-y-4">
      <div className="border border-emerald-500/30 p-6 bg-slate-900 rounded-xl max-w-3xl">
        <div className="flex items-center gap-2 text-rose-500 font-bold mb-2 animate-pulse">
          <span>🛑 SYSLOG: EMERGENCY ROOT PROTOCOL ACTIVE</span>
        </div>
        <h1 className="text-xl font-bold text-white">
          🔐 Core Infrastructure Root Console
        </h1>
        <p className="text-slate-400 text-xs mt-2">
          Warning: This environment is restricted to the absolute superuser
          only. Changes here affect system variables, database structures, and
          high-level encryption keys.
        </p>
        <div className="mt-6 p-4 bg-black/60 rounded border border-emerald-500/10 text-xs text-emerald-500/80 space-y-1">
          <p>&gt; node --version: v20.x</p>
          <p>&gt; spatie_control: strict_mode=true</p>
          <p>&gt; current_superuser: system_assigned_root_01</p>
        </div>
      </div>
    </div>
  );
}
