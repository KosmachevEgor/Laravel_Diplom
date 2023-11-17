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
        Schema::create('parts_of3d_models', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('model3_d_s_id');
            $table->foreign('model3_d_s_id')
            ->references('id')->on('model3_d_s')
            ->onDelete('cascade');
            $table->string("part_name");
            $table->string('part_info');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts_of3d_models');
    }
};
