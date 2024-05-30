<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TattooController extends Controller
{
    public function index()
    {
        return Inertia::render('Tattoo/Index');
    }
}
