<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
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
        // Si la solicitud es de tipo OPTIONS (pre-flight), respondes con los encabezados necesarios
        if ($request->getMethod() == "OPTIONS") {
            return response('', 200)
                ->header('Access-Control-Allow-Origin', '*') // Puedes reemplazar '*' con un dominio específico como 'http://localhost:4200'
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization, Origin, Accept, X-CSRF-TOKEN');
        }

        // Para todas las demás solicitudes, agrega los encabezados CORS necesarios
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')  // Cambia '*' por tu dominio si lo deseas
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization, Origin, Accept, X-CSRF-TOKEN');
    }
}
