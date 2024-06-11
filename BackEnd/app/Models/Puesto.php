<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Puesto extends Model
{
    use HasFactory;

    protected $table = "Puesto";

    protected $primaryKey = "idPuesto";

    protected $timestamps = false;

    protected $fillable = [
        "idPuesto",
        "cargo",
        "salarioBase",
    ];

    public function empleado()
    {
        return $this->hasMany(Empleado::class, "idEmpleado");
    }
}
