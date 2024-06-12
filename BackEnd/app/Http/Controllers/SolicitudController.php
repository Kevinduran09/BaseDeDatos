<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SolicitudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() //funcion para mostrar todos los datos
    {
        $solicitud = Solicitud::all();

        if (count($solicitud) === 0) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con solicitudes"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "solicitudes obtenidas correctamente",
                "data" => $solicitud
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

                "fecha" => "required",
                "estado" => "",
                "cliente" => "required|exists:cliente,idCliente",
                "destino" => "required|exists:destino,idDestino",
                "servicio" => 'required|exists:servicio,idServicio'
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

        $solicitud = Solicitud::create(
            [
                "fecha" => $request->fecha,
                "observacion" => $request->observacion,
                "estado" => 'pendiente',
                "idCliente" => $request->cliente,
                "idDestino" => $request->destino,
                'idServicio' => $request->servicio
            ]
        );

        if (!$solicitud) {
            $data = [
                'message' => 'Error al crear la solicitud',
                'status' => 500
            ];
            return response()->json($data, 500);
        } else {
            $data = [
                'solicitud' => $solicitud,
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
        $solicitud = Solicitud::find($id);

        if (!$solicitud) {
            return response()->json(['message' => 'solicitud no encontrada'], 404);
        }

        return response()->json($solicitud, 200);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Solicitud $solicitud)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $solicitud = Solicitud::find($id);

        if (!$solicitud) {
            $data = [
                'message' => 'solicitud no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make(
            $request->all(),
            [
                "fecha"=> "required",
                "estado"=> "required",
                "observacion"=> "required",
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

        $solicitud->fecha = $request->fecha;
        $solicitud->estado = $request->estado;
        $solicitud->observacion = $request->observacion;

        $solicitud->save();

        $data = [
            'message' => 'Los  datos de la solicitud fueron actualizados.',
            'mesolicituddico' => $solicitud,
            'status' => 200
        ];
        return response()->json($data, 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $solicitud = Solicitud::find($id);

        if (!$solicitud) {
            return response()->json(['message' => 'La solicitud no fue encontrado'], 404);
        }

        $solicitud->delete();

        return response()->json(['message' => 'solicitud eliminada correctamente'], 200);
    }
}
