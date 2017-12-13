<?php
namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use App\Articulo;
use App\Categoria;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ArticuloController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //return Articulo::all();        
        return Articulo::paginate(25);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        /*if(empty($request->get('id_categoria')))
        {
            $categoria = new \App\Categoria;
            $categoria->categoria = $request->get('categoria');
            $categoria->save();
            $id_categoria = $categoria->id_categoria;
        }
        else
        {
            $id_categoria = $request->get('id_categoria');
        }

        if(empty($request->get('id_marca')))
        {
            $marca = new \App\Marca;
            $marca->marca = $request->get('marca');
            $marca->id_categoria = $id_categoria;
            $marca->save();
            $id_marca = $marca->id_marca;

            
        }
        else
        {
            $id_marca = $request->get('id_marca');
        }

        $articulo = new Articulo;
        $articulo->create([

            'codigo' => $request->get('codigo'),
            'descripcion' => $request->get('descripcion'),
            'iva_tipo' => $request->get('iva_tipo'),
            'iva_valor' => $request->get('iva_valor'),
            'costo' => $request->get('costo'),
            'precio_minorista' => ($request->get('costo') * $request->get('coeficiente_ganancia_1')),
            'precio_mayorista' => ($request->get('costo') * $request->get('coeficiente_ganancia_2')),
            'coeficiente_ganancia_1' => $request->get('coeficiente_ganancia_1'),
            'coeficiente_ganancia_2' => $request->get('coeficiente_ganancia_2'),
            'stock_actual' => $request->get('stock_actual'),
            'id_marca' => $id_marca
        ]);*/
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            Articulo::create($request->all());
            return 'TODO OK';
        } catch( \Illuminate\Database\QueryException $e) {
                return response()->json(array('mensaje' => $e->errorInfo[2]), 500);
        }
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
        if($request->get('id_marca'))
        {
            return Articulo::with('marca', 'marca.categoria')->where('id_marca', $request->get('id_marca'))->get();
        }
        
        $articulos = DB::table('articulos')
        ->join('marcas', 'marcas.id_marca', '=', 'articulos.id_marca')
        ->join('categorias', 'categorias.id_categoria', '=', 'marcas.id_categoria')
        ->where('categorias.id_categoria', '=', $request->input('id_categoria'))
        ->get();

        return $articulos;
    }

}
