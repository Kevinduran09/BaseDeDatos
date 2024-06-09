<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\RecorridoController;
use App\Http\Controllers\TelefonoController;
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\DestinoController;
use App\Http\Middleware\ApiAuthMiddlewareCliente;

    Route::prefix('v1')->group(
        function () {
            
          
            
            Route::group(['prefix' => '/cliente'], function () {
                  Route::post('/loginCli', [ClienteController::class, 'loginCli'])->withoutMiddleware(ApiAuthMiddlewareCliente::class);
                  Route::get('/verinfo/{id}', [ClienteController::class, 'show'])->middleware(ApiAuthMiddlewareCliente::class);

                
            });
    

/*Route::resource('/cliente', ClienteController::class, ['except' => ['create', 'edit']]);
            Route::resource('/telefono', TelefonoController::class, ['except' => ['create', 'edit']]);
            Route::resource('/vehiculo', VehiculoController::class, ['except' => ['create', 'edit']]);
            Route::resource('/recorrido', RecorridoController::class, ['except' => ['create', 'edit']]);
            Route::resource('/destino', DestinoController::class, ['except' => ['create', 'edit']]);
*/
        }
    );