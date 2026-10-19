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

// نكرر مرتين عشان الحركة تبان سلسة بدون قطع
const track = [...partners, ...partners];

export default function TelecomPartnersSection() {
  return (
    <section dir="rtl" className="relative w-full overflow-hidden py-12 sm:py-16">
      {/* ─── خلفية ─── */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, #EEF5FF 0%, #F7F9FF 50%, #EAF1FB 100%)",
        }}
      />
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #0D72EF44, transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* ─── الرأس ─── */}
        <div className="text-center mb-8 sm:mb-10">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-4"
            style={{
              background: "#0D72EF14",
              color: "#0D72EF",
              border: "1px solid #0D72EF28",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            شبكات معتمدة
          </span>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black mb-2"
            style={{ color: "#3F4351" }}
          >
            شركات الاتصالات
          </h2>

          <p
            className="text-sm sm:text-base max-w-sm mx-auto leading-relaxed"
            style={{ color: "#6B7280" }}
          >
            جميع شرائحنا تعمل على كبرى شبكات الاتصالات في المملكة
          </p>
        </div>
      </div>

      {/* ─── شريط الـ Marquee ─── */}
      <div className="relative">
        {/* تلاشي يمين */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #F0F6FF 0%, transparent 100%)",
          }}
        />
        {/* تلاشي يسار */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #F0F6FF 0%, transparent 100%)",
          }}
        />

        {/* المسار المتحرك */}
        <div className="overflow-hidden" style={{ direction: "ltr" }}>
          <div
            className="flex items-center gap-4 sm:gap-5"
            style={{ animation: "marquee 18s linear infinite", width: "max-content" }}
          >
            {track.map((p, i) => (
              <Link
                key={i}
                href={`/all-products?brand=${encodeURIComponent(p.brand)}`}
                prefetch={false}
                className="group relative flex flex-col items-center justify-center gap-2 rounded-2xl py-4 px-6 sm:py-5 sm:px-8 shrink-0 transition-transform duration-200 hover:-translate-y-1 hover:scale-105"
                style={{
                  background: "#ffffff",
                  border: "1.5px solid #E8EEF8",
                  boxShadow: "0 2px 16px rgba(13,114,239,0.07)",
                  minWidth: "130px",
                }}
              >
                {/* الشعار */}
                <div className="flex items-center justify-center h-10">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={80}
                    height={40}
                    className="object-contain transition-opacity duration-200 group-hover:opacity-100"
                    style={{ width: "auto", height: "36px", opacity: 0.85 }}
                  />
                </div>

                {/* الاسم */}
                <span
                  className="text-xs font-bold"
                  style={{ color: "#3F4351" }}
                >
                  {p.label}
                </span>

                {/* مؤشر أسفل الكرت */}
                <span
                  className="absolute bottom-0 inset-x-0 h-0.5 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                  style={{ background: "#0D72EF" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ─── فاصل سفلي ─── */}
      <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4 px-4">
        <span
          className="flex-1 h-px max-w-[120px]"
          style={{
            background: "linear-gradient(90deg, transparent, #0D72EF44)",
          }}
        />
        <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>
          تغطية كاملة في جميع مناطق المملكة
        </span>
        <span
          className="flex-1 h-px max-w-[120px]"
          style={{
            background: "linear-gradient(270deg, transparent, #0D72EF44)",
          }}
        />
      </div>

      {/* ─── Keyframe ─── */}
      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
