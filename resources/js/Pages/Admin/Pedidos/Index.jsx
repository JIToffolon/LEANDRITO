import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PedidosTable from '@/Components/PedidosTable';


const PedidosIndex = ({ auth, pedidos }) => {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Listado de Pedidos</h2>}
        >
            <Head title="Listado de Pedidos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <PedidosTable pedidos={pedidos} />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
};

export default PedidosIndex;
