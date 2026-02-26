"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, UploadCloud, UserCircle, FileText } from "lucide-react";

export default function LaporPage() {
  // --- STATE: Data Pelapor ---
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  // --- STATE: Data Kejadian & Bukti ---
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState<File | null>(null);

  // --- STATE: UI Status ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const generateTicketCode = () => {
    const year = new Date().getFullYear();
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BWS-TGL-${year}-${randomStr}`;
  };

  // Handler untuk menangkap file yang diunggah
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEvidence(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    // CATATAN UNTUK TIM BACKEND NANTINYA:
    // Karena ada file gambar/video, pengiriman data harus menggunakan FormData:
    // const formData = new FormData();
    // formData.append("fullName", fullName);
    // formData.append("address", address);
    // formData.append("email", email);
    // formData.append("category", category);
    // formData.append("description", description);
    // if (evidence) formData.append("evidence", evidence);

    // SIMULASI API / BACKEND CALL
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicket(generateTicketCode());
    }, 2000); // Simulasi loading 2 detik untuk efek upload file
  };

  // Tampilan Jika Laporan Berhasil Dikirim
  if (submittedTicket) {
    return (
      <div className="container mx-auto py-10 max-w-2xl px-4 min-h-[70vh]">
        <Card className="shadow-lg border-t-4 border-t-green-600 text-center py-8 animate-in fade-in zoom-in duration-500">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Laporan Berhasil Terkirim!
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Terima kasih, <strong>{fullName}</strong>. Laporan dan bukti Anda
              telah masuk ke sistem Bawaslu Kabupaten Tegal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-lg my-4">
              <p className="text-sm text-slate-500 mb-2">Nomor Tiket Anda:</p>
              <p className="text-3xl font-mono font-bold tracking-wider text-red-600">
                {submittedTicket}
              </p>
            </div>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Simpan nomor tiket ini untuk mengecek status laporan Anda. Kami
              juga telah mengirimkan salinan tiket ini ke email:{" "}
              <strong className="text-slate-800">{email}</strong>
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full h-12 text-md font-medium"
            >
              Buat Laporan Baru
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tampilan Form Pelaporan
  return (
    <div className="container mx-auto py-10 max-w-3xl px-4">
      <Card className="shadow-xl border-t-4 border-t-red-600">
        <CardHeader className="bg-slate-50/50 border-b pb-6">
          <CardTitle className="text-2xl font-bold text-slate-900">
            Formulir Pelaporan Pelanggaran
          </CardTitle>
          <CardDescription className="text-base">
            Bawaslu Kabupaten Tegal. Identitas Anda akan dilindungi secara
            hukum. Silakan isi data diri dan kejadian dengan valid dan
            sebenar-benarnya.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm font-medium border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* --- BAGIAN 1: IDENTITAS PELAPOR --- */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b pb-2">
                <UserCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-slate-800">
                  1. Identitas Pelapor
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Nama Lengkap Sesuai KTP{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Contoh: Budi Santoso"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Aktif <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="budi@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Alamat Lengkap Sesuai KTP{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  placeholder="Nama Jalan, RT/RW, Desa/Kelurahan, Kecamatan..."
                  className="min-h-[80px]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* --- BAGIAN 2: DATA KEJADIAN & BUKTI --- */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b pb-2">
                <FileText className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-slate-800">
                  2. Data Kejadian & Bukti
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Jenis Dugaan Pelanggaran{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    -- Pilih Kategori Pelanggaran --
                  </option>
                  <option value="politik_uang">
                    Politik Uang (Money Politic)
                  </option>
                  <option value="netralitas_asn">
                    Netralitas ASN / TNI / Polri
                  </option>
                  <option value="kampanye_hitam">
                    Kampanye Hitam / Hoax / SARA
                  </option>
                  <option value="administrasi">
                    Pelanggaran Administrasi Pemilu
                  </option>
                  <option value="lainnya">Pelanggaran Lainnya</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Uraian Kejadian (Kronologi){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan secara detail: APA yang terjadi, SIAPA yang terlibat, KAPAN dan DI MANA kejadiannya..."
                  className="min-h-[150px] leading-relaxed"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <p className="text-xs text-slate-500">
                  Gunakan prinsip 5W+1H agar laporan mudah diproses oleh tim
                  kami.
                </p>
              </div>

              {/* INPUT FILE BUKTI */}
              <div className="space-y-2">
                <Label htmlFor="evidence">
                  Unggah Bukti (Foto / Video / Dokumen){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-slate-300 border-dashed rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-red-500 transition-colors mb-2" />
                  <p className="text-sm text-slate-600 text-center font-medium">
                    {evidence
                      ? evidence.name
                      : "Klik atau seret file ke area ini"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 text-center">
                    Maks. 20MB. Format didukung: JPG, PNG, MP4, PDF.
                  </p>
                  <Input
                    id="evidence"
                    type="file"
                    accept="image/*,video/*,application/pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* --- TOMBOL SUBMIT --- */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-14 text-lg font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md hover:shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Mengunggah Data & File...
                  </span>
                ) : (
                  "Kirim Laporan Resmi"
                )}
              </Button>
              <p className="text-xs text-center text-slate-500 mt-4">
                Dengan menekan tombol di atas, Anda menyatakan bahwa data yang
                diberikan adalah benar dan dapat dipertanggungjawabkan.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
