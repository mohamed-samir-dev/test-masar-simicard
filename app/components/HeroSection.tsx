"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay: number) => ({
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(26px)",
      transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    },
  });

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden"
    >
      {/* ─── الصورة — ديسكتوب ─── */}
      <Image
        src="/Saudi Man Relaxing Amid City Skyline.webp"
        alt="شرائح الاتصال في السعودية"
        fill
        priority
        quality={100}
        className="object-cover md:block hidden"
        style={{ objectPosition: "center 20%" }}
        sizes="100vw"
      />

      {/* ─── الصورة — موبايل ─── */}
      <Image
        src="/Golden Hour Riyadh Terrace Call.png"
        alt="شرائح الاتصال في السعودية"
        fill
        priority
        quality={100}
        className="object-cover md:hidden block"
        style={{ objectPosition: "center 15%" }}
        sizes="100vw"
      />

      {/* ─── المحتوى ─── */}
      <div className="relative z-10 flex flex-col justify-start max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-36 pb-16 md:pt-48 md:pb-40">
        <div className="w-full md:max-w-md lg:max-w-lg">

          {/* العنوان */}
          <div {...fadeUp(100)}>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-snug mb-3 md:mb-4"
              style={{
                color: "#3F4351",
                textShadow: "0 1px 12px rgba(255,255,255,0.9), 0 0px 2px rgba(255,255,255,0.6)",
              }}
            >
              شريحتك الجديدة{" "}
              <span style={{ color: "#0D72EF" }}>
                بكل سهولة وبسرعة
              </span>
            </h1>
          </div>

          {/* الوصف */}
          <div {...fadeUp(200)}>
            <p
              className="text-sm md:text-base leading-relaxed mb-6 md:mb-7 font-semibold"
              style={{
                color: "#3F4351",
                textShadow: "0 1px 8px rgba(255,255,255,0.85)",
              }}
            >
              عندنا أفضل شرائح STC وزين وموبايلي وفيرجن —
              محلية، دولية، وeSIM. اشتري الحين وتفعّل في دقايق،
              توصيل لجميع مناطق المملكة.
            </p>
          </div>

          {/* الأزرار */}
          <div {...fadeUp(300)} className="flex flex-wrap gap-3">
            <Link
              href="/sim-cards"
              className="group flex items-center gap-2 font-bold px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-md"
              style={{ background: "#0D72EF", color: "#FBFBFB" }}
            >
              تصفّح الشرائح
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1 duration-200" />
            </Link>
            <Link
              href="/all-products"
              className="flex items-center gap-2 font-bold px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: "#3F4351",
                background: "rgba(255,255,255,0.82)",
                border: "1px solid #DDDEE5",
              }}
            >
              جميع المنتجات
            </Link>
          </div>

        </div>
      </div>

      {/* ─── سهم للأسفل — ديسكتوب فقط ─── */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.75s ease 560ms",
        }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 z-10"
      >
        <span className="text-white/60 text-xs font-medium tracking-widest drop-shadow">اكتشف أكثر</span>
        <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-2 bg-white/70 rounded-full"
            style={{ animation: "scrollDot 1.6s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0);    opacity: 1; }
          80%  { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0);    opacity: 0; }
        }
      `}</style>
    </section>
  );
}
