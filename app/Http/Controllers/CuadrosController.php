<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Nette\Utils\Image;

class CuadrosController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Cuadros/Index', [
            'cuadros' => Producto::where('tipo_producto_id', 1)->get()
        ]);
    }

    public function getCuadros()
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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'photo' => 'nullable|image|max:2048', // Validar que el archivo sea una imagen y no supere los 2MB
        ]);

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $originalName = $photo->getClientOriginalName();
            $photo->storeAs('assets/images', $originalName, 'public');
        } else {
            $originalName = 'cuadrito.png';
        }

        Producto::create([
            'name' => $request->name,
            'price' => $request->price,
            'photo' => $originalName,
            'tipo_producto_id' => 1, //PRODUCTO CUADRO
        ]);

        return response()->json(['success' => 'Cuadro creado correctamente!']);
    }


    public function update2($id, Request $request)
    {
        // Encuentra el usuario por su ID
        $cuadro = Producto::findOrFail($id);
        // Valida los datos del formulario

        //$request->photo is empty
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
        ]);
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $originalName = $photo->getClientOriginalName();
            $photo->storeAs('assets/images', $originalName, 'public');
            $validatedData['photo'] = $originalName;
        }

        // Actualiza los datos del usuario
        $cuadro->update($validatedData);

        // Redirecciona con un mensaje de éxito
        return response()->json(['success' => 'Cuadro actualizado correctamente!']);
    }

    public function destroy($id)
    {
        $cuadro = Producto::findOrFail($id);
        $cuadro->delete();
        return response()->json(['success' => 'Cuadro Eliminado correctamente!']);
    }
}
