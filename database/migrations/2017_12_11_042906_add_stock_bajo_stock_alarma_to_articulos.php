<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStockBajoStockAlarmaToArticulos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('articulos', function($table){
            $table->integer('stock_minimo')->unsigned()->after('stock_actual');
            $table->boolean('alarma_stock')->after('stock_minimo');
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
            $table->dropColumn('stock_minimo');
            $table->dropColumn('alarma_stock');
        });
    }
}
