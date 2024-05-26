import React, { useContext,useEffect } from "react";
import { dataContext } from "../Context/DataContext";
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";
import TotalItems from "./TotalItems";

const CartContent = () => {
    const {cart} = useContext(dataContext);
    
    return cart.length > 0 ? (

    <>
            <div className="grid grid-cols-1 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <CartElements />
            </div>
            <div>
                <button
                
                    className="bg-gray-500 rounded-xl px-3 py-2"
                >
                    Vaciar Carrito
                </button>
            </div>
            <div className="bg-gray-500 text-center">
               <CartTotal />
            </div>

        </>
     ) : (
        <div className="text-center">
            <h2 className=" font-white text-2xl h-screen">
            Your cart is empty
            </h2>
        </div>
     );
};

export default CartContent;
