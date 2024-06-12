<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    protected $table = "empleado";

    protected $primaryKey = "idEmpleado";

    public $timestamps = false;

    protected $fillable = [
        "idEmpleado",
        "idPuesto",
        "cedula",
        "nombre",
        "apellido",
        "correoElectronico",
        "telefono",
        "direccion",
        "fechaNacimiento",
        "fechaContratacion"
    ];

    public function puesto()
    {
        return $this->belongsTo(Puesto::class, "idPuesto");
    }

    public function viaje()
    {
        return $this->belongsToMany(Viaje::class, "Tripulacion");
    }
}
