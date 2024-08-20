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
        Schema::create('presence_scans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->integer('late')->default(0);
            $table->boolean('time_1')->default(false);
            $table->boolean('time_2')->default(false);
            $table->boolean('time_3')->default(false);
            $table->boolean('time_4')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('presence_scans');
    }
};
