"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ShoppingBag } from "lucide-react";

const navLinks = [
  {
    label: "شرائح SIM",
    href: "/sim-cards",
    children: [
      { label: "STC",         href: "/sim-cards?brand=STC" },
      { label: "موبايلي",     href: "/sim-cards?brand=موبايلي" },
      { label: "زين",         href: "/sim-cards?brand=زين" },
      { label: "فيرجن",       href: "/sim-cards?brand=Virgin" },
      { label: "سلام موبايل", href: "/sim-cards?brand=سلام موبايل" },
    ],
  },
  { label: "جميع المنتجات", href: "/all-products" },
  { label: "من نحن",        href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [mobileOpen]);

  return (
    <>
      {/* ─── الهيدر الخارجي — شفاف دائماً ─── */}
      <header dir="rtl" className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pt-4">

          {/* ── البلوكة البيضاء العائمة ── */}
          <div
            className="pointer-events-auto flex items-center justify-between h-[52px] px-4 sm:px-5 rounded-2xl transition-all duration-300 overflow-visible"
            style={{
              background: "rgba(255,255,255,0.97)",
              boxShadow: scrolled
                ? "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)"
                : "0 2px 16px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid rgba(221,222,229,0.7)",
            }}
          >
            {/* اللوغو */}
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.webp"
                alt="لوغو المتجر"
                width={48}
                height={48}
                className="h-14 w-auto rounded-xl object-contain"
                priority
                unoptimized
              />
            </Link>

            {/* روابط الديسكتوب */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold text-[#3F4351] hover:text-[#0D72EF] hover:bg-[#0D72EF]/6 transition-all duration-200"
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full right-0 w-44 transition-all duration-200 origin-top ${
                        openDropdown === link.label
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      <div className="pt-2">
                        <div
                          className="rounded-2xl overflow-hidden"
                          style={{
                            background: "white",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                            border: "1px solid #DDDEE5",
                          }}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm font-medium text-[#3F4351] hover:text-[#0D72EF] hover:bg-[#0D72EF]/5 transition-colors border-b border-gray-50 last:border-0"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-[#3F4351] hover:text-[#0D72EF] hover:bg-[#0D72EF]/6 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* أيقونة + هامبرغر */}
            <div className="flex items-center gap-1.5">
              <Link
                href="/all-products"
                className="p-2 rounded-xl text-[#3F4351] hover:text-[#0D72EF] hover:bg-[#0D72EF]/6 transition-all duration-200"
                aria-label="المنتجات"
              >
                <ShoppingBag size={18} />
              </Link>

              <button
                onClick={(e) => { e.stopPropagation(); setMobileOpen((v) => !v); }}
                className="lg:hidden p-2 rounded-xl text-[#3F4351] hover:bg-gray-100 transition-all duration-200"
                aria-label="فتح القائمة"
              >
                {mobileOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ─── قائمة الموبايل ─── */}
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className={`fixed z-40 lg:hidden transition-all duration-300 origin-top ${
          mobileOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        }`}
        style={{ top: "80px", left: "16px", right: "16px" }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.98)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
            border: "1px solid #DDDEE5",
          }}
        >
          <nav className="px-3 py-3 flex flex-col gap-0.5">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[#3F4351] font-semibold hover:bg-[#0D72EF]/6 hover:text-[#0D72EF] transition-colors text-sm"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDropdown === link.label && (
                    <div className="pr-4 flex flex-col gap-0.5 mt-0.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 rounded-xl text-sm text-[#989EA9] hover:text-[#0D72EF] hover:bg-[#0D72EF]/5 font-medium transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-[#3F4351] font-semibold hover:bg-[#0D72EF]/6 hover:text-[#0D72EF] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="mt-2 pt-2 border-t border-[#DDDEE5]">
              <Link
                href="/sim-cards"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
                style={{ background: "#0D72EF", color: "#FBFBFB" }}
              >
                اشترِ شريحتك الحين
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
