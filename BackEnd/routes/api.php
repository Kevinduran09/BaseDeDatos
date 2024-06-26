<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\DestinoController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\PuestoController;
use App\Http\Controllers\RecorridoController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\TelefonoController;
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\ViajeController;
use App\Http\Controllers\UsuarioController;
use App\Http\Middleware\ApiAuthMiddlewareAdmin;
use App\Http\Middleware\ApiAuthMiddlewareAdminChofer;
use App\Http\Middleware\ApiAuthMiddlewareCliente;
use App\Http\Middleware\ApiAuthMiddlewareVerifyCliente;
use GuzzleHttp\Middleware;

Route::prefix('v1')->group(
    function () {

        Route::group(['prefix' => '/cliente'], function () {
            Route::post('/register', [ClienteController::class, 'register']);
            Route::get('/verinfo/{id}', [ClienteController::class, 'show'])->middleware([ApiAuthMiddlewareCliente::class, ApiAuthMiddlewareVerifyCliente::class]);
            Route::put('/actulizarCli/{id}', [ClienteController::class, 'update'])->middleware([ApiAuthMiddlewareCliente::class, ApiAuthMiddlewareVerifyCliente::class]);

            Route::post('/agregarTel', [TelefonoController::class, 'store'])->middleware(ApiAuthMiddlewareCliente::class);
            Route::put('/modificarTel', [TelefonoController::class, 'update'])->middleware(ApiAuthMiddlewareCliente::class);
            Route::delete('/eliminarTel/{id}', [ClienteController::class, 'destroy'])->middleware([ApiAuthMiddlewareCliente::class, ApiAuthMiddlewareVerifyCliente::class]);
            Route::get('/destinos', [DestinoController::class, 'index']);
            Route::get('/servicio', [ServicioController::class, 'index']);
            Route::post('/solicitud/{id}',[SolicitudController::class,'store'])->middleware([ApiAuthMiddlewareCliente::class, ApiAuthMiddlewareVerifyCliente::class]);
        });

        Route::group(['prefix' => '/administrador'], function () {
            Route::resource('/cliente', ClienteController::class, ['except' => ['create', 'edit']])->middleware(ApiAuthMiddlewareAdmin::class);
            Route::resource('/destino', DestinoController::class, ['except' => ['create', 'edit']])->middleware(ApiAuthMiddlewareAdmin::class);
            Route::resource('/empleado', EmpleadoController::class, ['except' => ['create', 'edit']])->middleware(ApiAuthMiddlewareAdmin::class);
            Route::resource('/puesto', PuestoController::class, ['except' => ['create', 'edit']])->middleware(ApiAuthMiddlewareAdmin::class);
            Route::resource('/recorrido', RecorridoController::class, ['except' => ['create', 'edit']]);
            Route::resource('/servicio', ServicioController::class, ['except' => ['create', 'edit']])->middleware(ApiAuthMiddlewareAdmin::class);
            Route::resource('/solicitud', SolicitudController::class, ['except' => ['create', 'edit']])->middleware(ApiAuthMiddlewareAdmin::class);
            Route::resource('/telefono', TelefonoController::class, ['except' => ['create', 'edit']])->middleware(ApiAuthMiddlewareAdmin::class);
            Route::resource('/vehiculo', VehiculoController::class, ['except' => ['create', 'edit']])->middleware(ApiAuthMiddlewareAdmin::class);
            Route::resource('/viaje', ViajeController::class, ['except' => ['create', 'edit']])->Middleware(ApiAuthMiddlewareAdminChofer::class);
            Route::resource('/usuario', UsuarioController::class, ['except' => ['create', 'edit']])->middleware(ApiAuthMiddlewareAdmin::class);
            Route::post('/solicitud/cancel/{id}',[SolicitudController::class,'cancel'])->middleware(ApiAuthMiddlewareAdmin::class);
            Route::get('/viaje/empleado/{id}',[ViajeController::class,'getByEmployee'])->Middleware(ApiAuthMiddlewareAdminChofer::class);
            Route::post('/viaje/fecha',[ViajeController::class, 'getViajeByFecha'])->Middleware(ApiAuthMiddlewareAdmin::class);
            Route::post('recorrido/complete/{id}',[RecorridoController::class, 'completeRecorrido'])->Middleware(ApiAuthMiddlewareAdminChofer::class);
            

        });
       
       
       
        Route::post('/login', [UsuarioController::class, 'login']);

        Route::options('/current', [UsuarioController::class, 'current']);

        Route::post('/current', [UsuarioController::class, 'current']);
        

    }
);
