import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  FileText,
  Search,
  Lock,
  Clock,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* KONTEN UTAMA BERANDA */}
      <main className="flex-1">
        <section className="relative pt-20 pb-32 overflow-hidden border-b bg-[url('/images/bawaslu.png')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/50 z-0"></div>

          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 z-0"></div>

          <div className="container relative mx-auto px-4 text-center z-10">
            <div className="inline-flex items-center rounded-full border border-red-200 bg-white/80 px-4 py-1.5 text-sm text-red-700 mb-8 font-medium shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-red-600 mr-2 animate-pulse"></span>
              Si-Walu: Sistem Pelaporan Pelanggaran Pemilu Terpadu
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-5xl mx-auto leading-tight">
              Kawal Demokrasi <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                Bersama Bawaslu Tegal
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-800 mb-10 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-sm">
              Temukan dugaan pelanggaran pemilu? Jangan diam. Laporkan secara
              online dengan mudah, aman, dan pantau tindak lanjutnya secara
              real-time.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-4">
              <Link href="/lapor" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full text-base h-14 px-8 bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all rounded-full"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Buat Laporan Sekarang
                </Button>
              </Link>
              <Link href="/tracking" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-base h-14 px-8 border-2 border-slate-300 hover:border-slate-400 bg-white text-slate-800 rounded-full shadow-sm"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Cek Status Laporan
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-900 text-white relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-sm font-semibold text-red-500 uppercase tracking-wider">
                Transparansi Publik
              </h2>
              <p className="text-3xl font-bold mt-2">
                Data Penanganan Pelanggaran 2026
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-800">
              <div className="px-4">
                <div className="text-4xl font-extrabold text-white mb-2">
                  124
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  Laporan Masuk
                </div>
              </div>
              <div className="px-4">
                <div className="text-4xl font-extrabold text-blue-400 mb-2">
                  18
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  Sedang Diverifikasi
                </div>
              </div>
              <div className="px-4">
                <div className="text-4xl font-extrabold text-yellow-400 mb-2">
                  8
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  Proses Kajian
                </div>
              </div>
              <div className="px-4">
                <div className="text-4xl font-extrabold text-green-400 mb-2">
                  92
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  Selesai Ditindak
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Bagaimana Cara Melapor?
              </h2>
              <p className="text-slate-600 text-lg">
                Proses pelaporan dirancang agar sangat mudah diakses oleh
                seluruh lapisan masyarakat Kabupaten Tegal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 transform rotate-3">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  1. Isi Formulir
                </h3>
                <p className="text-slate-600 text-sm">
                  Ceritakan kronologi kejadian secara detail dan unggah bukti
                  foto/video pendukung.
                </p>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] border-t-2 border-slate-200 border-dashed"></div>
              </div>

              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 -transform rotate-3">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  2. Terima Tiket
                </h3>
                <p className="text-slate-600 text-sm">
                  Sistem akan mengamankan data Anda dan memberikan Nomor Tiket
                  unik untuk pelacakan.
                </p>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] border-t-2 border-slate-200 border-dashed"></div>
              </div>

              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 transform rotate-3">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  3. Verifikasi
                </h3>
                <p className="text-slate-600 text-sm">
                  Tim Bawaslu akan memverifikasi syarat formil dan materiil dari
                  laporan Anda.
                </p>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] border-t-2 border-slate-200 border-dashed"></div>
              </div>

              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 -transform rotate-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  4. Tindak Lanjut
                </h3>
                <p className="text-slate-600 text-sm">
                  Laporan diproses sesuai regulasi. Anda akan mendapat email
                  notifikasi setiap ada update.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-red-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                <ShieldCheck className="w-96 h-96" />
              </div>

              <div className="relative z-10 md:w-2/3">
                <h2 className="text-3xl font-bold mb-4">
                  Privasi Anda Adalah Prioritas Kami
                </h2>
                <p className="text-red-100 text-lg mb-8 leading-relaxed">
                  Platform ini dilengkapi dengan teknologi enkripsi modern.
                  Identitas pelapor dilindungi secara hukum dan hanya digunakan
                  untuk keperluan klarifikasi internal Bawaslu.
                </p>
                <ul className="space-y-3 text-red-50">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-red-300" />{" "}
                    Pelaporan bisa dilakukan secara anonim (opsional).
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-red-300" />{" "}
                    Perlindungan data dari akses tidak sah.
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-red-300" /> Sesuai
                    dengan standar keamanan e-Government.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
