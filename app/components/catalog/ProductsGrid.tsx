"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import ProductCard from "../products/ProductCard";
import type { Product } from "../products/types";

const ITEMS_PER_PAGE = 12;

interface Props {
  products: Product[];
  loading: boolean;
  page: number;
  onPageChange: (p: number) => void;
  emoji?: string;
}

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(13,114,239,0.08)",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(13,114,239,0.04)",
      }}
    >
      {/* image placeholder */}
      <div className="w-full aspect-[4/3] animate-pulse bg-[#EEF4FF]" />
      {/* content placeholder */}
      <div className="p-3 space-y-2.5">
        <div className="h-2.5 animate-pulse rounded-full w-1/3 bg-[#EEF4FF]" />
        <div className="h-3.5 animate-pulse rounded-full w-4/5 bg-[#EEF4FF]" />
        <div className="h-3.5 animate-pulse rounded-full w-2/3 bg-[#EEF4FF]" />
        <div className="h-px bg-[#EEF4FF] rounded-full" />
        <div className="h-5 animate-pulse rounded-full w-1/2 bg-[#EEF4FF]" />
      </div>
      <div
        className="h-10 animate-pulse mx-3 mb-3.5 rounded-xl"
        style={{ background: "rgba(13,114,239,0.08)" }}
      />
    </div>
  );
}

export default function ProductsGrid({
  products,
  loading,
  page,
  onPageChange,
  emoji = "📦",
}: Props) {
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginated = products.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const goTo = (p: number) => {
    onPageChange(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  /* ── Empty state ── */
  if (!products.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 gap-5 text-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
          style={{
            background: "rgba(13,114,239,0.07)",
            border: "1px solid rgba(13,114,239,0.15)",
          }}
        >
          {emoji}
        </motion.div>
        <div>
          <p className="text-[#1A2E44] text-lg font-black mb-1.5">
            لا توجد منتجات مطابقة
          </p>
          <p className="text-gray-400 text-sm">جرب تغيير الفلاتر أو مسحها</p>
        </div>
        <Link
          href="/"
          prefetch={false}
          className="text-sm font-bold flex items-center gap-1.5 px-5 py-2.5 rounded-full transition-all"
          style={{
            color: "#0D72EF",
            background: "rgba(13,114,239,0.07)",
            border: "1px solid rgba(13,114,239,0.2)",
          }}
        >
          <IoArrowForward size={14} />
          العودة للرئيسية
        </Link>
      </motion.div>
    );
  }

  /* ── Grid ── */
  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        <AnimatePresence mode="wait">
          {paginated.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center gap-2 mt-10"
          dir="rtl"
        >
          {/* Previous */}
          <button
            onClick={() => goTo(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-30"
            style={{
              background: "rgba(13,114,239,0.07)",
              border: "1px solid rgba(13,114,239,0.2)",
              color: "#0D72EF",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#0D72EF";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(13,114,239,0.07)";
              (e.currentTarget as HTMLButtonElement).style.color = "#0D72EF";
            }}
          >
            <IoArrowForward size={13} />
            السابق
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => goTo(n)}
              className="w-10 h-10 rounded-xl text-xs font-black transition-all"
              style={
                page === n
                  ? {
                      background:
                        "linear-gradient(135deg, #0D72EF 0%, #0558c4 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 14px rgba(13,114,239,0.35)",
                      transform: "scale(1.1)",
                      border: "none",
                    }
                  : {
                      background: "#fff",
                      border: "1px solid rgba(13,114,239,0.15)",
                      color: "#3F4351",
                    }
              }
            >
              {n}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => goTo(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-30"
            style={{
              background: "rgba(13,114,239,0.07)",
              border: "1px solid rgba(13,114,239,0.2)",
              color: "#0D72EF",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#0D72EF";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(13,114,239,0.07)";
              (e.currentTarget as HTMLButtonElement).style.color = "#0D72EF";
            }}
          >
            التالي
            <IoArrowBack size={13} />
          </button>
        </motion.div>
      )}
    </>
  );
}
