<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Art & Tattoos - Paintings</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Poppins, Helvetica, "sans-serif";
            background-color: #f2f2f2;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #1d2a35;
            border-radius: 10px;
        }

        .header {
            text-align: center;
            padding: 10px 0;
        }

        .header p {
            font-size: 2.25rem;
            /* text-4xl */
            font-weight: bold;
            /* font-bold */
            color: white;
            /* text-white */
            font-family: 'Caveat', cursive;
            /* font-Caveat */
        }

        .card {
            background-color: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
        }

        .footer p {
            font-weight: bold;
            /* font-bold */
            color: white;
            /* text-white */
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table,
        th,
        td {
            border: 1px solid #ddd;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #1d2a35;
            color: white;
        }

        /* Estilos para dispositivos móviles */
        @media screen and (max-width: 600px) {
            .container {
                padding: 10px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <p class="btn btn-ghost font-bold text-4xl text-white font-Caveat">Art&tattoo's</p>
        </div>
        <div class="card">

            <p> We have the following information registered for shipping. If it is incorrect, please reply to this same email.</p>
            <h2>Purchase ID #: {{$order->id}}</h2>
            <p><b>Address: </b> {{$order->customer_address1}} <b> Postal Code: </b> {{$order->customer_postalcode}}</p>
            <p><b>City: </b> {{$order->customer_city}} <b> State: </b> {{$order->customer_state}} <b>Country: </b> {{$order->customer_country}}</p>
            <hr>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Type</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($cart->cartItems as $item)
                    <tr>
                        <td>{{$item->product->name}}</td>
                        <td>{{$item->productType->name}}</td>
                        <td>{{$item->quantity}}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            <p>Total: ${{$order->total}}</p>
        </div>
        <div class="footer">
        <p> <b> You will receive information about your shipment shortly. It may take 5 to 10 business days.</b></p>
            <p><a href="{{env('APP_URL')}}">{{env('APP_URL')}}</a></p>
        </div>
    </div>
</body>

</html>