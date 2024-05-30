import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import { IconMinus } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";

const CartItemCounter = ({ product }) => {
    const { increaseQuantity, decreaseQuantity } = useContext(dataContext);

    return (
        <>
            <div className="flex items-center mt-2">
                <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-black px-2 py-1 rounded-l-lg text-lg font-bold font-serif"
                >
                    <IconMinus size={20}/>
                </button>
                <span className="px-4 text-black">{product.quantity}</span>
                <button
                    onClick={() => increaseQuantity(product.id)}
                    className="bg-black px-2 py-1 rounded-r-lg text-lg font-bold font-serif"
                >
                    <IconPlus size={20}/>
                </button>
            </div>
            
        </>
    );
};

export default CartItemCounter;
