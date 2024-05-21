<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(){

        return Inertia::render('Admin/Roles/Index');
    }

    public function getRoles()
    {
        $roles = Role::with('permissions')->get();
        return response()->json(['roles' => $roles]);
    }

    public function getPermissions()
    {
        $permissions = Permission::all();
        return response()->json(['permissions' => $permissions]);
    }

    public function store(Request $request) {
        $request->validate([
          'name' => 'required|unique:roles,name',
          'permissions' => '',
        ]);
    
        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions);
    
        return response()->json(['success' => 'Rol creado correctamente!']);
      }
    
      public function update(Request $request, $id) {
        $request->validate([
          'name' => 'required',
          'permissions' => 'required',
        ]);
    
        $role = Role::find($id);
        $role->name = $request->name;
        $role->save();
    
        $role->syncPermissions($request->permissions);
    
    
        return response()->json(['success' => 'Rol actualizado correctamente!']);
      }
    
      public function destroy($id) 
      {
        DB::table("roles")->where('id',$id)->delete();
        return response()->json(['success' => 'Rol eliminado correctamente!']);
      }
}
