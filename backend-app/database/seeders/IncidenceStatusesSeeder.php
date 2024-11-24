<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IncidenceStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('incidence_statuses')->insert([
            ['description' => 'To Do'],
            ['description' => 'Doing'],
            ['description' => 'Done'],
        ]);
    }
}
