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
        Schema::create('cliente', function (Blueprint $table) {
                $table->id("idCliente");
                $table->string("cedula",40)->unique();
                $table->string("nombre",40);
                $table->String("apellido",60);
                $table->String("correoElectronico",80);
                $table->String("nombreUsuario",40);
                $table->String("contrasena",255);
                
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cliente');
    }
};
