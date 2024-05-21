import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const PedidosTable = ({ pedidos }) => {

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: row => row.created_at,
            sortable: true,
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
            </div>
            <DataTable
                columns={columns}
                data={pedidos}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30]}
                noHeader
            />

        </div>
    );
};

export default PedidosTable;