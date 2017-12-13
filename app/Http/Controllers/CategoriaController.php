<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Categoria;

class CategoriaController extends Controller
{
    public function index(Request $request)
    {   

        $id_marca = $request->get('id_marca');
        if($id_marca)
        {
            $id_categoria = \App\Marca::select('id_categoria')->where('id_marca', $id_marca)->first();
            return Categoria::where('id_categoria', $id_categoria->id_categoria)->first();
        }
        
        return Categoria::orderBy('categoria', 'ASC')->get();
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
