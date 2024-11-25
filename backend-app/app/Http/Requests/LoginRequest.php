<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado a realizar esta solicitud.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // Si deseas restringir el acceso, puedes aplicar lógica aquí
    }

    /**
     * Obtener las reglas de validación que se aplicarán a la solicitud.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6',
        ];
    }

    /**
     * Obtener los mensajes de validación personalizados.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El campo correo debe de ser de tipo correo',
            'email.exists' => 'El correo no esta registrado',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
        ];
    }

    /**
     * Manejo de validación fallida.
     *
     * @param \Illuminate\Contracts\Validation\Validator $validator
     * @return void
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        // Obtener los errores de validación
        $errors = $validator->errors();

        // Lanzar la excepción con una respuesta JSON
        throw new ValidationException($validator, response()->json([
            'status' => false,
            'message' => 'Los datos proporcionados no son validos.',
            'errors' => $errors,
        ], 422));
    }
}
