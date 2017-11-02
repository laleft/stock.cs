<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articulo extends Model
{
    protected $primaryKey = 'id_articulo';
    protected $fillable = ['codigo', 'descripcion', 'iva_tipo', 'iva_valor', 'costo', 'coeficiente_ganancia_1', 'coeficiente_ganancia_2', 'precio_minorista', 'precio_mayorista', 'id_marca', 'created_at', 'updated_at'];

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

    public function scopeFiltrarArticulos($query, $parametros)
    {
        if(empty($parametros))
        {
            return $query;
        }

        

    }
}
