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
} from "lucide-react";

// Tipe data untuk hasil pencarian
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

    // BACKEND CALL
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
    }, 1000);
  };

  const getStatusUI = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-300",
          icon: <Clock className="w-5 h-5" />,
          label: "Menunggu Verifikasi",
        };
      case "verifikasi":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-300",
          icon: <FileSearch className="w-5 h-5" />,
          label: "Sedang Diverifikasi",
        };
      case "proses":
        return {
          color: "bg-indigo-100 text-indigo-800 border-indigo-300",
          icon: <Search className="w-5 h-5" />,
          label: "Proses Kajian",
        };
      case "selesai":
        return {
          color: "bg-green-100 text-green-800 border-green-300",
          icon: <CheckCircle2 className="w-5 h-5" />,
          label: "Selesai / Putusan",
        };
      case "ditolak":
        return {
          color: "bg-red-100 text-red-800 border-red-300",
          icon: <AlertCircle className="w-5 h-5" />,
          label: "Laporan Ditolak",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-300",
          icon: <Clock className="w-5 h-5" />,
          label: "Unknown",
        };
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl px-4 min-h-[70vh]">
      <Card className="shadow-lg border-t-4 border-t-red-600 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Lacak Status Laporan
          </CardTitle>
          <CardDescription>
            Masukkan Nomor Tiket (contoh: BWS-TGL-2026-XXXX) untuk melihat
            sejauh mana laporan Anda diproses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="ticket" className="sr-only">
                Nomor Tiket
              </Label>
              <Input
                id="ticket"
                placeholder="Masukkan Nomor Tiket..."
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value)}
                className="uppercase"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white min-w-[100px]"
              disabled={isLoading}
            >
              {isLoading ? "Mencari..." : "Lacak"}
            </Button>
          </form>

          {errorMsg && (
            <p className="mt-4 text-sm font-medium text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {errorMsg}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Menampilkan Hasil Pencarian */}
      {reportData && (
        <Card className="shadow-md overflow-hidden border-2 border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-50 p-4 border-b">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Hasil Pencarian
            </h3>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-slate-500">Nomor Tiket</p>
                <p className="text-2xl font-mono font-bold text-slate-900">
                  {reportData.ticket_code}
                </p>
              </div>

              {/* Badge Status */}
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusUI(reportData.status).color}`}
              >
                {getStatusUI(reportData.status).icon}
                <span className="font-semibold">
                  {getStatusUI(reportData.status).label}
                </span>
              </div>
            </div>

            <div className="space-y-4 border-t pt-4">
              <div>
                <p className="text-sm text-slate-500">Tanggal Laporan</p>
                <p className="font-medium text-slate-900">
                  {new Date(reportData.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Kategori Pelanggaran</p>
                <p className="font-medium capitalize text-slate-900">
                  {reportData.category.replace("_", " ")}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Kronologi Singkat</p>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-md mt-1 text-sm border">
                  {reportData.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
