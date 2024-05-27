<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartItemsController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_type_id' => 'required|exists:product_types,id',
        ]);
    
        $productDetail = ProductDetail::where('product_id', $request->product_id)
            ->where('product_type_id', $request->product_type_id)
            ->first();
    
        if (!$productDetail) {
            return response()->json(['error' => 'Product type invalido'], 400);
        }
    
        $cart_id = session()->get('cart_id');
        if (!$cart_id) {
            $cart = Cart::create([
                'status' => 'pending'
            ]);
            $cart_id = $cart->id;
            session()->put('cart_id', $cart_id);
        }
    
        DB::beginTransaction();
    
        try {
            $itemExists = CartItem::where('product_id', $request->product_id)
                ->where('product_type_id', $request->product_type_id)
                ->where('cart_id', $cart_id)
                ->first();
    
            if ($itemExists) {
                $itemExists->update([
                    'quantity' => $itemExists->quantity + 1,
                    'total' => ($itemExists->quantity + 1) * $productDetail->price,
                ]);
            } else {
                CartItem::create([
                    'cart_id' => $cart_id,
                    'product_id' => $request->product_id,
                    'product_type_id' => $request->product_type_id,
                    'quantity' => 1,
                    'total' => $productDetail->price
                ]);
            }
    
            DB::commit();
            return response()->json(['message' => 'Producto agregado al carrito correctamente']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Ocurrió un error al agregar el producto al carrito'], 500);
        }
    }

    public function updateQuantity(Request $request, $id){

        $request->validate([
            'quantity' => 'required|integer|min:1', // Asegúrate de que la cantidad sea un entero positivo
        ]);

        $cartItem = CartItem::find($id);

        if (!$cartItem) {
            return response()->json(['message' => 'Item no encontrado'], 404);
        }

        $productDetail = ProductDetail::where('product_id', $cartItem->product_id)
            ->where('product_type_id', $cartItem->product_type_id)
            ->first();

        if (!$productDetail) {
            return response()->json(['message' => 'Detalle del producto no encontrado'], 404);
        }
        
        DB::beginTransaction();

        try {
            $final_price = $productDetail->price * $request->quantity;
            $cartItem->quantity = $request->quantity;
            $cartItem->total = $final_price;
            $cartItem->save();
    
            DB::commit();
    
            return response()->json(['message' => 'Cantidad actualizada correctamente'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al modificar cantidad', 'error' => $e->getMessage()], 500);
        }
    }


    public function countItemsInCart()
    {

        $cartCount = 0;
        $cart_id = session()->get('cart_id', null);

        if ($cart_id) {
            $cartCount = CartItem::where('cart_id', $cart_id)->sum('quantity');
        }

        return $cartCount;
    }

    public function destroy(string $id)
    {
        CartItem::find($id)->delete();

        return response()->json(['success' => true]);
    }
}
