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
        Schema::create('telefono', function (Blueprint $table) {
            $table->id("idTelefono");
            $table->string("telefono");
            $table->unsignedBigInteger("idCliente");


            $table->foreign('idCliente')->references('idCliente')->on('Cliente');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('telefono');
    }
};
