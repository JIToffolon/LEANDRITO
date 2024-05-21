// CuadrosList.jsx
import React from "react";
import { Link } from "@inertiajs/react";

export const CuadrosList = ({ cuadros }) => {
    return (
        <div className="bg-gray-400 py-40 px-5">
            <h2 className=" font-normal mb-10 text-center text-4xl font-[Poppins] text-black">
                Paintings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cuadros.map((cuadro) => (
                    <div key={cuadro.id} className="flex  text-black">
                        <div className="card card-compact w-96 bg-white shadow-xl">
                            <figure>
                                <img src={`Assets/Images/${cuadro.photo}`} alt="Cuadro" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{cuadro.name}</h2>
                                <p> $ {cuadro.price}</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                                <div className="card-actions justify-end">
                                    <Link href={`/product/${cuadro.id}`}>
                                        <button className=" bg-gray-700 rounded-md py-2 px-3 text-white">
                                            More Info
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
