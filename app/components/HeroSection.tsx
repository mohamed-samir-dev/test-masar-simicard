"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const DESKTOP_SLIDES = [
  {
    src: "/Saudi Man Relaxing Amid City Skyline.webp",
    alt: "شرائح الاتصال في السعودية",
    position: "center 20%",
  },
  {
    src: "/Rooftop Connections at Sunset (1).webp",
    alt: "شرائح الاتصال في السعودية",
    position: "center 30%",
  },
];

const SLIDE_INTERVAL = 5000; // ms

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // auto-advance slider
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % DESKTOP_SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
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
      className="relative w-full overflow-hidden min-h-[420px] md:min-h-[600px]"
    >
      {/* ─── سلايدر الصور — ديسكتوب ─── */}
      {DESKTOP_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 hidden md:block transition-opacity duration-1000"
          style={{ opacity: i === currentSlide ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            quality={100}
            className="object-cover"
            style={{ objectPosition: slide.position }}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ─── الصورة — موبايل ─── */}
      <div className="absolute inset-0 block md:hidden">
        <Image
          src="/Golden Hour Riyadh Terrace Call.png"
          alt="شرائح الاتصال في السعودية"
          fill
          priority
          quality={100}
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
          sizes="100vw"
        />
      </div>

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

      {/* ─── دوتس السلايدر — ديسكتوب فقط ─── */}
      <div
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-2 z-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.75s ease 560ms",
        }}
      >
        {DESKTOP_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`الشريحة ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === currentSlide ? "24px" : "8px",
              height: "8px",
              background: i === currentSlide ? "#fff" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>


    </section>
  );
}
