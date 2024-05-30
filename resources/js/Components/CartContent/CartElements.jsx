import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import CartItemCounter from "./CartItemCounter";

import React from "react";

const CartElements = () => {
    const { cart, deleteProduct } = useContext(dataContext);
    console.log(cart);
   

   

    return cart.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded-lg shadow-md font-Rancho flex flex-col items-center">
            <img
                src={`/assets/images/${item.product.photo}`}
                alt={item.product.name}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-xl text-black text-center font-bold mt-2">{item.product.name}</h2>
            <p className="text-gray-600 mt-4">{item.product.description}</p>
            <p className="text-gray-600 mt-2">{item.product_type.name}</p>
            <p className="text-gray-800 mt-2">${item.total}</p>
            <CartItemCounter product={item} />
            <button onClick={()=>deleteProduct(item.id)} className="bg-black rounded-md py-2 px-3 text-white text-sm mt-5 font-rockSalt  ">Delete</button>
        </div>
    ));
    
};

export default CartElements;
