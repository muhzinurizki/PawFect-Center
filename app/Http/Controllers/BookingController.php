<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        // Validasi Data
        $validated = $request->validate([
            'customer_name'  => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'pet_name'       => 'required|string|max:255',
            'pet_type'       => 'required|in:Anjing,Kucing',
            'service_id'     => 'required|exists:services,id',
            'booking_date'   => 'required|date',
            'booking_time'   => 'required',
        ]);

        try {
            Booking::create([
                'booking_code'   => 'PRX-' . date('Ymd') . '-' . strtoupper(Str::random(4)),
                'customer_name'  => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'],
                'pet_name'       => $validated['pet_name'],
                'pet_type'       => $validated['pet_type'],
                'service_id'     => $validated['service_id'],
                'booking_date'   => $validated['booking_date'],
                'booking_time'   => $validated['booking_time'],
                'status'         => 'pending',
            ]);

            return redirect()->back()->with('message', 'Reservasi berhasil dibuat!');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Gagal menyimpan ke database.']);
        }
    }
}