<?php

namespace App\Http\Controllers;

use App\Models\Cuadro;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        return Inertia::render('Cart/Index', [
            'cuadros' => Cuadro::all()
        ]);
    }
}
