<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticulosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articulos', function (Blueprint $table) {
            $table->increments('id_articulo');
            $table->string('codigo', 50);
            $table->string('descripcion', 255);
            $table->string('iva_tipo', 1);
            $table->decimal('iva_valor');
            $table->decimal('costo');
            $table->decimal('precio_minorista');
            $table->decimal('precio_mayorista');
            $table->decimal('coeficiente_ganancia_1');
            $table->decimal('coeficiente_ganancia_2');
            $table->integer('stock_actual')->nullable();
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
        Schema::dropIfExists('articulos');
    }
}
