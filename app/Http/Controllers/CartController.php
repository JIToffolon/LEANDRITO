<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        return Inertia::render('Carrito/Index');
    }

    public function getCart(){
        $cart_id = session()->get('cart_id', null);
        $products = CartItem::with('product','productType')->where('cart_id', $cart_id)->get();

        return response()->json($products);
    }

    public function getTotalCart(){
        $cart_id = session()->get('cart_id', null);
        $cart = Cart::find($cart_id);
        if($cart){
            return $cart->totalCart();
        }else{
            return 0;
        }
    }
}
