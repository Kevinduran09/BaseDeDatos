<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Telefono;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreClienteRequest;
use App\Http\Requests\UpdateClienteRequest;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\UsuarioController;
use App\Helpers\JwtAuth;
use App\Models\Usuario;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() //funcion para mostrar todos los datos
    {
        $clientes = DB::table('vwClientesUsuarios')->get();
        // $telefonos = DB::table("vwAllPhones")->get();


        // foreach ($clientes as $cliente) {
        //     $cliente->telefonos = $telefonos->where('idCliente', $cliente->idCliente)->values();
        // }

        if ($clientes->isEmpty()) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con clientes"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "clientes obtenidos correctamente",
                "data" => $clientes
            ];
        }

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación de los datos de entrada
        $validator = Validator::make(
            $request->all(),
            [
                "cedula" => "required|unique:cliente",
                "nombre" => "required",
                "apellido" => "required",
                "correoElectronico" => "required|email",
                "direccion" => "required|array",
                "nombreUsuario" => "required",
                "contrasena" => "required"
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'error' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        try {
            // Insertar cliente
            DB::statement('EXEC agregarCliente ?, ?, ?, ?', [
                $request->cedula,
                $request->nombre,
                $request->apellido,
                $request->correoElectronico,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el cliente',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }

        // Obtener el cliente recién creado
        try {
            $cliente = DB::select('SELECT TOP 1 * FROM cliente WHERE cedula = ?', [$request->cedula]);

            if (empty($cliente)) {
                return response()->json([
                    'message' => 'Error al recuperar el cliente creado',
                    'status' => 500
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al buscar el cliente',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }

        // Insertar dirección
        try {
            DB::statement('EXEC createDireccion ?, ?, ?, ?, ?, ?, ?, ?', [
                floatval($request->direccion['coordenadas']),
                floatval($request->direccion['coordenadas']),
                $request->direccion['nombreDireccion'],
                $request->direccion['pais'],
                $request->direccion['estado'],
                $request->direccion['ciudad'],
                $request->direccion['distrito'],
                $cliente[0]->idCliente
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear la dirección',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }

        // Insertar usuario
        try {
            DB::statement('EXEC createUsuario ?, NULL, ?, ?', [
                $cliente[0]->idCliente,
                $request->nombreUsuario,
                $request->contrasena
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el usuario',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }

        return response()->json([
            'cliente' => $cliente[0],
            'status' => 201
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $cliente = DB::select('EXEC buscarCliente :clientId', ['clientId' => $id]);


        // $telefonos = DB::select("EXEC phonesByClient :clientId", ['clientId' => $id]);
        // if ($telefonos) {
        //     $cliente->telefonos =  $telefonos;
        // }
        $cliente = $cliente[0];
        if (!$cliente) {
            return response()->json(['message' => 'cliente no encontrado'], 404);
        }


        // Buscar la dirección asociada al cliente
        if (isset($cliente->idCliente)) {
            $direccion = DB::select("EXEC findDireccionById ?", [$cliente->idCliente]);
            if ($direccion) {
                $cliente->direccion = $direccion[0]; // Asumiendo que solo hay una dirección
            } else {
                $cliente->direccion = null; // Si no se encuentra la dirección
            }
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
        // Verificar si el cliente existe
        $cliente = DB::selectOne('SELECT * FROM cliente WHERE idCliente = ?', [$id]);

        if (!$cliente) {
            return response()->json([
                'message' => 'Cliente no encontrado',
                'status' => 404
            ], 404);
        }

        // Validación de los datos de entrada
        $validator = Validator::make(
            $request->all(),
            [
                "cedula" => "required",
                "nombre" => "required",
                "apellido" => "required",
                "correoElectronico" => "required|email",
                "direccion" => "required|array",
                "nombreUsuario" => "required",
                "contrasena" => "required"
            ]
        );

        // Retornar errores de validación
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'error' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        try {
            // Llamada al procedimiento almacenado para modificar cliente
            $resultCliente = DB::statement('EXEC modificarCliente ?, ?, ?, ?', [
                $id,
                $request->nombre,
                $request->apellido,
                $request->correoElectronico,
            ]);

            // Verificar si la actualización del cliente fue exitosa
            if ($resultCliente === false) {
                return response()->json([
                    'message' => 'Error al actualizar los datos del cliente',
                    'status' => 500
                ], 500);
            }

            // Actualizar dirección
            if (isset($request->direccion['idDireccion'])) {
                $direccionResult = DB::statement('EXEC updateDireccion ?, ?, ?, ?, ?, ?, ?, ?', [
                    $request->direccion['idDireccion'], // ID de la dirección a actualizar
                    $request->direccion['coordenadas'],
                    $request->direccion['coordenadas'],
                    $request->direccion['nombreDireccion'],
                    $request->direccion['pais'],
                    $request->direccion['estado'],
                    $request->direccion['ciudad'],
                    $request->direccion['distrito'],
                    $id // ID del cliente
                ]);

                if ($direccionResult === false) {
                    return response()->json([
                        'message' => 'Error al actualizar la dirección',
                        'status' => 500
                    ], 500);
                }
            }

            // Llamada al procedimiento almacenado para actualizar usuario
            DB::statement('EXEC updateUsuario ?, ?, NULL, ?, ?', [
                $request->idUsuario, // Asegúrate de tener el ID del usuario
                $id,                 // ID del cliente
                $request->nombreUsuario,
                $request->contrasena
            ]);

            // Respuesta de éxito
            return response()->json([
                'message' => 'Los datos del cliente fueron actualizados.',
                'cliente' => $request->all(),
                'status' => 200
            ], 200);
        } catch (\Exception $e) {
            // Manejo de errores
            return response()->json([
                'message' => 'Error al actualizar el cliente o el usuario',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $result = DB::statement('EXEC eliminarCliente ?', [
            $id
        ]);


        if ($result === false) {
            $data = [
                'message' => 'Error al eliminar los datos del cliente',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        return response()->json(['message' => 'cliente eliminado correctamente'], 200);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "cedula" => "required",
            "nombre" => "required",
            "apellido" => "required",
            "correoElectronico" => "required|email",
            "direccion" => "required",
            "fechaIngreso" => "required",
            'nombreUsuario' => 'required|unique:Usuario',
            'contrasena' => 'required'
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
                "fechaIngreso" => $request->fechaIngreso
            ]
        );
        Telefono::create([
            'numeroTelefono' => $request->telefono1,
            'tipoTelefono' => 'Personal',
            'idCliente' => $cliente->idCliente
        ]);
        Telefono::create([
            'numeroTelefono' => $request->telefono2,
            'tipoTelefono' => 'Personal',
            'idCliente' => $cliente->idCliente
        ]);
        if (!$cliente) {
            $data = [
                'message' => 'Error al crear el cliente',
                'status' => 500
            ];
            return response()->json($data, 500);
        }


        $user = new UsuarioController();

        $usuario = $user->store([
            'nombreUsuario' => $request->nombreUsuario,
            'contrasena' => $request->contrasena,
            'idCliente' => $cliente->idCliente
        ]);
        if (!$usuario) {
            $data = [
                'message' => 'Error al crear el registro de usuario',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        return response()->json($usuario, 200);
    }
}
