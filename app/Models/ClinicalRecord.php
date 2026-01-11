<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClinicalRecord extends Model {
    use HasFactory;

    protected $fillable = [
        'pet_id', 'vet_name', 'notes', 'weight', 'temperature', 'status'
    ];

    public function pet() {
        return $this->belongsTo(Pet::class);
    }
}