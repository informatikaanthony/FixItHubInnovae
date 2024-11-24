<?php

namespace Database\Factories;

use App\Models\Incidence;
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
        return [
            'title' => $this->faker->sentence(), // Título aleatorio
            'description' => $this->faker->paragraph(), // Descripción aleatoria
            'incidence_status_id' => $this->faker->randomElement([1, 2, 3]), // Estado aleatorio (To Do, Doing, Done) 
            'assigned_to' => $this->faker->randomElement([1, 2, 3]), // Asignar aleatoriamente a uno de los 3 usuarios
            'created_by' => 1, // Crear incidencia por uno de los 3 usuarios
        ];
    }
}
