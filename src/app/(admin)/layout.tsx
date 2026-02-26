"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";
import { ReactLenis } from "@studio-freight/react-lenis"; // Import Lenis langsung ke sini

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <h2 className="font-bold text-2xl tracking-tight">
            <span className="text-red-500">Si-</span>Walu
          </h2>
          <p className="text-xs text-slate-400 mt-1">Admin Panel Bawaslu</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              pathname === "/dashboard"
                ? "bg-slate-800 text-white font-semibold"
                : "hover:bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <LayoutDashboard
              size={20}
              className={pathname === "/dashboard" ? "text-red-500" : ""}
            />
            <span className="font-medium text-sm">Dashboard Analitik</span>
          </Link>

          <Link
            href="/laporan"
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              pathname?.startsWith("/laporan")
                ? "bg-slate-800 text-white font-semibold"
                : "hover:bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <FileText
              size={20}
              className={pathname?.startsWith("/laporan") ? "text-red-500" : ""}
            />
            <span className="font-medium text-sm">Manajemen Laporan</span>
          </Link>

          <Link
            href="/pengaturan"
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              pathname?.startsWith("/pengaturan")
                ? "bg-slate-800 text-white font-semibold"
                : "hover:bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Settings
              size={20}
              className={
                pathname?.startsWith("/pengaturan") ? "text-red-500" : ""
              }
            />
            <span className="font-medium text-sm">Pengaturan Sistem</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-md hover:bg-red-950 text-red-400 transition-colors text-sm font-medium"
          >
            <LogOut size={20} />
            Keluar (Logout)
          </Link>
        </div>
      </aside>

      {/* AREA KONTEN UTAMA DENGAN LENIS KHUSUS */}
      {/* Kita ganti tag <main> dengan <ReactLenis> dan mematikan mode 'root' */}
      <ReactLenis
        className="flex-1 h-screen overflow-y-auto p-8"
        options={{
          lerp: 0.1,
          duration: 1.5,
          smoothWheel: true,
        }}
      >
        <main>{children}</main>
      </ReactLenis>
    </div>
  );
}
