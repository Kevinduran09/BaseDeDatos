<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;
   

    protected $table = "vehiculo";

    protected $primaryKey = "idVehiculo";

    public $timestamps = false;


    protected $fillable = [

        "idVehiculo",
        "tipoTransporte",
        "placa",
        "capacidad",
        "modelo",
        "fechaCompra",
        "anoVehiculo",
        "fichaTecnica"
    ];



}
