import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const CreateCuadroModal = ({ show, onHide, storeCuadro }) => {
    const [cuadroData, setCuadroData] = useState({
        name: '',
        price: '',
        photo: null
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCuadroData({
            ...cuadroData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setCuadroData({
            ...cuadroData,
            photo: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', cuadroData.name);
        formData.append('price', cuadroData.price);
        if (cuadroData.photo) {
            formData.append('photo', cuadroData.photo);
        }

        try {
            await storeCuadro(formData);
            setErrors({});
            onHide();
        } catch (error) {
            if (error.response) {
                // Si el backend devuelve errores de validación
                setErrors(error.response.data.errors); // Establece los errores para mostrar en el formulario
            } else {
                // Maneja otros tipos de errores aquí
                console.error('Error al crear el cuadro:', error);
            }
        }
    };

    return (
        <>
            {show && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h2 className="text-xl mb-4">Crear Nuevo Cuadro</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={cuadroData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio:</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={cuadroData.price}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Foto:</label>
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.photo && <div className="text-red-500 text-sm">{errors.photo}</div>}
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={onHide} className="mr-4 px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Crear</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateCuadroModal;
