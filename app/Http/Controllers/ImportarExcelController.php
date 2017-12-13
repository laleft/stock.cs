<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Articulo;
use App\Categoria;
use App\Marca;
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
                    $nuevo_articulo = Articulo::updateOrCreate(['descripcion' => $articulo->descripcion]);
                    $nuevo_articulo->codigo = $articulo->codigo;
                    $nuevo_articulo->costo = $articulo->precio;
                    $nuevo_articulo->stock_actual = $articulo->total;
                    $nuevo_articulo->id_categoria = $categoria->id_categoria;
                    $nuevo_articulo->id_marca = $marca->id_marca;
                    $nuevo_articulo->save();
                } catch (Exception $e) {
                    echo $e->getMessage() . '<br>';
                }

            }
        });
    }
}
