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

    public function empleados()
    {
        return $this->belongsToMany(Empleado::class, 'tripulacion', 'idViaje', 'idEmpleado');
    }

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class, 'idVehiculo', 'idVehiculo');
    }

    public function recorridos()
    {
        return $this->hasMany(Recorrido::class,"idViaje");
    }
}
