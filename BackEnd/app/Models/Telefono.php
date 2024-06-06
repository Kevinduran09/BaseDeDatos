<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telefono extends Model
{
    use HasFactory;
    protected $table = "telefono";

    protected $primaryKey = "idTelefono";

    public $timestamps = false;


    protected $fillable = [
        "idTelefono",
        "telefono",
        "idCliente"
    ];
    public function Cliente()
    {
        return $this->belongsTo(Cliente::class, 'idCliente');
    }
}
