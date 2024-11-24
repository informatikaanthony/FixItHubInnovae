<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidenceStatus extends Model
{
    use HasFactory;

    // Especificamos que el modelo se relaciona con la tabla 'incidence_statuses'
    protected $table = 'incidence_statuses';

    // Definimos los campos que pueden ser asignados masivamente
    protected $fillable = [
        'description',
        'status'
    ];

    // Ocultamos los campos sensibles, en este caso, no tenemos campos ocultos específicos en este modelo
    protected $hidden = [];

    // Protección de fechas: laravel asume que los campos 'created_at' y 'updated_at' se manejan automáticamente
    protected $dates = ['created_at', 'updated_at'];

    /**
     * Relación con el modelo Incidence.
     * Un estado puede tener muchas incidencias asociadas (relación uno a muchos).
     */
    public function incidences()
    {
        return $this->hasMany(Incidence::class, 'incidence_status_id');
    }

    /**
     * Método para verificar si el estado está activo.
     * Devuelve 'true' si el estado no está deshabilitado.
     */
    public function isActive()
    {
        return $this->status;
    }
}
