<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIncidenceRequest;
use App\Models\Incidence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IncidenceController extends Controller
{

    //Obtener todas las incidencias activas
    public function index()
    {
        // Recupera todas las incidencias asignadas al rol y con status = true
        $incidences = Incidence::where('status', true)
            ->with('assignedUser')->with('incidenceStatus')->get();

        // Si no se encuentran incidencias, devolver mensaje de error
        if ($incidences->isEmpty()) {
            return response()->json(['message' => 'Incidencias no encontradas con ese rol'], 404);
        }

        // Devolver las incidencias encontradas
        return response()->json($incidences);  // Devuelve la lista de incidencias como JSON
    }
    // Recuperar incidencias según el rol, y solo las activas (status = true)
    public function getByRole($id)
    {
        // Recupera todas las incidencias asignadas al rol y con status = true
        $incidences = Incidence::where('status', true)->where('assigned_to_role', $id)
            ->with('assignedUser')->with('incidenceStatus')->get();

        // Si no se encuentran incidencias, devolver mensaje de error
        if ($incidences->isEmpty()) {
            return response()->json(['message' => 'Incidencias no encontradas con ese rol'], 404);
        }

        // Devolver las incidencias encontradas
        return response()->json($incidences);  // Devuelve la lista de incidencias como JSON
    }

    // Mostrar una incidencia por ID
    public function show($id)
    {
        // Recupera la incidencia por ID, solo si está activa
        $incidence = Incidence::where('id', $id)->where('status', true)->with('assignedUser')->with('incidenceStatus')->first();

        // Si no existe o no está activa, devolver error
        if (!$incidence) {
            return response()->json(['message' => 'Incidencia no encontrada o ya eliminada'], 404);
        }

        // Devolver la incidencia encontrada
        return response()->json($incidence);  // Devuelve la incidencia como JSON
    }

    // Actualizar los detalles de una incidencia
    public function update(Request $request, $id)
    {
        // Validación de los datos recibidos
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|integer|exists:users,id',
            'assigned_to_role' => 'nullable|integer|in:1,2', // 1 para admin, 2 para soporte
            'incidence_status_id' => 'nullable|integer|exists:incidence_statuses,id', // Estado de la incidencia
        ]);

        // Buscar la incidencia por ID y asegurarse de que esté activa
        $incidence = Incidence::where('id', $id)->where('status', true)->first();

        // Si no existe o no está activa, devolver error 404
        if (!$incidence) {
            return response()->json(['message' => 'Incidencia no encontrada o ya eliminada'], 404);
        }

        // Actualizar la incidencia con los nuevos datos, si están presentes
        $incidence->update([
            'title' => $request->input('title', $incidence->title),
            'description' => $request->input('description', $incidence->description),
            'assigned_to' => $request->input('assigned_to', $incidence->assigned_to),
            'assigned_to_role' => $request->input('assigned_to_role', $incidence->assigned_to_role),
            'incidence_status_id' => $request->input('incidence_status_id', $incidence->incidence_status_id),
        ]);

        // Devolver la incidencia actualizada
        return response()->json($incidence, 200);
    }

    // Eliminar incidencia cambiando su estado a falso
    public function destroy($id)
    {
        // Buscar la incidencia por ID y asegurarse de que esté activa
        $incidence = Incidence::where('id', $id)->where('status', true)->first();

        // Si no existe o no está activa, devolver error 404
        if (!$incidence) {
            return response()->json(['message' => 'Incidencia no encontrada o ya eliminada'], 404);
        }

        // Cambiar el estado de la incidencia a falso (cerrada/eliminada)
        $incidence->status = false;
        $incidence->save();

        // Devolver respuesta indicando que la incidencia fue cerrada
        return response()->json(['message' => 'Incidencia Eliminada'], 200);
    }


    public function put(StoreIncidenceRequest $request)
    {
        // Validación de los datos recibidos
        $validatedData = $request->validated();

        // Crear la nueva incidencia
        $incidence = Incidence::create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'assigned_to' => $validatedData['assigned_to'],
            'incidence_status_id' => $validatedData['incidence_status_id'],
            'status' => true, // Suponiendo que la incidencia está activa por defecto
            'assigned_to_role' => $validatedData['assigned_to_role'], // O lo que corresponda según tu lógica
            'created_by' => 1, // El usuario actual crea la incidencia
        ]);

        // Retornar la incidencia recién creada
        return response()->json($incidence, 201); // Respuesta de éxito con código 201
    }
}
