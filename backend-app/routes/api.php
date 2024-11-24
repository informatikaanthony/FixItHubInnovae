<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Middleware\CheckApiToken;

Route::post('/login', [AuthController::class, 'login']);

//Rutas Protegidas
Route::middleware(CheckApiToken::class)->group(function () {
    //AuthController
    Route::post('/logout', [AuthController::class, 'logout']);

});
