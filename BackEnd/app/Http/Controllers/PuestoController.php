<?php

namespace App\Http\Controllers;

use App\Models\Puesto;
use App\Http\Controllers\Controller;
use illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PuestoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $puesto = Puesto::all();

        if (count($puesto) === 0) {
            $response = [
                "status" => 200,
                "message" => "Puestos no existentes",
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "Puestos obtenidos correctamente",
                "data" => $puesto
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
    public function store(request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "cargo" => "required",
                "salarioBase" => "required"
            ]
        );

        if ($validator->fails()) {
            $data =
                [
                    'message' => 'Error en la validacion de los datos',
                    'error' => $validator->errors(),
                    'status' => 400
                ];
            return response()->json($data, 400);
        }

        $puesto = Puesto::create(
            [
                "cargo" => $request->cargo,
                "salarioBase" => $request->salarioBase,
            ]
        );

        if (!$puesto) {
            $data = [
                'message' => 'Error al crear el puesto',
                'status' => 500
            ];
            return response()->json($data, 500);
        } else {
            $data = [
                'puesto' => $puesto,
                'status' => 201
            ];
            return response()->json($data, 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $puesto = Puesto::with(["empleado"])->where("idPuesto", $id)->first();

        if (!$puesto) {
            return response()->json(['message' => 'puesto no encontrado'], 404);
        }

        $response = [
            'message' => 'Puesto encontrado correctamente',
            'status' => 201,
            'puesto' => $puesto,
        ];
        return response()->json($response, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Puesto $puesto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(request $request, $id)
    {
        $puesto = Puesto::find($id);

        if (!$puesto) {
            $data = [
                'message' => 'Puesto no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make(
            $request->all(),
            [
                'cargo' => 'required',
                'salarioBase' => 'required',
            ]
        );
        if ($validator->fails()) {
            $data =
                [
                    'message' => 'Error en la validacion de los datos',
                    'error' => $validator->errors(),
                    'status' => 400
                ];
            return response()->json($data, 400);
        }

        $puesto->cargo = $request->cargo;
        $puesto->salarioBase = $request->salarioBase;

        $puesto->save();

        $data = [
            'message' => 'Datos del puesto actualizados',
            'puesto' => $puesto,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $puesto = Puesto::find($id);

        if (!$puesto) {
            return response()->json(['message' => 'Puesto no encontrado'], 404);
        }

        $puesto->delete();

        return response()->json(['message' => 'Puesto eliminado correctamente'], 200);
    }
}
