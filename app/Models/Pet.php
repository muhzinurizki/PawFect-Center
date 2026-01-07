<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    // app/Models/Pet.php
protected $fillable = ['name', 'type', 'breed', 'owner_name', 'owner_phone', 'notes'];

public function bookings()
{
    // Mengasumsikan kita mencocokkan berdasarkan nama pet dan hp owner
    return $this->hasMany(Booking::class, 'customer_phone', 'owner_phone');
}
}
