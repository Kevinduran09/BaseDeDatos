<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

class JwtAuth
{
    private $key;

    function __construct()
    {
        $this->key = "wasdxyz02468auuu";
    }

  public function getToken($user)
{
    $tokenData = [
        'iss' => $user->idUsuario,
        'iat' => time(),
        'exp' => time() + 1200,
    ];

    if (isset($user->idCliente)) {
        $tokenData['tipo'] = 'cliente';
        $tokenData['issCliente'] = $user->idCliente;
    } elseif (isset($user->idEmpleado)) {
        $tokenData['tipo'] = 'empleado';
        $tokenData['issEmpleado'] = $user->idEmpleado;
        $tokenData['cargo'] = $user->empleado->Puesto->cargo;
    } else {
        return [
            'message' => 'Datos de autentificación incorrectos',
            'status' => 401,
        ];
    }

    return JWT::encode($tokenData, $this->key, 'HS256');
}


    public function verifyToken($jwt, $getId = false)
    {
        $authFlag = false;

        if (isset($jwt)) {
            try {
                $decoded = JWT::decode($jwt, new Key($this->key, 'HS256'));
            } catch (\DomainException $ex) {
                $authFlag = false;
            } catch (ExpiredException $ex) {
                $authFlag = false;
            }
            if (!empty($decoded) && is_object($decoded) && isset($decoded->iss)) {
                $authFlag = true;
            }
            if ($getId && $authFlag) {
                return $decoded;
            }
        }

        return $authFlag;
    }
}
