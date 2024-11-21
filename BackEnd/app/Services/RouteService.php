<?php
namespace App\Services;

use GuzzleHttp\Client;

class RouteService
{
    protected $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function getRouteDuration($origen, $destino)
    {
       
        $latA = $origen[0];  
        $lonA = $origen[1]; 
        $latB = $destino[0]; 
        $lonB = $destino[1]; 

       
        $response = $this->client->get('https://api.openrouteservice.org/v2/directions/driving-car', [
            'query' => [
                'api_key' => '5b3ce3597851110001cf624889d963bdcb7f40bfabd88b8566ef183f', 
                'start' => "{$lonA},{$latA}",
                'end' => "{$lonB},{$latB}"
            ]
        ]);

     
        $data = json_decode($response->getBody(), true);

       
        if (isset($data['features'][0]['properties']['segments'][0])) {
            $segment = $data['features'][0]['properties']['segments'][0];

      
            $distanciaKm = $segment['distance'] / 1000;  

         
            $tiempoEstimadoSegundos = $segment['duration'];  
            $tiempoEstimadoMinutos = round($tiempoEstimadoSegundos / 60); 

            return [
                'distancia_km' => $distanciaKm, 
                'tiempo_estimado' => $tiempoEstimadoMinutos  
            ];
        }

        
        return [
            'distancia_km' => 0,
            'tiempo_estimado' => 0
        ];
    }

}
