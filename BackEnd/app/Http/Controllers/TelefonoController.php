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
            "telefono" => "required|string",
            "tipoTelefono" => "required|string",
            "idCliente" => "required|integer"
        ]);
    
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'error' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }
        
      

            $nuevoTelefono = Telefono::create([            
                "numeroTelefono" => $request->telefono,
                "tipoTelefono" => $request->tipoTelefono,
                "idCliente" => $request->idCliente
            ]);
    
        

        if (empty($nuevoTelefono)) {
            $data = [
                'message' => 'Error al crear los Teléfonos',
                'status' => 500
            ];
            return response()->json($data, 500);
        } else {
            $data = [
                'Telefonos' => $nuevoTelefono,
                'message' => 'Teléfono creado exitosamente',
                'status' => 201
            ];
            return response()->json($data, 201);
        }
    }
    

    
// :x

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $telefono = Telefono::find( $id );        

        if (!$telefono) {
            return response()->json(['message' => 'telefono no encontrado'], 404);
        }

        return response()->json($telefono, 200);
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
    public function update(Request $request, $id)
    {

        $telefono = Telefono::find($id);

        if (!$telefono) {
            $data = [
                'message' => 'telefono no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make(
            $request->all(),
            [
                "numeroTelefono"=> "required",
               "tipoTelefono" => "required"
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
        
        $telefono->numeroTelefono = $request->numeroTelefono;
        $telefono->tipoTelefono = $request->tipoTelefono;

        $telefono->save();

        $data = [
            'message' => 'Datos del telefono fueron actualizados.',
            'telefono' => $telefono,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $telefono = Telefono::find($id);

        if (!$telefono) {
            return response()->json(['message' => 'telefono no fue encontrado'], 404);
        }

        $telefono->delete();

        return response()->json(['message' => 'telefono eliminado correctamente'], 200);
    }
}
