import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const UsersTable = ({ users, editUser, deleteUser }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)
    );
    setFilteredUsers(filteredData);
  };
  const createUser = () => {
    visit(route('users.create'));
  };


  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <>
          <button onClick={() => editUser(row)} className="rounded px-3 py-1 bg-orange-500 text-white mr-2">Editar</button>
          <button onClick={() => deleteUser(row)} className="rounded px-3 py-1 bg-red-500 text-white">Eliminar</button>

        </>
      ),
    },
  ];

  return (
    <div>
       <div className="flex justify-between items-center mb-4">
      <input type="text" placeholder="Buscar usuarios" onChange={handleFilter} className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 mb-4 ml-4 mt-2" />
      <button onClick={createUser} className="rounded px-3 py-2 bg-blue-500 text-white mt-2 mr-4 mb-4">Crear Nuevo Usuario</button>
      </div>
      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        noHeader
      />

    </div>
  );
};

export default UsersTable;