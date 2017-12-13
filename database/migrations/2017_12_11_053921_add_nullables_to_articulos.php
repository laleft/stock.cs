<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNullablesToArticulos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('articulos', function($table){
            $table->string('iva_tipo', 1)->nullable()->change();
            $table->decimal('iva_valor')->nullable()->change();
            $table->decimal('costo')->nullable()->change();
            $table->decimal('precio_minorista')->nullable()->change();
            $table->decimal('precio_mayorista')->nullable()->change();
            $table->decimal('coeficiente_ganancia_1')->nullable()->change();
            $table->decimal('coeficiente_ganancia_2')->nullable()->change();
            $table->integer('id_marca')->nullable()->change();
            $table->integer('id_categoria')->nullable()->change();
            $table->integer('stock_minimo')->nullable()->change();
            $table->integer('alarma_stock')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('articulos', function($table){
            $table->string('iva_tipo', 1)->nullable(false)->change();
            $table->decimal('iva_valor')->nullable(false)->change();
            $table->decimal('costo')->nullable(false)->change();
            $table->decimal('precio_minorista')->nullable(false)->change();
            $table->decimal('precio_mayorista')->nullable(false)->change();
            $table->decimal('coeficiente_ganancia_1')->nullable(false)->change();
            $table->decimal('coeficiente_ganancia_2')->nullable(false)->change();
            $table->integer('id_marca')->nullable(false)->change();
            $table->integer('id_categoria')->nullable(false)->change();
            $table->integer('stock_minimo')->nullable(false)->change();
            $table->integer('alarma_stock')->nullable(false)->change();
        });
    }
}
