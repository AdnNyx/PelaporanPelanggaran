<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Setting; // Pastikan ini dipanggil

class UpdateStatusLaporan extends Mailable
{
    use Queueable, SerializesModels;

    public $laporan;
    public $templateBawah;

    public function __construct($laporan)
    {
        $this->laporan = $laporan;
        // Ambil template footer langsung dari Database Settings yang tadi kita buat di Next.js
        $this->templateBawah = Setting::where('key', 'template_bawah')->value('value') 
                               ?? 'Terima kasih atas partisipasi Anda.';
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pembaruan Status Laporan Si-Walu Bawaslu',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.status_laporan', // Kita akan buat file blade ini selanjutnya
        );
    }
}