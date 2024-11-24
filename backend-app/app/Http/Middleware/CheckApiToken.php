<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Verifica si el token existe en los headers de la solicitud
        $token = $request->bearerToken();
        
        if (!$token) {
            return response()->json([
                'status' => false,
                'api_token_given' => false,
                'api_token_valid' => false,
                'message' => 'Token no proporcionado'
            ], 401);
        }

        // Verifica si el token es válido
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'api_token_given' => true,
                'api_token_valid' => false,
                'message' => 'Token no valido'
            ], 401);
        }

        // El usuario está autenticado, permite continuar con la solicitud
        return $next($request);
    }
}
