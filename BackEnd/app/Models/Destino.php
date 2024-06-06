<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destino extends Model
{
    use HasFactory;

    protected $table = "destino";

    protected $primaryKey = "idDestino";

    public $timestamps = false;


    protected $fillable = [

        "idDestino",
        "descripcionValor",
        "direccionFisica",
        "ciudad",
        "provincia",
       "pais"
     
    ];

  

}
