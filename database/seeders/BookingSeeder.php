<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Support\Str;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan ada service di database agar relasi tidak error
        $services = Service::all();

        if ($services->isEmpty()) {
            $this->command->info('Seed services terlebih dahulu!');
            return;
        }

        $data = [
            [
                'customer_name' => 'Budi Santoso',
                'customer_phone' => '08123456789',
                'pet_name' => 'Luna',
                'status' => 'confirmed', // Akan muncul di Invoice List
            ],
            [
                'customer_name' => 'Siti Aminah',
                'customer_phone' => '08571122334',
                'pet_name' => 'Milo',
                'status' => 'completed', // Akan muncul di Invoice List
            ],
            [
                'customer_name' => 'Andi Wijaya',
                'customer_phone' => '08998877665',
                'pet_name' => 'Rex',
                'status' => 'pending', // Tidak muncul di Invoice List (masih reservasi)
            ],
            [
                'customer_name' => 'Dewi Lestari',
                'customer_phone' => '08112233445',
                'pet_name' => 'Ciki',
                'status' => 'confirmed',
            ],
        ];

        foreach ($data as $item) {
            Booking::create([
                'booking_code' => 'BK-' . strtoupper(Str::random(6)),
                'customer_name' => $item['customer_name'],
                'customer_phone' => $item['customer_phone'],
                'pet_name' => $item['pet_name'],
                'service_id' => $services->random()->id,
                'booking_date' => Carbon::now()->addDays(rand(-5, 5))->format('Y-m-d'),
                'status' => $item['status'],
            ]);
        }
    }
}