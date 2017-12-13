<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $primaryKey = 'id_categoria';
    protected $fillable = ['categoria'];

    public function marcas()
    {
        return $this->hasMany('App\Marca', 'id_marca');
    }

    public function scopeBuscar( $query, $categoria )
    {
        if(empty($categoria))
        {
            return $query;
        }

        return $query->where('categoria', 'like', '%'.$categoria.'%');
    }
}
