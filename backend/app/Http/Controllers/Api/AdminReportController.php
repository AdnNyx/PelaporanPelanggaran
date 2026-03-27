<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\UpdateStatusLaporan; 

class AdminReportController extends Controller
{
    // Statistik Halaman Dashboard
    public function stats()
    {
        $reports = Report::all();

        $metrics = [
            'total'      => collect($reports)->count(),
            'pending'    => collect($reports)->where('status', 'pending')->count(),
            'verifikasi' => collect($reports)->where('status', 'verifikasi')->count(),
            'proses'     => collect($reports)->where('status', 'proses')->count(),
            'selesai'    => collect($reports)->where('status', 'selesai')->count(),
            'ditolak'    => collect($reports)->where('status', 'ditolak')->count(),
        ];

        $categoryStats = collect($reports)->groupBy('category')->map(function ($item, $key) {
            return [
                'name' => ucwords(str_replace('_', ' ', $key)),
                'value' => $item->count()
            ];
        })->values();

        $monthlyStats = [];
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
        
        foreach ($months as $index => $month) {
            $monthNum = $index + 1;
            $monthReports = collect($reports)->filter(function($r) use ($monthNum) {
                return $r->created_at->month == $monthNum && $r->created_at->year == date('Y');
            });

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

    // Ambil Semua Data Laporan
    public function index()
    {
        $reports = Report::with('evidences')->latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $reports
        ], 200);
    }

    // Update Status dan Catatan
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

        // Logika Pengiriman Email Otomatis
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

    // Ekspor Data ke CSV
    public function exportCsv()
    {
        $reports = Report::latest()->get();

        $filename = "Rekap_Laporan_Bawaslu_" . date('Y-m-d') . ".csv";

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['Nomor Tiket', 'Tanggal Masuk', 'Nama Pelapor', 'Email Pelapor', 'Kategori', 'Status', 'Catatan Admin'];

        $callback = function() use($reports, $columns) {
            $file = fopen('php://output', 'w');
            
            fputs($file, $bom =(chr(0xEF) . chr(0xBB) . chr(0xBF)));
            
            fputcsv($file, $columns);

            foreach ($reports as $report) {
                $row['Nomor Tiket']   = $report->ticket_code;
                $row['Tanggal Masuk'] = $report->created_at->format('Y-m-d H:i');
                $row['Nama Pelapor']  = $report->reporter_name;
                $row['Email Pelapor'] = $report->reporter_email;
                $row['Kategori']      = ucwords(str_replace('_', ' ', $report->category));
                $row['Status']        = strtoupper($report->status);
                $row['Catatan Admin'] = $report->admin_notes ?? '-';

                fputcsv($file, array($row['Nomor Tiket'], $row['Tanggal Masuk'], $row['Nama Pelapor'], $row['Email Pelapor'], $row['Kategori'], $row['Status'], $row['Catatan Admin']));
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}