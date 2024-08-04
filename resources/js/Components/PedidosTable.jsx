import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';


const PedidosTable = ({ pedidos, showPedido }) => {

    const [filteredPedidos, setFilteredPedidos] = useState(pedidos);

    useEffect(() => {
        setFilteredPedidos(pedidos);
    }, [pedidos]);

    const handleFilter = (e) => {
        const keyword = e.target.value.toLowerCase();
        const filteredData = pedidos.filter((pedido) =>
            pedido.email.toLowerCase().includes(keyword)
        );
        setFilteredPedidos(filteredData);
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const formattedDate = new Date(dateString).toLocaleString('sv-SE', options);
        return formattedDate.replace(',', '').replace(/\//g, '-');
    };
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: "60px"
     
        },
        {
            name: 'Name',
            selector: row => row.customer_name,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.customer_address1 + ' ('+row.customer_postalcode+')',
            sortable: true,
            width: "170px"
        },
        {
            name: 'City',
            selector: row => row.customer_city,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Region',
            selector: row => row.customer_state + ' ('+row.customer_country+')',
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Total (EUR)',
            selector: row => row.total,
            sortable: true,
            width: "120px"
        },
        {
            name: 'Fecha',
            selector: row => formatDate(row.created_at),
            sortable: true,
            width: "170px"
        },
        {
            name: 'Acciones',
            cell: row => (
                <>
                    <button onClick={() => showPedido(row.id)} className="rounded px-3 py-1 bg-orange-500 text-white mr-2">Ver Pedido</button>
                </>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <input type="text" placeholder="Buscar pedido" onChange={handleFilter} className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 mb-4 ml-4 mt-2" />
            </div>
            <DataTable
                columns={columns}
                data={filteredPedidos}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30]}
                noHeader
            />
        </div>
    );
};

export default PedidosTable;