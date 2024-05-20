// CuadrosList.jsx

import React from "react";

export const CuadrosList = ({ cuadros }) => {
    return (
        <div className="bg-gray-400 py-60 px-5">
            <h2 className="text-center py-4">Listado de Cuadros</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cuadros.map((cuadro) => (
                    <div
                        key={cuadro.id}
                        className="bg-gray-300 rounded-lg shadow-md p-4"
                    >
                        <img
                            src={`assets/images/${cuadro.photo}`}
                            alt="Cuadro"
                            className="w-full h-40 object-contain rounded-t-lg hover:scale-125 "
                        />
                        <div className="p-2 text-center">
                            <h3 className="text-lg font-semibold">
                                {cuadro.name}
                            </h3>
                            <p className="text-gray-600">${cuadro.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
