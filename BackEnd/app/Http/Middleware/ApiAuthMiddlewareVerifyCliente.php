<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Helpers\JwtAuth;

class ApiAuthMiddlewareVerifyCliente
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
        $logged = $jwt->verifyTokenCliente($token, true);

        if (!is_bool($logged) && $logged->iss == $request->route('id')) {
            return $next($request);
        } else {
            $response = [
                "status" => 400,
                "message" => "El cliente no tiene autorizacion para acceder al perfil de otro cliente",
            ];
            return response()->json($response, 400);
        }
    }
}
