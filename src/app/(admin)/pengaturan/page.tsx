"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Building2,
  Bell,
  Users,
  Save,
  Plus,
  Trash2,
  Settings,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import { useCustomToast } from "@/hooks/use-custom-toast";

export default function PengaturanPage() {
  const { toastSuccess, toastError } = useCustomToast();

  const [profil, setProfil] = useState({
    nama: "Bawaslu Kabupaten Tegal",
    email: "set.tegal@bawaslu.go.id",
    telepon: "(0283) 4567890",
    alamat:
      "Jl. Letjen Suprapto No.12, Slawi Wetan, Kec. Slawi, Kabupaten Tegal, Jawa Tengah 52411",
  });
  const [isSavingProfil, setIsSavingProfil] = useState(false);

  const [admins, setAdmins] = useState([
    {
      id: 1,
      nama: "Admin Utama",
      email: "admin@bawaslu-tegal.go.id",
      role: "Super Admin",
      deletable: false,
    },
    {
      id: 2,
      nama: "Staf Verifikator 1",
      email: "staf1@bawaslu-tegal.go.id",
      role: "Operator",
      deletable: true,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    nama: "",
    email: "",
    role: "Operator",
  });

  const handleSaveProfil = () => {
    setIsSavingProfil(true);
    setTimeout(() => {
      setIsSavingProfil(false);
      toastSuccess(
        "Perubahan Disimpan",
        "Profil Bawaslu Kabupaten Tegal berhasil diperbarui.",
      );
    }, 1500);
  };

  const handleAddAdmin = () => {
    if (!newAdmin.nama || !newAdmin.email) {
      toastError("Gagal Menambahkan", "Nama dan Email wajib diisi!");
      return;
    }
    const newId = admins.length > 0 ? admins[admins.length - 1].id + 1 : 1;
    setAdmins([...admins, { ...newAdmin, id: newId, deletable: true }]);
    setIsAddModalOpen(false);
    setNewAdmin({ nama: "", email: "", role: "Operator" });

    toastSuccess(
      "Staf Ditambahkan",
      `${newAdmin.nama} kini memiliki akses ke dasbor.`,
    );
  };

  const handleDeleteAdmin = (idToRemove: number) => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus staf ini? Aksesnya akan langsung dicabut.",
      )
    ) {
      const adminToDrop = admins.find((a) => a.id === idToRemove);
      setAdmins(admins.filter((admin) => admin.id !== idToRemove));

      toastError(
        "Staf Dihapus",
        `Akses untuk ${adminToDrop?.nama} telah dicabut permanen.`,
      );
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-700">
      {/* 1. HEADER PAGE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-3">
            <Settings className="w-3.5 h-3.5" /> System Configuration
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Pengaturan Sistem
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-sm max-w-lg">
            Kelola identitas instansi, integrasi notifikasi email, dan kontrol
            penuh atas hak akses administrator.
          </p>
        </div>
      </div>

      {/* 2. TABS PENGATURAN */}
      <Tabs defaultValue="profil" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 h-14 bg-slate-100/80 dark:bg-slate-900 rounded-2xl p-1.5 shadow-inner">
          <TabsTrigger
            value="profil"
            className="flex gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:dark:bg-slate-800 data-[state=active]:shadow-md transition-all font-bold text-slate-500 dark:text-slate-400 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400"
          >
            <Building2 size={18} />{" "}
            <span className="hidden sm:inline">Profil Instansi</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifikasi"
            className="flex gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:dark:bg-slate-800 data-[state=active]:shadow-md transition-all font-bold text-slate-500 dark:text-slate-400 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400"
          >
            <Bell size={18} />{" "}
            <span className="hidden sm:inline">Notifikasi Sistem</span>
          </TabsTrigger>
          <TabsTrigger
            value="admin"
            className="flex gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:dark:bg-slate-800 data-[state=active]:shadow-md transition-all font-bold text-slate-500 dark:text-slate-400 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400"
          >
            <Users size={18} />{" "}
            <span className="hidden sm:inline">Hak Akses Admin</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: PROFIL INSTANSI */}
        <TabsContent
          value="profil"
          className="animate-in slide-in-from-bottom-4 duration-500"
        >
          <Card className="shadow-lg border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-6">
              <CardTitle className="text-xl font-bold dark:text-white">
                Profil Bawaslu Kab. Tegal
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                Informasi ini akan ditampilkan secara publik di menu kontak dan
                di bagian bawah setiap laporan cetak.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="nama_instansi"
                    className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest"
                  >
                    Nama Instansi
                  </Label>
                  <Input
                    id="nama_instansi"
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-emerald-500"
                    value={profil.nama}
                    onChange={(e) =>
                      setProfil({ ...profil, nama: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email_kontak"
                    className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest"
                  >
                    Email Resmi
                  </Label>
                  <Input
                    id="email_kontak"
                    type="email"
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-emerald-500"
                    value={profil.email}
                    onChange={(e) =>
                      setProfil({ ...profil, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="telepon"
                  className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest"
                >
                  Nomor Telepon / Hotline
                </Label>
                <Input
                  id="telepon"
                  className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-emerald-500"
                  value={profil.telepon}
                  onChange={(e) =>
                    setProfil({ ...profil, telepon: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="alamat"
                  className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest"
                >
                  Alamat Kantor Pusat
                </Label>
                <Textarea
                  id="alamat"
                  className="min-h-[100px] rounded-xl bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-emerald-500 resize-none"
                  value={profil.alamat}
                  onChange={(e) =>
                    setProfil({ ...profil, alamat: e.target.value })
                  }
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button
                  className="h-12 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                  onClick={handleSaveProfil}
                  disabled={isSavingProfil}
                >
                  {isSavingProfil ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" /> Simpan Profil
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: NOTIFIKASI EMAIL */}
        <TabsContent
          value="notifikasi"
          className="animate-in slide-in-from-bottom-4 duration-500"
        >
          <Card className="shadow-lg border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-6">
              <CardTitle className="text-xl font-bold dark:text-white">
                Pengaturan Notifikasi Otomatis
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                Atur bagaimana dan kapan sistem berinteraksi dengan masyarakat
                melalui email.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950/50 gap-4 shadow-inner">
                <div className="space-y-1">
                  <Label className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    Kirim Email Otomatis (SMTP)
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    Jika diaktifkan, sistem akan otomatis mengirim email ke
                    pelapor setiap kali Anda mengubah status tiket mereka.
                  </p>
                </div>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="template_bawah"
                  className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest"
                >
                  Template Pesan Penutup (Footer Email)
                </Label>
                <Textarea
                  id="template_bawah"
                  defaultValue="Terima kasih atas partisipasi Anda mengawal demokrasi. Pesan ini dikirim otomatis oleh sistem Si-Walu Bawaslu Kab. Tegal. Mohon tidak membalas email ini."
                  className="min-h-[120px] rounded-xl bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-emerald-500 resize-none text-sm text-slate-600 dark:text-slate-300"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button
                  className="h-12 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold shadow-lg dark:shadow-emerald-500/20 transition-all active:scale-95"
                  onClick={() =>
                    toastSuccess(
                      "Konfigurasi Disimpan",
                      "Pengaturan notifikasi email berhasil diperbarui.",
                    )
                  }
                >
                  <Save className="w-5 h-5 mr-2" /> Simpan Konfigurasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: MANAJEMEN ADMIN */}
        <TabsContent
          value="admin"
          className="animate-in slide-in-from-bottom-4 duration-500"
        >
          <Card className="shadow-lg border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold dark:text-white">
                  Daftar Administrator
                </CardTitle>
                <CardDescription className="dark:text-slate-400 mt-1">
                  Manajemen akun staf yang diizinkan mengakses panel kontrol
                  ini.
                </CardDescription>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-500/20"
              >
                <Plus className="w-5 h-5 mr-2" /> Tambah Staf Baru
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600 dark:text-slate-300">
                  <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] font-black border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Nama Lengkap</th>
                      <th className="px-6 py-4">Alamat Email</th>
                      <th className="px-6 py-4">Peran (Role)</th>
                      <th className="px-6 py-4 text-right">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr
                        key={admin.id}
                        className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">
                          {admin.nama}
                        </td>
                        <td className="px-6 py-4">{admin.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${admin.role === "Super Admin" ? "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"}`}
                          >
                            {admin.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {admin.deletable ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteAdmin(admin.id)}
                              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 h-8 w-8 rounded-lg"
                              title="Cabut Akses"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          ) : (
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium italic bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded-md">
                              Permanent
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 3. MODAL TAMBAH ADMIN */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-3xl border-none bg-white dark:bg-slate-950 shadow-2xl">
          <DialogHeader className="bg-indigo-600 p-6 md:p-8 text-white relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
            <DialogTitle className="text-2xl font-black tracking-tight relative z-10">
              Tambah Admin Baru
            </DialogTitle>
            <DialogDescription className="text-indigo-100 mt-1 font-medium relative z-10">
              Berikan hak akses dasbor kepada staf atau anggota verifikator
              Bawaslu yang baru.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 md:p-8 space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="new_nama"
                className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest"
              >
                Nama Lengkap
              </Label>
              <Input
                id="new_nama"
                placeholder="Contoh: Budi Santoso"
                className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-indigo-500"
                value={newAdmin.nama}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, nama: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="new_email"
                className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest"
              >
                Alamat Email Instansi
              </Label>
              <Input
                id="new_email"
                type="email"
                placeholder="budi@bawaslu-tegal.go.id"
                className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-indigo-500"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="new_role"
                className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest"
              >
                Tingkat Akses (Role)
              </Label>
              <Select
                value={newAdmin.role}
                onValueChange={(val) => setNewAdmin({ ...newAdmin, role: val })}
              >
                <SelectTrigger
                  id="new_role"
                  className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-indigo-500 font-semibold"
                >
                  <SelectValue placeholder="Pilih hak akses" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                  <SelectItem value="Operator" className="font-medium">
                    Operator (Ubah Tiket)
                  </SelectItem>
                  <SelectItem value="Pimpinan" className="font-medium">
                    Pimpinan (Lihat Laporan)
                  </SelectItem>
                  <SelectItem
                    value="Super Admin"
                    className="font-medium text-indigo-500"
                  >
                    Super Admin (Akses Penuh)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="px-6 md:px-8 pb-6 md:pb-8 pt-0 flex gap-3">
            <Button
              variant="ghost"
              className="flex-1 h-12 rounded-xl font-bold dark:hover:bg-slate-900"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20 transition-transform active:scale-95"
              onClick={handleAddAdmin}
            >
              Simpan Akses
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
