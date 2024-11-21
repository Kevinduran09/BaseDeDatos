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
        $clientes = DB::table('vClienteConTelefono')->get();
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
                "cedula" => "required",
                "nombre" => "required",
                "apellido" => "required",
                "correoElectronico" => "required|email",
                "telefonoFijo" => "required|numeric",
                "telefonoMovil" => "required|numeric",
                "telefonoTrabajo" => "required|numeric",
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

        DB::beginTransaction(); 
        $idCliente = 0;

        try {
           
            $result = DB::select('EXEC paInsertarCliente ?, ?, ?, ?', [
                $request->cedula,
                $request->nombre,
                $request->apellido,
                $request->correoElectronico,
            ]);
            $idCliente = (int) ($result[0]->idCliente ?? null);

            if (!$idCliente) {
                throw new \Exception('No se pudo obtener el ID del cliente');
            }

            // Insertar teléfonos
            DB::statement('EXEC paInsertarTelefono @numeroTelefono = ?, @idCliente = ?, @TipoTelefono = ?', [
                $request->telefonoFijo,
                $idCliente,
                'Fijo'
            ]);
            DB::statement('EXEC paInsertarTelefono @numeroTelefono = ?, @idCliente = ?, @TipoTelefono = ?', [
                $request->telefonoMovil,
                $idCliente,
                'Móvil'
            ]);
            DB::statement('EXEC paInsertarTelefono @numeroTelefono = ?, @idCliente = ?, @TipoTelefono = ?', [
                $request->telefonoTrabajo,
                $idCliente,
                'Trabajo'
            ]);

            // Insertar usuario
            DB::statement('EXEC paInsertarUsuario ?, NULL, ?, ?', [
                $idCliente,
                $request->nombreUsuario,
                $request->contrasena
            ]);

            DB::commit(); 
            return response()->json([
                'cliente' => $idCliente,
                'status' => 201
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack(); 
            return response()->json([
                'message' => 'Error durante la creación del cliente',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $cliente = DB::select('EXEC paBuscarCliente :idCliente', ['idCliente' => $id]);


        $cliente = $cliente[0];
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

        DB::beginTransaction(); // Inicia la transacción

        try {
            // Actualizar cliente
            $resultCliente = DB::statement('EXEC paActualizarCliente ?, ?, ?, ?, ?', [
                $id,
                $request->cedula,
                $request->nombre,
                $request->apellido,
                $request->correoElectronico,
            ]);

            if ($resultCliente === false) {
                throw new \Exception('Error al actualizar los datos del cliente');
            }

            // Obtener el usuario asociado al cliente
            $usuario = DB::select('EXEC paObtenerUsuarioPorEmpleadoOCliente NULL, ?', [$id]);

            if (!$usuario) {
                throw new \Exception('Usuario asociado al cliente no encontrado');
            }

            // Actualizar usuario
            DB::statement('EXEC paActualizarUsuario ?, ?, null, ?, ?', [
                (int) $usuario[0]->idUsuario,
                (int) $id,
                $request->nombreUsuario,
                $request->contrasena
            ]);


            // Verificar si los números de teléfono fueron incluidos en el request
            if ($request->has('telefonoFijo') && $request->telefonoFijo !== null) {
                // Llamar al procedimiento almacenado para actualizar el teléfono fijo
                DB::statement('EXEC paActualizarTelefono ?, ?, ?, ?', [
                    $request->telefonoFijo,
                    2,  // ID para teléfono fijo
                    $id,
                    null
                ]);
            }
         
            if ($request->has('telefonoMovil') && $request->telefonoMovil !== null) {
                // Llamar al procedimiento almacenado para actualizar el teléfono móvil
                DB::statement('EXEC paActualizarTelefono ?, ?, ?, ?', [
                    $request->telefonoMovil,
                    1,  // ID para teléfono fijo
                    $id,
                    null
                ]);
            }

            if ($request->has('telefonoTrabajo') && $request->telefonoTrabajo !== null) {
                // Llamar al procedimiento almacenado para actualizar el teléfono de trabajo
                DB::statement('EXEC paActualizarTelefono ?, ?, ?, ?', [
                    $request->telefonoTrabajo,
                    3,  // ID para teléfono de trabajo
                    $id,
                    null
                ]);
            }
            DB::commit(); 

            // Respuesta de éxito
            return response()->json([
                'message' => 'Los datos del cliente y usuario fueron actualizados.',
                'cliente' => $request->all(),
                'status' => 200
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack(); // Revierte la transacción si algo falla

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
        $result = DB::statement('EXEC paEliminarCliente ?', [
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
        DB::beginTransaction();
        $idCliente = 0;

        try {
            $result = DB::select('EXEC paInsertarCliente ?, ?, ?, ?', [
                $request->cedula,
                $request->nombre,
                $request->apellido,
                $request->correoElectronico,
            ]);
            $idCliente = (int) ($result[0]->idCliente ?? null);

            if (!$idCliente) {
                throw new \Exception('No se pudo obtener el ID del cliente');
            }


            DB::statement('EXEC paInsertarUsuario ?, NULL, ?, ?', [
                $idCliente,
                $request->nombreUsuario,
                $request->contrasena
            ]);

            DB::commit();
            return response()->json([
                'cliente' => $idCliente,
                'status' => 201
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error durante la creación del cliente',
                'error' => $th->getMessage(),
                'status' => 500
            ], 500);
        }
       
    }
}
