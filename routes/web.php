<?php
use App\Models\Cuadro;
use App\Http\Controllers\CuadrosController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
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
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('users', UserController::class);
    Route::get('/api/users', [UserController::class, 'getUsers'])->name('users.get');

    Route::get('/cuadros', [CuadrosController::class, 'index'])->name('cuadros.index');
    Route::get('/contacto', [ContactoController::class, 'index'])->name('Contacto.index');
    Route::get('/cart', [CartController::class, 'index'])->name('Cart.index');
    Route::get('/product/{id}', function ($id) {
        $cuadros = Cuadro::all();
        return Inertia::render('Product/Index', ['cuadros' => $cuadros, 'id' => $id]);
    });
});

require __DIR__.'/auth.php';
