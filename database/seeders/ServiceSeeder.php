<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'id' => 1,
                'name' => 'Full Grooming',
                'category' => 'Grooming',
                'price' => 150000,
                'description' => 'Mandi, potong kuku, bersihkan telinga, dan potong rambut standar.'
            ],
            [
                'id' => 2,
                'name' => 'Pet Hotel (Standard Room)',
                'category' => 'Boarding',
                'price' => 100000,
                'description' => 'Penginapan harian dengan kontrol suhu dan makan 2x sehari.'
            ],
            [
                'id' => 3,
                'name' => 'Vaksinasi Tahunan',
                'category' => 'Medical',
                'price' => 250000,
                'description' => 'Vaksin lengkap untuk daya tahan tubuh anabul.'
            ],
            [
                'id' => 4,
                'name' => 'Basic Grooming',
                'category' => 'Grooming',
                'price' => 80000,
                'description' => 'Mandi dan pengeringan saja tanpa potong rambut.'
            ],
            [
                'id' => 5,
                'name' => 'Check-up Kesehatan',
                'category' => 'Medical',
                'price' => 120000,
                'description' => 'Konsultasi dokter hewan dan pemeriksaan fisik umum.'
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['id' => $service['id']], $service);
        }
    }
}