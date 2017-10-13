<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovimientosStockTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movimientos_stock', function (Blueprint $table) {
            $table->increments('id_movimiento');
            $table->dateTime('fecha_movimiento');
            $table->integer('stock_ingreso');
            $table->integer('stock_egreso');
            $table->decimal('costo');
            $table->decimal('coeficiente_ganancia_1');
            $table->decimal('coeficiente_ganancia_2');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movimientos_stock');
    }
}
