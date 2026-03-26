"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { ShieldAlert, ArrowLeft, Loader2 } from "lucide-react";
import { useCustomToast } from "@/hooks/use-custom-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toastSuccess, toastError } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- API LOGIN LARAVEL ---
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toastError("Data Kosong", "Email dan password wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // SIMPAN TOKEN
        localStorage.setItem("admin_token", result.token);

        // SIMPAN ROLE (Sangat penting untuk mengatur hak akses halaman!)
        // Jika dari backend tidak ada role, kita default sebagai "Operator"
        localStorage.setItem("admin_role", result.user.role || "Operator");

        toastSuccess("Akses Diterima", `Selamat datang, ${result.user.name}!`);

        router.push("/dashboard");
      } else {
        toastError(
          "Akses Ditolak",
          result.message || "Email atau kata sandi tidak cocok.",
        );
      }
    } catch (error) {
      console.error(error);
      toastError(
        "Koneksi Gagal",
        "Tidak dapat terhubung ke server autentikasi.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 transition-colors duration-500">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Beranda
      </Link>

      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        {/* LOGO AREA */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-500/10 rounded-2xl shadow-inner">
              <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-500" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              <span className="text-red-600 dark:text-red-500">Si-</span>Walu
            </h1>
          </div>
        </div>

        {/* LOGIN CARD */}
        <Card className="shadow-2xl border-t-4 border-t-slate-900 dark:border-t-red-600 dark:bg-slate-900 border-x-slate-200 border-b-slate-200 dark:border-x-slate-800 dark:border-b-slate-800 transition-colors">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl font-bold dark:text-white">
              Admin Portal
            </CardTitle>
            <CardDescription className="dark:text-slate-400">
              Masuk menggunakan email dan kata sandi yang terdaftar pada sistem
              Bawaslu Tegal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="dark:text-slate-300 font-bold"
                >
                  Email Administrator
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@bawaslu.go.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 h-12"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="dark:text-slate-300 font-bold"
                  >
                    Kata Sandi
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline transition-colors"
                  >
                    Lupa sandi?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white h-12"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-red-600 dark:hover:bg-red-700 text-white mt-6 h-12 font-bold text-md transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                    Memverifikasi...
                  </>
                ) : (
                  "Masuk ke Dashboard"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 rounded-b-lg transition-colors">
            Sistem Informasi Bawaslu Kab. Tegal &copy;{" "}
            {new Date().getFullYear()}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
