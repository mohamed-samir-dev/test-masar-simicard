"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoCheckmarkCircle,
  IoFlashOutline,
  IoWifiOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import type { Product } from "./types";
import { useCartStore } from "../../store/cartStore";

const fmt = (n: number) => n.toLocaleString("en-US");
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const resolveImg = (src: string) =>
  src.startsWith("http") ? src : `${API}${src.startsWith("/") ? src : "/" + src}`;

export default function ProductCard({
  product,
  priority = false,
  rank,
}: {
  product: Product;
  priority?: boolean;
  rank?: number;
}) {
  const {
    name,
    discountPercent = 0,
    brand,
    inStock,
    installment,
    network,
  } = product;

  const image = product.images?.[0] || product.image;
  const resolvedImage = image ? resolveImg(image) : undefined;
  const originalPrice = product.originalPrice || product.price || 0;
  const salePrice =
    product.salePrice && product.salePrice > 0 ? product.salePrice : undefined;
  const hasDiscount = salePrice != null && salePrice < originalPrice;
  const displayPrice = hasDiscount ? salePrice : originalPrice;
  const savings = hasDiscount ? originalPrice - salePrice : 0;

  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [toast, setToast] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (added) return;
    addItem(product);
    setAdded(true);
    setToast(true);
    setTimeout(() => {
      setToast(false);
      setAdded(false);
      window.scrollTo(0, 0);
      router.push("/cart");
    }, 1100);
  };

  return (
    <>
      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed top-5 right-5 z-50 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, #0D72EF 0%, #0558c4 100%)",
              boxShadow: "0 8px 32px rgba(13,114,239,0.35)",
            }}
          >
            <IoCheckmarkCircle size={20} />
            تمت إضافة الباقة للسلة
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative h-full"
      >
        <Link
          href={`/product/${product._id}`}
          prefetch={false}
          dir="rtl"
          className="group relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(13,114,239,0.1)",
            boxShadow:
              "0 2px 8px rgba(13,114,239,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* Hover glow border */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
            style={{
              boxShadow: "0 0 0 1.5px rgba(13,114,239,0.35), 0 8px 36px rgba(13,114,239,0.12)",
            }}
          />

          {/* ══ IMAGE ZONE ══ */}
          <div className="relative w-full overflow-hidden bg-[#F4F8FF]">

            {/* Discount badge */}
            {hasDiscount && discountPercent > 0 && (
              <div
                className="absolute top-2.5 left-2.5 z-30 text-[9px] font-black px-2 py-0.5 rounded-lg leading-none"
                style={{
                  background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(239,68,68,0.4)",
                }}
              >
                -{discountPercent}%
              </div>
            )}

            {/* Rank badge */}
            {rank != null && (
              <div
                className="absolute top-2.5 right-2.5 z-30 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-lg"
                style={
                  rank === 1
                    ? {
                        background: "linear-gradient(135deg, #0D72EF 0%, #0558c4 100%)",
                        color: "#ffffff",
                        boxShadow: "0 2px 10px rgba(13,114,239,0.45)",
                      }
                    : {
                        background: "rgba(13,114,239,0.1)",
                        color: "#0D72EF",
                        border: "1px solid rgba(13,114,239,0.25)",
                      }
                }
              >
                {rank}
              </div>
            )}

            {/* Product image */}
            {resolvedImage ? (
              <Image
                src={resolvedImage}
                alt={name}
                width={600}
                height={600}
                className="w-full h-auto object-cover block max-h-32 sm:max-h-48 transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={priority}
                loading={priority ? "eager" : "lazy"}
              />
            ) : (
              <div className="flex items-center justify-center h-28 sm:h-40 text-4xl sm:text-5xl">
                📱
              </div>
            )}
          </div>

          {/* ══ CONTENT ZONE ══ */}
          <div className="flex flex-col flex-1 px-3 sm:px-4 pt-2.5 sm:pt-3 pb-3 sm:pb-4 gap-2">

            {/* Brand + network row */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {brand && (
                <span
                  className="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider leading-none"
                  style={{
                    background: "rgba(13,114,239,0.08)",
                    border: "1px solid rgba(13,114,239,0.18)",
                    color: "#0D72EF",
                  }}
                >
                  {brand}
                </span>
              )}
              {network && (
                <span
                  className="flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md leading-none"
                  style={{
                    background: "rgba(63,67,81,0.07)",
                    border: "1px solid rgba(63,67,81,0.15)",
                    color: "#3F4351",
                  }}
                >
                  <IoWifiOutline size={8} />
                  {network}
                </span>
              )}
            </div>

            {/* Product name */}
            <h3 className="text-[11px] sm:text-[13px] font-bold leading-[1.4] line-clamp-2 flex-1"
              style={{ color: "#1A2E44" }}>
              {name}
            </h3>

            {/* Divider */}
            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(13,114,239,0.18), rgba(13,114,239,0.05) 60%, transparent)",
              }}
            />

            {/* Price block */}
            <div className="flex items-end justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                {hasDiscount && (
                  <span className="text-[10px] line-through leading-none text-gray-400">
                    {fmt(originalPrice)} ر.س
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-[18px] sm:text-[24px] font-black leading-none tracking-tight"
                    style={{ color: hasDiscount ? "#0D72EF" : "#1A2E44" }}
                  >
                    {fmt(displayPrice!)}
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 mb-0.5">
                    ر.س
                  </span>
                </div>
              </div>

              {hasDiscount && savings > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="shrink-0 text-center"
                >
                  <div className="text-[8px] text-gray-400 leading-none mb-0.5">وفّرت</div>
                  <div
                    className="text-[9px] font-black px-2 py-0.5 rounded-lg leading-none whitespace-nowrap"
                    style={{
                      background: "rgba(13,114,239,0.08)",
                      border: "1px solid rgba(13,114,239,0.2)",
                      color: "#0D72EF",
                    }}
                  >
                    {fmt(savings)} ر.س
                  </div>
                </motion.div>
              )}
            </div>

            {/* CTA button */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              className={`cart-btn ${added ? "added" : ""}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2"
                  >
                    <IoCheckmarkCircle size={16} />
                    تمت الإضافة
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2"
                  >
                    <IoFlashOutline size={15} />
                    اختار الباقة
                    <IoArrowForwardOutline size={13} className="opacity-70" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
