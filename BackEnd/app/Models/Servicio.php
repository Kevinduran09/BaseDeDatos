<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    protected $table = "Servicio";

    protected $primaryKey = "idServicio";

    protected $timestamps = false;

    protected $fillable = [
        "idServicio",
        "tipoServicio",
        "descripcionServicio",
        "precioKilometro"
    ];

    public function solicitud()
    {
        return $this->hasMany(Solicitud::class, "idSolicitud");
    }
}
