<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LaporanDiterima extends Mailable
{
    use Queueable, SerializesModels;

    public $laporan;

    public function __construct($laporan)
    {
        $this->laporan = $laporan;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Tiket Laporan Bawaslu Berhasil Dibuat',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.laporan_masuk',
        );
    }
}