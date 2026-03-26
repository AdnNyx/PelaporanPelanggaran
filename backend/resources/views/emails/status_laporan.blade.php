<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .header { background-color: #059669; color: white; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 20px 0; }
        .status { display: inline-block; padding: 5px 10px; border-radius: 4px; font-weight: bold; background-color: #f3f4f6; text-transform: uppercase; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Pembaruan Laporan Anda</h2>
        </div>
        
        <div class="content">
            <p>Halo, Saudara/i Pelapor,</p>
            <p>Ini adalah pemberitahuan otomatis bahwa status laporan Anda dengan detail berikut telah diperbarui:</p>
            
            <ul>
                <li><strong>Nomor Tiket:</strong> {{ $laporan->ticket_code ?? 'N/A' }}</li>
                <li><strong>Tanggal Laporan:</strong> {{ $laporan->created_at->format('d M Y') ?? 'N/A' }}</li>
                <li><strong>Status Saat Ini:</strong> <span class="status">{{ $laporan->status ?? 'Diproses' }}</span></li>
            </ul>

            <p><strong>Catatan/Tanggapan Admin:</strong><br/>
            {{ $laporan->admin_notes ?? 'Sedang dalam peninjauan oleh tim kami.' }}</p>
        </div>

        <div class="footer">
            {{ $templateBawah }}
        </div>
    </div>
</body>
</html>