import Link from "next/link";
import Image from "next/image"; // Wajib diimpor untuk menampilkan gambar di Next.js

export default function Navbar() {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* AREA LOGO & NAMA INSTANSI */}
        <Link href="/" className="flex items-center gap-3">
          {/* Logo Bawaslu */}
          <Image
            src="/images/IconBawaslu.png" // Path menuju gambar di folder public
            alt="Logo Bawaslu Kabupaten Tegal"
            width={40} // Lebar logo (silakan disesuaikan)
            height={40} // Tinggi logo (silakan disesuaikan)
            className="object-contain"
          />

          {/* Teks disusun vertikal (atas-bawah) */}
          <div className="flex flex-col">
            <span className="font-extrabold text-lg leading-none text-red-600 tracking-wide">
              BAWASLU
            </span>
            <span className="font-bold text-sm leading-tight text-slate-700 tracking-wide mt-0.5">
              KAB. TEGAL
            </span>
          </div>
        </Link>

        {/* AREA MENU NAVIGASI */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-900 transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="/lapor"
            className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
          >
            Lapor Pelanggaran
          </Link>
          <Link
            href="/tracking"
            className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
          >
            Cek Status
          </Link>
        </nav>
      </div>
    </header>
  );
}
