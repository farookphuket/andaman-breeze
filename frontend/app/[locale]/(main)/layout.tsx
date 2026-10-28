import React from "react";
import { TopNav } from "./_components/top-nav";
import { BottomNav } from "./_components/bottom-nav";
import { getDictionary } from "@/app/[locale]/dictionaries";

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 bg-background text-foreground">
      <TopNav locale={locale} />
      <BottomNav dict={dict} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
