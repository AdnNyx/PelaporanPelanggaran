"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { AlertCircle, CheckCircle2, Clock, FileText } from "lucide-react";

// --- DUMMY DATA ---
const trenBulanan = [
  { bulan: "Jan", laporan: 12 },
  { bulan: "Feb", laporan: 19 },
  { bulan: "Mar", laporan: 15 },
  { bulan: "Apr", laporan: 22 },
  { bulan: "Mei", laporan: 30 },
  { bulan: "Jun", laporan: 25 },
];

const jenisPelanggaran = [
  { name: "Politik Uang", value: 45 },
  { name: "Netralitas ASN", value: 30 },
  { name: "Kampanye Hitam", value: 15 },
  { name: "Administrasi", value: 10 },
];

const COLORS = ["#ef4444", "#3b82f6", "#f59e0b", "#10b981"];

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* HEADER DASHBOARD */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard Executive
        </h1>
        <p className="text-slate-500 mt-2">
          Ringkasan statistik pelaporan pelanggaran pemilu tahun 2026.
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              Total Laporan Masuk
            </CardTitle>
            <div className="p-2 bg-blue-50 rounded-full">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">124</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              Menunggu Verifikasi
            </CardTitle>
            <div className="p-2 bg-yellow-50 rounded-full">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">18</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Butuh tindakan segera
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              Laporan Selesai
            </CardTitle>
            <div className="p-2 bg-green-50 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">92</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Telah diproses & diputus
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              Laporan Ditolak
            </CardTitle>
            <div className="p-2 bg-red-50 rounded-full">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">14</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Bukti tidak valid
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BAR CHART */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800 font-bold">
              Tren Pelaporan Per Bulan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={trenBulanan}
                  margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
                >
                  <XAxis
                    dataKey="bulan"
                    stroke="#888888"
                    fontSize={13}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={13}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      fontWeight: "500",
                    }}
                  />
                  <Bar
                    dataKey="laporan"
                    fill="#ef4444"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* PIE CHART */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800 font-bold">
              Jenis Laporan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jenisPelanggaran}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {jenisPelanggaran.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      fontWeight: "500",
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "13px",
                      color: "#475569",
                      paddingTop: "20px",
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
