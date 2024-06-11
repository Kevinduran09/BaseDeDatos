<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Viaje extends Model
{
    use HasFactory;

    protected $table = "viaje";

    protected $primaryKey = "idViaje";

    public $timestamps = false;

    protected $fillable = [
        "idViaje",
        "idVehiculo",
        "fechaViaje"
    ];

    public function empleado()
    {
        return $this->belongsToMany(Empleado::class, "Tripulacion");
    }

    public function vehiculo()
    {
        return $this->hasOne(Vehiculo::class, "idVehiuclo");
    }

    public function recorrido()
    {
        return $this->belongsTo(Recorrido::class, "idRecorrido");
    }
}
