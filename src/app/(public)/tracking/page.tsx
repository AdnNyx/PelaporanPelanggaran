"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSearch,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ReportData = {
  ticket_code: string;
  status: string;
  category: string;
  description: string;
  created_at: string;
};

// SIMULASI DUMMY DATA
const MOCK_DATABASE: ReportData[] = [
  {
    ticket_code: "BWS-TGL-2026-X1Y2",
    status: "pending",
    category: "politik_uang",
    description: "Dugaan pembagian amplop di Desa XYZ saat masa tenang.",
    created_at: "2026-02-25T10:00:00Z",
  },
  {
    ticket_code: "BWS-TGL-2026-A9B8",
    status: "proses",
    category: "netralitas_asn",
    description: "Oknum memakai baju dinas hadir di kampanye paslon.",
    created_at: "2026-02-20T14:30:00Z",
  },
];

export default function TrackingPage() {
  const [ticketCode, setTicketCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ticketCode) return;

    setIsLoading(true);
    setErrorMsg(null);
    setReportData(null);

    // BACKEND CALL (Simulasi Delay)
    setTimeout(() => {
      setIsLoading(false);

      const searchCode = ticketCode.trim().toUpperCase();
      const foundData = MOCK_DATABASE.find(
        (item) => item.ticket_code === searchCode,
      );

      if (foundData) {
        setReportData(foundData);
      } else {
        setErrorMsg(
          "Tiket tidak ditemukan. Pastikan kode yang Anda masukkan benar (contoh: BWS-TGL-2026-X1Y2).",
        );
      }
    }, 1500);
  };

  const getStatusUI = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color:
            "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-500/10 dark:text-yellow-500 dark:border-yellow-500/20",
          icon: <Clock className="w-5 h-5" />,
          label: "Menunggu Verifikasi",
        };
      case "verifikasi":
        return {
          color:
            "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-500/10 dark:text-blue-500 dark:border-blue-500/20",
          icon: <FileSearch className="w-5 h-5" />,
          label: "Sedang Diverifikasi",
        };
      case "proses":
        return {
          color:
            "bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
          icon: <Search className="w-5 h-5" />,
          label: "Proses Kajian",
        };
      case "selesai":
        return {
          color:
            "bg-green-100 text-green-800 border-green-300 dark:bg-green-500/10 dark:text-green-500 dark:border-green-500/20",
          icon: <CheckCircle2 className="w-5 h-5" />,
          label: "Selesai / Putusan",
        };
      case "ditolak":
        return {
          color:
            "bg-red-100 text-red-800 border-red-300 dark:bg-red-500/10 dark:text-red-500 dark:border-red-500/20",
          icon: <AlertCircle className="w-5 h-5" />,
          label: "Laporan Ditolak",
        };
      default:
        return {
          color:
            "bg-gray-100 text-gray-800 border-gray-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
          icon: <Clock className="w-5 h-5" />,
          label: "Unknown",
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Navbar />
      <main className="flex-1 py-12 px-4 flex items-start justify-center">
        <div className="w-full max-w-2xl mt-10">
          {/* KARTU PENCARIAN TIKET */}
          <Card className="shadow-xl border-t-4 border-t-red-600 dark:border-t-red-500 mb-8 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
            <CardHeader className="border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 pb-6">
              <CardTitle className="text-2xl font-bold dark:text-white">
                Lacak Status Laporan
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                Masukkan Nomor Tiket (contoh: BWS-TGL-2026-XXXX) untuk melihat
                sejauh mana laporan Anda diproses.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1 relative">
                  <Label htmlFor="ticket" className="sr-only">
                    Nomor Tiket
                  </Label>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <Input
                    id="ticket"
                    placeholder="Masukkan Nomor Tiket..."
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value)}
                    className="pl-10 uppercase h-12 text-lg font-medium tracking-wider dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 focus-visible:ring-red-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 px-8 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold transition-all shadow-md hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Mencari...
                    </>
                  ) : (
                    "Lacak Status"
                  )}
                </Button>
              </form>

              {errorMsg && (
                <div className="mt-6 flex items-start gap-3 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 p-4 rounded-md border border-red-200 dark:border-red-500/20 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* HASIL PENCARIAN */}
          {reportData && (
            <Card className="shadow-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-900 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-100 dark:bg-slate-800/50 p-4 border-b dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Search className="w-4 h-4" /> Hasil Pencarian
                </h3>
              </div>
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b dark:border-slate-800 pb-8">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Nomor Tiket Anda
                    </p>
                    <p className="text-3xl font-mono font-black text-slate-900 dark:text-white tracking-widest">
                      {reportData.ticket_code}
                    </p>
                  </div>

                  {/* Badge Status */}
                  <div
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 shadow-sm ${
                      getStatusUI(reportData.status).color
                    }`}
                  >
                    {getStatusUI(reportData.status).icon}
                    <span className="font-bold tracking-wide">
                      {getStatusUI(reportData.status).label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                        Tanggal Laporan Masuk
                      </p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {new Date(reportData.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}{" "}
                        WIB
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                        Kategori Pelanggaran
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm capitalize border dark:border-slate-700">
                        {reportData.category.replace("_", " ")}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      Kronologi Singkat
                    </p>
                    <div className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/50 p-4 rounded-lg text-sm border dark:border-slate-800 leading-relaxed font-medium">
                      &quot;{reportData.description}&quot;
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
