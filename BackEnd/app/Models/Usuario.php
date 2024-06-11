<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $table = "Usuario";

    protected $primaryKey = "idUsuario";

    public $timestamps = false;


    protected $fillable = [

        "idUsuario",
        "nombreUsuario",
        "contrasena",
        "idCliente",
        "idEmpleado"


    ];
    public function Cliente()
    {
        return $this->hasOne(Cliente::class, 'idCliente');
    }

         
    public function Empleado()
    {
        return $this->hasOne(Empleado::class, 'idEmpleado');
    }
       
}
