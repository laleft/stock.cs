<?php

namespace App\Http\Controllers;

use DB;
use Config;
use App\Marca;
use App\Categoria;
use App\Articulo;

class ImportarController extends Controller
{

    public function test() {

        $articulo = Articulo::where('codigo', '05718')->first();
        $articulos = Articulo::take(100)->get();
        dd($articulos);
        // return $articulos->toJson();
        //  echo $articulo->descripcion.'<br>';
        //  echo $articulo->marca->marca.'<br>';
        //  echo $articulo->marca->categoria->categoria.'<br>';

        // $marca = Marca::find(1);
        // print_r($marca->articulos);

    }

    public function importarDatos($rutaArchivo = null)
    {
        //$rutaArchivo = 'articulos-1m.csv';

        if ( !$rutaArchivo ) return null;

        $archivo = fopen($rutaArchivo, 'r');

        $flagPrimeraLinea = true;

        while( ($linea = fgetcsv($archivo, 4096, ';')) !== FALSE ) {

            if($flagPrimeraLinea) {
                $flagPrimeraLinea = false;
                continue;
            }

            $nombreCategoria = utf8_encode($linea[2]);
            $nombreMarca = utf8_encode($linea[3]);
            $codigoArticulo = $linea[0];
            $descripcionArticulo = utf8_encode($linea[1]);
            $ivaArticulo = trim($linea[5]);
            $valivaArticulo = floatval(str_replace(',', '.', $linea[6]));
            $costoArticulo = floatval(str_replace(',', '.', $linea[4]));
            $coeficiente_ganancia_min = floatval(str_replace(',', '.', $linea[10]));
            $coeficiente_ganancia_may = floatval(str_replace(',', '.', $linea[11]));
            $minorisArticulo = floatval(str_replace(',', '.', $linea[12]));
            $minorisiArticulo = floatval(str_replace(',', '.', $linea[13]));
            $mayorisArticulo = floatval(str_replace(',', '.', $linea[14]));
            $mayorisiArticulo = floatval(str_replace(',', '.', $linea[15]));

            //$almacen = $linea[5];

            $id_categoria = null;

            if(!Categoria::where('categoria', $nombreCategoria)->exists())
            {
                $nuevaCategoria = new Categoria;
                $nuevaCategoria->categoria = $nombreCategoria;
                $nuevaCategoria->save();

                $id_categoria = $nuevaCategoria->id_categoria;
            }
            else
            {
                $categoria = Categoria::where('categoria', $nombreCategoria)->first();
                $id_categoria = $categoria->id_categoria;
            }
            $id_marca = null;

            if(!Marca::where('marca', $nombreMarca)->exists())
            {
                if($id_categoria == null)
                {
                    $categoria = Categoria::where('categoria', $nombreCategoria)->first();
                    $id_categoria = $categoria->id_categoria;
                }

                $nuevaMarca = new Marca;
                $nuevaMarca->marca = $nombreMarca;
                $nuevaMarca->id_categoria = $id_categoria;
                $nuevaMarca->save();

                $id_marca = $nuevaMarca->id_marca;
            }

            if($id_marca == null)
            {
                $marca = Marca::where('marca', $nombreMarca)->first();
                $id_marca = $marca->id_marca;
            }

            try
            {
                $nuevoArticulo = new Articulo;
                $nuevoArticulo->codigo = $codigoArticulo;
                $nuevoArticulo->descripcion = $descripcionArticulo;
                $nuevoArticulo->iva_tipo = $ivaArticulo;
                $nuevoArticulo->iva_valor = $valivaArticulo;
                $nuevoArticulo->costo = $costoArticulo;
                $nuevoArticulo->precio_minorista = $minorisArticulo;
                $nuevoArticulo->precio_minorista_final = $minorisiArticulo;
                $nuevoArticulo->precio_mayorista = $mayorisArticulo;
                $nuevoArticulo->precio_mayorista_final = $mayorisiArticulo;
                $nuevoArticulo->coeficiente_ganancia_1 = $coeficiente_ganancia_min;
                $nuevoArticulo->coeficiente_ganancia_2 = $coeficiente_ganancia_may;
                $nuevoArticulo->stock_actual = NULL;
                $nuevoArticulo->id_categoria = $id_categoria;
                $nuevoArticulo->id_marca = $id_marca;
//            $nuevoArticulo->id_almacen = $almacen;
                $nuevoArticulo->save();
            }
            catch (\Exception $exception)
            {
                $errores[] = $exception;
            }
        }
        echo "\n";
        echo 'La importacion finalizo con los siguientes errores: ';
        echo "\n";
        foreach( $errores as $error ) {
            echo $error->getMessage();
            echo "\n";
        }

    }


}
