<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_code')->unique();
            $table->string('category'); 
            $table->enum('status', ['pending', 'verifikasi', 'proses', 'selesai', 'ditolak'])->default('pending');
            $table->text('description');
            
            // Data Pelapor
            $table->string('reporter_name');
            $table->string('reporter_email');
            $table->text('reporter_address');
            
            // Catatan Admin
            $table->text('admin_notes')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
