<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class NotificacionController extends Controller
{
    public function getNotificacionesPorCliente($id)
    {
        try {
            $notificaciones = DB::select('EXEC paObtenerNotificacionesPorCliente ?', [$id]);
            return response()->json([
                'success' => true,
                'data' => $notificaciones,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener las notificaciones',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function marcarNotificacionComoVista($idNotificacion, $id)
    {
        try {
            DB::statement('EXEC paMarcarNotificacionComoLeida ?, ?', [$idNotificacion, $id]);
            return response()->json([
                'success' => true,
                'message' => 'Notificación marcada como vista',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cambiar el estado de la notificación',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
