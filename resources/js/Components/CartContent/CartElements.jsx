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
    return cart.map((product) => {
        return (
            <div
                className="flex flex-col w-full text-center gap-4 p-10 px-20 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                key={product.id}
            >
                <div>
                    <img
                        className="object-cover w-24 h-24"
                        src={product.img}
                        alt="Imagen"
                    />
                </div>
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {product.name}
                    </p>
                    <CartItemCounter
                        product={product}
                        quanty={product.quanty}
                    />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        ${product.price * product.quanty}
                    </p>
                    <button
                        onClick={() => deleteProduct(product.id)}
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
