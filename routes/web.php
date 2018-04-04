<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

// Route::get('/', 'DashboardController@index');
// Route::resource('articulo', 'ArticuloController');

// Route::get('/importar', function(){

//     return view('importar');

// });


Route::get('/importar', 'ImportarController@importarDatos');
Route::get('/importar/test', 'ImportarController@test');
Route::get('/articulo/buscar/categoria', 'ArticuloController@buscarCategorias');
Route::get('/importar-excel', 'ImportarExcelController@importar');