<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articulo extends Model
{
    protected $primaryKey = 'id_articulo';
    protected $fillable = ['codigo', 'descripcion', 'iva_tipo', 'iva_valor', 'costo', 'coeficiente_ganancia_1', 'coeficiente_ganancia_2', 'precio_minorista', 'precio_minorista_final', 'precio_mayorista', 'precio_mayorista_final', 'stock_actual', 'stock_minimo', 'alarma_stock', 'id_almacen', 'id_marca', 'id_categoria','created_at', 'updated_at'];
    protected $appends = ['_rowVariant'];

    public function marca()
    {
        return $this->belongsTo('App\Marca', 'id_marca');
    }

    public function categoria()
    {
        return $this->belongsTo('App\Categoria', 'id_categoria');
    }

    public function listas_precios_por_articulo()
    {
        return $this->hasMany('App\ListasPreciosPorArticulo', 'id_articulo');
    }

    public function movimientos_stock()
    {
        return $this->hasMany('App\MovimientosStock', 'id_articulo');
    }

    public function getRowVariantAttribute()
    {
        if(($this->stock_actual <= $this->stock_minimo) && $this->alarma_stock) {
            return $this->_rowVariant = 'danger';
        }
    }

    public function getAlarmaStockAttribute($value)
    {
        return (boolean) $value;
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
