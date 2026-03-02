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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  Eye,
  Edit,
  Calendar,
  Tag,
  User,
  Mail,
  MapPin,
  ImageIcon,
} from "lucide-react";

// --- 1. IMPORT HOOK USETOAST ---
import { useToast } from "@/hooks/use-toast";

export type ReportData = {
  id: string;
  ticket_code: string;
  category: string;
  date: string;
  status: string;
  description: string;
  reporter_name: string;
  reporter_email: string;
  reporter_address: string;
  evidence_count: number;
};

// --- DUMMY DATA ---
const dummyReports: ReportData[] = [
  {
    id: "1",
    ticket_code: "BWS-TGL-2026-A1X9",
    category: "politik_uang",
    date: "2026-02-20T10:00:00Z",
    status: "pending",
    description:
      "Dugaan pembagian amplop di Desa X kepada warga setelah acara jalan sehat paslon.",
    reporter_name: "Budi Santoso",
    reporter_email: "budi.santoso@email.com",
    reporter_address: "Jl. Merdeka No 45, RT 01/02, Desa X, Kec. Y",
    evidence_count: 2,
  },
  {
    id: "2",
    ticket_code: "BWS-TGL-2026-B8Y2",
    category: "netralitas_asn",
    date: "2026-02-21T14:30:00Z",
    status: "verifikasi",
    description: "Oknum ASN memakai seragam dinas ikut kampanye paslon Y.",
    reporter_name: "Anonim",
    reporter_email: "anonim22@email.com",
    reporter_address: "Dirahasiakan",
    evidence_count: 1,
  },
  {
    id: "3",
    ticket_code: "BWS-TGL-2026-C3Z4",
    category: "kampanye_hitam",
    date: "2026-02-22T08:15:00Z",
    status: "proses",
    description:
      "Spanduk provokatif yang menyerang SARA dipasang di pertigaan jalan utama.",
    reporter_name: "Siti Aminah",
    reporter_email: "siti.aminah@email.com",
    reporter_address: "Perumahan Indah Blok C2, Kec. Z",
    evidence_count: 3,
  },
];

export default function LaporanPage() {
  // --- 2. PANGGIL HOOK TOAST ---
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenUpdate = (report: ReportData) => {
    setSelectedReport(report);
    setNewStatus(report.status);
    setAdminNotes("");
    setIsUpdateOpen(true);
  };

  const handleOpenDetail = (report: ReportData) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  // --- 3. LOGIKA UPDATE DENGAN TOAST ---
  const handleSaveUpdate = () => {
    setIsUpdating(true);

    // Simulasi loading 1.5 detik seolah-olah sedang menembak API Backend
    setTimeout(() => {
      setIsUpdating(false);
      setIsUpdateOpen(false);

      // Panggil Notifikasi Toast Sukses
      toast({
        title: "✅ Status Diperbarui",
        description: `Tiket ${selectedReport?.ticket_code} berhasil diubah menjadi ${newStatus.toUpperCase()}.`,
      });

      // (Nantinya di sini tim Backend akan melakukan proses pembaruan data asli di database)
    }, 1500);
  };

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
                <TableRow
                  key={report.id}
                  className="hover:bg-slate-50 transition-colors"
                >
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
                      onClick={() => handleOpenDetail(report)}
                      variant="outline"
                      size="sm"
                      className="h-8 px-2 text-slate-600 hover:text-slate-900"
                    >
                      <Eye className="h-4 w-4 mr-1" /> Detail
                    </Button>

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
                  className="h-32 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Search className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada data laporan ditemukan.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PANEL GESER (SHEET) UNTUK PREVIEW DETAIL LAPORAN */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent
          className="sm:max-w-[600px] h-full overflow-y-auto"
          data-lenis-prevent="true"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-bold flex items-center gap-2">
              <span className="font-mono text-red-600">
                {selectedReport?.ticket_code}
              </span>
            </SheetTitle>
            <SheetDescription>
              Rincian lengkap dari laporan yang diajukan oleh masyarakat.
            </SheetDescription>
          </SheetHeader>

          {selectedReport && (
            <div className="space-y-6 pb-8">
              {/* Info Status & Kategori */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border">
                <div>
                  <Label className="text-xs text-slate-500 block mb-1">
                    Status Saat Ini
                  </Label>
                  {getStatusBadge(selectedReport.status)}
                </div>
                <div className="border-l pl-4">
                  <Label className="text-xs text-slate-500 block mb-1 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Kategori
                  </Label>
                  <p className="font-medium text-sm capitalize">
                    {formatCategory(selectedReport.category)}
                  </p>
                </div>
                <div className="border-l pl-4">
                  <Label className="text-xs text-slate-500 block mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Tanggal Masuk
                  </Label>
                  <p className="font-medium text-sm">
                    {new Date(selectedReport.date).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Data Pelapor */}
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block font-semibold">
                  1. Identitas Pelapor
                </Label>
                <div className="space-y-3 bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Nama Lengkap</p>
                      <p className="text-sm font-medium text-slate-900">
                        {selectedReport.reporter_name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Email Kontak</p>
                      <p className="text-sm font-medium text-slate-900">
                        {selectedReport.reporter_email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Alamat</p>
                      <p className="text-sm font-medium text-slate-900">
                        {selectedReport.reporter_address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kronologi */}
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block font-semibold">
                  2. Uraian Kejadian
                </Label>
                <div className="bg-white border rounded-lg p-4 text-sm leading-relaxed text-slate-700 shadow-sm whitespace-pre-wrap">
                  {selectedReport.description}
                </div>
              </div>

              {/* Bukti Lampiran */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">
                    3. Bukti Lampiran
                  </Label>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                    {selectedReport.evidence_count} File Terlampir
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: selectedReport.evidence_count }).map(
                    (_, idx) => (
                      <div
                        key={idx}
                        className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
                      >
                        <ImageIcon className="w-6 h-6 mb-2 opacity-50 group-hover:text-red-500 transition-colors" />
                        <p className="text-xs text-center font-medium">
                          Bukti_{idx + 1}.jpg
                        </p>
                        <p className="text-[10px] mt-1 text-center">
                          Klik untuk unduh
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 pt-6 border-t flex flex-col sm:flex-row justify-end gap-2 pb-6">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Tutup Preview
            </Button>
            <Button
              className="bg-slate-900 hover:bg-slate-800"
              onClick={() => {
                // --- 4. PERBAIKAN ERROR TYPESCRIPT ---
                if (selectedReport) {
                  setIsDetailOpen(false);
                  handleOpenUpdate(selectedReport);
                }
              }}
            >
              Update Status Laporan
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* MODAL / DIALOG UPDATE STATUS */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent
          className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto"
          data-lenis-prevent="true"
        >
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
            <div className="bg-slate-50 p-3 rounded-md border text-sm text-slate-600">
              <span className="font-semibold block text-slate-800 mb-1">
                Kronologi Singkat:
              </span>
              <p className="line-clamp-2">{selectedReport?.description}</p>
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
                placeholder="Tambahkan alasan mengapa status diubah..."
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
              disabled={isUpdating}
            >
              {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
