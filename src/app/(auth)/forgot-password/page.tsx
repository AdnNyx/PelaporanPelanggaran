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
import {
  ShieldAlert,
  ArrowLeft,
  Loader2,
  MailCheck,
  KeyRound,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Simulasi pengiriman email
  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi jeda server / API Call pengiriman email (2 detik)
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true); // Mengubah status untuk menampilkan layar sukses
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 transition-colors duration-500">
      {/* Tombol kembali ke Login */}
      <Link
        href="/login"
        className="absolute top-8 left-8 flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Login
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

        <Card className="shadow-2xl border-t-4 border-t-slate-900 dark:border-t-red-600 dark:bg-slate-900 border-x-slate-200 border-b-slate-200 dark:border-x-slate-800 dark:border-b-slate-800 transition-colors">
          {/* TAMPILAN 1: FORM INPUT EMAIL */}
          {!isSent ? (
            <>
              <CardHeader className="space-y-1 text-center pb-6">
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <KeyRound className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold dark:text-white">
                  Lupa Kata Sandi?
                </CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Masukkan alamat email akun admin Anda. Kami akan mengirimkan
                  tautan untuk mengatur ulang kata sandi.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-5">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@bawaslu-tegal.go.id"
                      required
                      className="bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 h-12"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-red-600 dark:hover:bg-red-700 text-white mt-6 h-12 font-bold text-md transition-all active:scale-[0.98]"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                        Mengirim Tautan...
                      </>
                    ) : (
                      "Kirim Tautan Pemulihan"
                    )}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            // TAMPILAN 2: SUKSES KIRIM EMAIL
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-8 px-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 dark:bg-green-500/10 rounded-full">
                  <MailCheck className="w-10 h-10 text-green-600 dark:text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Cek Email Anda
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                Tautan untuk mengatur ulang kata sandi telah dikirim ke <br />
                <span className="font-bold text-slate-900 dark:text-white">
                  {email}
                </span>
                . <br />
                Silakan periksa kotak masuk atau folder spam Anda.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => (window.location.href = "/login")}
                  className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-red-600 dark:hover:bg-red-700 text-white h-12 font-bold"
                >
                  Kembali ke Halaman Login
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsSent(false);
                    setEmail("");
                  }}
                  className="w-full h-12 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  Coba Email Lain
                </Button>
              </div>
            </div>
          )}

          <CardFooter className="flex justify-center border-t dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 rounded-b-lg transition-colors">
            Sistem Informasi Bawaslu Kab. Tegal &copy;{" "}
            {new Date().getFullYear()}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
