import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import CartItemCounter from "./CartItemCounter";

import React from "react";

const CartElements = () => {
    const { cart, setCart } = useContext(dataContext);
    const deleteProduct = (id) => {
        const foundId = cart.find((element) => element.id === id);
        const newCart = cart.filter((element) => {
            return element !== foundId;
        });

        setCart(newCart);
    };
    return cart.map((productoCarrito) => {
        
        const producto= productoCarrito.producto;
        console.log(productoCarrito.producto_id);

        return (
            <div
                className="flex flex-col w-full text-center gap-4 p-10 px-20 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                key={productoCarrito.id}
            >
                <div>
                    
                    <img
                        className="object-cover w-24 h-24"
                        src={`/assets/images/${producto.photo}`}
                        alt="Imagen"
                    />
                </div>
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {producto.name}
                    </p>
                    <CartItemCounter
                        product={producto}
                        quantity={productoCarrito.quantity}
                    />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        ${producto.price * productoCarrito.quantity}
                    </p>
                    <button
                        onClick={() => deleteProduct(productoCarrito.id)}
                        className="bg-gray-500 px-3 py-3 rounded-xl"
                    >
                        ELIMINAR
                    </button>
                </div>
            </div>
        );
    });
};

export default CartElements;
