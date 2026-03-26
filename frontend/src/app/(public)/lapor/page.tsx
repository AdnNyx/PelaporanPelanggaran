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
import {
  CheckCircle2,
  UploadCloud,
  UserCircle,
  FileText,
  X,
  Image as ImageIcon,
  Video,
  File as FileIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// IMPORT CUSTOM TOAST
import { useCustomToast } from "@/hooks/use-custom-toast";

export default function LaporPage() {
  const { toastSuccess, toastError } = useCustomToast();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [evidences, setEvidences] = useState<File[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setEvidences((prev) => [...prev, ...newFiles]);
    }
    e.target.value = "";
  };

  const removeEvidence = (indexToRemove: number) => {
    setEvidences((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // --- LOGIKA BARU: TEMBAK API LARAVEL ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category) {
      setErrorMsg("Mohon pilih kategori pelanggaran.");
      toastError("Kategori Kosong", "Silakan pilih jenis pelanggaran.");
      return;
    }

    if (evidences.length === 0) {
      setErrorMsg("Mohon unggah minimal 1 (satu) file bukti kejadian.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // 1. Bungkus data dan file ke dalam FormData
    const formData = new FormData();
    formData.append("reporter_name", fullName);
    formData.append("reporter_email", email);
    formData.append("reporter_address", address);
    formData.append("category", category);
    formData.append("description", description);

    // Looping untuk memasukkan semua file bukti
    evidences.forEach((file) => {
      formData.append("evidences[]", file);
    });

    try {
      // 2. Kirim Request POST ke Laravel Backend
      const response = await fetch("http://127.0.0.1:8000/api/reports", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          // Catatan: Jangan tambahkan "Content-Type", biarkan browser
          // yang menyetelnya otomatis menjadi "multipart/form-data" beserta boundary-nya.
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // BERHASIL! Dapatkan nomor tiket asli dari database Laravel
        setSubmittedTicket(result.ticket_code);
        toastSuccess(
          "Laporan Terkirim!",
          "Terima kasih, laporan Anda telah masuk ke sistem.",
        );
      } else {
        // Gagal dari sisi validasi Laravel
        setErrorMsg(result.message || "Terjadi kesalahan pada sistem.");
        toastError(
          "Gagal Mengirim",
          result.message || "Periksa kembali isian Anda.",
        );
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      setErrorMsg(
        "Gagal terhubung ke server Bawaslu. Pastikan koneksi internet Anda stabil.",
      );
      toastError("Koneksi Terputus", "Tidak dapat menghubungi server backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // TAMPILAN JIKA LAPORAN BERHASIL DIKIRIM
  if (submittedTicket) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-10 px-4">
          <div className="w-full max-w-2xl">
            <Card className="shadow-lg border-t-4 border-t-green-600 dark:border-t-green-500 text-center py-8 animate-in fade-in zoom-in duration-500 dark:bg-slate-900 dark:border-slate-800">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <CardTitle className="text-2xl font-bold dark:text-white">
                  Laporan Berhasil Terkirim!
                </CardTitle>
                <CardDescription className="text-lg mt-2 dark:text-slate-400">
                  Terima kasih,{" "}
                  <strong className="dark:text-white">{fullName}</strong>.
                  Laporan dan {evidences.length} file bukti Anda telah masuk ke
                  sistem Bawaslu Kabupaten Tegal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-6 rounded-lg my-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Nomor Tiket Anda:
                  </p>
                  <p className="text-3xl font-mono font-bold tracking-wider text-red-600 dark:text-red-500 select-all">
                    {submittedTicket}
                  </p>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Simpan nomor tiket ini untuk mengecek status laporan Anda.
                  Kami juga telah menyimpan salinan tiket ini ke sistem dengan
                  email:{" "}
                  <strong className="text-slate-800 dark:text-slate-200">
                    {email}
                  </strong>
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full h-12 text-md font-medium dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Buat Laporan Baru
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <Card className="shadow-xl border-t-4 border-t-red-600 dark:border-t-red-500 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-950/50 border-b dark:border-slate-800 pb-6 transition-colors duration-300">
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                Formulir Pelaporan Pelanggaran
              </CardTitle>
              <CardDescription className="text-base dark:text-slate-400">
                Bawaslu Kabupaten Tegal. Identitas Anda akan dilindungi secara
                hukum. Silakan isi data diri dan kejadian dengan valid dan
                sebenar-benarnya.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {errorMsg && (
                <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 p-3 rounded-md mb-6 text-sm font-medium border border-red-200 dark:border-red-500/20 animate-in fade-in transition-colors duration-300">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* IDENTITAS PELAPOR */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b dark:border-slate-800 pb-2">
                    <UserCircle className="w-5 h-5 text-red-600 dark:text-red-500" />
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                      1. Identitas Pelapor
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="dark:text-slate-300">
                        Nama Lengkap Sesuai KTP{" "}
                        <span className="text-red-500 dark:text-red-400">
                          *
                        </span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Contoh: Budi Santoso"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="dark:bg-slate-950 dark:border-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="dark:text-slate-300">
                        Email Aktif{" "}
                        <span className="text-red-500 dark:text-red-400">
                          *
                        </span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="budi@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="dark:bg-slate-950 dark:border-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="dark:text-slate-300">
                      Alamat Lengkap Sesuai KTP{" "}
                      <span className="text-red-500 dark:text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Nama Jalan, RT/RW, Desa/Kelurahan, Kecamatan..."
                      className="min-h-[80px] dark:bg-slate-950 dark:border-slate-800"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* DATA KEJADIAN & BUKTI */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b dark:border-slate-800 pb-2">
                    <FileText className="w-5 h-5 text-red-600 dark:text-red-500" />
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                      2. Data Kejadian & Bukti
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="dark:text-slate-300">
                      Jenis Dugaan Pelanggaran{" "}
                      <span className="text-red-500 dark:text-red-400">*</span>
                    </Label>
                    <select
                      id="category"
                      className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 focus:border-transparent dark:text-slate-200 transition-colors duration-300"
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
                    <Label
                      htmlFor="description"
                      className="dark:text-slate-300"
                    >
                      Uraian Kejadian (Kronologi){" "}
                      <span className="text-red-500 dark:text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan secara detail: APA yang terjadi, SIAPA yang terlibat, KAPAN dan DI MANA kejadiannya..."
                      className="min-h-[150px] leading-relaxed dark:bg-slate-950 dark:border-slate-800"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  {/* INPUT & PREVIEW */}
                  <div className="space-y-4 border dark:border-slate-800 rounded-xl p-5 bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-300">
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="evidence"
                        className="text-base dark:text-slate-200"
                      >
                        Unggah Bukti Pendukung{" "}
                        <span className="text-red-500 dark:text-red-400">
                          *
                        </span>
                      </Label>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-md">
                        {evidences.length} File Dipilih
                      </span>
                    </div>

                    <div className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                      <UploadCloud className="w-8 h-8 text-slate-400 dark:text-slate-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors mb-2" />
                      <p className="text-sm text-slate-600 dark:text-slate-400 text-center font-medium">
                        Klik atau seret file ke area ini
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 text-center">
                        Bisa pilih lebih dari satu. (JPG, PNG, MP4, PDF)
                      </p>
                      <Input
                        id="evidence"
                        type="file"
                        multiple
                        accept="image/*,video/*,application/pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* Grid Preview File */}
                    {evidences.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                        {evidences.map((file, index) => {
                          const isImage = file.type.startsWith("image/");
                          const isVideo = file.type.startsWith("video/");

                          return (
                            <div
                              key={index}
                              className="relative group flex flex-col items-center justify-center p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 shadow-sm overflow-hidden animate-in fade-in zoom-in duration-200"
                            >
                              <button
                                type="button"
                                onClick={() => removeEvidence(index)}
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full z-10 opacity-80 hover:opacity-100 transition-opacity"
                                title="Hapus file"
                              >
                                <X className="w-3 h-3" />
                              </button>

                              <div className="w-full h-24 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-md mb-2 overflow-hidden">
                                {isImage ? (
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : isVideo ? (
                                  <Video className="w-8 h-8 text-indigo-400 dark:text-indigo-500" />
                                ) : (
                                  <FileIcon className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                                )}
                              </div>

                              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium truncate w-full text-center px-1">
                                {file.name}
                              </p>
                              <p className="text-[9px] text-slate-400 dark:text-slate-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="pt-4 border-t dark:border-slate-800">
                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-bold bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white transition-all shadow-md hover:shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Mengirim ke Server...
                      </span>
                    ) : (
                      "Kirim Laporan Resmi"
                    )}
                  </Button>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
                    Dengan menekan tombol di atas, Anda menyatakan bahwa data
                    yang diberikan adalah benar dan dapat dipertanggungjawabkan.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
