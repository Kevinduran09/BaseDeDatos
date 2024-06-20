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
        $jwt = new JwtAuth();
        $token = $request->bearerToken();
        $logged = $jwt->verifyToken($token,true);

        if ($logged && $logged->tipo == "empleado" && ($logged->cargo == "Administrador" || $logged->cargo == 'Chofer')) {
            return $next($request);
        } else {
            $response = array(
                'message' => 'El cliente no tiene la autorización para acceder',
                'status' => 401,
            );
            return response()->json($response, 401);
        }
    }
}
