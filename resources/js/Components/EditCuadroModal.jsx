import React, { useState, useEffect } from 'react';

const EditCuadroModal = ({ cuadro, show, onHide, updateCuadro }) => {
  const [cuadroData, setCuadroData] = useState(cuadro || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cuadro) {
      setCuadroData({
        name: cuadro.name || '',
        price: cuadro.price || '',
        photo: cuadro.photo || '',
      });
    }
  }, [cuadro]);

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
    try {
      await updateCuadro(cuadro.id, cuadroData);
      setErrors({});
      onHide();
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error al actualizar el cuadro:', error);
      }
    }
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box w-96">
              <div className="modal-header flex justify-between items-center">
                <h5 className="font-bold text-lg">Editar Cuadro</h5>
                <button type="button" className="btn btn-sm btn-circle" onClick={onHide}>
                  ✕
                </button>
              </div>
              <div className="modal-body mt-4">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="name" className="label">
                        <span className="label-text">Nombre:</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={cuadroData.name}
                        onChange={handleChange}
                        className="input input-bordered"
                      />
                      {errors.name && <div className="text-red-500 text-sm">{errors.name[0]}</div>}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="price" className="label">
                        <span className="label-text">Precio:</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={cuadroData.price}
                        onChange={handleChange}
                        className="input input-bordered"
                      />
                      {errors.price && <div className="text-red-500 text-sm">{errors.price[0]}</div>}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="photo" className="label">
                        <span className="label-text">Foto:</span>
                      </label>
                      <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                      />
                      {errors.photo && <div className="text-red-500 text-sm">{errors.photo[0]}</div>}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary self-center mt-4">Guardar Cambios</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCuadroModal;
