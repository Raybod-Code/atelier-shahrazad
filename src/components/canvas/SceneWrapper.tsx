"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// ایمپورت داینامیک برای حذف SSR
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
});

export default function SceneWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // این خط فقط وقتی اجرا میشه که صفحه کامل تو مرورگر لود شده باشه
    setIsMounted(true);
  }, []);

  // تا وقتی لود نشده، هیچی نشون نده (یا یه دیو خالی)
  if (!isMounted) return <div className="fixed inset-0 bg-[#050505] -z-10" />;

  return (
    // یک کانتینر ثابت و قطعی
    <div
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: "none" }}
    >
      <Scene />
    </div>
  );
}
