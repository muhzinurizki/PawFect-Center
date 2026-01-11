<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\ClinicalRecordController;
use App\Models\Booking;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- PUBLIC ROUTES ---
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Proses booking dari landing page
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

// --- PROTECTED ROUTES (ADMIN CONSOLE) ---
Route::middleware(['auth', 'verified'])->group(function () {

    // 1. Dashboard Utama
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'bookings' => Booking::with('service')->latest()->get()
        ]);
    })->name('dashboard');

    // 2. Management Status Booking & Export
    Route::patch('/bookings/{booking}/status', [AdminController::class, 'updateStatus'])->name('bookings.updateStatus');
    Route::get('/admin/export-csv', [AdminController::class, 'exportCsv'])->name('admin.export');

    // 3. Modul Invoices (Financial Tracking)
    Route::prefix('invoices')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Admin/InvoiceList', [
                'invoices' => Booking::with('service')
                    ->whereIn('status', ['confirmed', 'completed'])
                    ->latest()
                    ->get()
            ]);
        })->name('invoices.index');

        Route::get('/{booking}', function (Booking $booking) {
            return Inertia::render('Admin/InvoiceDetail', [
                'booking' => $booking->load('service')
            ]);
        })->name('invoices.show');

        Route::get('/{booking}/edit', function (Booking $booking) {
            return Inertia::render('Admin/InvoiceEdit', [
                'booking' => $booking->load('service')
            ]);
        })->name('invoices.edit');

        // Route untuk Cetak (Sinkron dengan InvoiceDetail.jsx)
        Route::get('/{booking}/print', function (Booking $booking) {
            return Inertia::render('Admin/Invoice', [
                'booking' => $booking->load('service')
            ]);
        })->name('bookings.invoice');

        Route::patch('/{booking}', [BookingController::class, 'update'])->name('invoices.update');
    });

    // 4. Clinical Records (Resource)
    Route::resource('clinical-records', ClinicalRecordController::class);

    // 5. Pets Management (Resource)
    Route::resource('pets', PetController::class);

    // 6. Profile Management
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';