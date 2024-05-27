import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCuadroModal = ({ show, onHide, storeCuadro }) => {
    const [cuadroData, setCuadroData] = useState({
        name: '',
        description: '',
        photo: null,
        product_type_id: '',
        price: '',
    });

    const [errors, setErrors] = useState({});
    const [productTypes, setProductTypes] = useState([]);

    const loadProductTypes = async () => {
        try {
            const response = await axios.get(route('types.get')); // Ajusta la ruta según tu API
            setProductTypes(response.data.product_types);
        } catch (error) {
            console.error('Error al cargar los tipos de productos:', error);
        }
    };

    useEffect(() => {
        // Load product types

        loadProductTypes();
    }, []);

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
        formData.append('description', cuadroData.description);
        formData.append('product_type_id', cuadroData.product_type_id);
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
                setErrors(error.response.data.errors);
            } else {
                console.error('Error al crear el cuadro:', error);
            }
        }
    };

    return (
        <>
            {show && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="modal modal-open">
                        <div className="modal-box w-11/12 max-w-3xl">
                            <div className="modal-header flex justify-between items-center">
                                <h2 className="font-bold text-xl">Crear Nuevo Producto</h2>
                                <button type="button" className="btn btn-sm btn-circle" onClick={onHide}>✕</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-white">Nombre:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={cuadroData.name}
                                        onChange={handleChange}
                                        className="mt-1 input input-bordered w-full"
                                    />
                                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-white">Descripción:</label>
                                    <textarea
                                        name="description"
                                        value={cuadroData.description}
                                        onChange={handleChange}
                                        className="mt-1 textarea textarea-bordered w-full"
                                    />
                                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="photo" className="block text-sm font-medium text-white">Foto:</label>
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={handleFileChange}
                                        className="mt-1 file-input file-input-bordered w-full"
                                    />
                                    {errors.photo && <div className="text-red-500 text-sm">{errors.photo}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="product_type_id" className="block text-sm font-medium text-white">Tipo de Producto:</label>
                                    <select
                                        name="product_type_id"
                                        value={cuadroData.product_type_id}
                                        onChange={handleChange}
                                        className="mt-1 select select-bordered w-full"
                                    >
                                        <option value="">Seleccionar Tipo</option>
                                        {productTypes.map((type) => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                    </select>
                                    {errors.product_type_id && <div className="text-red-500 text-sm">{errors.product_type_id}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="block text-sm font-medium text-white">Precio:</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={cuadroData.price}
                                        onChange={handleChange}
                                        className="mt-1 input input-bordered w-full"
                                    />
                                    {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                                </div>
                                <div className="modal-action">
                                    <button type="button" onClick={onHide} className="btn btn-ghost">Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Crear</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateCuadroModal;
