<?php

namespace App\Http\Controllers;

use App\Models\Destino;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
    public function store(request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
               
                "descripcionValor" => "required",
                "direccionFisica" => "required",
                "ciudad" => "required",
                "provincia" => "required",
                "pais" => "required"
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

        $destino = Destino::create(
            [
                "descripcionValor" => $request->descripcionValor,
                "direccionFisica" => $request->direccionFisica,
                "ciudad" => $request->ciudad,
                "provincia" => $request->provincia,
                "pais" => $request->pais
                
            ]
        );

        if (!$destino) {
            $data = [
                'message' => 'Error al crear el destino',
                'status' => 500
            ];
            return response()->json($data, 500);
        } else {
            $data = [
                'destino' => $destino,
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
        $destino = Destino::find($id);

        if (!$destino) {
            return response()->json(['message' => 'destino no encontrado'], 404);
        }

        return response()->json($destino, 200);
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
    public function update(Request $request, $id)
    {

        $destino = Destino::find($id);

        if (!$destino) {
            $data = [
                'message' => 'destino no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make(
            $request->all(),
            [


                "descripcionValor" => "required",
                "direccionFisica" => "required",
                "ciudad" => "required",
                "provincia" => "required",
                "pais" => "required"
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

        $destino->descripcionValor = $request->descripcionValor;
        $destino->direccionFisica = $request->direccionFisica;
        $destino->ciudad = $request->ciudad;
        $destino->provincia = $request->provincia;
        $destino->pais =  $request->pais;
     

        $destino->save();

        $data = [
            'message' => 'Los  datos del destino fueron actualizados.',
            'destino' => $destino,
            'status' => 200
        ];
        return response()->json($data, 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $destino = Destino::find($id);

        if (!$destino) {
            return response()->json(['message' => 'destino no fue encontrado'], 404);
        }

        $destino->delete();

        return response()->json(['message' => 'destino eliminado correctamente'], 200);
    }
}
