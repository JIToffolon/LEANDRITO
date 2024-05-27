<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CuadrosController extends Controller
{

    public function index()
    { //dd( Product::with('details.productType')->get());
        return Inertia::render('Admin/Cuadros/Index', [
            'cuadros' => Product::with('details.productType')->get()
        ]);
    }

    public function getCuadros()
    {
        $products = Product::with('details.productType')->get();

        $transformedProducts = $products->flatMap(function ($product) {
            return $product->details->map(function ($detail) use ($product) {
                return [
                    'detail_id' => $detail->id,
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'type' => $detail->productType->name,
                    'price' => $detail->price,
                ];
            });
        });

        return response()->json(['cuadros' => $transformedProducts]);
    }

    public function shop()
    {
        return Inertia::render('Cuadros/Index', [
            'cuadros' => Product::with('details.productType')->get()
        ]);
    }

    public function getProductTypes()
    {
        $product_types = ProductType::all();
        return response()->json(['product_types' => $product_types]);
    }


    public function store(Request $request)
    {
        // Validación
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric',
            'photo' => 'nullable|image|max:2048', // Validar que el archivo sea una imagen y no supere los 2MB
            'product_type_id' => 'required',
        ]);

        DB::beginTransaction();

        try {
            // Manejo de la foto
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $originalName = $photo->getClientOriginalName();
                $photo->storeAs('assets/images', $originalName, 'public');
            } else {
                $originalName = 'cuadrito.png';
            }

            // BUSCO ALGUN PRODUCTO YA CREADO CON EL MISMO NOMBRE
            $product = Product::where('name', $request->name)->first();

            if (!$product) {
                // CREO EL PRODUCTO NUEVO
                $product = new Product();
                $product->name = $request->name;
                $product->description = $request->description;
                $product->photo = $originalName;
                $product->save();
                // CREO SUS DETALLES
                $productDetail = new ProductDetail();
                $productDetail->product_id = $product->id;
                $productDetail->product_type_id = $request->product_type_id;
                $productDetail->price = $request->price;
                $productDetail->save();
            } else {
                // YA EXISTE UN CUADRO SIMILAR
                // BUSCO SI YA EXISTEN DETALLES PARA EL MISMO PRODUCTO
                $productDetailExist = ProductDetail::where('product_id', $product->id)
                    ->where('product_type_id', $request->product_type_id)
                    ->first();

                if ($productDetailExist) {  // SI EXISTEN LANZO ERROR
                    return response()->json(['error' => 'Ya existe un cuadro con esas características!'], 400);
                } else {  // DE LO CONTRARIO LE CREO DETALLES NUEVOS A ESTE PRODUCTO YA EXISTENTE
                    $productDetail = new ProductDetail();
                    $productDetail->product_id = $product->id;
                    $productDetail->product_type_id = $request->product_type_id;
                    $productDetail->price = $request->price;
                    $productDetail->save();
                }
            }

            DB::commit();

            return response()->json(['success' => 'Cuadro creado correctamente!'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al crear el cuadro: ' . $e->getMessage()], 500);
        }
    }


    public function update2($id, Request $request)
    {
        // Encuentra el usuario por su ID
        $cuadro = Product::findOrFail($id);
        // Valida los datos del formulario

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'detailPrice' => 'required|numeric',
        ]);

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $originalName = $photo->getClientOriginalName();
            $photo->storeAs('assets/images', $originalName, 'public');
            $cuadro->photo = $originalName;
        }

        $cuadro->name = $request->name;
        $cuadro->description = $request->description;
        $cuadro->save();


        if ($request->detail_id) {
            $cuadroDetail = ProductDetail::findOrFail($request->detail_id);
            $cuadroDetail->price = $request->detailPrice;
            $cuadroDetail->save();
        }

        // Redirecciona con un mensaje de éxito
        return response()->json(['success' => 'Cuadro actualizado correctamente!']);
    }

    public function destroy($detail_id)
    {
        // Encontrar el detalle del producto por ID
        $cuadroDetails = ProductDetail::find($detail_id);

        if ($cuadroDetails) {
            $cuadro_id = $cuadroDetails->product_id;
            // Eliminar el detalle del producto
            $cuadroDetails->delete();

            // Encontrar el producto asociado
            $cuadro = Product::find($cuadro_id);

            // Verificar si el producto no tiene más detalles asociados
            if ($cuadro->details()->count() === 0) {
                // Eliminar el producto si no tiene más detalles
                $cuadro->delete();
                return response()->json(['success' => 'Cuadro y todos sus detalles eliminados correctamente!']);
            }

            // Retornar mensaje de éxito si solo se eliminó el detalle
            return response()->json(['success' => 'Se ha eliminado una variante del cuadro!']);
        }
    }
}
