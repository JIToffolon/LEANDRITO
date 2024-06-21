<?php

// En app/Http/Controllers/PaymentController.php

namespace App\Http\Controllers;

use App\Models\Cart;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;


class PaymentController extends Controller
{

    public function index(){
        return Inertia::render('Payment/Index');
    }

    public function createCheckoutSession(Request $request)
    {
        $cart_id = session()->get('cart_id', null);
        if (!$cart_id) {
            return response()->json(['error' => 'No existe un carrito en esta sesion'], 400);
        }

        $cart = Cart::find($cart_id);

        if (!$cart || $cart->cartItems->isEmpty()) {
            return response()->json(['error' => 'El carrito está vacío'], 400);
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $lineItems = $cart->cartItems->map(function ($item) {
            return [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $item->product->name . ' (' . $item->productDetail->productType->name . ')',
                    ],
                    'unit_amount' => $item->productDetail->price * 100, // Stripe expects amounts in cents
                ],
                'quantity' => $item->quantity,
            ];
        })->toArray();

        $checkout_session = StripeSession::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('checkout.success'),
            'cancel_url' => route('checkout.cancel'),
            'metadata' => ['cart_id' => $cart->id],
        ]);

        return response()->json(['url' => $checkout_session->url]);
    }

    public function success()
    {
        Session::flash('message', 'Purchase made successfully!');
        return redirect()->route('shop.index');
    }

    public function cancel()
    {
        Session::flash('error_message', 'Canceled Purchase!');
        return redirect()->route('carrito.index');
    }

}
