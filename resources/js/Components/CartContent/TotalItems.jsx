import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const TotalItems = () => {
    const { cartItemCount } = useContext(dataContext);
    return (
        
        <div className="p-4">
            <h2 className="text-lg font-bold">Total Items: {cartItemCount}</h2>
        </div>
    );
};

export default TotalItems;
