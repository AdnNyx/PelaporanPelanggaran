"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden transition-colors duration-500">
      <aside className="w-64 bg-slate-900 dark:bg-black text-white flex-col hidden md:flex border-r border-slate-800 dark:border-slate-800/50 shadow-2xl z-20">
        <div className="p-6 border-b border-slate-800 dark:border-slate-900">
          <h2 className="font-black text-3xl tracking-tight flex items-center gap-1">
            <span className="text-red-600">Si-</span>Walu
          </h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-2">
            Admin Panel Bawaslu
          </p>
        </div>

        {/* Navigasi Utama */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
              pathname === "/dashboard"
                ? "bg-slate-800 dark:bg-slate-900 text-white font-bold shadow-md shadow-black/20"
                : "hover:bg-slate-800/50 dark:hover:bg-slate-900/50 text-slate-400 hover:text-white"
            }`}
          >
            <LayoutDashboard
              size={20}
              className={pathname === "/dashboard" ? "text-red-500" : ""}
            />
            <span className="text-sm">Dashboard Analitik</span>
          </Link>

          <Link
            href="/laporan"
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
              pathname?.startsWith("/laporan")
                ? "bg-slate-800 dark:bg-slate-900 text-white font-bold shadow-md shadow-black/20"
                : "hover:bg-slate-800/50 dark:hover:bg-slate-900/50 text-slate-400 hover:text-white"
            }`}
          >
            <FileText
              size={20}
              className={pathname?.startsWith("/laporan") ? "text-red-500" : ""}
            />
            <span className="text-sm">Manajemen Laporan</span>
          </Link>

          <Link
            href="/pengaturan"
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
              pathname?.startsWith("/pengaturan")
                ? "bg-slate-800 dark:bg-slate-900 text-white font-bold shadow-md shadow-black/20"
                : "hover:bg-slate-800/50 dark:hover:bg-slate-900/50 text-slate-400 hover:text-white"
            }`}
          >
            <Settings
              size={20}
              className={
                pathname?.startsWith("/pengaturan") ? "text-red-500" : ""
              }
            />
            <span className="text-sm">Pengaturan Sistem</span>
          </Link>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-800 dark:border-slate-900 space-y-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-between px-4 py-3 w-full rounded-xl bg-slate-800/50 hover:bg-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-300 hover:text-white"
            >
              <span className="flex items-center gap-3">
                {theme === "dark" ? (
                  <Sun size={18} className="text-amber-400" />
                ) : (
                  <Moon size={18} className="text-blue-400" />
                )}
                {theme === "dark" ? "Mode Terang" : "Mode Gelap"}
              </span>
              <div
                className={`w-8 h-4 rounded-full p-0.5 transition-colors ${theme === "dark" ? "bg-amber-500/20" : "bg-slate-600"}`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-4" : "translate-x-0"}`}
                />
              </div>
            </button>
          )}

          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-950/50 text-red-400 hover:text-red-300 transition-colors text-sm font-bold mt-2"
          >
            <LogOut size={20} />
            Keluar Sistem
          </Link>
        </div>
      </aside>

      <ReactLenis
        className="flex-1 h-screen overflow-y-auto"
        options={{
          lerp: 0.1,
          duration: 1.5,
          smoothWheel: true,
        }}
      >
        <main className="min-h-full p-6 md:p-8 lg:p-10 w-full max-w-[1600px] mx-auto">
          {children}
        </main>
      </ReactLenis>
    </div>
  );
}
