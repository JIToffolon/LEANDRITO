import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PedidosTable from '@/Components/PedidosTable';
import ShowPedidoModal from '@/Components/ShowPedidoModal';


const PedidosIndex = ({ auth }) => {
    const [pedidos, setPedidos] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [showModal, setShowPedidoModal] = useState(false);


    const loadPedidos = async () => {
        try {
          const response = await axios.get(route('pedidos.get'));
          setPedidos(response.data.pedidos);
        } catch (error) {
          console.error('Error al cargar la lista de cuadros:', error);
          throw error;
        }
      };

      const handleShowPedido = async (id) => {
        try {
            const response = await axios.get(route('pedidos.show', { id }));
            setSelectedPedido(response.data);
            setShowPedidoModal(true);
        } catch (error) {
            console.error('Error al obtener detalles del pedido:', error);
            throw error;
        }
    };

    const handleCloseViewModal = () => {
        setShowPedidoModal(false);
        setSelectedPedido(null);
    };

    useEffect(() => {
        loadPedidos();
    }, []);
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Listado de Pedidos</h2>}
        >
            <Head title="Listado de Pedidos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <PedidosTable pedidos={pedidos} showPedido={handleShowPedido} />
                    </div>
                </div>
            </div>
            <ShowPedidoModal pedido={selectedPedido} show={showModal} onHide={handleCloseViewModal} />
        </AuthenticatedLayout>
    );
};

export default PedidosIndex;
