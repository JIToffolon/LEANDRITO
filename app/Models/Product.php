<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $fillable = ['id','name','description','photo'];

    public function details()
    {
        return $this->hasMany(ProductDetail::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}
