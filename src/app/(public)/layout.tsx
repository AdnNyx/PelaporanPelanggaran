import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* Pasang SmoothScroll di sini untuk membungkus seluruh elemen publik */
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-slate-50">
        {/* NAVBAR */}
        <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-bold text-xl flex items-center gap-2"
            >
              <span className="text-red-600">BAWASLU</span>
              <span className="text-gray-700">KAB. TEGAL</span>
            </Link>

            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                Beranda
              </Link>
              <Link
                href="/lapor"
                className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                Lapor Pelanggaran
              </Link>
              <Link
                href="/tracking"
                className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                Cek Status
              </Link>
            </nav>
          </div>
        </header>

        {/* KONTEN HALAMAN */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-slate-300 py-8 text-center text-sm">
          <div className="container mx-auto px-4">
            <p>
              © {new Date().getFullYear()} Bawaslu Kabupaten Tegal. Hak Cipta
              Dilindungi.
            </p>
            <p className="mt-2 text-slate-500">
              Sistem Pelaporan Pelanggaran Terpadu
            </p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
