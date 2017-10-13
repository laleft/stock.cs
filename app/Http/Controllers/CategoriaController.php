<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Categoria;

class CategoriaController extends Controller
{
    public function index()
    {
        return Categoria::get();
    }

    public function show(Categoria $categoria)
    {
        return $categoria;
    }

    public function listar( $categoria = NULL, $pagesize = NULL)
    {
        if(empty($pagesize))
            $categorias = Categoria::Buscar($categoria)->get();
        else
            $categorias = Categoria::Buscar($categoria)->paginate($pagesize);
        return $categorias->toJson();
    }

}
