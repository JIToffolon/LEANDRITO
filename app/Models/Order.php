<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['id','email','cart_id','customer_name','customer_address1', 'customer_address2', 'customer_postalcode','customer_city',
        'customer_state','customer_country','total'];
    

    public function Cart()
    {
        return $this->hasOne(Cart::class, 'id', 'cart_id');
    }
}
