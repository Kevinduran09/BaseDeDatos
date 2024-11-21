<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use App\Models\Recorrido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Services\RouteService;
use Carbon\Carbon;
use DateTime;
class SolicitudController extends Controller
{
    protected $routeService;

    public function __construct(RouteService $routeService)
    {
        $this->routeService = $routeService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index() //funcion para mostrar todos los datos
    {
        $solicitudes = DB::table('viSolicitud')->get();


        if ($solicitudes->isEmpty()) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con solicitudes"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "solicitudes obtenidos correctamente",
                "data" => $solicitudes
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

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "clienteId" => "required|numeric",
                "servicioId" => "required|numeric",
                "direccionOrigen" => "required|array",
                "direccionDestino" => "required|array",
                "fecha" => "required|date",
                "observacion" => "nullable|string",
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        // Guardar la dirección de origen
        $origen = $request->direccionOrigen;


        DB::beginTransaction();
        $origenParams = [
            'idCliente' => $request['clienteId'],
            'lat' => $origen['direccion'][0],
            'lon' => $origen['direccion'][1],
            'nombreDireccion' => $origen['nombreDireccion'],
            'pais' => $origen['pais'],
            'estado' => $origen['estado'],
            'ciudad' => $origen['ciudad'],
            'distrito' => $origen['distrito']
        ];

        $result = DB::select('EXEC paInsertarDireccionConCliente :idCliente, :lat, :lon, :nombreDireccion, :pais, :estado, :ciudad, :distrito', $origenParams);

        $idOrigen = $result[0]->idDireccion;

        if (!$idOrigen) {
            return response()->json([
                'message' => 'Error al insertar la dirección de origen.',
                'status' => 500
            ], 500);
        }


        $idDestino = null;

        if (!empty($request->direccionDestino)) {
            $destino = $request->direccionDestino;

            $destinoParams = [
                'lat' => $destino['direccion'][0],
                'lon' => $destino['direccion'][1],
                'nombreDireccion' => $destino['nombreDireccion'],
                'pais' => $destino['pais'],
                'estado' => $destino['estado'],
                'ciudad' => $destino['ciudad'],
                'distrito' => $destino['distrito'],
            ];

            $result = DB::select('EXEC paInsertarDireccion 
                    :lat, 
                    :lon, 
                    :nombreDireccion, 
                    :pais, 
                    :estado, 
                    :ciudad, 
                    :distrito', $destinoParams);


            $idDestino = $result[0]->idDireccion;

            if (!$idDestino) {
                return response()->json([
                    'message' => 'Error al insertar la dirección de destino.',
                    'status' => 500
                ], 500);
            }

        }


        $origenCoords = $request->direccionOrigen['direccion']; // [lat, lon]
        $destinoCoords = $request->direccionDestino['direccion']; // [lat, lon]

        // Obtener los datos de la duración y kilómetros de la función getRouteDuration
        $routeData = $this->routeService->getRouteDuration($origenCoords, $destinoCoords);

        // Extraer los valores de tiempo estimado y kilómetros
        $tiempoEstimado = $routeData['tiempo_estimado'];  // Formato TIME
        $kilometros = $routeData['distancia_km'];  // Distancia en kilómetros
        $tiempoFormateado = Carbon::createFromTimestamp($tiempoEstimado * 60)->toTimeString();

        // Armar el array con los datos de la solicitud
        $solicitudParams = [
            'idCliente' => $request['clienteId'],
            'idServicio' => $request['servicioId'],
            'direccionOrigen' => $idOrigen,
            'direccionDestino' => $idDestino ?? null,
            'fecha' => $request['fecha'],
            'observacion' => $request['observacion'] ?? '',
            'estado' => 'pendiente',
            'tiempo_estimado' => date("H:i:s", strtotime($tiempoFormateado)),
            'kilometros' => (float) $kilometros,
        ];



        try {

            $solicitud = DB::select('EXEC paInsertarSolicitud 
                    :idCliente, 
                    :idServicio, 
                    :direccionOrigen, 
                    :direccionDestino, 
                    :fecha, 
                    :tiempo_estimado, 
                    :kilometros,
                    :observacion,
                    :estado
                    ', $solicitudParams);

            DB::commit();

            return response()->json([
                'data' => $solicitud,
                'status' => 201
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al registrar la solicitud', 'message' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $result = DB::select('EXEC paBuscarSolicitud :idSolicitud', ['idSolicitud' => $id]);
        $solicitud = $result[0];
        if (!$solicitud) {
            return response()->json(['message' => 'solicitud no encontrada'], 404);
        }

        //agregar servicio

        $result = DB::select('EXEC paBuscarServicio :idServicio', ['idServicio' => $solicitud->idServicio]);
        $solicitud->servicio = $result[0];

        // direccion origen
        if ($solicitud->direccionOrigen == true) {
            $result = DB::select('EXEC paBuscarDireccion :idDireccion', ['idDireccion' => $solicitud->direccionOrigen]);
            $solicitud->origen = $result[0];
        }

        // direccion destino
        if ($solicitud->direccionDestino == true) {
            $result = DB::select('EXEC paBuscarDireccion :idDireccion', ['idDireccion' => $solicitud->direccionDestino]);
            $solicitud->destino = $result[0];
        }
        // cliente
        if ($solicitud->idCliente == true) {
            $result = DB::select('EXEC paBuscarCliente :idCliente', ['idCliente' => $solicitud->idCliente]);
            $solicitud->cliente = $result[0];
        }

        return response()->json($solicitud, 200);
    }



    public function getByDate(Request $request)
    {
        // Corregir la sintaxis de los parámetros
        $result = DB::select('EXEC paSolicitudesPorFecha ?', [$request->fecha]);

        if (!$result) {
            $data = [
                'message' => 'No hay solicitudes para esta fecha',
                'status' => 404,
                'dato' => $request->fecha
            ];
            return response()->json($data, 404);
        }

        return response()->json(['data' => $result], 200);
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
                "fecha" => "required",
                "estado" => "required",
                "observacion" => "required",
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
        $result = DB::statement('EXEC paEliminarSolicitud ?', [
            $id
        ]);


        if ($result === false) {
            $data = [
                'message' => 'Error al eliminar los datos de solicitud',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        return response()->json(['message' => 'solicitud eliminado correctamente'], 200);
    }
    public function getSolicitudesCliente($id)
    {
        try {
          
            $solicitudes = DB::select('EXEC paBuscarSolicitudPorCliente @idCliente = ?', [$id]);

      
            return response()->json([
                'success' => true,
                'data' => $solicitudes
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Error al obtener las solicitudes del cliente',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function cancel($id)
    {
        try {
          
            DB::statement('EXEC paCambiarEstadoSolicitud  @idSolicitud = ?,  @nuevoEstado = ?', [$id, 'Cancelado']);

         
            return response()->json([
                'success' => true,
                'message' => 'La solicitud ha sido cancelada exitosamente.'
            ], 200);

        } catch (\Exception $e) {
          
            if (strpos($e->getMessage(), 'No se puede cancelar la solicitud, ya está asociada a un viaje activo.') !== false) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se puede cancelar la solicitud, ya está asociada a un viaje activo.',
                    'error' => $e->getMessage()
                ], 400); 
            }

         
            return response()->json([
                'success' => false,
                'message' => 'Hubo un error al cancelar la solicitud.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    function esAlcanzable($fechaInicioActual, $ultimaFechaFin, $tiempoViaje)
    {
        // Calcular la fecha temporal sumando el tiempo de viaje a la última fecha de fin
        $fechaTemporal = $ultimaFechaFin->copy()->addMinutes($tiempoViaje);

        // Verificar si la fecha de inicio de la solicitud actual es mayor o igual a la fecha temporal
        return $fechaInicioActual->greaterThanOrEqualTo($fechaTemporal);
    }


    public function obtenerCoordendasDireccion($id)
    {
        $direccion = DB::select('EXEC paBuscarDireccion ?', [$id])[0];

        return [$direccion->lat, $direccion->lon];
    }


    public function verificarSolicitudesAlcanzables(Request $request)
    {


        $solicitudes = [];

        foreach ($request->idsSolicitudes as $id) {
            $solicitudes[] = DB::select('EXEC paBuscarSolicitud :idSolicitud', ['idSolicitud' => $id])[0];
        }


        usort($solicitudes, function ($a, $b) {
            return Carbon::parse($a->fecha)->timestamp - Carbon::parse($b->fecha)->timestamp;
        });

        $resultado = [];
        $ultimaFechaFin = null;
        $alcanzadas = true;

        for ($i = 0; $i < count($solicitudes); $i++) {
            $solicitudActual = $solicitudes[$i];
            $fechaInicioActual = Carbon::parse($solicitudActual->fecha);
            $alcanzable = true;
            $mensaje = 'Solicitud alcanzable';
            $tiempoViaje = 0;
            $minutes = Carbon::createFromFormat('H:i:s', substr($solicitudActual->tiempo_estimado, 0, 8))->minute;
            if ($i === 0) {
                // Primera solicitud, se guarda sin validación
                $ultimaFechaFin = $fechaInicioActual->copy()->addMinutes($minutes);
            } else {



                // Obtener el tiempo de viaje desde la solicitud anterior
                $tiempoViaje = $this->routeService->getRouteDuration($this->obtenerCoordendasDireccion($solicitudes[$i - 1]->direccionDestino), $this->obtenerCoordendasDireccion($solicitudActual->direccionOrigen))['tiempo_estimado'];

                // Verificar si la solicitud actual es alcanzable
                if (!$this->esAlcanzable($fechaInicioActual, $ultimaFechaFin, $tiempoViaje)) {
                    $alcanzable = false;
                    $mensaje = 'Se solapa o no hay tiempo suficiente entre solicitudes';

                    $alcanzadas = false;
                } else {
                    // Actualizar la última fecha de fin solo si la solicitud es alcanzable
                    $ultimaFechaFin = $fechaInicioActual->copy()->addMinutes($minutes);
                }
            }

            $resultado[] = [
                'id_solicitud' => $solicitudActual->idSolicitud,
                'alcanzable' => $alcanzable,
                'mensaje' => $mensaje,

            ];
        }

        return response()->json([
            'resultado' => $resultado,
            'todasAlcanzadas' => $alcanzadas
        ], 200);
    }
}
// '                tiempoViaje'=> $tiempoViaje,
//                 'ultimaFecha'=> $ultimaFechaFin,
//                 'fechaInicio'=> $fechaInicioActual,
//                 'fechaFinal'=> $fechaInicioActual->copy()->addMinutes($minutes),
//                 'tiepoEstimado'=> $minutes