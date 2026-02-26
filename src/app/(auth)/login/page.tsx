"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi simulasi login (hanya Frontend)
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Karena backend belum ada, kita buat simulasi loading 1 detik
    setTimeout(() => {
      setIsLoading(false);
      // Simulasi redirect ke dashboard (nanti diganti dengan router Next.js saat diintegrasi)
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      {/* Tombol kembali ke Beranda */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Beranda
      </Link>

      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-10 h-10 text-red-600" />
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              <span className="text-red-600">Si-</span>Walu
            </h1>
          </div>
        </div>

        <Card className="shadow-lg border-t-4 border-t-slate-900">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
            <CardDescription>
              Masuk menggunakan email dan kata sandi yang terdaftar pada sistem
              Bawaslu Tegal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Administrator</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@bawaslu-tegal.go.id"
                  required
                  className="bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <Link
                    href="#"
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Lupa sandi?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-slate-50"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Memverifikasi..." : "Masuk ke Dashboard"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4 bg-slate-50 text-xs text-slate-500 rounded-b-lg">
            Sistem Informasi Bawaslu Kab. Tegal © {new Date().getFullYear()}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
