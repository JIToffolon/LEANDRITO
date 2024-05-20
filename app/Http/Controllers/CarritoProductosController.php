<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\Producto;
use App\Models\ProductoCarrito;
use Illuminate\Http\Request;

class CarritoProductosController extends Controller
{
    public function addToCart(Request $request, $producto_id)
    {
        $producto = Producto::find($producto_id);

        if (!$producto) {
            return response()->json(['error' => 'El producto no existe'], 404);
        }

        $carrito_id = session()->get('carrito_id');
        if (!$carrito_id) {
            $carrito = Carrito::create([
                'status' => 'pending'
            ]);
            $carrito_id = $carrito->id;
            session()->put('carrito_id', $carrito_id);
        }

        $itemExistente = ProductoCarrito::where('producto_id', $producto_id)
            ->where('carrito_id', $carrito_id)
            ->first();

        if ($itemExistente) {
            $finalPrice = $itemExistente->producto->price * ($itemExistente->qty + 1);
            $itemExistente->update([
                'qty' => $itemExistente->qty + 1,
                'final_price' => $finalPrice,
            ]);
        } else {

            ProductoCarrito::create([
                'carrito_id' => $carrito_id,
                'producto_id' => $producto_id,
                'quantity' => 1,
                'total' => $producto->price
            ]);
        }

        return response()->json(['message' => 'Producto agregado al carrito correctamente']);
    }

    public function updateQuantity(Request $request, $id){

        $request->validate([
            'quantity' => 'required|integer|min:1', // Asegúrate de que la cantidad sea un entero positivo
        ]);

        $carritoProducto = ProductoCarrito::find($id);
        if($carritoProducto){
                $final_price = $carritoProducto->product->price * $request->quantity;
                $carritoProducto->quantity = $request->quantity;
                $carritoProducto->total = $final_price;
                $carritoProducto->save();
                return response()->json(['message' => 'Cantidad actualizada correctamente'], 200);
        }else{
            return response()->json(['message' => 'Error al modificar cantidad'], 400);
        }
    }


    public function countItemsInCart(){
        $cartCount = 0;
        if(session()->get('carrito_id')){
            $carrito_id = session()->get('carrito_id');
        }else {
            $carrito_id = null;
        }

        if($carrito_id){
            $cartCount = ProductoCarrito::where('carrito_id', $carrito_id)->count();
        }

        return $cartCount;
    }

    public function destroy(string $id)
    {
        ProductoCarrito::find($id)->delete();

        return response()->json(['success' => true]);
    }
}