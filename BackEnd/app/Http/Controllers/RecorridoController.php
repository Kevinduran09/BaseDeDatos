<?php

namespace App\Http\Controllers;

use App\Models\Recorrido;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\JwtAuth;
use App\Models\Solicitud;

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
     * Store a newly created resource in storage.
     */
    public function store(request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                "estado" => "",
                "idCliente" => "required|exists:Cliente,idCliente",
                "idSolicitud" => "required|exists:Solicitud,idSolicitud",
                'idViaje'=>'required|exists:Viaje,idViaje'
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

        $recorrido = Recorrido::create(
            [
                "estado" => $request->estado,
                "idCliente"  => $request->idCliente,
                "idSolicitud"  => $request->idSolicitud,
                'idViaje'=>$request->idViaje
            ]
        );

        Solicitud::updateOrCreate(
            ['idSolicitud'=> $request->idSolicitud],
            ['estado'=> 'aprobada']
        );

        if (!$recorrido) {
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
        $recorrido = Recorrido::with('cliente.telefonos','solicitud.destino','solicitud.servicio')->where('idRecorrido',$id)->first();

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
    public function completeRecorrido($id)
    {
       
        $recorrido = Recorrido::where('idSolicitud', $id)->first();

        if (!$recorrido) {
            return response()->json(['message' => 'Recorrido no encontrado'], 404);
        }

      
        $recorrido->estado = 'completado';
        $recorrido->save();

       
        $solicitud = Solicitud::find($id);

        if (!$solicitud) {
            return response()->json(['message' => 'Solicitud no encontrada'], 404);
        }

      
        $solicitud->estado = 'realizado';
        $solicitud->save();

        return response()->json(['message' => 'Recorrido y solicitud completados correctamente'], 200);
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
        $validator = Validator::make($request->all(), [
            "estado" => "required",
        ]);
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
            return response()->json(['message' => 'Recorrido no fue encontrado'], 404);
        }

        $recorrido->delete();

        return response()->json(['message' => 'Recorrido eliminado correctamente'], 200);
    }

    public function updateRecorridoChofer($id, Request $request)
    {
        $jwt = new JwtAuth();
        $idCho = $jwt->verifyToken($request->bearerToken(), true);

        $recorrido = Recorrido::where(["idRecorrido" => $id, "idEmpleado" => $idCho->issEmpleado])->first();

        if (!$recorrido) {
            $response = [
                'message' => 'Recorrido no encontrado',
                'status' => 404
            ];
            return response()->json($response, 404);
        }

        $validator = Validator::make($request->all(), [
            'estado' => 'required',
        ]);

        if ($validator->fails()) {
            $response = [
                'message' => 'Error al validar los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($response, 400);
        }

        $recorrido->estado = $request->estado;

        $recorrido->save();

        $response = [
            'message' => 'Recorrido actualizado correctamente',
            'status' => 201,
            'recorrido' => $recorrido,
        ];

        return response()->json($response, 200);
    }
}
