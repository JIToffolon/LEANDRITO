import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import EditUserModal from '@/Components/EditUserModal';
import UsersTable from '@/Components/UsersTable';
import axios from 'axios'; // Importa axios

const UsersIndex = ({ auth }) => {
  const { visit, post, put } = usePage(); // Agrega put a los hooks
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await axios.get(route('users.get'));
      setUsers(response.data.users); // Actualiza el estado de users usando setUsers
    } catch (error) {
      console.error('Error al cargar la lista de usuarios:', error);
      throw error;
    }
  };

  const loadRoles = async () => {
    try {
      const response = await axios.get(route('roles.get'));
      setRoles(response.data.roles); // Actualiza el estado de users usando setUsers
    } catch (error) {
      console.error('Error al cargar la lista de roles:', error);
      throw error;
    }
  }

  const handleSuccess = (message) => {
    setSuccessMessage(message);
  };

  const editUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const deleteUser = async (user) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await axios.delete(route('users.destroy', { id: user.id }));
        setSuccessMessage('Usuario eliminado correctamente');
        loadUsers(); // Recargar la lista de usuarios después de eliminar uno
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const updateUser = async (id, userData) => {
    try {
      const response = await axios.put(route('users.update', { user: id }), userData);
      setSuccessMessage(response.data.success);
      loadUsers(); // Recargar la lista de usuarios después de una actualización exitosa
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []); // Se ejecuta solo una vez al cargar el componente

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Listado de usuarios</h2>}
    >
      <Head title="Listado de Usuarios" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {successMessage && (
            <div className="w-full rounded bg-green-600 text-black p-3 text-center">
              {successMessage}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <UsersTable users={users} editUser={editUser} deleteUser={deleteUser} />
          </div>
        </div>
      </div>

      <EditUserModal user={selectedUser} show={showModal} onHide={handleCloseModal} updateUser={updateUser} onSuccess={handleSuccess} roles={roles} />
    </AuthenticatedLayout>
  );
};

export default UsersIndex;
