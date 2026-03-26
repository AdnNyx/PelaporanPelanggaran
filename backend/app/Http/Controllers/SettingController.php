<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    // Publik: Untuk Footer Next.js
    public function getProfile()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'nama'    => Setting::where('key', 'instansi_nama')->value('value'),
                'email'   => Setting::where('key', 'instansi_email')->value('value'),
                'telepon' => Setting::where('key', 'instansi_telepon')->value('value'),
                'alamat'  => Setting::where('key', 'instansi_alamat')->value('value'),
            ]
        ], 200);
    }

    // Privat (Admin): Untuk menyimpan perubahan profil
    public function updateProfile(Request $request)
    {
        Setting::where('key', 'instansi_nama')->update(['value' => $request->nama]);
        Setting::where('key', 'instansi_email')->update(['value' => $request->email]);
        Setting::where('key', 'instansi_telepon')->update(['value' => $request->telepon]);
        Setting::where('key', 'instansi_alamat')->update(['value' => $request->alamat]);

        return response()->json([
            'success' => true,
            'message' => 'Profil Instansi berhasil diperbarui.'
        ], 200);
    }

    public function getEmailSettings()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'smtp_enabled' => Setting::where('key', 'smtp_enabled')->value('value') ?? 'true',
                'template_bawah' => Setting::where('key', 'template_bawah')->value('value') ?? 'Terima kasih atas partisipasi Anda...',
            ]
        ], 200);
    }

    public function updateEmailSettings(Request $request)
    {
        Setting::updateOrCreate(['key' => 'smtp_enabled'], ['value' => $request->smtp_enabled]);
        Setting::updateOrCreate(['key' => 'template_bawah'], ['value' => $request->template_bawah]);

        return response()->json(['success' => true, 'message' => 'Pengaturan Email disimpan.'], 200);
    }
}