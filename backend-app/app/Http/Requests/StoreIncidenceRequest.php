<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIncidenceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255', // Título obligatorio, tipo cadena, máximo 255 caracteres
            'description' => 'required|string',  // Descripción obligatoria, tipo cadena
            'incidence_status_id' => 'required|integer|exists:incidence_statuses,id', // ID del estado, debe existir en la tabla correspondiente
            'assigned_to' => 'required|integer|exists:users,id', // Usuario asignado, debe existir en la tabla 'users'
            'assigned_to_role' => 'integer', // Rol asignado, debe ser un entero entre 1 y 5
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'El título de la incidencia es obligatorio.',
            'title.max' => 'El título no puede exceder los 255 caracteres.',
            'description.required' => 'La descripción de la incidencia es obligatoria.',
            'incidence_status_id.required' => 'El estado de la incidencia es obligatorio.',
            'incidence_status_id.exists' => 'El estado de la incidencia debe ser válido.',
            'assigned_to.required' => 'El usuario asignado es obligatorio.',
            'assigned_to.exists' => 'El usuario asignado debe ser válido.',
            'assigned_to_role.integer' => 'El rol asignado debe ser un número entero.',
        ];
    }
}
