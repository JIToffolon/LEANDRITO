<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoCarrito extends Model
{
    use HasFactory;

    protected $table = 'productos_carrito';
    protected $fillable = ['carrito_id','producto_id','tipo_producto_id','quantity','total'];

    public function carrito(){
        return $this->belongsTo(Carrito::class);
    }

    public function producto(){
        return $this->hasOne(Producto::class, 'id', 'producto_id');
    }
}
