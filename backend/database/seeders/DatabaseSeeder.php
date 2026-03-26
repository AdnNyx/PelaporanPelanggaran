<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Bawaslu',
            'email' => 'admin@bawaslu.go.id',
            'password' => Hash::make('password123'),
            'role' => 'Super Admin',
        ]);

        // (Taruh di dalam public function run())
        Setting::create(['key' => 'instansi_nama', 'value' => 'Bawaslu Kabupaten Tegal']);
        Setting::create(['key' => 'instansi_email', 'value' => 'set.tegal@bawaslu.go.id']);
        Setting::create(['key' => 'instansi_telepon', 'value' => '(0283) 4567890']);
        Setting::create(['key' => 'instansi_alamat', 'value' => 'Jl. Letjen Suprapto No.12, Slawi Wetan, Kec. Slawi, Kabupaten Tegal, Jawa Tengah 52411']);
    }
}