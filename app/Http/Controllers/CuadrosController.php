<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CuadrosController extends Controller
{

    public function index(){
        return Inertia::render('Admin/Cuadros/Index', [
            'cuadros' => Producto::where('tipo_producto_id',1)->get()
        ]);
    }

    public function getCuadros(Request $request)
    {
        $cuadros = Producto::where('tipo_producto_id', 1)->get();
        return response()->json(['cuadros' => $cuadros]);
    }

    public function shop()
    {
        return Inertia::render('Cuadros/Index', [
            'cuadros' => Producto::where('tipo_producto_id', 1)->get()
        ]);
    }


    public function update($id, Request $request)
    {
        // Encuentra el usuario por su ID
        $cuadro = Producto::findOrFail($id);

        // Valida los datos del formulario
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric'
        ]);

        // Actualiza los datos del usuario
        $cuadro->update($validatedData);

        // Redirecciona con un mensaje de éxito
        return response()->json(['success' => 'Cuadro actualizado correctamente!']);
    }

    public function destroy($id){
        $cuadro = Producto::findOrFail($id);
        $cuadro->delete();
        return response()->json(['success' => 'Cuadro Eliminado correctamente!']);
    }
}
