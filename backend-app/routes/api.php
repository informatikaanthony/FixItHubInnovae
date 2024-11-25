<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\IncidenceController;
use App\Http\Controllers\IncidenceStatusController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Auth\CheckApiToken;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Routing\Router;

//Se Genero middleware para manejar las solicitudes en desarrollo
Route::middleware([CorsMiddleware::class])->group(function () {
    // Ruta pública (no necesita autenticación)
    Route::post('/login', [AuthController::class, 'login']);

    // Rutas protegidas con el middleware CheckApiToken
    Route::middleware([CheckApiToken::class])->group(function () {

        // cerrrar sesión
        Route::post('/logout', [AuthController::class, 'logout']);

        //incidencias
        // Primero las rutas sin parámetros
        Route::get('/incidence-statuses', [IncidenceStatusController::class, 'index']);
        Route::get('/incidences', [IncidenceController::class, 'index']); // Obtener todas las incidencias activas
        Route::get('/incidences/role/{id}', [IncidenceController::class, 'getByRole']); // Obtener incidencias por rol

        // Después las rutas con parámetros dinámicos
        Route::get('/incidences/{id}', [IncidenceController::class, 'show']); // Ver incidencia por ID
        Route::put('/incidences/{id}', [IncidenceController::class, 'update']); // Editar incidencia
        Route::delete('/incidences/{id}', [IncidenceController::class, 'destroy']); // "Eliminar" incidencia (cambiar estado)
        Route::put('/incidences', [IncidenceController::class, 'put']); // Crear nueva incidencia


        //Users
        Route::get('/users', [UserController::class, 'index']); // "Eliminar" incidencia (cambiar estado)
        Route::get('/users/roles', [UserController::class, 'getAllRoles']); // "Eliminar" incidencia (cambiar estado)
    });
});
