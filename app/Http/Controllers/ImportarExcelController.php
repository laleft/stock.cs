<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Articulo;
use App\Categoria;
use App\Marca;
use App\MovimientosStock;
use League\Flysystem\Exception;
use Maatwebsite\Excel\Facades\Excel;

class ImportarExcelController extends Controller
{
    public function importar()
    {
        Excel::setDelimiter(';');
        Excel::load('articulos_2017.csv', function ($reader){
            foreach ($reader->get() as $articulo) {
                try {
                    $categoria = Categoria::firstOrCreate(['categoria' => $articulo->categoria]);
                    $marca = Marca::firstOrCreate(['marca' => $articulo->marca, 'id_categoria' => $categoria->id_categoria]);
                    $nuevo_articulo = Articulo::updateOrCreate(['codigo' => $articulo->codigo, 'descripcion' => $articulo->descripcion]);
                    $nuevo_articulo->codigo = $articulo->codigo;
                    $nuevo_articulo->costo = $articulo->precio;
                    $nuevo_articulo->stock_actual = $articulo->stock;
                    $nuevo_articulo->id_categoria = $categoria->id_categoria;
                    $nuevo_articulo->id_marca = $marca->id_marca;
                    $nuevo_articulo->save();
                    
                    $movimiento_stock = MovimientosStock::create([
                        'id_articulo' => $nuevo_articulo->id_articulo,
                        'fecha_movimiento' => $nuevo_articulo->created_at, 
                        'stock_ingreso' => $nuevo_articulo->stock_actual >= 0 ? $nuevo_articulo->stock_actual : 0,
                        'costo' => $nuevo_articulo->costo,
                        'coeficiente_ganancia_1' => $nuevo_articulo->coeficiente_ganancia_1,
                        'coeficiente_ganancia_2' => $nuevo_articulo->coeficiente_ganancia_2
                        ]);
                    $movimiento_stock->save();

                } catch (\Illuminate\Database\QueryException $e) {
                    echo $e->getMessage() . '<br>';
                }

            }
        });
    }
}
