<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\ClinicalRecordController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Booking;
use Inertia\Inertia;

// --- PUBLIC ROUTES ---
Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
  ]);
});

Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

// --- PROTECTED ROUTES (ADMIN CONSOLE) ---
Route::middleware(['auth', 'verified'])->group(function () {

  // 1. Dashboard Utama
  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
      'bookings' => Booking::with('service')->latest()->get()
    ]);
  })->name('dashboard');

  // 2. Modul E-Invoices (Dikelompokkan agar rapi)
  Route::prefix('invoices')->group(function () {

    // Halaman Daftar Invoice
    Route::get('/', function () {
      return Inertia::render('Admin/InvoiceList', [
        'invoices' => Booking::with('service')
          ->whereIn('status', ['confirmed', 'completed'])
          ->latest()
          ->get()
      ]);
    })->name('invoices.index');

    // Halaman Detail (Dashboard View)
    Route::get('/{booking}', function (Booking $booking) {
      return Inertia::render('Admin/InvoiceDetail', [
        'booking' => $booking->load('service')
      ]);
    })->name('invoices.show');

    // Halaman Edit
    Route::get('/{booking}/edit', function (Booking $booking) {
      return Inertia::render('Admin/InvoiceEdit', [
        'booking' => $booking->load('service')
      ]);
    })->name('invoices.edit');

    // Halaman Cetak (Print View) - INI YANG TADI ERROR
    Route::get('/{booking}/print', function (Booking $booking) {
      return Inertia::render('Admin/Invoice', [
        'booking' => $booking->load('service')
      ]);
    })->name('bookings.invoice'); // Kita beri nama ini agar InvoiceDetail.jsx tidak error

    // Proses Update Data
    Route::patch('/{booking}', [BookingController::class, 'update'])->name('invoices.update');
  });

  // 3. Management Status Booking
  Route::patch('/bookings/{booking}/status', [AdminController::class, 'updateStatus'])->name('bookings.updateStatus');
  Route::get('/admin/export-csv', [AdminController::class, 'exportCsv'])->name('admin.export');

  // KLINIK RECORD
  Route::resource('admin/clinical-records', ClinicalRecordController::class);

  // PET MANAJEMEN
  Route::resource('admin/pets', PetController::class)->names([
    'index' => 'pets.index',
    'store' => 'pets.store',
    'update' => 'pets.update',
    'destroy' => 'pets.destroy',
  ]);

  // 4. Profile Management
  Route::controller(ProfileController::class)->group(function () {
    Route::get('/profile', 'edit')->name('profile.edit');
    Route::patch('/profile', 'update')->name('profile.update');
    Route::delete('/profile', 'destroy')->name('profile.destroy');
  });
});

require __DIR__ . '/auth.php';
