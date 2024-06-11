<?php

namespace App\Http\Controllers;

use App\Models\Recorrido;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class RecorridoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recorrido = Recorrido::all();

        if (count($recorrido) === 0) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con recorridos"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "recorridos obtenidos correctamente",
                "data" => $recorrido
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

       $validator= Validator::make($request->all(), 
        [
        "estado"=> "required",
        "idCliente" => "required",
        "idSolicitud" => "required"
        ]
    );

        if ($validator->fails())
        {
            $data = 
            [
                'message' => 'Error en la validacion de los datos',
                'error' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $recorrido = Recorrido::create(
            [
                "estado"=> $request->estado,
                "idCliente"  => $request->idCliente,
                "idSolicitud"  => $request->idSolicitud
        ]);

        if(!$recorrido) {
            $data = [
                'message' => 'Error al crear el recorrido',
                'status' => 500
            ];
            return response()->json($data, 500);
        } else {
            $data = [
                'recorrido' => $recorrido,
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
        $recorrido = Recorrido::find( $id );        

        if (!$recorrido) {
            return response()->json(['message' => 'recorrido no encontrado'], 404);
        }

        return response()->json($recorrido, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recorrido $recorrido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $recorrido = Recorrido::find($id);

        if (!$recorrido) {
            $data = [
                'message' => 'recorrido no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make(
            $request->all(),
            [


                "estado"=> "estado",
               
                
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
        
        $recorrido->estado = $request->estado;
        $recorrido->idCliente = $request->idCliente;
        $recorrido->save();

        $data = [
            'message' => 'Datos del recorrido fueron actualizados.',
            'recorrido' => $recorrido,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $recorrido = Recorrido::find($id);

        if (!$recorrido) {
            return response()->json(['message' => 'recorrido no fue encontrado'], 404);
        }

        $recorrido->delete();

        return response()->json(['message' => 'recorrido eliminado correctamente'], 200);
    }
}
