<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {

        $roles = Role::all();
        $users = User::with('roles')->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function getUsers(Request $request)
    {
        $users = User::with('roles')->get();
        return response()->json(['users' => $users]);
    }

    public function update($id, Request $request)
    {
        // Encuentra el usuario por su ID
        $user = User::findOrFail($id);

        // Valida los datos del formulario
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
        ]);

        // Actualiza los datos del usuario
        $user->update($validatedData);

        // Redirecciona con un mensaje de éxito
        return response()->json(['success' => '¡Usuario actualizado correctamente!']);
    }

    public function destroy($id){
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['success' => '¡Usuario Eliminado correctamente!']);
    }
}
