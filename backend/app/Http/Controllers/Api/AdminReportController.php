<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\Setting; // Ditambahkan untuk cek pengaturan SMTP
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail; // Ditambahkan untuk mengirim email
use App\Mail\UpdateStatusLaporan; // Ditambahkan untuk memanggil template email

class AdminReportController extends Controller
{
    // 1. Ambil Statistik untuk Halaman Dashboard
    public function stats()
    {
        $reports = Report::all();

        // 1. Data untuk Kartu Metrik
        $metrics = [
            'total'      => collect($reports)->count(),
            'pending'    => collect($reports)->where('status', 'pending')->count(),
            'verifikasi' => collect($reports)->where('status', 'verifikasi')->count(),
            'proses'     => collect($reports)->where('status', 'proses')->count(),
            'selesai'    => collect($reports)->where('status', 'selesai')->count(),
            'ditolak'    => collect($reports)->where('status', 'ditolak')->count(),
        ];

        // 2. Data untuk Grafik Donut (Kategori)
        $categoryStats = collect($reports)->groupBy('category')->map(function ($item, $key) {
            return [
                'name' => ucwords(str_replace('_', ' ', $key)),
                'value' => $item->count()
            ];
        })->values();

        // 3. Data untuk Grafik Area (Tren Bulanan Tahun Ini)
        $monthlyStats = [];
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
        
        foreach ($months as $index => $month) {
            $monthNum = $index + 1;
            $monthReports = collect($reports)->filter(function($r) use ($monthNum) {
                return $r->created_at->month == $monthNum && $r->created_at->year == date('Y');
            });

            // Hanya tampilkan bulan dari Januari sampai bulan saat ini
            if ($monthNum <= date('n')) {
                $monthlyStats[] = [
                    'bulan' => $month,
                    'laporan' => $monthReports->count(),
                    'selesai' => $monthReports->where('status', 'selesai')->count()
                ];
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'metrics' => $metrics,
                'chart_kategori' => $categoryStats,
                'chart_bulanan' => $monthlyStats
            ]
        ], 200);
    }

    // 2. Ambil Semua Data Laporan (Untuk Halaman Tabel Laporan)
    public function index()
    {
        // Mengambil semua laporan beserta buktinya, diurutkan dari yang paling baru
        $reports = Report::with('evidences')->latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $reports
        ], 200);
    }

    // 3. Update Status dan Catatan (Saat tombol "Simpan Perubahan" diklik)
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,verifikasi,proses,selesai,ditolak',
            'admin_notes' => 'nullable|string'
        ]);

        $report = Report::find($id);

        if (!$report) {
            return response()->json([
                'success' => false, 
                'message' => 'Laporan tidak ditemukan'
            ], 404);
        }

        // Update data di database
        $report->update([
            'status'      => $request->status,
            'admin_notes' => $request->admin_notes
        ]);

        // --- LOGIKA PENGIRIMAN EMAIL OTOMATIS ---
        // Cek apakah fitur SMTP di Pengaturan Sistem dalam kondisi "On"
        $isSmtpEnabled = Setting::where('key', 'smtp_enabled')->value('value') !== 'false';

        if ($isSmtpEnabled) {
            try {
                Mail::to($report->reporter_email)->send(new UpdateStatusLaporan($report));
            } catch (\Exception $e) {
                // Catat error di log jika gagal (misal koneksi internet putus), tapi jangan gagalkan proses update
                \Log::error('Gagal kirim email update status ke: ' . $report->reporter_email . ' | Error: ' . $e->getMessage());
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Status laporan berhasil diperbarui.',
            'data'    => $report
        ], 200);
    }
}