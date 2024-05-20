
import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('cuadros.store'), formData, {
      onSuccess: () => {
        // Redirige a la lista de cuadros o muestra un mensaje de éxito
        router.visit(route('cuadros.index'));
      },
      onError: (errors) => {
        console.error(errors);
        // Maneja los errores de validación si es necesario
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-5">Crear Nuevo Cuadro</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Precio:</label>
          <input
            type="text"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Crear</button>
      </form>
    </div>
  );
};

export default Create;
