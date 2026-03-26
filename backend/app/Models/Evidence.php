<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Evidence extends Model
{
    protected $table = 'evidences';

    // Mengizinkan mass assignment
    protected $guarded = [];

    // Relasi Balik: 1 Bukti ini milik 1 Laporan
    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }
}