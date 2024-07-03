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
            <p class="btn btn-ghost font-bold text-4xl text-white font-Caveat">Art&tattoo's Customer contact</p>
        </div>
        <div class="card">

            <p><b>Name:</b> {{$email->name}}</p>
            <p><b>Last Name:</b> {{$email->last_name}}</p>
            <p><b>Email:</b> {{$email->email}}</p>
            <p><b>Message:</b> {{$email->message}}</p>
            <hr>
            <p>You can watch this email in the web platform too :)</p>
        </div>
        <div class="footer">
            <p><a href="{{env('APP_URL')}}">{{env('APP_URL')}}</a></p>
        </div>
    </div>
</body>

</html>