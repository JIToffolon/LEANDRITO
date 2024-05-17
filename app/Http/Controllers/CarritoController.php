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
        return Inertia::render('Admin/Pedidos/Index', [
            'pedidos' => Carrito::with('carritoProductos')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'productos' => 'required',
        ]);

        try {
            $carrito = new Carrito();
            $carrito->status = 'pending';
            $carrito->save();

            foreach ($request->productos as $productos) {
                $producto_carrito = new ProductoCarrito();
                $producto_carrito->carrito_id = $carrito->id;
                $producto_carrito->producto_id = $productos['producto_id'];
                $producto_carrito->quantity = $productos['quantity'];
                $producto_carrito->total = $productos['total'];
                $producto_carrito->save();
            }
            return response()->json(['success' => 'El carrito se ha cargado correctamente']);
        } catch (Exception $ex) {
            return response()->json(['error' => 'Error: ' . $ex->getMessage()]);
        }
    }

    public function show($id)
    {
        $carrito = Carrito::find($id);
        $productos = ProductoCarrito::where('carrito_id', $carrito->id)->get();

        return Inertia::render('Admin/Pedidos/Index', [
            'carrito' => $carrito,
            'productos' => $productos
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'productos' => 'required|array',
        ]);

        try {
            $carrito = Carrito::findOrFail($id);
            // ELIMINO TODOS LOS PRODUCTOS DEL CARRITO PARA DSP AGREGAR LOS NUEVOS EDITADOS
            ProductoCarrito::where('carrito_id', $carrito->id)->delete();

            // RECORRO LOS PRODUCTOS QUE ME LLEGAN EN EL REQUEST Y LOS AGREGO AL CARRITO OTRA VEZ
            foreach ($request->productos as $producto) {
                $producto_carrito = new ProductoCarrito();
                $producto_carrito->carrito_id = $carrito->id;
                $producto_carrito->producto_id = $producto['producto_id'];
                $producto_carrito->quantity = $producto['quantity'];
                $producto_carrito->total = $producto['total'];
                $producto_carrito->save();
            }

            return response()->json(['success' => 'El carrito se ha actualizado correctamente']);

        } catch (Exception $ex) {
            return response()->json(['error' => 'Error: ' . $ex->getMessage()]);
        }
    }
}
