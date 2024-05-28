import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import CartItemCounter from "./CartItemCounter";

import React from "react";

const CartElements = () => {
    const { cart, deleteProduct } = useContext(dataContext);

    

    return cart.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
                src={`/assets/images/${item.product.photo}`}
                alt={item.product.name}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-lg font-bold mt-2">{item.product.name}</h2>
            <p className="text-gray-600">{item.product.description}</p>
            {/* <p className="text-gray-600">{item.productType.name}</p> */}
            <p className="text-gray-800">${item.total}</p>
            <CartItemCounter product={item} />
            <button onClick={()=>deleteProduct(item.id)}>Eliminar</button>
        </div>
    ));
    
};

export default CartElements;
