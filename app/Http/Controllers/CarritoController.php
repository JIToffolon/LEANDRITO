<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\Producto;
use App\Models\ProductoCarrito;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarritoController extends Controller
{
    public function index()
    {
        return Inertia::render('Carrito/Index');
    }

    public function getCarrito(){
        $carrito_id = session()->get('carrito_id');
        $productos = ProductoCarrito::with('producto')->where('carrito_id', $carrito_id)->get();

        return response()->json($productos);
    }
}


