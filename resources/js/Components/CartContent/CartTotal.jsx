import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const CartTotal = () => {
    const { cart } = useContext(dataContext);
    const total = cart.reduce((acc, item) => acc + item.total, 0);
    return (
        <>
            <div className="p-4">
                <h2 className="text-xl font-rockSalt">Total: ${total}</h2>
            </div>
        </>
    );
};

export default CartTotal;
