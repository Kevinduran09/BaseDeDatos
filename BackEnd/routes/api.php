<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;

    Route::prefix('v1')->group(
        function () {
            Route::resource('/cliente', ClienteController::class, ['except' => ['create', 'edit']]);
        }
    );