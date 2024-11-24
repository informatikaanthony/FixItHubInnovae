<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            // Datos a validar
            $credentials = $request->validated();

            // Verificar las credenciales del usuario
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'status' => 'false',
                    'message' => 'Credenciales incorrectas, por favor revise usuario y contraseña'
                ], 401);
            }

            // Obtener al usuario autenticado
            $user = Auth::user();

            // Crear el token
            $token = $user->createToken('auth_token')->plainTextToken;

            // Devolver el token al usuario
            return response()->json([
                'status' => 'true',
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y devolver un mensaje de error
            return response()->json([
                'status' => 'false',
                'message' => 'Hubo un error al procesar la solicitud',
                'error' => $e->getMessage() // Muestra el mensaje de error para debugging (solo en desarrollo)
            ], 500);
        }
    }


    public function logout(Request $request)
    {
        try {
            // Obtiene al usuario autenticado
            $user = Auth::guard('sanctum')->user();

            // Elimina todos los tokens del usuario autenticado
            $user->tokens->each(function ($token) {
                $token->delete();
            });

            // Responde indicando que los tokens fueron eliminados correctamente
            return response()->json([
                'status' => true,
                'api_token_given' => true,
                'api_token_valid' => true,
                'message' => 'Tokens eliminados con éxito'
            ]);
        } catch (\Exception $e) {
            // Si ocurre algún error, captura la excepción y responde con un mensaje de error
            return response()->json([
                'status' => false,
                'api_token_given' => true,
                'api_token_valid' => true,
                'message' => 'Hubo un error al eliminar los tokens',
                'error' => $e->getMessage() // Muestra el mensaje de error para debugging
            ], 500);
        }
    }
}
