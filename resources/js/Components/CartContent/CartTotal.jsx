import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const CartTotal = () => {
    const { totalCart } = useContext(dataContext);

    return (
        <>
            <div className="p-4">
                <h2 className="text-xl font-rockSalt">Total: ${totalCart}</h2>
            </div>
        </>
    );
};

export default CartTotal;
