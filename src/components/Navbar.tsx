"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Lapor Pelanggaran", href: "/lapor" },
  { name: "Cek Status", href: "/tracking" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // --- LOGIKA KLIK DI LUAR MENU ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        // Cegah menu tertutup ganda jika yang diklik adalah tombol hamburger itu sendiri
        const isHamburger = (event.target as HTMLElement).closest(
          "#hamburger-btn",
        );
        if (!isHamburger) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // --- LOGIKA KUNCI SCROLL SAAT MENU TERBUKA ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    // MENGGUNAKAN FRAGMENT AGAR MENU MOBILE BISA BERADA DI LUAR HEADER
    <>
      <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* --- LOGO --- */}
          <Link
            href="/"
            className="flex items-center gap-3 group relative z-50"
          >
            <Image
              src="/images/IconBawaslu.png"
              alt="Logo Bawaslu Kabupaten Tegal"
              width={40}
              height={40}
              className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg leading-none text-red-600 tracking-wide">
                BAWASLU
              </span>
              <span className="font-bold text-sm leading-tight text-slate-700 dark:text-slate-200 tracking-wide mt-0.5">
                KAB. TEGAL
              </span>
            </div>
          </Link>

          {/* --- MENU DESKTOP --- */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-2 text-sm font-bold transition-colors duration-300 group ${
                      isActive
                        ? "text-red-600 dark:text-red-500"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[3px] w-full bg-red-600 dark:bg-red-500 rounded-full transition-all duration-300 origin-left ${
                        isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:rotate-12 active:scale-95"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
          </div>

          {/* --- TOMBOL HAMBURGER & DARK MODE (MOBILE) --- */}
          <div className="flex items-center gap-2 md:hidden relative z-50">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 active:scale-95"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}

            <button
              id="hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-slate-900 dark:text-white active:scale-95 transition-transform"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* --- OVERLAY MOBILE MENU --- */}
      <div
        className={`fixed inset-0 bg-slate-900/20 dark:bg-black/50 backdrop-blur-sm z-[60] md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* --- PANEL MOBILE MENU YANG BENAR --- */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-slate-950 shadow-2xl z-[70] md:hidden flex flex-col pt-24 px-6 pb-6 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-4 rounded-xl text-base font-bold transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-slate-200 dark:border-slate-800 pt-6">
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 font-medium">
            &copy; 2026 Bawaslu Kab. Tegal <br /> Sistem Pelaporan Terpadu
          </p>
        </div>
      </div>
    </>
  );
}
