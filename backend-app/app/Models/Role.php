<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    // Definir la tabla asociada al modelo
    protected $table = 'roles';

    // Los atributos que se pueden asignar masivamente
    protected $fillable = [
        'id',           // No es necesario en $fillable ya que es auto-incrementable
        'description',
        'status',
    ];

    
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
