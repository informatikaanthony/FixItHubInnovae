<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Anthony',
                'email' => 'anthony@example.com',
                'password' => bcrypt('1234567890'), // Asignar una contraseña
                'role_id' => 1, // Suponiendo que 1 es el rol de administrador
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jon',
                'email' => 'jon@example.com',
                'password' => bcrypt('1234567890'), // Asignar una contraseña
                'role_id' => 2, // Suponiendo que 2 es el rol de soporte
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mikel',
                'email' => 'mikel@example.com',
                'password' => bcrypt('1234567890'), // Asignar una contraseña
                'role_id' => 2, // Suponiendo que 2 es el rol de soporte
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
