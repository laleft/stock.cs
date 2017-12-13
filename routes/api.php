<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('articulo/ultimos', 'ArticuloController@ultimos');
Route::get('articulo/filtrar', 'ArticuloController@filtrar');
Route::get('articulo/buscar/{articulo?}', 'ArticuloController@buscar');
Route::get('categoria/listar/{categoria?}/{pagesize?}', 'CategoriaController@listar');
Route::resource('articulo', 'ApiControllers\ArticuloController');
Route::resource('marca', 'MarcaController');
Route::resource('categoria', 'CategoriaController', ['only' => [
    'index'
]]);