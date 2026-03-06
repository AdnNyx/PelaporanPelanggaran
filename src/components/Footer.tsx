import Link from "next/link";
import { Shield, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold flex items-center gap-2 tracking-wide">
              <span className="text-red-600">BAWASLU</span> KAB. TEGAL
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              Si-Walu (Sistem Pelaporan Pelanggaran Pemilu Terpadu) adalah
              inovasi Bawaslu Kabupaten Tegal untuk mewujudkan pemilihan umum
              yang bersih, jujur, adil, dan bermartabat.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold tracking-wide">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3 hover:text-slate-200 transition-colors">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>
                  Jl. Letjen Suprapto No.12, Slawi Wetan, Kec. Slawi, Kabupaten
                  Tegal, Jawa Tengah 52411
                </span>
              </li>
              <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <span>(0283) 4567890</span>
              </li>
              <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <span>set.tegal@bawaslu.go.id</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold tracking-wide">
              Institusi Terkait
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="https://bawaslu.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Bawaslu Republik Indonesia</span>
                </a>
              </li>
              <li>
                <a
                  href="https://jateng.bawaslu.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Bawaslu Provinsi Jawa Tengah</span>
                </a>
              </li>
              <li>
                <a
                  href="https://kabtegal.kpu.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>KPU Kabupaten Tegal</span>
                </a>
              </li>
              <li>
                <a
                  href="https://dkpp.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>DKPP RI</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm text-center md:text-left">
            <p>
              © {new Date().getFullYear()} Bawaslu Kabupaten Tegal. Hak Cipta
              Dilindungi.
            </p>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-300 transition-colors text-xs font-medium"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Portal Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
