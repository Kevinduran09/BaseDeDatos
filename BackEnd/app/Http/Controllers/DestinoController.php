<?php

namespace App\Http\Controllers;

use App\Models\Destino;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DestinoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() //funcion para mostrar todos los datos
    {
        $destino = Destino::all();

        if (count($destino) === 0) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con destinos"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "destinos obtenidos correctamente",
                "data" => $destino
            ];
        }

        return response()->json($response, 200);
    } 

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Destino $destino)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Destino $destino)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Destino $destino)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Destino $destino)
    {
        //
    }
}
