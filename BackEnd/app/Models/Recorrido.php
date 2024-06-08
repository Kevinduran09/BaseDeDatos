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
        "fechaLlegada",
        "HoraLlegada",
    ];
}
