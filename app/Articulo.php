<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articulo extends Model
{
    protected $primaryKey = 'id_articulo';

    public function marca()
    {
        return $this->belongsTo('App\Marca', 'id_marca');
    }

    public function scopeBuscar($query, $articulo)
    {
        if(empty($articulo))
        {
            return $query;
        }

        return $query->where('descripcion', 'like', '%'.$articulo.'%');
    }
}
