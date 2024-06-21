<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $table = 'cart_items';
    protected $fillable = ['cart_id','product_id','product_type_id','quantity','total'];

    public function cart(){
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class, 'product_type_id', 'id');
    }

    public function productDetail()
    {
        return $this->hasOne(ProductDetail::class, 'product_id', 'product_id')
                    ->where('product_type_id', $this->product_type_id);
    }

}
