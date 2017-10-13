<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    protected $primaryKey = 'id_marca';

    public function articulos()
    {
        return $this->hasMany('App\Articulo', 'id_marca');
    }
    
    public function categoria()
    {
        return $this->belongsTo('App\Categoria', 'id_categoria');
    }
}
