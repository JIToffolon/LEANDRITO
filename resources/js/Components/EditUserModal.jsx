import React, { useState, useEffect } from 'react';

const EditUserModal = ({ user, show, onHide, updateUser, roles }) => {
  const [userData, setUserData] = useState(user || {});
  const [selectedRole, setSelectedRole] = useState(user?.role_name || ''); // Valor inicial del rol seleccionado
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        password: '',
      });
      {user.roles && user.roles.length > 0 ? setSelectedRole(user.roles[0].name) : setSelectedRole('');} // Actualiza el rol seleccionado si existe en los datos del usuario
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos actualizados del usuario y el rol seleccionado al servidor
      await updateUser(user.id, { ...userData, role_name: selectedRole });
      setErrors({}); 
      onHide();
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
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
                    <label htmlFor="role">Rol:</label>
                    <select name="role" value={selectedRole} onChange={handleRoleChange} className="rounded border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-400">
                      <option value="">Seleccione un rol</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                    {errors.role_name && <div className="text-red-500">{errors.role_name[0]}</div>}
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
