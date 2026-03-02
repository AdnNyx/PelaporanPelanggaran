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
import { Building2, Bell, Users, Save, Plus, Trash2 } from "lucide-react";

// 1. IMPORT HOOK USETOAST (Jika error, coba ganti path menjadi "@/components/ui/use-toast")
import { useToast } from "@/hooks/use-toast";

export default function PengaturanPage() {
  // 2. PANGGIL HOOK TOAST
  const { toast } = useToast();

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

  // --- FUNGSI HANDLER DENGAN NOTIFIKASI TOAST ---

  const handleSaveProfil = () => {
    setIsSavingProfil(true);
    setTimeout(() => {
      setIsSavingProfil(false);
      // Panggil notifikasi sukses
      toast({
        title: "✅ Perubahan Disimpan",
        description: "Profil Bawaslu Kabupaten Tegal berhasil diperbarui.",
      });
    }, 1000);
  };

  const handleAddAdmin = () => {
    if (!newAdmin.nama || !newAdmin.email) {
      toast({
        variant: "destructive", // Membuat warna pop-up menjadi merah (error)
        title: "Gagal Menambahkan",
        description: "Nama dan Email wajib diisi!",
      });
      return;
    }
    const newId = admins.length > 0 ? admins[admins.length - 1].id + 1 : 1;
    setAdmins([...admins, { ...newAdmin, id: newId, deletable: true }]);
    setIsAddModalOpen(false);
    setNewAdmin({ nama: "", email: "", role: "Operator" });

    // Panggil notifikasi sukses
    toast({
      title: "✅ Staf Ditambahkan",
      description: `${newAdmin.nama} kini memiliki akses ke dasbor.`,
    });
  };

  const handleDeleteAdmin = (idToRemove: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus staf ini?")) {
      const adminToDrop = admins.find((a) => a.id === idToRemove);
      setAdmins(admins.filter((admin) => admin.id !== idToRemove));

      // Panggil notifikasi sukses
      toast({
        title: "🗑️ Staf Dihapus",
        description: `Akses untuk ${adminToDrop?.nama} telah dicabut.`,
      });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Pengaturan Sistem
        </h1>
        <p className="text-slate-500 mt-1">
          Kelola konfigurasi website, notifikasi, dan hak akses admin.
        </p>
      </div>

      {/* TABS PENGATURAN */}
      <Tabs defaultValue="profil" className="w-full">
        {/* NAVIGASI TABS */}
        <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
          <TabsTrigger value="profil" className="flex gap-2">
            <Building2 size={16} /> Profil Instansi
          </TabsTrigger>
          <TabsTrigger value="notifikasi" className="flex gap-2">
            <Bell size={16} /> Notifikasi Email
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex gap-2">
            <Users size={16} /> Manajemen Admin
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: PROFIL INSTANSI */}
        <TabsContent value="profil">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Profil Bawaslu Kab. Tegal</CardTitle>
              <CardDescription>
                Informasi ini akan ditampilkan di halaman publik (Footer) dan
                Kop Surat cetak.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama_instansi">Nama Instansi</Label>
                  <Input
                    id="nama_instansi"
                    value={profil.nama}
                    onChange={(e) =>
                      setProfil({ ...profil, nama: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email_kontak">Email Resmi</Label>
                  <Input
                    id="email_kontak"
                    type="email"
                    value={profil.email}
                    onChange={(e) =>
                      setProfil({ ...profil, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telepon">
                  Nomor Telepon / WhatsApp Pengecekan
                </Label>
                <Input
                  id="telepon"
                  value={profil.telepon}
                  onChange={(e) =>
                    setProfil({ ...profil, telepon: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat Kantor</Label>
                <Textarea
                  id="alamat"
                  className="min-h-[100px]"
                  value={profil.alamat}
                  onChange={(e) =>
                    setProfil({ ...profil, alamat: e.target.value })
                  }
                />
              </div>
              <Button
                className="mt-4 bg-slate-900 hover:bg-slate-800"
                onClick={handleSaveProfil}
                disabled={isSavingProfil}
              >
                {isSavingProfil ? (
                  "Menyimpan..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: NOTIFIKASI EMAIL */}
        <TabsContent value="notifikasi">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi Sistem</CardTitle>
              <CardDescription>
                Atur bagaimana sistem berkomunikasi dengan masyarakat pelapor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50">
                <div className="space-y-0.5">
                  <Label className="text-base">Kirim Email Otomatis</Label>
                  <p className="text-sm text-slate-500">
                    Sistem akan mengirim email otomatis via Resend/SMTP saat ada
                    perubahan status tiket.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template_bawah">
                  Pesan Footer Email (Otomatis ditambahkan di setiap email)
                </Label>
                <Textarea
                  id="template_bawah"
                  defaultValue="Terima kasih atas partisipasi Anda mengawal demokrasi. Pesan ini dikirim otomatis oleh sistem Si-Walu Bawaslu Kab. Tegal. Mohon tidak membalas email ini."
                  className="h-24 text-sm"
                />
              </div>

              <Button
                className="bg-slate-900 hover:bg-slate-800"
                onClick={() =>
                  toast({
                    title: "✅ Disimpan",
                    description: "Konfigurasi notifikasi email diperbarui.",
                  })
                }
              >
                <Save className="w-4 h-4 mr-2" /> Simpan Konfigurasi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: MANAJEMEN ADMIN */}
        <TabsContent value="admin">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Staf Administrator</CardTitle>
                <CardDescription className="mt-1">
                  Daftar akun yang dapat masuk ke panel dasbor ini.
                </CardDescription>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Tambah Admin Baru
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="border rounded-lg overflow-hidden mb-4">
                <table className="w-full text-sm text-left text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 uppercase">
                    <tr>
                      <th className="px-4 py-3">Nama Staf</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Peran (Role)</th>
                      <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr
                        key={admin.id}
                        className="border-b hover:bg-slate-50/50"
                      >
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {admin.nama}
                        </td>
                        <td className="px-4 py-3">{admin.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              admin.role === "Super Admin"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {admin.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {admin.deletable ? (
                            <button
                              onClick={() => handleDeleteAdmin(admin.id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors inline-flex items-center justify-center"
                              title="Hapus Staf"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 italic">
                              Tidak bisa dihapus
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

      {/* MODAL TAMBAH ADMIN */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Admin Baru</DialogTitle>
            <DialogDescription>
              Berikan akses dasbor kepada staf atau anggota Bawaslu yang baru.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new_nama">Nama Lengkap</Label>
              <Input
                id="new_nama"
                placeholder="Contoh: Siti Aminah"
                value={newAdmin.nama}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, nama: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_email">Email Instansi</Label>
              <Input
                id="new_email"
                type="email"
                placeholder="siti@bawaslu-tegal.go.id"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_role">Peran (Role)</Label>
              <Select
                value={newAdmin.role}
                onValueChange={(val) => setNewAdmin({ ...newAdmin, role: val })}
              >
                <SelectTrigger id="new_role">
                  <SelectValue placeholder="Pilih hak akses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Operator">
                    Operator (Hanya verifikasi tiket)
                  </SelectItem>
                  <SelectItem value="Pimpinan">
                    Pimpinan (Melihat statistik)
                  </SelectItem>
                  <SelectItem value="Super Admin">
                    Super Admin (Akses penuh)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Batal
            </Button>
            <Button
              className="bg-slate-900 hover:bg-slate-800"
              onClick={handleAddAdmin}
            >
              Simpan Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
