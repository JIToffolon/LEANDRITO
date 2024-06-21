import React, { useContext, useEffect } from "react";
import { dataContext } from "../Context/DataContext";
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";

const CartContent = () => {
    const { cart, deleteAll } = useContext(dataContext);
    const handleCheckout = async () => {
        try {
            const response = await axios.post(route('cart.process'));
            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    return cart.length > 0 ? (
        <div className="bg-gray-300 min-h-screen flex flex-col items-center p-4">
            <div className="w-full max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <CartElements />
                    <div className="mt-6 flex items-center text-center ">
                        <div className="w-full text-black">
                            <CartTotal/>
                            <button
                                onClick={handleCheckout}
                                className="bg-green-500 rounded-xl px-4 py-2 text-white hover:bg-green-800 transition duration-300 font-rockSalt"
                            >
                                Go to pay
                            </button>
                            <button
                                onClick={deleteAll}
                                className="bg-black rounded-xl px-4 py-2 text-white hover:bg-gray-800 transition duration-300 font-rockSalt"
                            >
                                Empty Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl text-gray-700">Your cart is empty</h2>
        </div>
    );
};

export default CartContent;
