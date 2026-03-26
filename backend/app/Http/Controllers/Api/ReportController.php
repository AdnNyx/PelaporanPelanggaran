<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\Evidence;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail; // TAMBAHKAN INI
use App\Mail\LaporanDiterima; // TAMBAHKAN INI

class ReportController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi Data dari Next.js
        $request->validate([
            'reporter_name'    => 'required|string|max:255',
            'reporter_email'   => 'required|email|max:255',
            'reporter_address' => 'required|string',
            'category'         => 'required|string',
            'description'      => 'required|string',
            'evidences'        => 'nullable|array', // Bisa ada file, bisa tidak
            'evidences.*'      => 'file|mimes:jpg,jpeg,png,pdf,mp4|max:10240', // Maks 10MB per file
        ]);

        try {
            // Gunakan Database Transaction agar aman
            DB::beginTransaction();

            // 2. Buat Nomor Tiket Unik (Contoh: BWS-TGL-2026-X8Y2Z)
            $ticket_code = 'BWS-TGL-' . date('Y') . '-' . strtoupper(Str::random(5));

            // 3. Simpan Data Teks ke Tabel `reports`
            $report = Report::create([
                'ticket_code'      => $ticket_code,
                'category'         => $request->category,
                'description'      => $request->description,
                'reporter_name'    => $request->reporter_name,
                'reporter_email'   => $request->reporter_email,
                'reporter_address' => $request->reporter_address,
                'status'           => 'pending',
            ]);

            // 4. Simpan File Bukti (Jika Ada) ke Tabel `evidences`
            if ($request->hasFile('evidences')) {
                foreach ($request->file('evidences') as $file) {
                    $fileName = time() . '_' . Str::random(5) . '_' . $file->getClientOriginalName();
                    $filePath = $file->storeAs('evidences', $fileName, 'public');

                    Evidence::create([
                        'report_id' => $report->id,
                        'file_path' => '/storage/' . $filePath,
                        'file_name' => $file->getClientOriginalName(),
                    ]);
                }
            }

            // 5. KIRIM EMAIL BUKTI TERIMA KE PELAPOR
            // Kita bungkus dalam try-catch terpisah agar jika email gagal, laporan tetap masuk database
            try {
                Mail::to($report->reporter_email)->send(new LaporanDiterima($report));
            } catch (\Exception $emailError) {
                // Log error email, tapi jangan gagalkan proses pembuatan laporan
                \Log::error('Gagal kirim email bukti terima ke: ' . $report->reporter_email . ' | Error: ' . $emailError->getMessage());
            }

            DB::commit();

            // 6. Kembalikan Respons Sukses ke Next.js beserta Nomor Tiketnya
            return response()->json([
                'success' => true,
                'message' => 'Laporan dan email bukti terima berhasil dikirim.',
                'ticket_code' => $ticket_code
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            // Kembalikan Respons Error jika gagal
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage()
            ], 500);
        }
    }

    public function track($ticket_code)
    {
        // Cari laporan berdasarkan nomor tiket, dan ambil sekalian data bukti lampirannya
        $report = Report::with('evidences')->where('ticket_code', $ticket_code)->first();

        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Nomor tiket tidak ditemukan. Pastikan Anda memasukkan kode yang benar.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $report
        ], 200);
    }

    public function publicStats()
    {
        $reports = Report::all();

        return response()->json([
            'success' => true,
            'data' => [
                'total'      => $reports->count(),
                'verifikasi' => $reports->where('status', 'verifikasi')->count(),
                'proses'     => $reports->where('status', 'proses')->count(),
                'selesai'    => $reports->where('status', 'selesai')->count(),
            ]
        ], 200);
    }
}