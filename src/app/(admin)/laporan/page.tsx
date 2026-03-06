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
  ShieldCheck,
  Filter,
  Loader2,
  Clock,
  FileSearch,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";

import { useCustomToast } from "@/hooks/use-custom-toast";

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
  const { toastSuccess } = useCustomToast();

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

  const handleSaveUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsUpdateOpen(false);

      toastSuccess(
        "Status Diperbarui",
        `Tiket ${selectedReport?.ticket_code} berhasil diubah.`,
      );
    }, 1500);
  };

  const formatCategory = (cat: string) =>
    cat.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500 border border-amber-200 dark:border-amber-500/20 text-xs font-bold rounded-full">
            <Clock className="w-3.5 h-3.5" /> Menunggu
          </span>
        );
      case "verifikasi":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 text-xs font-bold rounded-full">
            <FileSearch className="w-3.5 h-3.5" /> Verifikasi
          </span>
        );
      case "proses":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 text-xs font-bold rounded-full">
            <Search className="w-3.5 h-3.5" /> Proses Kajian
          </span>
        );
      case "selesai":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20 text-xs font-bold rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
          </span>
        );
      case "ditolak":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-500 border border-rose-200 dark:border-rose-500/20 text-xs font-bold rounded-full">
            <AlertCircle className="w-3.5 h-3.5" /> Ditolak
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full">
            Unknown
          </span>
        );
    }
  };

  const filteredReports = dummyReports.filter((report) =>
    report.ticket_code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* 1. HEADER PAGE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Security Panel
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Manajemen Laporan
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-sm">
            Verifikasi dan perbarui status laporan pengaduan masyarakat.
          </p>
        </div>

        {/* INPUT PENCARIAN */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Cari ID Tiket..."
              className="pl-10 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 h-12 rounded-xl focus:ring-indigo-500 font-mono text-sm shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="h-12 w-12 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <Filter className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </Button>
        </div>
      </div>

      {/* 2. TABEL DATA */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold py-5 pl-6 text-slate-600 dark:text-slate-300">
                Tanggal Masuk
              </TableHead>
              <TableHead className="font-bold text-slate-600 dark:text-slate-300">
                No. Tiket
              </TableHead>
              <TableHead className="font-bold text-slate-600 dark:text-slate-300">
                Kategori
              </TableHead>
              <TableHead className="font-bold text-slate-600 dark:text-slate-300">
                Status
              </TableHead>
              <TableHead className="text-right font-bold pr-6 text-slate-600 dark:text-slate-300">
                Tindakan
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow
                  key={report.id}
                  className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b border-slate-50 dark:border-slate-800/50"
                >
                  <TableCell className="py-5 pl-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                        {new Date(report.date).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {new Date(report.date).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        WIB
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 rounded-md font-mono font-bold text-xs tracking-wider">
                      {report.ticket_code}
                    </code>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {formatCategory(report.category)}
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell className="text-right pr-6 space-x-2">
                    <Button
                      onClick={() => handleOpenDetail(report)}
                      variant="ghost"
                      size="sm"
                      className="h-9 px-3 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Eye className="h-4 w-4 mr-2" /> Detail
                    </Button>
                    <Button
                      onClick={() => handleOpenUpdate(report)}
                      size="sm"
                      className="h-9 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold transition-transform active:scale-95"
                    >
                      <Edit className="h-4 w-4 mr-2" /> Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Search className="w-10 h-10 mb-3 opacity-20" />
                    <p className="text-sm font-medium">
                      Tiket tidak ditemukan.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 3. SLIDE-OUT PANEL */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent
          className="sm:max-w-[600px] h-full overflow-y-auto bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 p-0"
          data-lenis-prevent="true"
        >
          <SheetHeader className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md text-left">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl">
                <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <SheetTitle className="text-2xl font-black text-slate-900 dark:text-white">
                  Rincian Laporan
                </SheetTitle>
                <SheetDescription className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs mt-1 tracking-widest">
                  ID: {selectedReport?.ticket_code}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {selectedReport && (
            <div className="p-6 space-y-8">
              {/* Grid Info Cepat */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                    Status Saat Ini
                  </Label>
                  {getStatusBadge(selectedReport.status)}
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Masuk Pada
                  </Label>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-200">
                    {new Date(selectedReport.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Data Pelapor */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <User className="w-4 h-4" /> 1. Identitas Pelapor
                </h4>
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 bg-white dark:bg-slate-950 shadow-sm">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Nama Lengkap
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {selectedReport.reporter_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Email Kontak
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {selectedReport.reporter_email}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Alamat
                    </p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedReport.reporter_address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Kronologi */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> 2. Uraian Kejadian
                </h4>
                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10">
                  <div className="inline-block px-2.5 py-1 bg-amber-200/50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-500 text-[10px] font-bold uppercase rounded-md mb-3">
                    Kategori: {formatCategory(selectedReport.category)}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-300 font-medium italic">
                    &quot;{selectedReport.description}&quot;
                  </p>
                </div>
              </div>

              {/* Bukti Lampiran */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> 3. Bukti Lampiran
                  </h4>
                  <span className="text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
                    {selectedReport.evidence_count} FILES
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: selectedReport.evidence_count }).map(
                    (_, idx) => (
                      <div
                        key={idx}
                        className="group flex flex-col items-center justify-center p-4 h-28 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer"
                      >
                        <ImageIcon className="w-8 h-8 mb-2 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" />
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Bukti_{idx + 1}.jpg
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer Sheet */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 sticky bottom-0 z-10 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl font-bold dark:border-slate-800 dark:bg-slate-900"
              onClick={() => setIsDetailOpen(false)}
            >
              Tutup
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20"
              onClick={() => {
                if (selectedReport) {
                  setIsDetailOpen(false);
                  handleOpenUpdate(selectedReport);
                }
              }}
            >
              Update Tindakan
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* 4. MODAL UPDATE STATUS */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent
          className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl border-none bg-white dark:bg-slate-950 shadow-2xl"
          data-lenis-prevent="true"
        >
          <DialogHeader className="bg-indigo-600 p-6 md:p-8 text-white relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
            <DialogTitle className="text-2xl font-black tracking-tight relative z-10">
              Update Status
            </DialogTitle>
            <DialogDescription className="text-indigo-100 mt-1 font-medium relative z-10">
              Ubah status tiket{" "}
              <code className="bg-black/20 px-1.5 py-0.5 rounded font-mono text-white">
                {selectedReport?.ticket_code}
              </code>
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-3">
              <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Pilih Status Baru
              </Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="h-14 rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-indigo-500 text-sm font-semibold">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                  <SelectItem value="pending" className="font-medium">
                    Menunggu Verifikasi
                  </SelectItem>
                  <SelectItem value="verifikasi" className="font-medium">
                    Sedang Diverifikasi
                  </SelectItem>
                  <SelectItem value="proses" className="font-medium">
                    Proses Kajian (Pleno)
                  </SelectItem>
                  <SelectItem value="selesai" className="font-medium">
                    Selesai / Putusan Keluar
                  </SelectItem>
                  <SelectItem
                    value="ditolak"
                    className="font-medium text-rose-500"
                  >
                    Ditolak (TMS)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Catatan Admin (Opsional)
              </Label>
              <Textarea
                placeholder="Alasan perubahan status akan dikirimkan ke email pelapor..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="min-h-[120px] rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-indigo-500 resize-none text-sm"
              />
            </div>
          </div>

          <DialogFooter className="px-6 md:px-8 pb-6 md:pb-8 pt-0 flex gap-3">
            <Button
              variant="ghost"
              className="flex-1 h-12 rounded-xl font-bold dark:hover:bg-slate-900"
              onClick={() => setIsUpdateOpen(false)}
            >
              Batal
            </Button>
            <Button
              onClick={handleSaveUpdate}
              className="flex-1 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold shadow-lg shadow-black/10 dark:shadow-indigo-500/20"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
