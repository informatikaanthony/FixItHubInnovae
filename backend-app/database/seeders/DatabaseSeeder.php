<?php

namespace Database\Seeders;

use App\Models\Incidence;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            IncidenceStatusesSeeder::class,

        ]);

        Incidence::factory(10)->create();
       
    }
}
