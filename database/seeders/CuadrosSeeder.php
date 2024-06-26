<?php

namespace Database\Seeders;

use App\Models\Cuadro;
use App\Models\Producto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CuadrosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listadoCuadros = ['Cuadro1', 'Cuadro2','Cuadro3', 'Cuadro4'];
        foreach($listadoCuadros as $cuadro){
            $modelo = new Producto();
            $modelo->name = $cuadro;
            $modelo->price = random_int(400, 1000);
            $modelo->photo = 'cuadrito.png';
            $modelo->save();
        }
    }
}
