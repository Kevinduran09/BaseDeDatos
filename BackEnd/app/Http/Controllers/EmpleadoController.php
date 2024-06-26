<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\UsuarioController;
use App\Models\Usuario;
class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $empleado = Empleado::with(["puesto",'usuario'])->get();

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
    public function store(request $request)
    {
    
        $validator = Validator::make(
            $request->all(),
            [
                "idPuesto" => "required|numeric|exists:Puesto,idPuesto",
                "cedula" => "required",
                "nombre" => "required",
                "apellido" => "required",
                "correoElectronico" => "required | email",
                "telefono" => "required",
                "direccion" => "required",
                "fechaNacimiento" => "required",
                "fechaContratacion" => "required"
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

        $empleado = Empleado::create(
            [
                "idPuesto" => $request->idPuesto,
                "cedula" => $request->cedula,
                "nombre" => $request->nombre,
                "apellido" => $request->apellido,
                "correoElectronico" => $request->correoElectronico,
                "telefono" => $request->telefono,
                "direccion" => $request->direccion,
                "fechaNacimiento" => $request->fechaNacimiento,
                "fechaContratacion" => $request->fechaContratacion
            ]
        );

        if (!$empleado) {
            $data = [
                'message' => 'Error al crear el registro de empleado',
                'status' => 500
            ];
            return response()->json($data, 500);
        }
        $user = new UsuarioController();

        $usuario = $user->store([
            'nombreUsuario' => $request->nombreUsuario,
            'contrasena' => $request->contrasena,
            'idEmpleado' => $empleado->idEmpleado
        ]);
        if(!$usuario){
            $data = [
                'message' => 'Error al crear el registro de usuario',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        return response()->json($usuario,200);
        
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $empleado = Empleado::with(["puesto"])->where("idEmpleado", $id)->first();

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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Empleado $empleado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(request $request, $id)
    {
        $empleado = Empleado::find($id);

        if (!$empleado) {
            $response = [
                'message' => 'Empleado no encontrado',
                'status' => 404
            ];
            return response()->json($response, 404);
        }

        $validator = Validator::make($request->all(), [
            "idPuesto" => 'exists:puesto,idPuesto',
            "cedula" => 'required',
            "nombre" => 'required',
            "apellido" => 'required',
            "correoElectronico" => 'required | email',
            "telefono" => 'required',
            "direccion" => 'required',
            "fechaNacimiento" => 'required',
            "fechaContratacion" => 'required'
        ]);

        if ($validator->fails()) {
            $response = [
                'message' => 'Error al validar los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($response, 400);
        }

        $empleado->idPuesto = $request->idPuesto;
        $empleado->cedula = $request->cedula;
        $empleado->nombre = $request->nombre;
        $empleado->apellido = $request->apellido;
        $empleado->correoElectronico = $request->correoElectronico;
        $empleado->telefono = $request->telefono;
        $empleado->direccion = $request->direccion;
        $empleado->fechaNacimiento = $request->fechaNacimiento;
        $empleado->fechaContratacion = $request->fechaContratacion;

        $empleado->save();

        $user = Usuario::updateOrCreate(
            ['idEmpleado' => $request->idEmpleado],
            ['nombreUsuario' => $request->nombreUsuario, 'contrasena' => $request->contrasena]
        );    

        $response = [
            'message' => 'Empleado actualizado correctamente',
            'status' => 201,
            'empleado' => $empleado,
        ];
        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $empleado = Empleado::find($id);

        if (!$empleado) {
            $response = [
                'message' => 'Empleado no encontrado',
                'status' => 404
            ];
            return response()->json($response, 404);
        }

        $empleado->delete();

        $response = [
            'message' => 'Empleado eliminado correctamente',
            'status' => 200
        ];
        return response()->json($response, 200);
    }
}
