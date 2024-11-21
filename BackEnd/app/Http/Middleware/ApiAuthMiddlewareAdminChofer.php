<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Helpers\JwtAuth;

class ApiAuthMiddlewareAdminChofer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $jwt = new JwtAuth();
            $token = $request->bearerToken();

            // Verificar el token
            $logged = $jwt->verifyToken($token, true);

            // Permitir acceso si es chofer o administrador
            if (
                $logged && $logged->tipo === 'empleado' &&
                ($logged->cargo === 'Chofer' || $logged->cargo === 'Administrador')
            ) {
                return $next($request);
            }

            // Si no es chofer ni administrador, denegar el acceso
            return response()->json([
                'message' => 'El usuario no tiene la autorización para acceder a esta área',
                'status' => 403,
            ], 403);

        } catch (\Exception $ex) {
            // Manejar posibles errores en la verificación del token
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'details' => $ex->getMessage(),
                'status' => 500,
            ], 500);
        }
    }
}
