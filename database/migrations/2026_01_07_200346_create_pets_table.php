<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('pets', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('type'); // Kucing, Anjing, Kelinci, dll
        $table->string('breed')->nullable(); // Ras: Persi, Golden Retriever, dll
        $table->string('owner_name');
        $table->string('owner_phone');
        $table->text('notes')->nullable(); // Catatan khusus: "Suka gigit", "Alergi sabun X"
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
