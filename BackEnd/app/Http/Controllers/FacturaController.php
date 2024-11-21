<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class FacturaController extends Controller
{
    public function getFacturasPorCliente($id)
    {
        try {
            $facturas = DB::select('EXEC paObtenerFacturasPorCliente ?', [$id]);
            return response()->json([
                'success' => true,
                'data' => $facturas,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener las facturas',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
