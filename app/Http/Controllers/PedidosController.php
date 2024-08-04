<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Pedidos/Index');
    }
    
    public function getPedidos()
    {
        $pedidos = Order::all();
        return response()->json(['pedidos' => $pedidos]);
    }

    public function show($id)
    {
        $order = Order::with('Cart.cartItems','Cart.cartItems.product','Cart.cartItems.productType')->find($id);
        if($order){
            $total = $order->Cart->totalCart();
            return response()->json(['data' => $order,'totalCart' =>$total], 200);
        }else{
            return response()->json('error', 400);
        }
    }

}
