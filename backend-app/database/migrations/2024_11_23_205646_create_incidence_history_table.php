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
        Schema::create('incidences_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('incidence_id');
            $table->unsignedTinyInteger('previous_status_id');
            $table->unsignedTinyInteger('new_status_id');
            $table->unsignedBigInteger('previous_user_id');
            $table->unsignedBigInteger('new_user_id');
            $table->unsignedBigInteger('changed_by_user_id');
            $table->timestamps();

            // Definición de las claves foráneas
            $table->foreign('incidence_id')->references('id')->on('incidences')->onDelete('cascade');
            $table->foreign('previous_status_id')->references('id')->on('incidence_statuses')->onDelete('cascade');
            $table->foreign('new_status_id')->references('id')->on('incidence_statuses')->onDelete('cascade');
            $table->foreign('previous_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('new_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('changed_by_user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidences_history');
    }
};
