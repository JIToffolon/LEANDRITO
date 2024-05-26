import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const CartItemCounter = ({productoCarrito}) => {
    const { increaseQuantity, decreaseQuantity } = useContext(dataContext);

    return (
        <>
            <div className="text-white text-center flex flex-row items-center justify-center px-4 py-4 gap-3">
                <button
                    onClick={() => {
                        console.log(
                            `Aumentando la cantidad del producto ${productoCarrito.producto_id}`
                        );
                        increaseQuantity(productoCarrito.producto_id);
                    }}
                >
                    <p>+</p>
                </button>
                <p>{productoCarrito.quantity}</p>
                <button
                    onClick={() =>
                        decreaseQuantity(productoCarrito.producto_id)
                    }
                >
                    <p>-</p>
                </button>
            </div>
        </>
    );
};

export default CartItemCounter;
