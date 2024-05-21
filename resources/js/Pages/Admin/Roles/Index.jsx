import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import EditRoleModal from '@/Components/EditRoleModal';
import CreateRoleModal from '@/Components/CreateRoleModal';

const Index = ({ auth }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);

    const loadRoles = async () => {
        try {
            const response = await axios.get(route('roles.get'));
            setRoles(response.data.roles);
        } catch (error) {
            console.error('Error al cargar los roles:', error);
        }
    };

    const loadPermissions = async () => {
        try {
            const response = await axios.get(route('permissions.get'));
            setPermissions(response.data.permissions);
        } catch (error) {
            console.error('Error al cargar los permisos:', error);
        }
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        loadRoles(); // Recargar la lista de roles después de una acción exitosa
    };

    const editRole = (role) => {
        setSelectedRole(role);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };
    const updateRole = async (id, data) => {
        try {
            const response = await axios.put(route('roles.update', id), data)
            setSuccessMessage(response.data.success);
            loadRoles();
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
            throw error;
        }
    };

    const storeRole = async (data) => {
        try {
            const response = await axios.post(route('roles.store'), data)
            setSuccessMessage(response.data.success);
            loadRoles();
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
            throw error;
        }
    };

    const createRole = () => {
        setShowCreateModal(true);
    };

    const deleteRole = async (role) => {
        if (confirm('¿Estás seguro de eliminar este rol?')) {
            try {
                await axios.delete(route('roles.destroy', { id: role.id }));
                handleSuccess('Rol eliminado correctamente');
            } catch (error) {
                console.error('Error al eliminar el rol:', error);
            }
        }
    };

    useEffect(() => {
        loadRoles();
        loadPermissions();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [successMessage]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Listado de Roles</h2>}
        >
            <Head title="Listado de Roles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {successMessage && (
                        <div className="w-full rounded bg-green-600 text-black p-3 text-center">
                            {successMessage}
                        </div>
                    )}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={createRole}
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Nuevo Rol
                        </button>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Nombre del Rol</th>
                                    <th scope="col" className="px-6 py-3">Permisos</th>
                                    <th scope="col" className="px-6 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => (
                                    <tr key={role.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{role.name}</td>
                                        <td className="px-6 py-4">
                                            {role.permissions && role.permissions.length > 0 ? role.permissions.map(permission => permission.name).join(', ') : 'Sin permisos'}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => editRole(role)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => deleteRole(role)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <EditRoleModal role={selectedRole} show={showEditModal} onHide={handleCloseEditModal} permissions={permissions} updateRole={updateRole} />
            <CreateRoleModal show={showCreateModal} onHide={handleCloseCreateModal} storeRole={storeRole} />
        </AuthenticatedLayout>
    );
};

export default Index;
