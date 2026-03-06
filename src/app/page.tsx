import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  FileText,
  Search,
  Lock,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-500 selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative pt-24 pb-40 overflow-hidden border-b dark:border-slate-800 bg-[url('/images/bawaslu.png')] bg-cover bg-center bg-no-repeat bg-fixed group">
          <div className="absolute inset-0 bg-white/85 dark:bg-slate-950/90 transition-colors duration-500 z-0"></div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-red-500/5 to-transparent pointer-events-none z-0"></div>

          <div className="container relative mx-auto px-4 text-center z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border border-red-200/60 dark:border-red-500/30 bg-white/90 dark:bg-slate-900/80 px-5 py-2 text-sm text-red-700 dark:text-red-400 mb-8 font-semibold shadow-sm hover:scale-105 hover:shadow-md transform-gpu transition-all duration-300 cursor-default">
              <span className="relative flex h-2.5 w-2.5 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 dark:bg-red-500"></span>
              </span>
              Si-Walu: Sistem Pelaporan Pelanggaran Pemilu Terpadu
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 max-w-5xl mx-auto leading-tight transition-colors duration-500">
              Kawal Demokrasi <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-800 dark:from-red-500 dark:via-red-400 dark:to-red-700">
                Bersama Bawaslu Tegal
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm transition-colors duration-500">
              Temukan dugaan pelanggaran pemilu? Jangan diam. Laporkan secara
              online dengan mudah, aman, dan pantau tindak lanjutnya secara
              real-time.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-4">
              <Link href="/lapor" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full text-base h-14 px-8 bg-red-600 hover:bg-red-700 text-white shadow-xl hover:shadow-red-600/25 transition-all duration-300 rounded-full group/btn transform-gpu hover:-translate-y-1"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Buat Laporan Sekarang
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                </Button>
              </Link>
              <Link href="/tracking" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-base h-14 px-8 border-2 border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-slate-500 bg-white/90 dark:bg-slate-900/90 hover:bg-slate-900 dark:hover:bg-slate-800 hover:text-white dark:hover:text-white text-slate-800 dark:text-slate-200 rounded-full shadow-sm transition-all duration-300 transform-gpu hover:-translate-y-1"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Cek Status Laporan
                </Button>
              </Link>
            </div>
          </div>

          {/* RUNNING TEXT */}
          <div className="absolute bottom-0 left-0 w-full bg-white/90 dark:bg-slate-950/90 border-t border-slate-200/50 dark:border-slate-800/80 py-3.5 flex overflow-hidden z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] transition-colors duration-500">
            <div
              className="flex whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer"
              style={{ animation: "marquee 30s linear infinite" }}
            >
              <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
              `}</style>

              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-10 px-4 font-semibold text-sm tracking-wide text-slate-700 dark:text-slate-300"
                >
                  <span className="flex items-center gap-2 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    <span className="text-red-700 dark:text-red-500 font-bold">
                      Tolak Politik Uang!
                    </span>{" "}
                    Laporkan jika melihat praktik bagi-bagi amplop.
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>

                  <span className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    Jaga{" "}
                    <span className="text-slate-900 dark:text-white font-bold">
                      Netralitas ASN, TNI, & Polri
                    </span>{" "}
                    dalam Pemilu.
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>

                  <span className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-500" />
                    Jangan takut melapor.{" "}
                    <span className="text-slate-900 dark:text-white font-bold">
                      Identitas dilindungi UU!
                    </span>
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. STATISTIK TRANSPARANSI */}
        <section className="py-20 bg-slate-900 dark:bg-black text-white relative z-10 transition-colors duration-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest bg-red-500/10 inline-block px-4 py-1.5 rounded-full mb-4">
                Transparansi Publik
              </h2>
              <p className="text-3xl md:text-4xl font-extrabold mt-2">
                Data Penanganan Pelanggaran 2026
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-2 transform-gpu transition-all duration-300 cursor-default">
                <div className="text-5xl font-black text-white mb-3">124</div>
                <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                  Laporan Masuk
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-blue-500/20 hover:bg-blue-500/10 hover:-translate-y-2 transform-gpu transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.05)] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] cursor-default">
                <div className="text-5xl font-black text-blue-400 mb-3">18</div>
                <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                  Diverifikasi
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-yellow-500/20 hover:bg-yellow-500/10 hover:-translate-y-2 transform-gpu transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.05)] hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] cursor-default">
                <div className="text-5xl font-black text-yellow-400 mb-3">
                  8
                </div>
                <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                  Proses Kajian
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-green-500/20 hover:bg-green-500/10 hover:-translate-y-2 transform-gpu transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.05)] hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] cursor-default">
                <div className="text-5xl font-black text-green-400 mb-3">
                  92
                </div>
                <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                  Selesai
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ALUR PELAPORAN */}
        <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 z-0"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                Bagaimana Cara Melapor?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Proses pelaporan dirancang agar sangat mudah diakses oleh
                seluruh lapisan masyarakat Kabupaten Tegal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* STEP 1 */}
              <div className="relative text-center group cursor-default">
                <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-900 border-2 border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white dark:group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transform-gpu will-change-transform transition-all duration-300 shadow-sm">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  1. Isi Formulir
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed px-2">
                  Ceritakan kronologi kejadian secara detail dan unggah bukti
                  pendukung.
                </p>
                <div className="hidden md:block absolute top-10 left-[65%] w-[70%] h-[2px] border-t-2 border-slate-200 dark:border-slate-800 border-dashed group-hover:border-red-300 dark:group-hover:border-red-700 transition-colors duration-500"></div>
              </div>

              {/* STEP 2 */}
              <div className="relative text-center group cursor-default">
                <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-900 border-2 border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transform-gpu will-change-transform transition-all duration-300 shadow-sm">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  2. Terima Tiket
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed px-2">
                  Sistem mengamankan data Anda dan memberikan Nomor Tiket
                  pelacakan.
                </p>
                <div className="hidden md:block absolute top-10 left-[65%] w-[70%] h-[2px] border-t-2 border-slate-200 dark:border-slate-800 border-dashed group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors duration-500"></div>
              </div>

              {/* STEP 3 */}
              <div className="relative text-center group cursor-default">
                <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-900 border-2 border-yellow-100 dark:border-yellow-900/50 text-yellow-600 dark:text-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-white dark:group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transform-gpu will-change-transform transition-all duration-300 shadow-sm">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  3. Verifikasi
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed px-2">
                  Tim Bawaslu akan memverifikasi syarat formil dan materiil
                  laporan.
                </p>
                <div className="hidden md:block absolute top-10 left-[65%] w-[70%] h-[2px] border-t-2 border-slate-200 dark:border-slate-800 border-dashed group-hover:border-yellow-300 dark:group-hover:border-yellow-700 transition-colors duration-500"></div>
              </div>

              {/* STEP 4 */}
              <div className="relative text-center group cursor-default">
                <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-900 border-2 border-green-100 dark:border-green-900/50 text-green-600 dark:text-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white dark:group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transform-gpu will-change-transform transition-all duration-300 shadow-sm">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  4. Tindak Lanjut
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed px-2">
                  Laporan diproses sesuai regulasi. Anda mendapat notifikasi
                  setiap update.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PRIVASI */}
        <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-gradient-to-br from-red-700 to-red-900 dark:from-red-900 dark:to-black rounded-[2rem] p-10 md:p-14 text-white shadow-2xl overflow-hidden relative group border border-red-800/50 dark:border-slate-800 transition-colors">
              <div className="absolute top-0 right-0 opacity-10 dark:opacity-5 transform-gpu translate-x-1/4 -translate-y-1/4 group-hover:rotate-12 transition-transform duration-1000 will-change-transform">
                <ShieldCheck className="w-[400px] h-[400px]" />
              </div>

              <div className="relative z-10 md:w-2/3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider mb-6 hover:bg-white/20 transition-colors cursor-default">
                  <Lock className="w-3.5 h-3.5" /> Keamanan Sistem
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                  Privasi Anda Adalah <br /> Prioritas Kami
                </h2>
                <p className="text-red-100/90 dark:text-slate-300 text-lg mb-10 leading-relaxed font-medium">
                  Platform ini dilengkapi dengan teknologi enkripsi modern.
                  Identitas pelapor dilindungi secara hukum dan hanya digunakan
                  untuk keperluan klarifikasi internal Bawaslu.
                </p>

                <ul className="space-y-4 text-white/90 dark:text-slate-200">
                  <li className="flex items-center group/list cursor-default">
                    <div className="bg-white/20 dark:bg-white/10 p-1.5 rounded-full mr-4 group-hover/list:bg-green-500 group-hover/list:scale-110 transform-gpu transition-all duration-300">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="group-hover/list:text-white transition-colors">
                      Identitas pelapor dilindungi sepenuhnya oleh
                      Undang-Undang.
                    </span>
                  </li>
                  <li className="flex items-center group/list cursor-default">
                    <div className="bg-white/20 dark:bg-white/10 p-1.5 rounded-full mr-4 group-hover/list:bg-green-500 group-hover/list:scale-110 transform-gpu transition-all duration-300">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="group-hover/list:text-white transition-colors">
                      Perlindungan data base dari akses yang tidak sah.
                    </span>
                  </li>
                  <li className="flex items-center group/list cursor-default">
                    <div className="bg-white/20 dark:bg-white/10 p-1.5 rounded-full mr-4 group-hover/list:bg-green-500 group-hover/list:scale-110 transform-gpu transition-all duration-300">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="group-hover/list:text-white transition-colors">
                      Sistem dirancang sesuai standar keamanan e-Government.
                    </span>
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
