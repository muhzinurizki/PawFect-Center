<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('clinical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_id')->constrained()->onDelete('cascade');
            $table->string('vet_name');
            $table->text('notes');
            $table->float('weight')->nullable();
            $table->float('temperature')->nullable();
            $table->string('status')->default('STABLE');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('clinical_records');
    }
};