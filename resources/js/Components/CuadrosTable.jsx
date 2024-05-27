import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const CuadrosTable = ({ cuadros, editCuadro, deleteCuadro, createCuadro }) => {
  const [filteredCuadros, setFilteredCuadros] = useState(cuadros);

  useEffect(() => {
    setFilteredCuadros(cuadros);
  }, [cuadros]);

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredData = cuadros.filter((cuadro) =>
      cuadro.name.toLowerCase().includes(keyword)
    );
    setFilteredCuadros(filteredData);
  };

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Tipo',
      selector: row => row.type,
      sortable: true,
    },
    {
      name: 'Precio',
      selector: row => '$' + row.price,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <>
          <button onClick={() => editCuadro(row)} className="rounded px-3 py-1 bg-orange-500 text-white mr-2">Editar</button>
          <button onClick={() => deleteCuadro(row)} className="rounded px-3 py-1 bg-red-500 text-white">Eliminar</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input type="text" placeholder="Buscar cuadros" onChange={handleFilter} className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 mb-4 ml-4 mt-2" />
        <button onClick={createCuadro} className="rounded px-3 py-2 bg-blue-500 text-white mt-2 mr-4 mb-4">Crear Nuevo Cuadro</button>
      </div>
      <DataTable
        columns={columns}
        data={filteredCuadros}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        noHeader
      />
    </div>
  );
};

export default CuadrosTable;
