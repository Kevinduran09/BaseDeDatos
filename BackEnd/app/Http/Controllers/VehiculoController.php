<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class VehiculoController extends Controller
{
    public function index() //funcion para mostrar todos los datos
    {
        $vehiculo = Vehiculo::all();

        if (count($vehiculo) === 0) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con vehiculos"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "vehiculo obtenidos correctamente",
                "data" => $vehiculo
            ];
        }

        return response()->json($response, 200);
    } 



    /**
     * Store a newly created resource in storage.
     */
    public function store(request $request)
    {

       $validator= Validator::make($request->all(), 
        [
        
        "tipoTransporte"=> "required",
        "placa" => "required",
        "capacidad" => "required",
    
       
    
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

        $vehiculo = Vehiculo::create(
            [
                "tipoTransporte"=> $request->tipoTransporte,
                "placa"=> $request->placa,
                "capacidad" => $request->capacidad
        ]);

        if(!$vehiculo) {
            $data = [
                'message' => 'Error al crear el vehiculo',
                'status' => 500
            ];
            return response()->json($data, 500);
        } else {
            $data = [
                'vehiculo' => $vehiculo,
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
        $vehiculo = Vehiculo::find( $id );        

        if (!$vehiculo) {
            return response()->json(['message' => 'vehiculo no encontrado'], 404);
        }

        return response()->json($vehiculo, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $vehiculo = Vehiculo::find($id);

        if (!$vehiculo) {
            $data = [
                'message' => 'vehiculo no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make(
            $request->all(),
            [


                "tipoTransporte"=> "required",
                "placa" => "required",
                "capacidad" => "required",
    

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
        
        $vehiculo->tipoTransporte = $request->tipoTransporte;
        $vehiculo->placa = $request->placa;
        $vehiculo->capacidad = $request->capacidad;
        $vehiculo->save();

        $data = [
            'message' => 'Datos del vehiculo fueron actualizados.',
            'vehiculo' => $vehiculo,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $vehiculo = Vehiculo::find($id);

        if (!$vehiculo) {
            return response()->json(['message' => 'vehiculo no fue encontrado'], 404);
        }

        $vehiculo->delete();

        return response()->json(['message' => 'vehiculo eliminado correctamente'], 200);
    }





}
