<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class VehiculoController extends Controller
{
    public function index(Request $request) // Mostrar todos los vehículos o buscar por placa
    {
        $vehiculos = DB::table('viVehiculo')->get();

        return response()->json([
            "status" => 200,
            "message" => "Vehículos obtenidos correctamente",
            "data" => $vehiculos
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "tipoVehiculo" => "required|string|max:40",
            "placa" => "required|string|max:20",
            "capacidad" => "required|integer|min:1",
            "modelo" => "required|string|max:45",
            "fechaCompra" => "required|date",
            "anoVehiculo" => "required|integer|between:1900," . date('Y'),
            "potencia" => "required|integer|min:0",
            "transmision" => "required|string|max:20",
            "combustible" => "required|string|max:20",
            "color" => "required|string|max:20",
            "numeroPuertas" => "required|integer",
            "kilometraje" => "nullable|integer|min:0",
            "fechaUltimoMantenimiento" => "nullable|date",
            "carnetCirculacion" => "nullable|string|max:20",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'error' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        DB::statement('EXEC paInsertarVehiculo ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?', [
            $request->tipoVehiculo,
            $request->placa,
            $request->capacidad,
            $request->modelo,
            $request->fechaCompra,
            $request->anoVehiculo,
            $request->potencia,
            $request->transmision,
            $request->combustible,
            $request->color,
            $request->numeroPuertas,
            $request->kilometraje,
            $request->fechaUltimoMantenimiento,
            $request->carnetCirculacion,
        ]);

        return response()->json([
            'message' => 'Vehículo creado correctamente',
            'status' => 201
        ], 201);
    }

    public function show($id) // Mostrar un vehículo específico
    {
        $vehiculo = DB::select('EXEC paBuscarVehiculo ?', [$id]);

        if (empty($vehiculo)) {
            return response()->json([
                "status" => 404,
                "message" => "Vehículo no encontrado"
            ], 404);
        }

        return response()->json([
            "status" => 200,
            "message" => "Vehículo obtenido correctamente",
            "data" => $vehiculo
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "tipoVehiculo" => "required|string|max:40",
            "placa" => "required|string|max:20",
            "capacidad" => "required|integer|min:1",
            "modelo" => "required|string|max:45",
            "fechaCompra" => "required|date",
            "anoVehiculo" => "required|integer|between:1900," . date('Y'),
            "potencia" => "required|integer|min:0",
            "transmision" => "required|string|max:20",
            "combustible" => "required|string|max:20",
            "color" => "required|string|max:20",
            "numeroPuertas" => "required|integer",
            "kilometraje" => "nullable|integer|min:0",
            "fechaUltimoMantenimiento" => "nullable|date",
            "carnetCirculacion" => "nullable|string|max:20",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'error' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        DB::statement('EXEC paActualizarVehiculo ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?', [
            $id,
            $request->tipoVehiculo,
            $request->placa,
            $request->capacidad,
            $request->modelo,
            $request->fechaCompra,
            $request->anoVehiculo,
            $request->potencia,
            $request->transmision,
            $request->combustible,
            $request->color,
            $request->numeroPuertas,
            $request->kilometraje,
            $request->fechaUltimoMantenimiento,
            $request->carnetCirculacion,
        ]);

        return response()->json([
            'message' => 'Vehículo modificado correctamente',
            'status' => 200
        ]);
    }

    public function destroy($id) // Eliminar un vehículo
    {
        DB::statement('EXEC paEliminarVehiculo ?', [$id]);

        return response()->json([
            'message' => 'Vehículo eliminado correctamente',
            'status' => 200
        ]);
    }
}
