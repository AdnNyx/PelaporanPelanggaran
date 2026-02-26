"use client";

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
import { Building2, Bell, Users, Save } from "lucide-react";

export default function PengaturanPage() {
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
          <Card>
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
                    defaultValue="Bawaslu Kabupaten Tegal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email_kontak">Email Resmi</Label>
                  <Input
                    id="email_kontak"
                    type="email"
                    defaultValue="set.tegal@bawaslu.go.id"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telepon">
                  Nomor Telepon / WhatsApp Pengecekan
                </Label>
                <Input id="telepon" defaultValue="(0283) 4567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat Kantor</Label>
                <Textarea
                  id="alamat"
                  defaultValue="Jl. Raya Slawi - Tegal No. 123, Kabupaten Tegal, Jawa Tengah"
                />
              </div>
              <Button className="mt-4 bg-slate-900">
                <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: NOTIFIKASI EMAIL */}
        <TabsContent value="notifikasi">
          <Card>
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
                    Sistem akan mengirim email otomatis via Resend saat ada
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
                  className="h-24"
                />
              </div>

              <Button className="bg-slate-900">
                <Save className="w-4 h-4 mr-2" /> Simpan Konfigurasi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: MANAJEMEN ADMIN */}
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Staf Administrator</CardTitle>
              <CardDescription>
                Daftar akun yang dapat masuk ke panel dasbor ini.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        Admin Utama
                      </td>
                      <td className="px-4 py-3">admin@bawaslu-tegal.go.id</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Super Admin
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-400">
                        Tidak bisa dihapus
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        Staf Verifikator 1
                      </td>
                      <td className="px-4 py-3">staf1@bawaslu-tegal.go.id</td>
                      <td className="px-4 py-3">
                        <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Operator
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-red-600 cursor-pointer hover:underline">
                        Hapus
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button variant="outline">Tambah Admin Baru</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
