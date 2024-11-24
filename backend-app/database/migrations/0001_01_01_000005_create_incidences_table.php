<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('incidences', function (Blueprint $table) {
            $table->id(); // Identificador único de la incidencia
            $table->string('title'); // Título de la incidencia
            $table->text('description'); // Descripción detallada
            $table->unsignedTinyInteger('incidence_status_id');
            $table->boolean('status')->default(true); // para saber si esta eliminada o no
            $table->unsignedBigInteger('assigned_to');
            $table->unsignedBigInteger('created_by');
            $table->timestamps(); // created_at y updated_at

            $table->foreign('incidence_status_id')->references('id')->on('incidence_statuses')->onDelete('cascade'); 
            $table->foreign('assigned_to')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidences');
    }
};
