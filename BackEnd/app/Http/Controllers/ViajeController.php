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
        $viaje = Viaje::with(["empleados", "vehiculo",'recorridos.solicitud','recorridos.cliente'])->get();

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

 
    public function getByEmployee($id)
    {
        $viajes = Viaje::with(["empleados", "vehiculo",'recorridos.solicitud','recorridos.cliente'])->whereHas('empleados', function ($query) use ($id) {
            $query->where('tripulacion.idEmpleado', $id);
        })->get();
        if ($viajes->isEmpty()) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con viajes",
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "Viajes obtenidos correctamente",
                "data" => $viajes
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

        // Verificar si ya existe un viaje en la fecha solicitada
        $existingViaje = Viaje::whereDate('fechaViaje', $request->fechaViaje)->first();

        if ($existingViaje) {
            $response = [
                'message' => 'Viaje ya existe para la fecha solicitada',
                'status' => 200,
                'viaje' => $existingViaje->load('empleados', 'vehiculo', 'recorridos'),
            ];
            return response()->json($response, 200);
        }

        // Crear un nuevo viaje
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
        try {
            $viaje->empleados()->attach($request->empleados);
        } catch (\Throwable $th) {
            $this->destroy($viaje->idViaje);
            echo 'se elimino';
           }
        return response()->json($viaje->load('empleados', 'vehiculo'), 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $viaje = Viaje::with(["empleados.puesto", "vehiculo",'recorridos.solicitud.destino','recorridos.cliente'])->where("idViaje", $id)->first();

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

        $viajes = Viaje::with(["empleados", "vehiculo", "recorrido"])->where("idEmpleado", $idCho->issEmpleado)->get();

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

        $viaje = Viaje::with(["empleados", "vehiculo", "recorrido"])->where(["idViaje" => $id, "idEmpleado", $idCho->issEmpleado])->get();

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

    public function getViajeByFecha(Request $request)
    {
        $fecha = $request['fecha'];
        $viajes = Viaje::where('fechaViaje', $fecha)->with('recorridos.solicitud', 'empleados.puesto','vehiculo')->get();

        return response()->json($viajes);
    }

}
