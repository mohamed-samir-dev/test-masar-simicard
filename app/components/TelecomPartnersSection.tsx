"use client";

import Image from "next/image";
import Link from "next/link";

const partners = [
  { src: "/stc.webp",     alt: "STC",          brand: "STC",           label: "اس تي سي" },
  { src: "/mobilay.webp", alt: "Mobily",        brand: "موبايلي",       label: "موبايلي"  },
  { src: "/zein.webp",    alt: "Zain",          brand: "زين",           label: "زين"      },
  { src: "/vergin.webp",  alt: "Virgin Mobile", brand: "Virgin Mobile", label: "فيرجن"    },
  { src: "/sslam.webp",   alt: "Salam",         brand: "سلام موبايل",   label: "سلام"     },
];

// نكرر 3 مرات عشان الحركة تبقى سلسة
const track = [...partners, ...partners, ...partners];

export default function TelecomPartnersSection() {
  return (
    <section dir="rtl" className="w-full py-12 sm:py-16 overflow-hidden">

      {/* ── العنوان ── */}
      <div className="text-center mb-10 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
          شركات الاتصالات
        </h2>
        <p className="text-sm text-gray-400 font-medium">
          تصفح الشرائح حسب الشبكة التي تناسبك
        </p>
        {/* خط تحت العنوان */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="h-px w-16 bg-gray-200 rounded-full" />
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="h-px w-16 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* ── شريط الأنيميشن ── */}
      <div className="relative" style={{ direction: "ltr" }}>
        {/* تلاشي يسار */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        {/* تلاشي يمين */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <div className="flex animate-marquee-rtl gap-4 sm:gap-5 w-max">
          {track.map((p, i) => (
            <Link
              key={i}
              href={`/all-products?brand=${encodeURIComponent(p.brand)}`}
              prefetch={false}
              className="group relative flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
              style={{
                width: "clamp(110px, 18vw, 150px)",
                aspectRatio: "1 / 1",
              }}
            >
              {/* الصورة كخلفية */}
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="150px"
                className="object-contain p-5 transition-transform duration-500 group-hover:scale-110"
              />

              {/* اسم الشركة يظهر عند الـ hover */}
              <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold text-gray-700 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  {p.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}
