<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Report extends Model
{
    // Mengizinkan semua kolom untuk diisi data
    protected $guarded = [];

    // Menyambungkan Relasi: 1 Laporan punya Banyak Bukti
    public function evidences(): HasMany
    {
        return $this->hasMany(Evidence::class);
    }
}