<?php

use App\Http\Controllers\CarritoController;
use App\Http\Controllers\CarritoProductosController;
use App\Models\Cuadro;
use App\Http\Controllers\CuadrosController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\PedidosController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Models\Producto;
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

        Route::resource('roles', RoleController::class);
        Route::get('/api/roles', [RoleController::class, 'getRoles'])->name('roles.get');
        Route::get('/api/permissions', [RoleController::class, 'getPermissions'])->name('permissions.get');

        Route::get('/pedidos', [PedidosController::class, 'index'])->name('pedidos.index');

    });


    Route::get('/cuadros', [CuadrosController::class, 'shop'])->name('shop.index');
    Route::get('/contacto', [ContactoController::class, 'index'])->name('Contacto.index');

    /* RUTAS PARA EL MANEJO DEL CARRITO.  LEER EL ARCHIVO README*/
    Route::get('carrito', [CarritoController::class, 'index'])->name('carrito.index');
    Route::get('carritoJson', [CarritoController::class, 'getCarrito'])->name('carrito.get');
    Route::put('cartitem/{id}/updateqty', [CarritoProductosController::class, 'updateQuantity'])->name('producto.updateQuantity');
    Route::post('add-to-cart/{producto_id}', [CarritoProductosController::class, 'addToCart'])->name('producto.addToCart'); 
    Route::delete('deleteproduct/{id}', [CarritoProductosController::class, 'destroy'])->name('producto.deleteInCart');
    Route::get('cartItemsCount', [CarritoProductosController::class, 'countItemsInCart'])->name('carrito.itemsCount');

    Route::get('/product/{id}', function ($id) {
        $cuadros = Producto::all();
        return Inertia::render('Product/Index', ['cuadros' => $cuadros, 'id' => $id]);
    });
});

require __DIR__.'/auth.php';
