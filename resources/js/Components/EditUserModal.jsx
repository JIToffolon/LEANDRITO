import React, { useState, useEffect } from 'react';

const EditUserModal = ({ user, show, onHide, updateUser}) => {
  const [userData, setUserData] = useState(user || {});
  const [errors, setErrors] = useState({});
  useEffect(() => {
    // Verifica si el usuario existe y no es null
    if (user) {
      // Si el usuario existe, actualiza el estado userData con los datos del usuario
      setUserData({
        name: user.name || '',
        email: user.email || '',
        password: '', // Aquí puedes definir el valor predeterminado para la contraseña si lo deseas
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos actualizados del usuario al servidor
      await updateUser(user.id, userData);
      setErrors({}); 
      // Cierra el modal después de recibir una respuesta exitosa
      onHide();

    } catch (error) {
      if (error.response) {
        // Si el backend devuelve errores de validación
        setErrors(error.response.data.errors); // Establece los errores para mostrar en el formulario
        setSuccessMessage(''); // Borra el mensaje de éxito si hubo
      } else {
        // Maneja otros tipos de errores aquí
        console.error('Error al actualizar el usuario:', error);
      }
    }
  };

  return (
    <>
    {show && (
      <div className="overlay" onClick={onHide}></div>
    )}
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog w-96">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
            <button type="button" className="close" onClick={onHide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="name">Nombre:</label>
                  <input type="text" name="name" value={userData?.name} onChange={handleChange} className="rounded border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-400" />
                  {errors.name && <div className="text-red-500">{errors.name[0]}</div>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" value={userData?.email} onChange={handleChange} className="rounded border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-400" />
                  {errors.email && <div className="text-red-500">{errors.email[0]}</div>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Contraseña:</label>
                  <input type="password" name="password" value="" onChange={handleChange} className="rounded border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-400" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary self-center mt-4">Guardar Cambios</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default EditUserModal;
