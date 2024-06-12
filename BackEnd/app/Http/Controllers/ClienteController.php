<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Http\Requests\StoreClienteRequest;
use App\Http\Requests\UpdateClienteRequest;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\UsuarioController;
use App\Helpers\JwtAuth;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() //funcion para mostrar todos los datos
    {
        $cliente = Cliente::all();

        if (count($cliente) === 0) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con clientes"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "clientes obtenidos correctamente",
                "data" => $cliente
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
                "cedula" => "required|unique:cliente",
                "nombre" => "required",
                "apellido" => "required",
                "correoElectronico" => "required|email",
                "direccion" => "required",
                "fechaIngreso" => "required"

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

        $cliente = Cliente::create(
            [
                "cedula" => $request->cedula,
                "nombre" => $request->nombre,
                "apellido" => $request->apellido,
                "correoElectronico" => $request->correoElectronico,
                "direccion" => $request->direccion,
                "fechaIngreso" => $request->direccion
            ]
        );

        $user = new UsuarioController();

        $usuario = $user->store([
            'nombreUsuario' => $request->nombreUsuario,
            'contrasena' => $request->contrasena,
            'idCliente' => $cliente->idCliente
        ]);

        return response()->json($usuario);
        if (!$cliente) {
            $data = [
                'message' => 'Error al crear el cliente',
                'status' => 500
            ];
            return response()->json($data, 500);
        } else {
            $data = [
                'cliente' => $cliente,
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
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'cliente no encontrado'], 404);
        }

        return response()->json($cliente, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cliente $cliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $cliente = cliente::find($id);

        if (!$cliente) {
            $data = [
                'message' => 'cliente no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make(
            $request->all(),
            [


                "cedula" => "required",
                "nombre" => "required",
                "apellido" => "required",
                "correoElectronico" => "required|email",
                "direccion" => "required",
                "fechaIngreso" => "required"

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

        $cliente->cedula = $request->cedula;
        $cliente->nombre = $request->nombre;
        $cliente->apellido = $request->apellido;
        $cliente->correoElectronico = $request->correoElectronico;
        $cliente->direccion =  $request->direccion;
        $cliente->fechaIngreso =  $request->fechaIngreso;

        $cliente->save();

        $data = [
            'message' => 'Los  datos del cliente fueron actualizados.',
            'medico' => $cliente,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'cliente no fue encontrado'], 404);
        }

        $cliente->delete();

        return response()->json(['message' => 'cliente eliminado correctamente'], 200);
    }

        public function registerCli(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "cedula" => "required",
            "nombre" => "required",
            "apellido" => "required",
            "correoElectronico" => "required|email",
            "direccion" => "required",
            "fechaIngreso" => "required"
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $cliente = Cliente::create(
            [
                "cedula" => $request->cedula,
                "nombre" => $request->nombre,
                "apellido" => $request->apellido,
                "correoElectronico" => $request->correoElectronico,
                "direccion" => $request->direccion,
                "fechaIngreso" => $request->direccion

            ]
        );

        if (!$cliente) {
            $data = [
                'message' => 'Error al guardar el cliente',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'message' => 'cliente creado correctamente',
            'cliente' =>  $cliente,
            'status' => 201
        ];

        return response()->json($data, 201);
    }
}
