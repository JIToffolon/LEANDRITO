<?php

namespace App\Http\Controllers;

use App\Models\Cuadro;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CuadrosController extends Controller
{
    public function index()
    {
        return Inertia::render('Cuadros/Index', [
            'cuadros' => Cuadro::all()
        ]);
    }
}
