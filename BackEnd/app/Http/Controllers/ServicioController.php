<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use App\Http\Controllers\Controller;
use illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $servicio = Servicio::with(["solicitud"])->get();

        if ($servicio->isEmpty()) {
            $response = [
                "status" => 200,
                "message" => "Servicios no existentes",
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "Servicios obtenidos correctamente",
                "data" => $servicio
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
                'tipoServicio' => 'required',
                'descripcionServicio' => 'required',
                'precioKilometro' => 'required'
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

        $servicio = Servicio::create(
            [
                'tipoServicio' => $request->tipoServicio,
                'descripcionServicio' => $request->descripcionServicio,
                'precioKilometro' => $request->precioKilometro
            ]
        );

        if (!$servicio) {
            $data = [
                'message' => 'Error al crear el registro de servicio',
                'status' => 500
            ];
            return response()->json($data, 500);
        } else {
            $data = [
                'servicio' => $servicio,
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
        $servicio = Servicio::with(["solicitud"])->where("idservicio", "=", $id)->first();

        if (!$servicio) {
            return response()->json(['message' => 'servicio no encontrado'], 404);
        }

        return response()->json($servicio, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Servicio $servicio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(request $request, $id)
    {
        $servicio = Servicio::find($id);

        if (!$servicio) {
            $data = [
                'message' => 'Servicio no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make(
            $request->all(),
            [
                'tipoServicio' => 'required',
                'descripcionServicio' => 'required',
                'precioKilometro' => 'required'
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

        $servicio->tipoServicio = $request->tipoServicio;
        $servicio->descripcionServicio = $request->descripcionServicio;
        $servicio->precioKilometro = $request->precioKilometro;

        $servicio->save();

        $data = [
            'message' => 'Datos del servicio actualizados.',
            'servicio' => $servicio,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $servicio = Servicio::find($id);

        if (!$servicio) {
            return response()->json(['message' => 'servicio no encontrado'], 404);
        }

        $servicio->delete();

        return response()->json(['message' => 'servicio eliminado correctamente'], 200);
    }
}
