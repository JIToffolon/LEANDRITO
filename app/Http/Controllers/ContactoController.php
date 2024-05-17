<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactoController extends Controller
{
    public function index()
    {
        return Inertia::render('Contacto/Index');
    }
}
