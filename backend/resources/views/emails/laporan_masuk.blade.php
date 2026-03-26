<!DOCTYPE html>
<html>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #dc2626;">Laporan Berhasil Diterima</h2>
        <p>Halo, <strong>{{ $laporan->reporter_name }}</strong>,</p>
        <p>Terima kasih telah berpartisipasi mengawal demokrasi. Laporan Anda telah kami terima dengan detail berikut:</p>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0;">
            <p><strong>Nomor Tiket:</strong> <span style="font-size: 18px; color: #dc2626; font-weight: bold;">{{ $laporan->ticket_code ?? $laporan->nomor_tiket }}</span></p>
            <p><strong>Kategori:</strong> {{ $laporan->category }}</p>
        </div>
        <p>Simpan nomor tiket di atas untuk mengecek status laporan Anda di portal Si-Walu.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;">
        <p style="font-size: 12px; color: #666;">Pesan ini dikirim otomatis oleh sistem Si-Walu Bawaslu Kab. Tegal.</p>
    </div>
</body>
</html>