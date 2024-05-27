<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        return Inertia::render('Carrito/Index');
    }

    public function getCart(){
        $cart_id = 1;
        $products = CartItem::with('product')->where('cart_id', $cart_id)->get();

        return response()->json($products);
    }
}
