<?php

namespace App\Http\Controllers;

use App\Models\Viaje;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\JwtAuth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
class ViajeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clientes = DB::table('viViaje')->get();
        // $telefonos = DB::table("vwAllPhones")->get();


        // foreach ($clientes as $cliente) {
        //     $cliente->telefonos = $telefonos->where('idCliente', $cliente->idCliente)->values();
        // }

        if ($clientes->isEmpty()) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con viajes registrados"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "viajes obtenidos correctamente",
                "data" => $clientes
            ];
        }

        return response()->json($response, 200);
    }

    public function viajesAsignadosChofer($id)
    {
        try {
          
            $viajes = DB::select('EXEC paBuscarViajesChofer :idChofer', ['idChofer' => $id]);

            if (empty($viajes)) {
                return response()->json([
                    'status' => 200,
                    'message' => 'No se encontraron viajes asignados al chofer.'
                ]);
            }

            return response()->json([
                'status' => 200,
                'message' => 'Viajes obtenidos correctamente.',
                'data' => $viajes
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error al obtener los viajes asignados.',
                'error' => $e->getMessage()
            ]);
        }
    }
    public function viajeDetalle($id)
    {
        try {
            // Llamada a cada procedimiento almacenado y almacenado en arrays separados
            $infoViaje = DB::select("EXEC paInfoViaje :idViaje",[$id]);
            $empleados = DB::select('EXEC paEmpleadosAsignados :idViaje', ['idViaje' => $id]);
            $vehiculo = DB::select('EXEC paVehiculoAsignado :idViaje', ['idViaje' => $id]);
            $ruta = DB::select('EXEC paRutaViaje :idViaje', ['idViaje' => $id]);

            // Combinar los resultados en un solo array de respuesta
            $resultado = [
                'infoViaje' => $infoViaje,
                'empleados' => $empleados,
                'vehiculo' => $vehiculo,
                'ruta' => $ruta,
            ];

            return response()->json($resultado);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al ejecutar los procedimientos', 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        // Validación de los datos
        $validator = Validator::make($request->all(), [
            'fechaViaje' => 'required|date',
            'vehicleId' => 'exists:vehiculo,idVehiculo',
            'selectedRequests' => 'required|array|min:1', // Debe haber al menos una solicitud
            'employeeIds' => 'required|array|min:1', // Debe haber al menos un empleado
            'observacion' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Iniciar la transacción
        DB::beginTransaction();

        try {
            // Parámetros para insertar el viaje
            $params = [
                'fechaViaje' => $request->fechaViaje,
                'idVehiculo' => $request->vehicleId,
            ];

            // Insertar el viaje
            $viaje = DB::select('EXEC paInsertarViaje :fechaViaje, :idVehiculo', $params)[0];

            // Insertar empleados al viaje
            foreach ($request->employeeIds as $idEmpleado) {
                $paramsEmpleado = [
                    'idEmpleado' => $idEmpleado,
                    'idViaje' => $viaje->idViaje,
                ];

                // Ejecutar el procedimiento para agregar empleado a la tripulación
                DB::statement('EXEC paInsertarTripulacion :idEmpleado, :idViaje', $paramsEmpleado);
            }

            // Procesar solicitudes y ordenarlas
            $solicitudes = [];
            foreach ($request->selectedRequests as $idSoli) {
                $solicitud = DB::select('EXEC paBuscarSolicitud ? ', [$idSoli])[0];
                $solicitudes[] = $solicitud;
            }

            // Ordenar las solicitudes por fecha y hora
            usort($solicitudes, function ($a, $b) {
                $fechaA = Carbon::parse($a->fecha);
                $fechaB = Carbon::parse($b->fecha);
                return $fechaA->lt($fechaB) ? -1 : 1;
            });

            // Insertar las solicitudes al viaje con el orden
            foreach ($solicitudes as $index => $solicitud) {
                $orden = $index + 1;
                $horaSalida = Carbon::parse($solicitud->fecha)->format('H:i:s');
                $minutes = Carbon::createFromFormat('H:i:s', substr($solicitud->tiempo_estimado, 0, 8))->minute;
                $horaLlegada = Carbon::parse($solicitud->fecha)->addMinutes($minutes)->format('H:i:s');

                $paramsSolicitud = [
                    'idViaje' => $viaje->idViaje,
                    'idSolicitud' => $solicitud->idSolicitud,
                    'orden' => $orden,
                    'horaSalida' => $horaSalida,
                    'horaLlegada' => $horaLlegada,
                    'observaciones' => $request->observacion,
                ];

                // Insertar la solicitud en el viaje
                DB::statement('EXEC paInsertarSolicitudViaje :idViaje, :idSolicitud, :orden, :horaSalida, :horaLlegada, :observaciones', $paramsSolicitud);
            }

            // Commit de la transacción
            DB::commit();

            return response()->json(['message' => 'Viaje, tripulación y solicitudes insertados correctamente'], 200);

        } catch (\Exception $e) {
            // Rollback si ocurre un error
            DB::rollBack();

            \Log::error('Error al insertar viaje, tripulación y solicitudes: ' . $e->getMessage());

            return response()->json(['error' => 'Hubo un problema al procesar la solicitud. errror:', $e->getMessage()], 500);
        }
    }


    public function update(Request $request, $id)
    {
        try {
          
            $validatedData = $request->validate([
                'fechaViaje' => 'nullable|date|after_or_equal:today',
                'idVehiculo' => 'nullable|integer|exists:vehiculo,idVehiculo',
                'estado' => 'nullable|string|in:En progreso,Completado,Cancelado',
            ]);

            
            $result = DB::statement('
                EXEC paActualizarViaje @idViaje = ?, @fechaViaje = ?, @idVehiculo = ?, @estado = ?
            ', [
                $id,
                $validatedData['fechaViaje'] ?? null,
                $validatedData['idVehiculo'] ?? null,
                $validatedData['estado'] ?? null,
            ]);

          
            return response()->json([
                'success' => true,
                'message' => 'Datos del viaje modificados correctamente.'
            ]);

        } catch (\Illuminate\Database\QueryException $e) {
         
            $errorMessage = $e->getMessage();

          
            $userFriendlyMessage = $this->parseSqlErrorMessage($errorMessage);

            return response()->json([
                'success' => false,
                'message' => $userFriendlyMessage,
                'error'=> $errorMessage,
            ], 400);
        }
    }

    public function destroy($id)
    {
        $result = DB::statement('EXEC paEliminarViaje ?', [
            $id
        ]);


        if ($result === false) {
            $data = [
                'message' => 'Error al eliminar los datos del viaje',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        return response()->json(['message' => 'viaje eliminado correctamente'], 200);
    }

    public function updateState(Request $request, $id){
        
        
        try {
            $viaje = DB::select('EXEC paBuscarViaje :idViaje', ['idViaje'=> $id])[0];
            if (empty($viaje)) {
                return response()->json([
                    'status' => 200,
                    'message' => 'No se encontro el viaje solicitado.'
                ]);
            }

            DB::statement('EXEC paActualizarViaje ?,?,?,?', [
                $id,
                null,
                null,
                $request->estado
            ]);

            return response()->json(['message' => 'Actualizado con exito'], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar el estado del viaje',
                'error' => $this->parseSqlErrorMessage($th->getMessage()),
                'status' => 500
            ], 500);
        }
        
    }
    public function getViajeByFecha(Request $request)
    {
        $fecha = $request['fecha'];
        $viajes = Viaje::where('fechaViaje', $fecha)->with('recorridos.solicitud', 'empleados.puesto','vehiculo')->get();

        return response()->json($viajes);
    }

    public function updateSolicitudViaje(Request $request, $idSolicitudViaje)
    {
        // Validación de los datos recibidos en la request
        $validatedData = $request->validate([
            'estado' => 'required|string|in:Asignada al viaje,En progreso,Origen Recorrido,Destino Entregado,Completado,Cancelado',
            'observaciones' => 'nullable|string',
        ]);

        try {
       
            $params = [
                'idSolicitudViaje' => $idSolicitudViaje,
                'observaciones' => $validatedData['observaciones'] ?? null, // Si no se proporciona observación, se pasa null
                'estado' => $validatedData['estado']
            ];
           
            // Ejecutar el procedimiento almacenado para actualizar la solicitud de viaje
            $result = DB::statement('EXEC paActualizarSolicitudViaje :idSolicitudViaje, :observaciones, :estado', $params);

            // Verificar si la actualización fue exitosa
            if ($result === false) {
                return response()->json([
                    'status' => 500,
                    'message' => 'Error al actualizar la solicitud de viaje.'
                ], 500);
            }

        
            // Respuesta exitosa
            return response()->json([
                'status' => 200,
                'message' => 'Solicitud de viaje actualizada correctamente.',
            ], 200);

        } catch (\Exception $e) {
            // Captura de error
            return response()->json([
                'status' => 500,
                'message' => 'Error al actualizar la solicitud de viaje.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    private function parseSqlErrorMessage($errorMessage)
    {
        if (preg_match('/SQLSTATE\[42000\]: \[Microsoft\]\[ODBC Driver 17 for SQL Server\]\[SQL Server\](.*?)(\(Connection: sqlsrv, SQL:.*?\))/s', $errorMessage, $matches)) {
            // Registra el contenido de $matches en el log personalizado
            Log::channel('viaje')->info('Contenido de matches:', $matches);

            return trim($matches[1]);
        }
        // Si no se encuentra una coincidencia, registra el error completo en el log personalizado
        Log::channel('viaje')->error('No se pudo parsear el mensaje de error:', ['error' => $errorMessage]);

        return 'Ha ocurrido un error al actualizar el viaje. Por favor, intente nuevamente.';
    }
    public function obtenerDetallesSolicitudViaje($idSolicitudViaje)
    {
        // Ejecutamos el procedimiento almacenado y pasamos el parámetro
        $resultados = DB::select('EXEC ObtenerDetallesSolicitudViaje @idSolicitudViaje = ?', [$idSolicitudViaje])[0];

        // Comprobar si la consulta devolvió resultados
        if (empty($resultados)) {
            return response()->json(['message' => 'No se encontraron detalles para el viaje solicitado'], 404);
        }

        // Retornamos los resultados
        return response()->json($resultados);
    }

}
