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
        if (is_object($user) && $user->idCliente != null) {
            $token = [
                'iss' => $user->idUsuario,
                'issCliente' => $user->idCliente,
                'tipo' => 'cliente',
                'exp' => time() + (1200000) //(20 * 60) //Equivale a 20 minutos
            ];

            $response = JWT::encode($token, $this->key, 'HS256');

            return $response;
        } else if (is_object($user) && $user->idEmpleado != null) {
            $token = [
                'iss' => $user->idUsuario,
                'issEmpleado' => $user->idEmpleado,
                'tipo' => 'empleado',
                'cargo' => $user->empleado->Puesto->cargo,
                'exp' => time() + (1200000) //(20 * 60) //Equivale a 20 minutos
                
            ];
            $response = JWT::encode($token, $this->key, 'HS256');
            return $response;
        } else {
            $response = array(
                'message' => 'Datos de autentificacion incorrectos',
                'status' => 401,
            );
        }
        return $response;
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
