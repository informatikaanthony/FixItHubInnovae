<?php

namespace Database\Factories;

use App\Models\Incidence;
use App\Models\User; // Asegúrate de importar el modelo User
use Illuminate\Database\Eloquent\Factories\Factory;

class IncidenceFactory extends Factory
{
    /**
     * El nombre del modelo que esta fábrica está creando.
     *
     * @var string
     */
    protected $model = Incidence::class;

    /**
     * Define el estado por defecto de los modelos que esta fábrica generará.
     *
     * @return array
     */
    public function definition(): array
    {
        // Obtener un usuario aleatorio de la base de datos
        $user = User::inRandomOrder()->first();


        return [
            'title' => $this->faker->sentence(), // Título aleatorio
            'description' => $this->faker->paragraph(), // Descripción aleatoria
            'incidence_status_id' => $this->faker->randomElement([1, 2, 3]), // Estado aleatorio (To Do, Doing, Done) 
            'assigned_to' => $user->id, // Asignar aleatoriamente a uno de los 3 usuarios
            'assigned_to_role' => $user->role_id, // Asignar el rol del usuario
            'created_by' => $user->id, // Crear incidencia por el usuario aleatorio
        ];
    }
}
