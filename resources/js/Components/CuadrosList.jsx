import React, { useState, useEffect } from "react";
import { Link, usePage} from "@inertiajs/react";
import '../../css/app.css'


export const CuadrosList = ({ cuadros }) => {
    const { props } = usePage(); // Obtén las props de la página
    const { success_message } = props; // Extrae el mensaje de éxito de las props
    const [showMessage, setShowMessage] = useState(success_message); // Estado local para controlar la visibilidad del mensaje
    
    useEffect(() => {
        if (success_message) {
            setShowMessage(success_message); // Muestra el mensaje
            const timer = setTimeout(() => {
                setShowMessage(null); // Elimina el mensaje después de 10 segundos
            }, 10000);
            return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
        }
    }, [success_message]);

    return (
        <div className="bg-gray-300 py-10 px-5">
                     {showMessage && (
                <div className="bg-green-500 text-white p-4 rounded mb-4 text-center relative">
                    {showMessage}
                    <button
                        className="absolute top-1 right-2 text-2xl leading-none"
                        onClick={() => setShowMessage(null)}
                    >
                        &times;
                    </button>
                </div>
            )}
            <h2 className=" font-Rancho mb-10 text-center text-8xl py-5 text-black">
                Paintings
            </h2>
            <div className="grid grid-cols-1 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-Rancho">
                {cuadros.map((cuadro) => (
                    <div key={cuadro.id} className="flex  text-black">
                        <div className="card card-compact w-96 bg-white shadow-xl">
                            <figure>
                                <Link href={`/product/${cuadro.id}`}><img src={`Assets/Images/${cuadro.photo}`} alt="Cuadro" /></Link>
                                
                            </figure>
                            <div className="card-body ">
                                <h2 className="text-center font-bold text-2xl">{cuadro.name}</h2>
                                <div>
                                    {cuadro.details.map(detail => (
                                        <div key={detail.id} className="product-detail">
                                            {/* <p>Tipo: {detail.product_type.name}</p> */}
                                            {/* <p>Precio: ${detail.price}</p> */}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xl py-1 text-center font-rockSalt">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                                <div className="card-actions justify-center py-1">
                                    <Link href={`/product/${cuadro.id}`}>
                                        <button className="bg-black rounded-md py-1 px-2 text-white text-xl">
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