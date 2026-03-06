"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  TrendingUp,
  ShieldCheck,
  RefreshCcw,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useTheme } from "next-themes";

// --- DUMMY DATA ---
const trenBulanan = [
  { bulan: "Jan", laporan: 12, selesai: 5 },
  { bulan: "Feb", laporan: 19, selesai: 10 },
  { bulan: "Mar", laporan: 15, selesai: 12 },
  { bulan: "Apr", laporan: 22, selesai: 18 },
  { bulan: "Mei", laporan: 30, selesai: 25 },
  { bulan: "Jun", laporan: 25, selesai: 22 },
];

const jenisPelanggaran = [
  { name: "Politik Uang", value: 45 },
  { name: "Netralitas ASN", value: 30 },
  { name: "Kampanye Hitam", value: 15 },
  { name: "Administrasi", value: 10 },
];

const COLORS = ["#ef4444", "#3b82f6", "#f59e0b", "#10b981"];

export default function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* 1. HEADER DASHBOARD */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-500/20 to-rose-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Executive Control Panel
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Overview Analytics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-sm">
            Pantau arus pelaporan dan performa penindakan Bawaslu secara
            real-time.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950/50 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
            <RefreshCcw className="w-4 h-4 text-indigo-500 animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Status Sinkronisasi
            </span>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              LIVE DATA
            </span>
          </div>
        </div>
      </div>

      {/* 2. METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Laporan */}
        <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-none shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transition-all duration-300 group-hover:w-full group-hover:opacity-10 z-0"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Laporan Masuk
                </p>
                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  124
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2.5 py-1 rounded-lg">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>+12.5%</span>
              <span className="text-slate-400 dark:text-slate-500 ml-1 text-xs font-medium">
                vs bulan lalu
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Menunggu */}
        <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-none shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 transition-all duration-300 group-hover:w-full group-hover:opacity-10 z-0"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Menunggu Verifikasi
                </p>
                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  18
                </p>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 w-fit px-2.5 py-1 rounded-lg">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">Perlu Tindakan</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Selesai */}
        <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-none shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 transition-all duration-300 group-hover:w-full group-hover:opacity-10 z-0"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Telah Diputus
                </p>
                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  92
                </p>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2.5 py-1 rounded-lg">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>+8.2%</span>
              <span className="text-slate-400 dark:text-slate-500 ml-1 text-xs font-medium">
                penyelesaian
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Ditolak */}
        <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-none shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 transition-all duration-300 group-hover:w-full group-hover:opacity-10 z-0"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Ditolak (TMS)
                </p>
                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  14
                </p>
              </div>
              <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 w-fit px-2.5 py-1 rounded-lg">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              <span>-2.1%</span>
              <span className="text-slate-400 dark:text-slate-500 ml-1 text-xs font-medium">
                vs bulan lalu
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. GRAPHS & CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AREA CHART KINERJA */}
        <Card className="lg:col-span-2 shadow-lg border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-50 dark:border-slate-800/50 pb-6 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Kinerja Penanganan Kasus
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Rasio laporan masuk vs laporan yang telah diselesaikan.
                </CardDescription>
              </div>
              {/* Legend Custom */}
              <div className="hidden sm:flex items-center gap-4 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>{" "}
                  Laporan Masuk
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>{" "}
                  Kasus Selesai
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 pb-4 pl-0">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trenBulanan}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorLaporan"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorSelesai"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke={isDark ? "#1e293b" : "#f1f5f9"}
                  />
                  <XAxis
                    dataKey="bulan"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: isDark ? "#94a3b8" : "#64748b",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                    tickMargin={15}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: isDark ? "#94a3b8" : "#64748b",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: isDark
                        ? "1px solid #334155"
                        : "1px solid #e2e8f0",
                      backgroundColor: isDark
                        ? "rgba(15, 23, 42, 0.95)"
                        : "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      color: isDark ? "#f8fafc" : "#0f172a",
                      fontWeight: "bold",
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    itemStyle={{ padding: "4px 0", fontWeight: "bold" }}
                  />

                  <Area
                    type="monotone"
                    dataKey="laporan"
                    name="Laporan Masuk"
                    stroke="#f43f5e"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorLaporan)"
                    activeDot={{ r: 6, strokeWidth: 0, fill: "#f43f5e" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="selesai"
                    name="Kasus Selesai"
                    stroke="#10b981"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorSelesai)"
                    activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* DONUT CHART KATEGORI */}
        <Card className="shadow-lg border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden flex flex-col">
          <CardHeader className="border-b border-slate-50 dark:border-slate-800/50 pb-6 bg-slate-50/50 dark:bg-slate-900/50">
            <CardTitle className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-blue-500" />
              Distribusi Pelanggaran
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Berdasarkan kategori laporan.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col justify-center">
            <div className="h-[280px] w-full flex items-center justify-center relative">
              {/* Teks Poros Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                  124
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                  Total Laporan
                </span>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jenisPelanggaran}
                    cx="50%"
                    cy="45%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10} // Membuat ujung chart melengkung
                  >
                    {jenisPelanggaran.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="hover:scale-105 transition-transform outline-none"
                        style={{ transformOrigin: "center" }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: isDark ? "1px solid #334155" : "none",
                      backgroundColor: isDark
                        ? "rgba(15, 23, 42, 0.95)"
                        : "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      color: isDark ? "#f8fafc" : "#0f172a",
                      fontWeight: "bold",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    itemStyle={{
                      color: isDark ? "#cbd5e1" : "#475569",
                      fontWeight: "bold",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: isDark ? "#94a3b8" : "#64748b",
                      marginTop: "10px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
