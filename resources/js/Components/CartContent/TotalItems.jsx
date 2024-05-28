import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const TotalItems = () => {
    // const {getCartItemCount} = useContext(dataContext);
    const { cartItemCount } = useContext(dataContext);
    return (
        // <span className=' text-xl text-white'>{getCartItemCount}</span>
        <div className="p-4">
            <h2 className="text-lg font-bold">Total Items: {cartItemCount}</h2>
        </div>
    );
};

export default TotalItems;
