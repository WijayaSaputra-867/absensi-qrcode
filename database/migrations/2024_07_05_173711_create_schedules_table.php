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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId("month_id");
            $table->boolean("dt1")->default(false);
            $table->boolean("dt2")->default(false);
            $table->boolean("dt3")->default(false);
            $table->boolean("dt4")->default(false);
            $table->boolean("dt5")->default(false);
            $table->boolean("dt6")->default(false);
            $table->boolean("dt7")->default(false);
            $table->boolean("dt8")->default(false);
            $table->boolean("dt9")->default(false);
            $table->boolean("dt10")->default(false);
            $table->boolean("dt11")->default(false);
            $table->boolean("dt12")->default(false);
            $table->boolean("dt13")->default(false);
            $table->boolean("dt14")->default(false);
            $table->boolean("dt15")->default(false);
            $table->boolean("dt16")->default(false);
            $table->boolean("dt17")->default(false);
            $table->boolean("dt18")->default(false);
            $table->boolean("dt19")->default(false);
            $table->boolean("dt20")->default(false);
            $table->boolean("dt21")->default(false);
            $table->boolean("dt22")->default(false);
            $table->boolean("dt23")->default(false);
            $table->boolean("dt24")->default(false);
            $table->boolean("dt25")->default(false);
            $table->boolean("dt26")->default(false);
            $table->boolean("dt27")->default(false);
            $table->boolean("dt28")->default(false);
            $table->boolean("dt29")->default(false);
            $table->boolean("dt30")->default(false);
            $table->boolean("dt31")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
