<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recorrido', function (Blueprint $table) {
            $table->id("idRecorrido");
            $table->String("estado",20);
            $table->String("fechaLlegada",40);
            $table->String("horaLlegada",40);
            $table->unsignedBigInteger("idCliente");


            $table->foreign('idCliente')->references('idCliente')->on('Cliente');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recorrido');
    }
};
