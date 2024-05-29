<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\TelefonoController;
use App\Http\Controllers\VehiculoController;

    Route::prefix('v1')->group(
        function () {
            Route::resource('/cliente', ClienteController::class, ['except' => ['create', 'edit']]);
            Route::resource('/telefono', TelefonoController::class, ['except' => ['create', 'edit']]);
            Route::resource('/vehiculo', VehiculoController::class, ['except' => ['create', 'edit']]);
        }
    );