<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'carts';
    protected $fillable = ['status'];


    public function cartItems(){
        return $this->hasMany(CartItem::class, 'cart_id','id');
    }

    public function totalCart(){
        $products = $this->cartItems()->get();
        $finalPrice = 0;
        foreach ($products as $product){
            $finalPrice = $finalPrice + $product->total;
        }
        return $finalPrice;
    }
}
