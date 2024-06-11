<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    protected $table = "empleado";

    protected $primaryKey = "idEmpleado";

    protected $timestamps = false;

    protected $fillable = [
        "idEmpleado",
        "puesto",
        "cedula",
        "nombre",
        "apellido",
        "correoElectronico",
        "telefono",
        "direccion",
        "fehaNacimmiento",
        "fechaContratacion"
    ];

    public function puesto()
    {
        return $this->belongsTo(Puesto::class, "puesto");
    }

    public function viaje()
    {
        return $this->belongsToMany(Viaje::class, "Tripulacion");
    }

    public function Usuario()
    {
        return $this->hasOne(Usuario::class, 'idEmpleado');
    }
    
}
