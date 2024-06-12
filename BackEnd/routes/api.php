<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\RecorridoController;
use App\Http\Controllers\TelefonoController;
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\DestinoController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\UsuarioController;
use App\Http\Middleware\ApiAuthMiddlewareCliente;
use App\Http\Middleware\ApiAuthMiddlewareVerifyCliente;

    Route::prefix('v1')->group(
        function () {
            
          
            
            Route::group(['prefix' => '/cliente'], function () {
                  Route::post('/registerPac', [ClienteController::class, 'registerCli']);
                  Route::post('/loginCli', [ClienteController::class, 'loginCli'])->withoutMiddleware(ApiAuthMiddlewareCliente::class);
                  Route::get('/verinfo/{id}', [ClienteController::class, 'show'])->middleware([ApiAuthMiddlewareCliente::class,ApiAuthMiddlewareVerifyCliente::class]);
                  Route::put('/actulizarCli/{id}', [ClienteController::class, 'update'])->middleware([ApiAuthMiddlewareCliente::class,ApiAuthMiddlewareVerifyCliente::class]);

                  Route::post('/agregarTel', [TelefonoController::class, 'store'])->middleware(ApiAuthMiddlewareCliente::class);
                  Route::put('/modificarTel', [TelefonoController::class, 'update'])->middleware(ApiAuthMiddlewareCliente::class);
                  Route::delete('/eliminarTel/{id}', [ClienteController::class, 'destroy'])->middleware([ApiAuthMiddlewareCliente::class,ApiAuthMiddlewareVerifyCliente::class]);
            });
            Route::resource('/usuario', UsuarioController::class, ['except' => ['create', 'edit']]);
            Route::resource('/solicitud', SolicitudController::class, ['except' => ['create', 'edit']]);
            Route::resource('/empleado',EmpleadoController::class, ['except' => ['create', 'edit']]);
            Route::post('/login',[UsuarioController::class, 'login']);
            Route::options('/current', [UsuarioController::class, 'current']);
/*Route::resource('/cliente', ClienteController::class, ['except' => ['create', 'edit']]);
            Route::resource('/telefono', TelefonoController::class, ['except' => ['create', 'edit']]);
            Route::resource('/vehiculo', VehiculoController::class, ['except' => ['create', 'edit']]);
            Route::resource('/recorrido', RecorridoController::class, ['except' => ['create', 'edit']]);
            Route::resource('/destino', DestinoController::class, ['except' => ['create', 'edit']]);
*/
        }
    );