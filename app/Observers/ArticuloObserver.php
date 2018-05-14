<?php
/**
 * Created by PhpStorm.
 * User: Santiago
 * Date: 05/04/2018
 * Time: 04:07 PM
 */

namespace App\Observers;

use App\Articulo;


class ArticuloObserver
{
    public function deleting( Articulo $articulo)
    {
        $articulo->movimientos_stock()->delete();
    }
}