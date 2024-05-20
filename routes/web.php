<?php

use App\Http\Controllers\CarritoController;
use App\Http\Controllers\CarritoProductosController;
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
        Route::post('/cuadros/update/{cuadro}', [CuadrosController::class, 'update2'])->name('cuadros.update.post');
        Route::get('/api/cuadros', [CuadrosController::class, 'getCuadros'])->name('cuadros.get');

    });


    Route::get('/cuadros', [CuadrosController::class, 'shop'])->name('shop.index');
    Route::get('/contacto', [ContactoController::class, 'index'])->name('Contacto.index');

    /* RUTAS PARA EL MANEJO DEL CARRITO.  LEER EL ARCHIVO README*/
    Route::get('carrito', [CarritoController::class, 'index'])->name('carrito.index');
    Route::get('carritoJson', [CarritoController::class, 'getCarrito'])->name('carrito.get');
    Route::put('cartitem/{id}/updateqty', [CarritoProductosController::class, 'updateQuantity'])->name('product.updateQuantity');
    Route::post('add-to-cart/{producto_id}', [CarritoProductosController::class, 'addToCart'])->name('producto.addToCart'); 
    Route::delete('deleteproduct/{id}', [CarritoProductosController::class, 'destroy'])->name('product.deleteInCart');
    Route::get('cartItemsCount', [CarritoProductosController::class, 'countItemsInCart'])->name('cart.itemsCount');


});

require __DIR__.'/auth.php';
