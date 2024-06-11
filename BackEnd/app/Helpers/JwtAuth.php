<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

use App\Models\Cliente;
use App\Models\Empleado;


class JwtAuth
{
    private $key;

    function __construct()
    {
        $this->key = "wasdxyz02468auuu";
    }

    public function getTokenCliente($cedula, $contrasena)
    {
        $cliente = Cliente::where(['cedula' => $cedula, 'contrasena' => hash('sha256', $contrasena)])->first();

        if (is_object($cliente)) {
            $token = array(
                'iss' => $cliente->idPaciente,
                'cedula' => $cliente->cedula,
                'nombre' => $cliente->nombre,
                'tipo' => 'paciente',
                'exp' => time() + (1200000) //(20 * 60) //Equivale a 20 minutos
            );
            $response = JWT::encode($token, $this->key, 'HS256');
        } else {
            $response = array(
                'message' => 'Datos de autentificacion incorrectos',
                'status' => 401,
            );
        }
        return $response;
    }

    public function verifyTokenCliente($jwt, $getId = false)
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
            if (!empty($decoded) && is_object($decoded) && isset($decoded->iss) && $decoded->tipo == 'cliente') {
                $authFlag = true;
            }
            if ($getId && $authFlag) {
                return $decoded;
            }
        }
        return $authFlag;
    }

    public function getTokenEmp($cedula, $nombre)
    {
        $empleado = Empleado::where(['cedula' => $cedula, 'nombre' => $nombre])->first();

        if (is_object($empleado)) {
            $token = array(
                'iss' => $empleado->idEmpleado,
                'cedula' => $empleado->cedula,
                'nombre' => $empleado->nombre,
                'tipo' => 'empleado',
                'cargo' => $empleado->puesto->cargo,
                'exp' => time() + (1200000) //(20 * 60) //Equivale a 20 minutos
            );
            $response = JWT::encode($token, $this->key, 'HS256');
        } else {
            $response = array(
                'message' => 'Los datos de autentificación del empleado son incorrectos',
                'status' => 401,
            );
        }
        return $response;
    }

    public function verifyTokenEmp($jwt, $getId = false)
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
