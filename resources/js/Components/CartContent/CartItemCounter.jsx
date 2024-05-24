import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const CartItemCounter = (productoCarrito) => {
    const { increase,decrease} = useContext(dataContext);
 

    return (
        <>
            <div className="text-white text-center flex flex-row items-center justify-center px-4 py-4 gap-3">
                <button onClick={()=>increase(productoCarrito)}>
                    <p>+</p>
                </button>
                <p>{productoCarrito.quantity}</p>
                <button onClick={()=>decrease(productoCarrito)}>
                    <p>-</p>
                </button>
            </div>
        </>
    );
};

export default CartItemCounter;
