"use client";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TrendingUp, PieChart as PieChartIcon } from "lucide-react";
import { useTheme } from "next-themes";

// --- DUMMY DATA ---
const laporanBulanan = [
  { bulan: "Okt", jumlah: 15 },
  { bulan: "Nov", jumlah: 28 },
  { bulan: "Des", jumlah: 42 },
  { bulan: "Jan", jumlah: 20 },
  { bulan: "Feb", jumlah: 35 },
  { bulan: "Mar", jumlah: 12 },
];

const jenisPelanggaran = [
  { name: "Politik Uang", value: 45 },
  { name: "Netralitas ASN", value: 30 },
  { name: "Kampanye Hitam", value: 15 },
  { name: "Administrasi", value: 10 },
];

const COLORS = ["#ef4444", "#3b82f6", "#f59e0b", "#10b981"];

export default function PublicCharts() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
      {/* 1. GRAFIK LAPORAN BULANAN (TRADING / AREA CHART) */}
      <Card className="shadow-lg border-none bg-white dark:bg-slate-900/50 backdrop-blur-sm relative overflow-hidden group transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
        <CardHeader className="pb-8">
          <CardTitle className="text-xl font-bold flex items-center gap-2 dark:text-white">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Tren Laporan Masuk
          </CardTitle>
          <CardDescription className="dark:text-slate-400">
            Pergerakan volume pelaporan selama 6 bulan terakhir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={laporanBulanan}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                {/* Definisi Warna Gradien (seperti Trading Chart) */}
                <defs>
                  <linearGradient id="colorJumlah" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#ef4444"
                      stopOpacity={isDark ? 0.3 : 0.2}
                    />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Garis Grid Horizontal (Lembut) */}
                <CartesianGrid
                  strokeDasharray="3 3"
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
                    fontWeight: 500,
                  }}
                  tickMargin={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 }}
                />

                {/* Kotak Info saat Mouse Hover */}
                <Tooltip
                  cursor={{
                    stroke: isDark ? "#334155" : "#cbd5e1",
                    strokeWidth: 2,
                    strokeDasharray: "5 5",
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    backgroundColor: isDark
                      ? "rgba(15, 23, 42, 0.9)"
                      : "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                    color: isDark ? "#ffffff" : "#0f172a",
                    fontWeight: "bold",
                  }}
                  itemStyle={{
                    color: "#ef4444",
                    fontWeight: "bold",
                  }}
                />

                {/* Garis Utama dan Area Gradien */}
                <Area
                  type="monotone" // Membuat garis melengkung dinamis
                  dataKey="jumlah"
                  stroke="#ef4444"
                  strokeWidth={3}
                  fill="url(#colorJumlah)"
                  activeDot={{
                    r: 6,
                    fill: "#ffffff",
                    stroke: "#ef4444",
                    strokeWidth: 3,
                  }}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 2. GRAFIK JENIS PELAPORAN (DONUT CHART) */}
      <Card className="shadow-lg border-none bg-white dark:bg-slate-900/50 backdrop-blur-sm relative overflow-hidden group transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2 dark:text-white">
            <PieChartIcon className="w-5 h-5 text-blue-500" />
            Kategori Pelanggaran
          </CardTitle>
          <CardDescription className="dark:text-slate-400">
            Persentase jenis pelanggaran yang sering dilaporkan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center relative">
            {/* Teks di tengah Donut Chart */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
              <span className="text-3xl font-black text-slate-800 dark:text-white">
                124
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Total Tiket
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={jenisPelanggaran}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  animationDuration={2000}
                >
                  {jenisPelanggaran.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    backgroundColor: isDark
                      ? "rgba(15, 23, 42, 0.9)"
                      : "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                    color: isDark ? "#ffffff" : "#0f172a",
                    fontWeight: "bold",
                  }}
                  itemStyle={{ color: isDark ? "#cbd5e1" : "#475569" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: isDark ? "#cbd5e1" : "#475569",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
