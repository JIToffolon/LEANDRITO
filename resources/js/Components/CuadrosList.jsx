// CuadrosList.jsx

import React from "react";

export const CuadrosList = ({ cuadros }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cuadros.map((cuadro) => (
                <div
                    key={cuadro.id}
                    className="bg-white rounded-lg shadow-md p-4"
                >
                    <img
                        src="/Assets/images/cuadrito.png"
                        alt="Cuadro"
                        className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="p-2 text-center">
                        <h3 className="text-lg font-semibold">{cuadro.name}</h3>
                        <p className="text-gray-600">${cuadro.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
