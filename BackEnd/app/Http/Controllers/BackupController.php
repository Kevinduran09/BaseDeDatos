<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class BackupController extends Controller
{
    public function generarBackup(Request $request)
    {
        // Validación de la ruta del backup
        $request->validate([
            'rutaBackup' => 'required|string',
        ]);

        $rutaBackup = $request->input('rutaBackup');

        try {
     
            DB::statement('EXEC paCrearBackup "RespaldoDB.bak" ');

            return response()->json([
                'message' => 'Backup realizado con éxito.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al realizar el backup.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
