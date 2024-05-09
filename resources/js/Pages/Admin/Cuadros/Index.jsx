import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import CuadrosTable from '@/Components/CuadrosTable';
import axios from 'axios'; // Importa axios
import EditCuadroModal from '@/Components/EditCuadroModal';

const CuadrosIndex = ({ auth }) => {
  const { visit, post, put } = usePage(); // Agrega put a los hooks
  const [showModal, setShowModal] = useState(false);
  const [selectedCuadro, setSelectedCuadro] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [cuadros, setCuadros] = useState([]);

  const loadCuadros = async () => {
    try {
      const response = await axios.get(route('cuadros.get'));
      setCuadros(response.data.cuadros); // Actualiza el estado de users usando setUsers
    } catch (error) {
      console.error('Error al cargar la lista de cuadros:', error);
      throw error;
    }
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
  };

  const editCuadro = (cuadro) => {
    setSelectedCuadro(cuadro);
    setShowModal(true);
  };

  const deleteCuadro = async (user) => {
    if (confirm('¿Estás seguro de eliminar este cuadro?')) {
      try {
        await axios.delete(route('cuadros.destroy', { id: cuadro.id }));
        setSuccessMessage('Cuadro eliminado correctamente');
        loadCuadros(); // Recargar la lista de usuarios después de eliminar uno
      } catch (error) {
        console.error('Error al eliminar el Cuadro:', error);
        throw error;
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const updateCuadro = async (id, cuadroData) => {
    try {
      const response = await axios.put(route('cuadros.update', { cuadro: id }), cuadroData);
      setSuccessMessage(response.data.success);
      loadCuadros(); // Recargar la lista de usuarios después de una actualización exitosa
    } catch (error) {
      console.error('Error al actualizar el cuadro:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadCuadros();
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
            <CuadrosTable cuadros={cuadros} editCuadro={editCuadro} deleteCuadro={deleteCuadro} />
          </div>
        </div>
      </div>

      <EditCuadroModal cuadro={selectedCuadro} show={showModal} onHide={handleCloseModal} updateCuadro={updateCuadro} onSuccess={handleSuccess} />
    </AuthenticatedLayout>
  );
};

export default CuadrosIndex;
