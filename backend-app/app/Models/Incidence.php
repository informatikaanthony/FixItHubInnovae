<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidence extends Model
{
    use HasFactory;

    // Especificamos que el modelo se relaciona con la tabla 'incidences'
    protected $table = 'incidences';

    // Definimos los campos que pueden ser asignados masivamente
    protected $fillable = [
        'title',
        'description',
        'incidence_status_id',
        'status',
        'assigned_to',
        'assigned_to_role',
        'created_by'
    ];

    // Protección de fechas: laravel asume que los campos 'created_at' y 'updated_at' se manejan automáticamente
    protected $dates = ['created_at', 'updated_at'];

    /**
     * Relación con el modelo IncidenceStatus.
     * Una incidencia tiene un estado de incidencia.
     */
    public function incidenceStatus()
    {
        return $this->belongsTo(IncidenceStatus::class, 'incidence_status_id');
    }

    /**
     * Relación con el modelo User para el usuario asignado.
     * Una incidencia tiene un usuario asignado.
     */
    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Relación con el modelo User para el creador de la incidencia.
     * Una incidencia tiene un usuario que la creó.
     */
    public function createdUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Método para verificar si la incidencia está activa.
     * Devuelve 'true' si la incidencia no está eliminada.
     */
    public function isActive()
    {
        return $this->status;
    }

}
