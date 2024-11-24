<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidencesHistory extends Model
{
    use HasFactory;

    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'incidences_history';

    /**
     * Los atributos que son asignables en masa.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'incidence_id',
        'previous_status_id',
        'new_status_id',
        'previous_user_id',
        'new_user_id',
        'changed_by_user_id',
    ];

    /**
     * Definir la relación con la tabla 'incidences'.
     */
    public function incidence()
    {
        return $this->belongsTo(Incidence::class, 'incidence_id');
    }

    /**
     * Definir la relación con la tabla 'incidence_statuses' para el estado anterior.
     */
    public function previousStatus()
    {
        return $this->belongsTo(IncidenceStatus::class, 'previous_status_id');
    }

    /**
     * Definir la relación con la tabla 'incidence_statuses' para el nuevo estado.
     */
    public function newStatus()
    {
        return $this->belongsTo(IncidenceStatus::class, 'new_status_id');
    }

    /**
     * Definir la relación con la tabla 'users' para el usuario anterior.
     */
    public function previousUser()
    {
        return $this->belongsTo(User::class, 'previous_user_id');
    }

    /**
     * Definir la relación con la tabla 'users' para el nuevo usuario asignado.
     */
    public function newUser()
    {
        return $this->belongsTo(User::class, 'new_user_id');
    }

    /**
     * Definir la relación con la tabla 'users' para el usuario que realizó el cambio.
     */
    public function changedByUser()
    {
        return $this->belongsTo(User::class, 'changed_by_user_id');
    }

    /**
     * Definir las relaciones de la tabla con otros modelos si es necesario.
     */
}
