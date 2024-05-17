<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    use HasFactory;

    protected $table = 'carritos';
    protected $fillable = ['status'];


    public function carritoProductos(){
        return $this->hasMany(ProductoCarrito::class, 'carrito_id','id');
    }

    public function totalCarrito(){
        $productos = $this->carritoProductos()->get();
        $precioFinal = 0;
        foreach ($productos as $producto){
            $precioFinal = $precioFinal + $producto->total;
        }
        return $precioFinal;
    }
}
