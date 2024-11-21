<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    ClienteController,
    DestinoController,
    EmpleadoController,
    PuestoController,
    RecorridoController,
    ServicioController,
    SolicitudController,
    TelefonoController,
    VehiculoController,
    ViajeController,
    UsuarioController,
    FacturaController,
    NotificacionController,
    auditoriaController,
    BackupController
};
use App\Http\Middleware\{
    ApiAuthMiddlewareAdmin,
    ApiAuthMiddlewareAdminChofer,
    ApiAuthMiddlewareCliente,
    ApiAuthMiddlewareVerifyCliente,
    ApiAuthMiddlewareChofer
};

Route::prefix('v1')->group(function () {


    Route::prefix('viaje')->group(function () {
     
        Route::middleware([ApiAuthMiddlewareAdminChofer::class])->group(function () {
            Route::get('/detalle/{id}', [ViajeController::class, 'viajeDetalle']);
        });
    });
    // Rutas de Autenticación
    Route::post('/login', [UsuarioController::class, 'login']);
    Route::match(['post', 'options'], '/current', [UsuarioController::class, 'current']);
    Route::post('/register', [ClienteController::class, 'register']);
    // Rutas públicas de Servicios y Destinos
    Route::get('/servicios', [ServicioController::class, 'index']);
    Route::get('/destinos', [DestinoController::class, 'index']);
   
    
    // Rutas para Clientes
    Route::prefix('cliente')->middleware(ApiAuthMiddlewareCliente::class)->group(function () {
        // Rutas de perfil y configuración de cliente
     
        Route::get('/perfil/{id}', [ClienteController::class, 'show']);
        Route::put('/perfil/{id}', [ClienteController::class, 'update']);
        
        // Rutas de teléfono
        Route::post('/telefono', [TelefonoController::class, 'store']);
        Route::put('/telefono', [TelefonoController::class, 'update']);
        Route::delete('/telefono/{id}', [ClienteController::class, 'destroy']);
        
        // Rutas de direcciones asociadas
        Route::get('/direcciones', [DestinoController::class, 'getClienteDirecciones']);
        Route::post('/direcciones', [DestinoController::class, 'store']);
        Route::put('/direcciones/{id}', [DestinoController::class, 'update']);
        Route::delete('/direcciones/{id}', [DestinoController::class, 'destroy']);
        Route::post('/solicitudes/cancelar/{id}', [SolicitudController::class, 'cancel']);
        Route::post('/solicitudes/{id}', [SolicitudController::class, 'store']);
        // Rutas de solicitudes
        Route::middleware(ApiAuthMiddlewareVerifyCliente::class)->group(function () {
        
            Route::get('/solicitudes/{id}', [SolicitudController::class, 'getSolicitudesCliente']);
           
            
        });

        // Rutas de facturas
        Route::get('/facturas/{id}', [FacturaController::class, 'getFacturasPorCliente']);
        
        // Rutas de notificaciones
        Route::get('/notificaciones/{id}', [NotificacionController::class, 'getNotificacionesPorCliente']);
        Route::put('/notificaciones/{idNotificacion}/marcar-como-vista/{id}', [NotificacionController::class, 'marcarNotificacionComoVista']);
 
    });

    // Rutas para Administradores
    Route::prefix('administrador')->middleware(ApiAuthMiddlewareAdmin::class)->group(function () {
        Route::resource('/cliente', ClienteController::class)->except(['create', 'edit']);
        Route::resource('/empleados', EmpleadoController::class)->except(['create', 'edit']);
        Route::resource('/puestos', PuestoController::class)->except(['create', 'edit']);
        Route::resource('/vehiculos', VehiculoController::class)->except(['create', 'edit']);
        Route::resource('/usuarios', UsuarioController::class)->except(['create', 'edit']);
        
        // Rutas de servicios para administración
        Route::resource('/servicios', ServicioController::class)->except(['create', 'edit']);
        Route::resource('/solicitudes', SolicitudController::class)->except(['create', 'edit']);
        Route::resource('/telefonos', TelefonoController::class)->except(['create', 'edit']);
        Route::resource('/viaje', ViajeController::class)->except(['create', 'edit']);
        Route::post('/database/backup', [BackupController::class,'generarBackup']);


        Route::get('/auditorias/usuario', [auditoriaController::class, 'getUsuarioAuditoria']);
        Route::get('/auditorias/solicitud', [auditoriaController::class, 'getSolicitudAuditoria']);
        // Operaciones especiales
        Route::post('/solicitudes/{id}/cancelar', [SolicitudController::class, 'cancel']);
        Route::post('/solicitudes/getBydate', [SolicitudController::class,'getByDate']);
        Route::post('/solicitudes/verificar-alcance', [SolicitudController::class,'verificarSolicitudesAlcanzables']);
        Route::post('/viajes/por-fecha', [ViajeController::class, 'getViajeByFecha']);
 
     
        Route::post('/empleados/available-employees', [EmpleadoController::class,'availableEmployees']);

    });

    // Rutas de administración de viajes (choferes y admin)
    Route::prefix('viaje')->middleware(ApiAuthMiddlewareAdminChofer::class)->group(function () {
        Route::resource('/', ViajeController::class)->except(['create', 'edit']);
        Route::get('/empleado/{id}', [ViajeController::class, 'getByEmployee']);
    });

    // Rutas de recorridos
    Route::prefix('recorrido')->middleware(ApiAuthMiddlewareAdminChofer::class)->group(function () {
        Route::resource('/', RecorridoController::class)->except(['create', 'edit']);
        Route::post('/completar/{id}', [RecorridoController::class, 'completeRecorrido']);
    });


    Route::middleware(ApiAuthMiddlewareChofer::class)->group(function () {
        Route::get('/chofer/viajes/{id}', [ViajeController::class, 'viajesAsignadosChofer']);
        Route::get('/chofer/viaje/{id}', [ViajeController::class, 'show']);
        Route::get('/chofer/solicitud-detalle/{id}', [ViajeController::class, 'obtenerDetallesSolicitudViaje']);
        Route::put('/chofer/solicitud-detalle/{idSolicitudViaje}/actualizar', [ViajeController::class, 'updateSolicitudViaje']);
        Route::put('/chofer/viaje/{id}/actualizarEstado', [ViajeController::class, 'updateState']);
    });
});
