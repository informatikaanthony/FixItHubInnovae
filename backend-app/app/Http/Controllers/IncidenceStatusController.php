<?php

namespace App\Http\Controllers;

use App\Models\IncidenceStatus;  // El modelo que gestionará los estados de las incidencias

class IncidenceStatusController extends Controller
{
    /**
     * Devuelve todos los estados de incidencia disponibles.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Obtenemos todos los estados de incidencia de la base de datos
        $statuses = IncidenceStatus::all();

        // Retornamos los estados como una respuesta JSON
        return response()->json($statuses);
    }
}
