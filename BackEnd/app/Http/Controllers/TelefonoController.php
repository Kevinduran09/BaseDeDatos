<?php

namespace App\Http\Controllers;

use App\Models\Telefono;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class TelefonoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $telefono = Telefono::all();

        if (count($telefono) === 0) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con telefonos"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "Telefonos obtenidos correctamente",
                "data" => $telefono
            ];
        }

        return response()->json($response, 200);
    }

   
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        "telefonos" => "required|array",
        "telefonos.*" => "required|string",
        "idCliente" => "required"
    ]);

    if ($validator->fails()) {
        $data = [
            'message' => 'Error en la validación de los datos',
            'error' => $validator->errors(),
            'status' => 400
        ];
        return response()->json($data, 400);
    }

    $telefonos = [];
    foreach ($request->telefonos as $telefono) {
        $telefonos[] = Telefono::create([
            "telefono" => $telefono,
            "idCliente" => $request->idCliente
        ]);
    }

    if (empty($telefonos)) {
        $data = [
            'message' => 'Error al crear los Teléfonos',
            'status' => 500
        ];
        return response()->json($data, 500);
    } else {
        $data = [
            'Telefonos' => $telefonos,
            'status' => 201
        ];
        return response()->json($data, 201);
    }
}

    


    /**
     * Display the specified resource.
     */
    public function show(Telefono $telefono)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Telefono $telefono)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Telefono $telefono)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Telefono $telefono)
    {
        //
    }
}
