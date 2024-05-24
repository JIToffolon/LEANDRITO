import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const CartTotal = () => {
    const { cart } = useContext(dataContext);
    const total = cart.reduce((acc, el) => acc + el.producto.price * el.quantity, 0);
    return (
        <div className="container mx-auto">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Carrito de compras
            </h2>
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Total a pagar: ${total}
            </h2>
        </div>
    );
};

export default CartTotal;
