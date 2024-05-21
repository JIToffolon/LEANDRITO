<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Exceptions\PermissionAlreadyExists;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'users-create',
            'users-read',
            'users-update',
            'users-delete',
            'productos-create',
            'productos-read',
            'productos-update',
            'productos-delete',
            'roles-create',
            'roles-read',
            'roles-update',
            'roles-delete'
        ];

        foreach ($permissions as $permission) {
            try {
                Permission::create(['name' => $permission]);
            } catch (PermissionAlreadyExists $e) {
                echo "Este ya existe: " . $permission . "\r\n";
            }
        }

        Role::create(['name' => 'admin'])
            ->givePermissionTo($permissions);
    }
}
