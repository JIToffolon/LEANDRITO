<?php

use App\Http\Controllers\CuadrosController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Cuadro;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
        Route::resource('users', UserController::class);
        Route::get('/api/users', [UserController::class, 'getUsers'])->name('users.get');

        Route::resource('cuadros', CuadrosController::class);
        Route::get('/api/cuadros', [CuadrosController::class, 'getCuadros'])->name('cuadros.get');

    });


    Route::get('/cuadros', [CuadrosController::class, 'shop'])->name('shop.index');
    Route::get('/contacto', [ContactoController::class, 'index'])->name('Contacto.index');
});

require __DIR__.'/auth.php';
