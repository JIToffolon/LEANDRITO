<?php

namespace App\Http\Controllers;

use App\Models\Cuadro;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactoController extends Controller
{
    public function index()
    {
        return Inertia::render('Contacto/Index', [
            'cuadros' => Cuadro::all()
        ]);
    }
}
