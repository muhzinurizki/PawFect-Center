<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            // Kita ambil data booking terbaru beserta relasi layanannya
            'bookings' => Booking::with('service')->latest()->get()
        ]);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $booking->update(['status' => $request->status]);
        return redirect()->back()->with('message', 'Status diperbarui!');
    }
}