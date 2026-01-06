<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Menampilkan Dashboard Utama dengan Statistik
     */
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'bookings' => Booking::with('service')->latest()->get(),
            'stats' => [
                'total_revenue' => Booking::where('status', 'completed')
                    ->join('services', 'bookings.service_id', '=', 'services.id')
                    ->sum('services.price'),
                'pending_count' => Booking::where('status', 'pending')->count(),
                'confirmed_count' => Booking::where('status', 'confirmed')->count(),
                'completed_count' => Booking::where('status', 'completed')->count(),
            ],
        ]);
    }

    /**
     * Update Status Booking dengan Proteksi Logika & Notifikasi WA
     */
    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
        ]);

        // 1. Proteksi: Mencegah status 'completed' diubah kembali ke status awal
        if ($booking->status === 'completed' && in_array($validated['status'], ['pending', 'cancelled'])) {
            return back()->withErrors([
                'status' => 'Transaksi yang sudah selesai tidak dapat diubah kembali menjadi pending/cancelled.',
            ]);
        }

        try {
            DB::beginTransaction();

            // 2. Update status di database
            $booking->update([
                'status' => $validated['status'],
            ]);

            // 3. Kirim Notifikasi WhatsApp
            // Kita panggil di sini agar notifikasi hanya terkirim jika update db berhasil
            $this->sendWhatsAppNotification($booking, $validated['status']);

            DB::commit();

            return back()->with('success', [
                'title' => 'Status Updated',
                'message' => "Order #{$booking->booking_code} is now " . strtoupper($validated['status']),
                'type' => 'success',
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal memperbarui status. Error: ' . $e->getMessage());
        }
    }

    /**
     * Menghapus Record
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->back()->with('message', 'Record deleted successfully');
    }

    /**
     * Helper: Integrasi WhatsApp API (Fonnte)
     */
    private function sendWhatsAppNotification($booking, $status)
    {
        $phone = $booking->customer_phone; 
        $pet = $booking->pet_name;
        
        $messages = [
            'confirmed' => "Halo Kak! Pesanan grooming untuk *{$pet}* telah kami KONFIRMASI. Silakan datang sesuai jadwal ya 🐾",
            'completed' => "Hore! Grooming untuk *{$pet}* sudah SELESAI. Si anabul sudah ganteng/cantik dan siap dijemput. Sampai jumpa di Paws Hub! 🐾",
            'cancelled' => "Mohon maaf Kak, pesanan grooming untuk *{$pet}* terpaksa kami BATALKAN. Silakan hubungi admin untuk info lebih lanjut."
        ];

        $message = $messages[$status] ?? null;

        if ($message && $phone) {
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://api.fonnte.com/send',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => array(
                    'target' => $phone,
                    'message' => $message,
                ),
                CURLOPT_HTTPHEADER => array(
                    'Authorization: kNDAB39teYJ4GE5P3iP4rsyep' // Ganti dengan Token Fonnte Anda
                ),
            ));
            
            $response = curl_exec($curl);
            curl_close($curl);
            return $response;
        }
        return false;
    }
}