<?php

namespace App\Http\Controllers;

use App\Mail\OrderMail;
use App\Models\Cart;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Webhook;

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
            'shipping_address_collection' => ['allowed_countries' => ['ES','AR','IT','FR']],
            'success_url' => route('checkout.success'),
            'cancel_url' => route('checkout.cancel'),
            'metadata' => ['cart_id' => $cart->id],
        ]);

        return response()->json(['url' => $checkout_session->url]);
    }

    public function success()
    {
        Session::flash('message', 'Purchase made successfully!');
        session()->forget('cart_id');
        return redirect()->route('shop.index');
    }

    public function cancel()
    {
        Session::flash('error_message', 'Canceled Purchase!');
        return redirect()->route('carrito.index');
    }

    public function events(Request $request){
        $stripeSecretKey = env('STRIPE_SECRET');
        $endpointSecret = env('STRIPE_WEBHOOK_SECRET');

        // Configura la clave secreta de Stripe
        $stripe = Stripe::setApiKey($stripeSecretKey);

        // Obtén la carga útil del webhook y la firma de los encabezados
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $endpointSecret);
        } catch (\UnexpectedValueException $e) {
            Log::info('INVALID PAYLOAD'.$e);
            // Payload no válido
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (SignatureVerificationException $e) {
            // Firma no válida
            Log::info('FIRMA NO VALIDA'.$e);
            return response()->json(['error' => 'Invalid signature'], 400);
        }
        switch ($event->type) {
            case 'payment_intent.succeeded':
                $paymentIntent = $event->data->object;
                // Maneja el evento payment_intent.succeeded
                Log::info('PaymentIntent was successful.');
                break;
            case 'charge.succeeded':
                Log::info('LOG charge.succeeded');
                break;
            // Maneja otros tipos de eventos
            case 'checkout.session.completed':
                Log::info($event->data->object);
                try {                
                    $order = new Order();
                    $order->email = $event->data->object->customer_details->email;
                    $order->cart_id = $event->data->object->metadata->cart_id;
                    $order->customer_name = $event->data->object->customer_details->name;
                    $order->customer_address1 =$event->data->object->customer_details->address->line1;
                    $order->customer_address2 = $event->data->object->customer_details->address->line2;
                    $order->customer_postalcode = $event->data->object->customer_details->address->postal_code;
                    $order->customer_city = $event->data->object->customer_details->address->city;
                    $order->customer_state = $event->data->object->customer_details->address->state;
                    $order->customer_country = $event->data->object->customer_details->address->country;
                    $order->total = $event->data->object->amount_total / 100;
                    $order->save();

                    //DATA EMAIL
                    $cart = Cart::with(['cartItems.product', 'cartItems.productType'])->find($event->data->object->metadata->cart_id);
                    if($cart){
                        $cart->status = 'processed';
                        $cart->save();
                        Mail::to($event->data->object->customer_details->email)->send(new OrderMail($cart, $order));
                    }
                } catch (Exception $th) {
                    Log::info($th);
                }
                break;
            default:
                Log::warning('Received unknown event type ' . $event->type);
        }

        return response()->json(['status' => 'success'], 200);
    
    }

}
