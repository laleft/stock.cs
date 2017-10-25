<?php

namespace App\Http\Controllers;

use App\Articulo;
use App\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticuloController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Articulo::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $articulo = new Articulo;
        $articulo->create([
            'codigo' => $request->get('codigo'),
            'descripcion' => $request->get('descripcion'),
            
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function show(Articulo $articulo)
    {
        return $articulo;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function edit(Articulo $articulo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Articulo $articulo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Articulo $articulo)
    {
        //
    }

    public function buscar($articulo)
    {
        $articulos = Articulo::Buscar($articulo);
        return $articulos->getAll();
    }

    public function ultimos()
    {
        return Articulo::with('marca', 'marca.categoria')->orderBy('created_at', 'desc')->take(10)->get();
    }

    public function filtrar(Request $request)
    {
        $articulos = DB::table('articulos')
        ->join('marcas', 'marcas.id_marca', '=', 'articulos.id_marca')
        ->join('categorias', 'categorias.id_categoria', '=', 'marcas.id_categoria')
        ->where('categorias.id_categoria', '=', $request->input('id_categoria'))
        ->get();
        return $articulos;
    }

}
