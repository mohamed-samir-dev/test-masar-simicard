"use client";

import Image from "next/image";

// ─── للتحكم في إظهار المحتوى لاحقاً، غيّر هذا إلى true ───
const SHOW_CONTENT = false;

export default function NewHeroSection() {
  return (
    <section dir="rtl" className="relative w-full px-3 sm:px-5 pt-20 sm:pt-10 pb-0">
      {/* ─── الصورة بـ rounded ومسافة من الجوانب ─── */}
      <div className="relative w-full rounded-2xl overflow-hidden">
        <Image
          src="/STC 5G Family Night in Riyadh.webp"
          alt="شرائح الاتصال في السعودية"
          width={1920}
          height={1080}
          priority
          quality={100}
          className="w-full h-auto block"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
