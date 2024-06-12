<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\JwtAuth;
class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() //funcion para mostrar todos los datos
    {
        $usuario = Usuario::all();

        if (count($usuario) === 0) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con usuarios"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "usuarios obtenidos correctamente",
                "data" => $usuario
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
    public function store($request)
    {

        $validator = Validator::make(
            $request,
            [
                "nombreUsuario" => "required",
                "contrasena" => "required",
                "idCliente" => "exists:cliente,idCliente",
                "idEmpleado" => "exists:empleado,idEmpleado"
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

        $usuario = Usuario::create(
            $request
        );

        if (!$usuario) {
            $data = [
                'message' => 'Error al crear el usuario',
                'status' => 500
            ];
            return response()->json($data, 500);
        } else {
            $data = [
                'usuario' => $usuario,
                'status' => 201
            ];
            return $usuario;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'usuario no encontrado'], 404);
        }

        return response()->json($usuario, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $usuario = Usuario::find($id);

        if (!$usuario) {
            $data = [
                'message' => 'usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make(
            $request->all(),
            [
                "nombreUsuario" => "required",
                "contrasena" => "required",
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

        $usuario->nombreUsuario = $request->nombreUsuario;
        $usuario->contrasena = $request->contrasena;
        $usuario->idCliente = $request->idCliente;
        $usuario->idEmpleado = $request->idEmpleado;

        $usuario->save();

        $data = [
            'message' => 'Los  datos del usuario fueron actualizados.',
            'medico' => $usuario,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'usuario no fue encontrado'], 404);
        }

        $usuario->delete();

        return response()->json(['message' => 'usuario eliminado correctamente'], 200);
    }
    public function login(request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "nombreUsuario" => "required|exists:Usuario,nombreUsuario",
                "contrasena" => "required"
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

        $user = Usuario::with(['empleado.puesto','cliente'])->where(["nombreUsuario" => $request->nombreUsuario, "contrasena" => $request->contrasena])->first();

        $jwt =  new JwtAuth();
        $response = $jwt->getToken($user);
        return response($response);
    }

    public function current(request $request){
        $token = $request->bearerToken();

        $jwt = new JwtAuth();
       
    }

}
