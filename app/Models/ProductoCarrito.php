<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoCarrito extends Model
{
    use HasFactory;

    protected $table = 'productos_carrito';
    protected $fillable = ['id_carrito','id_producto','id_tipo_producto','quantity','total'];
}
