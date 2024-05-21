import React, { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

const EditRoleModal = ({ show, onHide, role, permissions, updateRole }) => {
    const initialFormData = role ? {
        id: role.id,
        name: role.name,
        permissions: role.permissions ? role.permissions.map((permission) => permission.id) : [],
    } : {
        id: '',
        name: '',
        permissions: [],
    };

    const { data, setData, put, processing, errors, reset, clearErrors } = useForm(initialFormData);

    useEffect(() => {
        if (role) {
            setData({
                id: role.id,
                name: role.name,
                permissions: role.permissions ? role.permissions.map((permission) => permission.id) : [],
            });
        } else {
            reset(initialFormData);
        }
    }, [role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateRole(data.id, data);
            onHide();
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
        }
    };

    return (
        <Modal show={show} onClose={onHide} title="Editar Rol">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Rol</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 text-white">Permisos:</label>
                    {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center text-white">
                            <input
                                type="checkbox"
                                id={`permission-${permission.id}`}
                                name="permissions"
                                value={permission.id}
                                checked={data.permissions.includes(permission.id)}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (e.target.checked) {
                                        setData('permissions', [...data.permissions, value]);
                                    } else {
                                        setData('permissions', data.permissions.filter((p) => p !== value));
                                    }
                                }}
                                className="mr-2"
                            />
                            <label htmlFor={`permission-${permission.id}`}>{permission.name}</label>
                        </div>
                    ))}
                    {errors.permissions && <div className="text-red-600 text-sm">{errors.permissions}</div>}
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onHide}
                        className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        {processing ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditRoleModal;