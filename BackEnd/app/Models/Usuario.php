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
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'idCliente');
    }

        
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'idEmpleado');
    }
        
}
