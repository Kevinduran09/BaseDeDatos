<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\UsuarioController;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $empleado = DB::table('viEmpleado')->get();

        if ($empleado->isEmpty()) {
            $response = [
                'message' => 'Empleados no existentes',
                'status' => 200
            ];
            return response()->json($response, 200);
        } else {
            $response = [
                'message' => 'Empleados obtenidos correctamente',
                'status' => 200,
                'data' => $empleado
            ];
            return response()->json($response, 200);
        }
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
                "idPuesto" => "required|numeric|exists:Puesto,idPuesto",
                "cedula" => "required",
                "nombre" => "required",
                "apellido" => "required",
                "correoElectronico" => "required|email",
                "direccion" => "required",
                "fechaNacimiento" => "required|date",
                "fechaContratacion" => "required|date",
                "telefonoMovil" => "required|numeric",
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        DB::beginTransaction(); // Inicia la transacción

        try {
            // Llamar al procedimiento almacenado para insertar el empleado
            $result = DB::select('EXEC paInsertarEmpleado @idPuesto = ?, @cedula = ?, @nombre = ?, @apellido = ?, @correoElectronico = ?, @direccion = ?, @fechaNacimiento = ?', [
                $request->idPuesto,
                $request->cedula,
                $request->nombre,
                $request->apellido,
                $request->correoElectronico,
                $request->direccion,
                $request->fechaNacimiento,
            ]);

            // Asumiendo que el procedimiento retorna el ID del empleado creado
            $idEmpleado = $result[0]->idEmpleado ?? null;

            if (!$idEmpleado) {
                throw new \Exception('Error al crear el registro de empleado');
            }

            // Llamar al procedimiento almacenado para insertar el teléfono
            DB::statement('EXEC paInsertarTelefono @numeroTelefono = ?, @idEmpleado = ?, @TipoTelefono = ?', [
                $request->telefonoMovil,
                $idEmpleado,
                'Móvil'
            ]);

            // Insertar usuario
            DB::statement('EXEC paInsertarUsuario null, ?, ?, ?', [
                $idEmpleado,
                $request->nombreUsuario,
                $request->contrasena
            ]);

            DB::commit(); // Confirma la transacción si todo va bien

            return response()->json([
                'message' => 'Empleado, teléfono y usuario creados correctamente',
                'idEmpleado' => $idEmpleado,
                'status' => 200
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack(); // Revierte la transacción si algo falla

            // Manejo de errores
            return response()->json([
                'message' => 'Error al crear el empleado o el teléfono: ' . $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $empleado = DB::select('EXEC paBuscarEmpleado :idEmpleado', ['idEmpleado' => $id]);

        if (!$empleado) {
            return response()->json(['message' => 'Empleado no encontrado'], 404);
        }

        $response = [
            'message' => 'Empleado encontrado correctamente',
            'status' => 201,
            'empleado' => $empleado,
        ];
        return response()->json($response, 200);
    }

    public function availableEmployees(Request $request)
    {
        try {
            // Validar que el parámetro 'fecha' esté presente en la solicitud
            if (!$request->has('fecha')) {
                return response()->json([
                    'success' => false,
                    'message' => 'El parámetro "fecha" es requerido.'
                ], 400);
            }

            $fecha = $request->input('fecha');

            // Llamada al procedimiento almacenado con el parámetro 'fecha'
            $empleados = DB::select('EXEC buscarEmpleadosPorDisponibilidad ?', [$fecha]);

            // Verificar si la respuesta está vacía
            if (empty($empleados)) {
                return response()->json([
                    'success' => true,
                    'message' => 'No hay empleados disponibles en la fecha seleccionada.',
                    'data' => []
                ], 200);
            }

            // Respuesta en caso de éxito
            return response()->json([
                'success' => true,
                'data' => $empleados
            ], 200);

        } catch (\Exception $e) {
            // Manejo de errores
            return response()->json([
                'success' => false,
                'message' => 'Hubo un error al consultar los empleados disponibles.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "idPuesto" => "required|numeric|exists:Puesto,idPuesto",
            "cedula" => "required",
            "nombre" => "required",
            "apellido" => "required",
            "correoElectronico" => "required|email",
            "direccion" => "required",
            "telefonoMovil" => "numeric",
        ]);

        if ($validator->fails()) {
            $response = [
                'message' => 'Error al validar los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($response, 400);
        }

        try {

            $idEmpleado = (int) $id;
            $idPuesto = (int) $request['idPuesto'];

            $params = [
                'idEmpleado' => $idEmpleado,
                'idPuesto' => $idPuesto,
                'nombre' => $request['nombre'],
                'apellido' => $request['apellido'],
                'correoElectronico' => $request['correoElectronico'],
                'direccion' => $request['direccion'],
            ];
            $result = DB::statement('EXEC paActualizarEmpleado :idEmpleado,:idPuesto, :nombre, :apellido, :correoElectronico, :direccion', $params);

            if ($result === false) {
                throw new \Exception('Error al actualizar los datos del empleado');
            }
           
            $usuario = DB::select('EXEC paObtenerUsuarioPorEmpleadoOCliente ?, null', [$id]);

            if (!$usuario) {
                return response()->json([
                    'message' => 'Usuario asociado al cliente no encontrado',
                    'status' => 404
                ], 404);
            }


            DB::statement('EXEC paActualizarUsuario ?, null, ?, ?, ?', [
                (int) $usuario[0]->idUsuario,
                (int) $id,
                $request->nombreUsuario,
                $request->contrasena
            ]);


            if ($request->has('telefonoMovil')) {
                // Llamar al procedimiento almacenado para actualizar el teléfono móvil
                DB::statement('EXEC paActualizarTelefono ?, ?, ?, ?', [
                    $request->telefonoMovil,
                    1,
                    null,
                    $id,
                ]);
            }


        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar el empleado',
                'error' => $th->getMessage(),
                'status' => 500
            ], 500);
        }

        return response()->json('Se actualizó con éxito', 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $result = DB::statement('EXEC paEliminarEmpleado ?', [
            $id
        ]);


        if ($result === false) {
            $data = [
                'message' => 'Error al eliminar los datos del empleado',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        return response()->json(['message' => 'empleado eliminado correctamente'], 200);
    }
}
