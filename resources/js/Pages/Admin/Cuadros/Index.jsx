import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import CuadrosTable from '@/Components/CuadrosTable';
import axios from 'axios';
import EditCuadroModal from '@/Components/EditCuadroModal';
import CreateCuadroModal from '@/Components/CreateCuadroModal';

const CuadrosIndex = ({ auth }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCuadro, setSelectedCuadro] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [cuadros, setCuadros] = useState([]);

  const loadCuadros = async () => {
    try {
      const response = await axios.get(route('cuadros.get'));
      setCuadros(response.data.cuadros);
    } catch (error) {
      console.error('Error al cargar la lista de cuadros:', error);
      throw error;
    }
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    loadCuadros(); // Recargar la lista de cuadros después de una acción exitosa
  };

  const editCuadro = (cuadro) => {
    setSelectedCuadro(cuadro);
    setShowEditModal(true);
  };

  const createCuadro = (cuadro) => {
    setShowCreateModal(true)
  };


  const deleteCuadro = async (cuadro) => {
    if (confirm('¿Estás seguro de eliminar este cuadro?')) {
      try {
        await axios.delete(route('cuadros.destroy', { id: cuadro.id }));
        handleSuccess('Cuadro eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar el Cuadro:', error);
        throw error;
      }
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const updateCuadro = async (id, cuadroData) => {
    try {
      const response = await axios.post(route('cuadros.update.post', { cuadro: id }), cuadroData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage(response.data.success);
      loadCuadros(); // Recargar la lista de usuarios después de una actualización exitosa
    } catch (error) {
      console.error('Error al actualizar el cuadro:', error);
      throw error;
    }
  };

  const storeCuadro = async (cuadroData) => {
    try {
      const response = await axios.post(route('cuadros.store'), cuadroData);
      setSuccessMessage(response.data.success);
      loadCuadros();
    } catch (error) {
      console.error('Error al crear el cuadro:', error);
    }
  };
  useEffect(() => {
    loadCuadros();
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
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Listado de cuadros</h2>}
    >
      <Head title="Listado de Cuadros" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {successMessage && (
            <div className="w-full rounded bg-green-600 text-black p-3 text-center">
              {successMessage}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <CuadrosTable cuadros={cuadros} editCuadro={editCuadro} deleteCuadro={deleteCuadro} createCuadro={createCuadro} />
          </div>
        </div>
      </div>

      <EditCuadroModal cuadro={selectedCuadro} show={showEditModal} onHide={handleCloseEditModal} updateCuadro={updateCuadro} onSuccess={handleSuccess} />
      <CreateCuadroModal show={showCreateModal} onHide={handleCloseCreateModal} storeCuadro={storeCuadro} onSuccess={handleSuccess} />
    </AuthenticatedLayout>
  );
};

export default CuadrosIndex;
