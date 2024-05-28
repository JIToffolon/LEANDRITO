import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const CartItemCounter = ({ product }) => {
    const { increaseQuantity, decreaseQuantity } = useContext(dataContext);

    return (
        <>
            <div className="flex items-center mt-2">
                <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-gray-300 px-2 py-1 rounded-l-lg"
                >
                    -
                </button>
                <span className="px-4">{product.quantity}</span>
                <button
                    onClick={() => increaseQuantity(product.id)}
                    className="bg-gray-300 px-2 py-1 rounded-r-lg"
                >
                    +
                </button>
            </div>
            {/* <div className="text-white text-center flex flex-row items-center justify-center px-4 py-4 gap-3">
                <button
                    onClick={() => {
                        console.log(
                            `Aumentando la cantidad del producto ${productoCarrito.producto_id}`
                        );
                        increaseQuantity(productoCarrito.id);
                    }}
                >
                    <p>+</p>
                </button>
                <p>{productoCarrito.quantity}</p>
                <button
                    onClick={() =>
                        decreaseQuantity(productoCarrito.id)
                    }
                >
                    <p>-</p>
                </button>
            </div> */}
        </>
    );
};

export default CartItemCounter;
