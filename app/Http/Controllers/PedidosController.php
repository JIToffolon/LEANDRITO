<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Pedidos/Index', [
            'pedidos' => Carrito::with('carritoProductos')->get()  // DESPUES FILTRAR POR PEDIDOS YA FINALIZADOS.
        ]);
    }

}
