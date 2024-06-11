<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    use HasFactory;
    protected $table = "Solicitudes";

    protected $primaryKey = "idSolicitud";

    public $timestamps = false;


    protected $fillable = [

        "idSolicitud",
        "fecha",
        "observacion",
        "estado",
        "idCliente",
        "idDestino",
        //"idServicio"
    ];

    public function cliente()
    {
        return $this->belongsTo(cliente::class, 'idCliente');
    }

    public function Destino()
    {
        return $this->belongsTo(Destino::class, 'idDestino');
    }

    /*
    public function Servicio()
    {
        return $this->belongsTo(Servicio::class, 'idServicio');
    }
        */
        public function Recorrido()
        {
            return $this->hasOne(Recorrido::class, 'idSolicitud');
        }

}
