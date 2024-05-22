import React, { useState, useEffect } from 'react';

const EditUserModal = ({ user, show, onHide, updateUser, roles }) => {
  const [userData, setUserData] = useState(user || {});
  const [selectedRole, setSelectedRole] = useState(user?.role_name || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        password: '',
      });
      if (user.roles && user.roles.length > 0) {
        setSelectedRole(user.roles[0].name);
      } else {
        setSelectedRole('');
      }
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box w-96">
              <div className="modal-header flex justify-between items-center">
                <h5 className="font-bold text-lg">Editar Usuario</h5>
                <button type="button" className="btn btn-sm btn-circle" onClick={onHide}>
                  ✕
                </button>
              </div>
              <div className="modal-body mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="name" className="label">
                        <span className="label-text">Nombre:</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="input input-bordered"
                      />
                      {errors.name && <div className="text-red-500 text-sm">{errors.name[0]}</div>}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="email" className="label">
                        <span className="label-text">Email:</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="input input-bordered"
                      />
                      {errors.email && <div className="text-red-500 text-sm">{errors.email[0]}</div>}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="role" className="label">
                        <span className="label-text">Rol:</span>
                      </label>
                      <select
                        name="role"
                        value={selectedRole}
                        onChange={handleRoleChange}
                        className="select select-bordered"
                      >
                        <option value="">Seleccione un rol</option>
                        {roles.map(role => (
                          <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                      </select>
                      {errors.role_name && <div className="text-red-500 text-sm">{errors.role_name[0]}</div>}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="password" className="label">
                        <span className="label-text">Contraseña:</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value=""
                        onChange={handleChange}
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">Guardar Cambios</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUserModal;