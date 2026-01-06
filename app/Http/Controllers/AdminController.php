<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Menampilkan Dashboard Utama dengan Statistik
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            // Data Booking dengan Relasi
            'bookings' => Booking::with('service')->latest()->get(),
            
            // Statistik untuk Widget Dashboard
            'stats' => [
                'total_revenue' => Booking::where('status', 'completed')
                    ->join('services', 'bookings.service_id', '=', 'services.id')
                    ->sum('services.price'),
                'pending_count' => Booking::where('status', 'pending')->count(),
                'confirmed_count' => Booking::where('status', 'confirmed')->count(),
                'completed_count' => Booking::where('status', 'completed')->count(),
            ]
        ]);
    }

    /**
     * Update Status Booking dengan Proteksi Logika
     */
    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
        ]);

        // Proteksi: Jika sudah completed, tidak boleh diubah ke pending/cancelled lagi
        if ($booking->status === 'completed' && in_array($validated['status'], ['pending', 'cancelled'])) {
            return back()->withErrors([
                'status' => 'Transaksi yang sudah selesai tidak dapat diubah kembali ke pending.'
            ]);
        }

        try {
            DB::beginTransaction();

            $booking->update([
                'status' => $validated['status']
            ]);

            DB::commit();

            return back()->with('success', [
                'title' => 'Status Updated',
                'message' => "Order #{$booking->booking_code} is now " . strtoupper($validated['status']),
                'type' => 'success'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal memperbarui status. Silakan coba lagi.');
        }
    }

    /**
     * Menghapus Record (Opsional - Jika Admin salah input total)
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->route('dashboard')->with('message', 'Record deleted successfully');
    }
}