<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recorrido extends Model
{
    use HasFactory;
    protected $table = "recorrido";

    protected $primaryKey = "idRecorrido";

    public $timestamps = false;


    protected $fillable = [

        "idRecorrido",
        "estado",
        "idCliente",
        "idSolicitud",
        "idViaje"
    ];
     public function cliente()
        {
            return $this->belongsTo(Cliente::class, 'idCliente');
        }
        public function Viaje(){
            return $this->belongsTo(Viaje::class,"idViaje");
        }
        public function Solicitud(){
            return $this->belongsTo(Solicitud::class,"idSolicitud");
        }
}
