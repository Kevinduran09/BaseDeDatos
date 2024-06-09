<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = "cliente";

    protected $primaryKey = "idCliente";

    public $timestamps = false;


    protected $fillable = [

        "idCliente",
        "cedula",
        "nombre",
        "apellido",
        "correoElectronico",
       "direccion",
       "fechaIngreso"
    ];

    public function telefonos()
    {
        return $this->hasMany(Telefono::class, "idCliente");
    }
    public function Recorridos()
    {
        return $this->hasMany(Recorrido::class, "idCliente");
    }


}
