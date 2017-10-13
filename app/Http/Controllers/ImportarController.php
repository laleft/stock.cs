<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        $rutaArchivo = 'articulos-prueba.csv';
       
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
            $codigoArticulo = str_pad(trim($linea[0]), 5, '0', STR_PAD_LEFT);
            $descripcionArticulo = utf8_encode($linea[1]);
            $ivaArticulo = trim($linea[5]);
            $valivaArticulo = floatval(str_replace(',', '.', $linea[6]));
            $costoArticulo = floatval(str_replace(',', '.', $linea[4]));
            $minorisArticulo = floatval(str_replace(',', '.', $linea[12]));
            $minorisiArticulo = floatval(str_replace(',', '.', $linea[13]));
            $mayorisArticulo = floatval(str_replace(',', '.', $linea[14]));
            $mayorisiArticulo = floatval(str_replace(',', '.', $linea[15]));            
            
            $id_categoria = null;

            if(!Categoria::where('categoria', $nombreCategoria)->exists())
            {
                $nuevaCategoria = new Categoria;
                $nuevaCategoria->categoria = $nombreCategoria;
                $nuevaCategoria->save();

                $id_categoria = $nuevaCategoria->id_categoria;
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

            if(!Articulo::where('codigo', $codigoArticulo)->exists())
            {
                if($id_marca == null)
                {
                    $marca = Marca::where('marca', $nombreMarca)->first();
                    $id_marca = $marca->id_marca;
                }

                $nuevoArticulo = new Articulo;
                $nuevoArticulo->codigo = $codigoArticulo;
                $nuevoArticulo->descripcion = $descripcionArticulo;
                $nuevoArticulo->iva_tipo = $ivaArticulo;
                $nuevoArticulo->iva_valor = $valivaArticulo;
                $nuevoArticulo->costo = $costoArticulo;
                $nuevoArticulo->precio_minorista = $minorisArticulo;
                $nuevoArticulo->precio_mayorista = $mayorisArticulo;
                $nuevoArticulo->coeficiente_ganancia_1 = 0;
                $nuevoArticulo->coeficiente_ganancia_2 = 0;
                $nuevoArticulo->stock_actual = NULL;
                $nuevoArticulo->id_marca = $id_marca;
                $nuevoArticulo->save();
            }
           
        }        
        
    }


}
