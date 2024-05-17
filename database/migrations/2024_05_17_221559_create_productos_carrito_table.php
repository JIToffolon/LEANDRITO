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
        Schema::create('productos_carrito', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('carrito_id');
            $table->bigInteger('producto_id');
            $table->integer('tipo_producto_id');
            $table->integer('quantity');
            $table->float('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos_carrito');
    }
};
