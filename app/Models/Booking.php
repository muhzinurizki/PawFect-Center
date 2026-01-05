<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_code', 'customer_name', 'customer_phone', 
        'pet_name', 'pet_type', 'service_id', 
        'booking_date', 'booking_time', 'status', 'notes'
    ];

    public function service() {
        return $this->belongsTo(Service::class);
    }
}