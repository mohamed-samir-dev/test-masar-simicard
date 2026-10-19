"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/STC 5G Family Night in Riyadh.webp",
    alt: "شرائح الاتصال في السعودية",
  },
  {
    src: "/Rooftop Connections at Sunset (1).webp",
    alt: "شرائح الاتصال في السعودية",
  },
];

const SLIDE_INTERVAL = 5000;

export default function NewHeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section dir="rtl" className="relative w-full px-3 sm:px-5 pt-20 sm:pt-10 pb-0">
      <div className="relative w-full rounded-2xl overflow-hidden">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="transition-opacity duration-1000"
            style={{
              opacity: i === current ? 1 : 0,
              position: i === 0 ? "relative" : "absolute",
              inset: i === 0 ? undefined : 0,
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1920}
              height={1080}
              priority={i === 0}
              quality={100}
              className="w-full h-auto block"
              sizes="100vw"
            />
          </div>
        ))}

        {/* ─── دوتس ─── */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`الشريحة ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
