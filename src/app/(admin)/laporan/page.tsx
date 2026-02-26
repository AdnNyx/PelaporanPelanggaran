"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Edit } from "lucide-react";

// --- DUMMY DATA UNTUK PREVIEW UI ---
const dummyReports = [
  {
    id: "1",
    ticket_code: "BWS-TGL-2026-A1X9",
    category: "politik_uang",
    date: "2026-02-20",
    status: "pending",
    description: "Dugaan pembagian amplop di Desa X.",
  },
  {
    id: "2",
    ticket_code: "BWS-TGL-2026-B8Y2",
    category: "netralitas_asn",
    date: "2026-02-21",
    status: "verifikasi",
    description: "Oknum ASN ikut kampanye paslon Y.",
  },
  {
    id: "3",
    ticket_code: "BWS-TGL-2026-C3Z4",
    category: "kampanye_hitam",
    date: "2026-02-22",
    status: "proses",
    description: "Spanduk provokatif di pertigaan jalan.",
  },
  {
    id: "4",
    ticket_code: "BWS-TGL-2026-D5W1",
    category: "administrasi",
    date: "2026-02-23",
    status: "selesai",
    description: "Pemasangan APK di luar zona yang diizinkan.",
  },
];

export default function LaporanPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk mengontrol Modal/Popup Update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // State untuk form di dalam Modal
  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  // Fungsi untuk membuka modal dan memasukkan data laporan yang dipilih
  const handleOpenUpdate = (report: any) => {
    setSelectedReport(report);
    setNewStatus(report.status); // Set nilai dropdown sesuai status saat ini
    setAdminNotes(""); // Kosongkan catatan setiap kali buka modal baru
    setIsUpdateOpen(true);
  };

  // Fungsi simulasi saat tombol Simpan di modal ditekan
  const handleSaveUpdate = () => {
    // Nanti di sini kita akan taruh logika UPDATE ke Supabase dan kirim Email Resend
    alert(
      `Simulasi Update Tiket: ${selectedReport.ticket_code}\nStatus Baru: ${newStatus}\nCatatan: ${adminNotes}`,
    );
    setIsUpdateOpen(false);
  };

  // Fungsi pembantu untuk merapikan nama kategori & warna badge
  const formatCategory = (cat: string) =>
    cat.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-200">
            Menunggu
          </span>
        );
      case "verifikasi":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full border border-blue-200">
            Verifikasi
          </span>
        );
      case "proses":
        return (
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full border border-indigo-200">
            Proses Kajian
          </span>
        );
      case "selesai":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-200">
            Selesai
          </span>
        );
      case "ditolak":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full border border-red-200">
            Ditolak
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
            Unknown
          </span>
        );
    }
  };

  const filteredReports = dummyReports.filter((report) =>
    report.ticket_code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER & PENCARIAN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Manajemen Laporan Masuk
          </h1>
          <p className="text-slate-500 mt-1">
            Kelola, verifikasi, dan perbarui status laporan dari masyarakat.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Cari Nomor Tiket..."
            className="pl-9 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[120px]">Tanggal</TableHead>
              <TableHead>No. Tiket</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="text-slate-500 text-sm">
                    {new Date(report.date).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="font-mono font-medium text-slate-900">
                    {report.ticket_code}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatCategory(report.category)}
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2 text-slate-600"
                    >
                      <Eye className="h-4 w-4 mr-1" /> Detail
                    </Button>

                    {/* TOMBOL TRIGGER MODAL UPDATE */}
                    <Button
                      onClick={() => handleOpenUpdate(report)}
                      variant="default"
                      size="sm"
                      className="h-8 px-2 bg-slate-900 hover:bg-slate-800"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-slate-500"
                >
                  Tidak ada data laporan ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* MODAL / DIALOG UPDATE STATUS */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Status Laporan</DialogTitle>
            <DialogDescription>
              Perbarui status tiket{" "}
              <span className="font-mono font-bold text-slate-800">
                {selectedReport?.ticket_code}
              </span>
              . Perubahan ini akan memicu notifikasi email ke pelapor.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Tampilan Kronologi Singkat agar admin ingat konteksnya */}
            <div className="bg-slate-50 p-3 rounded-md border text-sm text-slate-600">
              <span className="font-semibold block text-slate-800 mb-1">
                Kronologi Singkat:
              </span>
              {selectedReport?.description}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Ubah Status Menjadi</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Pilih status baru" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Menunggu Verifikasi</SelectItem>
                  <SelectItem value="verifikasi">
                    Sedang Diverifikasi
                  </SelectItem>
                  <SelectItem value="proses">Proses Kajian (Pleno)</SelectItem>
                  <SelectItem value="selesai">
                    Selesai / Putusan Keluar
                  </SelectItem>
                  <SelectItem value="ditolak">
                    Ditolak (Tidak Memenuhi Syarat)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan Admin (Opsional)</Label>
              <Textarea
                id="notes"
                placeholder="Tambahkan alasan mengapa status diubah (misal: Bukti foto kurang jelas, mohon dilengkapi)..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-[11px] text-slate-500">
                Catatan ini akan dikirim ke email pelapor jika status berubah
                menjadi Ditolak atau Selesai.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleSaveUpdate}
              className="bg-slate-900 hover:bg-slate-800"
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
