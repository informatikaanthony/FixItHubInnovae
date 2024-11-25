<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        // Obtenemos todos los estados de incidencia de la base de datos
        $users = User::with('role')->get();

        // Retornamos los estados como una respuesta JSON
        return response()->json($users);
    }

    public function getAllRoles()
    {
        // Obtenemos todos los estados de incidencia de la base de datos
        $roles = Role::all();

        // Retornamos los estados como una respuesta JSON
        return response()->json($roles);
    }

    public function show($id)
    {
        // Obtenemos todos los estados de incidencia de la base de datos
        $users = User::find($id);

        // Retornamos los estados como una respuesta JSON
        return response()->json($users);
    }
}
