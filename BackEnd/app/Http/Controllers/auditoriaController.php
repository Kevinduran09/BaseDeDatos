<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class auditoriaController extends Controller
{
    public function getUsuarioAuditoria(Request $request){
        $audiUsuario = DB::table('viAuditoriaUsuario')->get();
   

        if ($audiUsuario->isEmpty()) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con auditorias de usuario"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "auditorias de usuario obtenidos correctamente",
                "data" => $audiUsuario
            ];
        }

        return response()->json($response, 200);
    }
    public function getSolicitudAuditoria(Request $request)
    {
        $audiUsuario = DB::table('viAuditoriaSolicitud')->get();


        if ($audiUsuario->isEmpty()) {
            $response = [
                "status" => 200,
                "message" => "El sistema no cuenta con auditorias de solicitud"
            ];
        } else {
            $response = [
                "status" => 200,
                "message" => "auditorias de solicitud obtenidos correctamente",
                "data" => $audiUsuario
            ];
        }

        return response()->json($response, 200);
    }
}
