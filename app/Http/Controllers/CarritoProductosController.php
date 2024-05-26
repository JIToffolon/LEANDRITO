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
            \Log::info('Nuevo carrito creado. carrito_id: ' . $carrito_id);
        }


        $itemExistente = ProductoCarrito::where('producto_id', $producto_id)
            ->where('carrito_id', $carrito_id)
            ->first();

        if ($itemExistente) {
            $finalPrice = $itemExistente->producto->price * ($itemExistente->quantity + 1);
            $itemExistente->update([
                'quantity' => $itemExistente->quantity + 1,
                'total' => $finalPrice,
            ]);

        } else {
            ProductoCarrito::create([
                'carrito_id' => $carrito_id,
                'producto_id' => $producto_id,
                'tipo_producto_id' => 1,
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
                $final_price = $carritoProducto->producto->price * $request->quantity;
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
        try {
            ProductoCarrito::findOrFail($id)->delete();
            return response()->json(['success' => true]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el producto del carrito'], 500);
        }
    }
}
