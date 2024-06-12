<?php

namespace App\Http\Controllers;

use App\Models\Viaje;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\JwtAuth;

class ViajeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $viaje = Viaje::with(["empleado", "vehiculo"])->get();

        if ($viaje->isEmpty()) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con viajes",
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "Viajes obtenidos correctamente",
                "data" => $viaje
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
        $validator = Validator::make($request->all(), [
            'idVehiculo' => 'exists:vehiculo,idVehiculo',
            'fechaViaje' => 'required'
        ]);

        if ($validator->fails()) {
            $response = [
                'message' => 'Error al validar los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($response, 400);
        }

        $viaje = Viaje::create([
            'idVehiculo' => $request->idVehiculo,
            'fechaViaje' => $request->fechaViaje
        ]);

        if (!$viaje) {
            $response = [
                'message' => 'Error al crear el viaje',
                'status' => 500,
            ];
            return response()->json($response, 500);
        }

        $response = [
            'message' => 'Viaje creado correctamente',
            'status' => 201,
            'viaje' => $viaje,
        ];
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $viaje = Viaje::with(["empleado", "vehiculo", "recorrido"])->where("idViaje", $id)->first();

        if (!$viaje) {
            return response()->json(['message' => 'Viaje no encontrado'], 404);
        }

        $response = [
            'message' => 'Viaje encontrado correctamente',
            'status' => 201,
            'viaje' => $viaje,
        ];
        return response()->json($response, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Viaje $viaje)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $viaje = Viaje::find($id);

        if (!$viaje) {
            $response = [
                'message' => 'Viaje no encontrado',
                'status' => 404
            ];
            return response()->json($response, 404);
        }

        $viaje->delete();

        $response = [
            'message' => 'Viaje eliminado correctamente',
            'status' => 200
        ];
        return response()->json($response, 200);
    }

    public function indexViajeChofer(Request $request)
    {
        $jwt = new JwtAuth();
        $idCho = $jwt->verifyToken($request->bearerToken(), true);

        $viajes = Viaje::with(["empleado", "vehiculo", "recorrido"])->where("idEmpleado", $idCho->issEmpleado)->get();

        if ($viajes->isEmpty()) {
            $response = [
                'message' => 'Viajes no existentes',
                'status' => 200
            ];
            return response()->json($response, 200);
        } else {
            $response = [
                'message' => 'Viajes obtenidos correctamente',
                'status' => 200,
                'data' => $viajes
            ];
            return response()->json($response, 200);
        }
    }

    public function showViajeChofer($id, Request $request)
    {
        $jwt = new JwtAuth();
        $idCho = $jwt->verifyToken($request->bearerToken(), true);

        $viaje = Viaje::with(["empleado", "vehiculo", "recorrido"])->where(["idViaje" => $id, "idEmpleado", $idCho->issEmpleado])->get();

        if (!$viaje) {
            return response()->json(['message' => 'Viaje no encontrado'], 404);
        }

        $response = [
            'message' => 'Viaje encontrado correctamente',
            'status' => 201,
            'viaje' => $viaje,
        ];
        return response()->json($response, 200);
    }
}
