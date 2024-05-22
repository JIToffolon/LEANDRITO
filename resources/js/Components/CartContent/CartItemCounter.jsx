import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const CartItemCounter = ({ product }) => {
    const { cart, setCart, buyProduct } = useContext(dataContext);
    const decrease = () => {
        const productRepeat = cart.find((item) => item.id === product.id);

        if (productRepeat.quanty > 1) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quanty: productRepeat.quanty - 1 }
                        : item
                )
            );
        }
    };
    return (
        <>
            <div className="text-white text-center flex flex-row items-center justify-center px-4 py-4 gap-3">
                <button onClick={() => buyProduct(product)}>
                    <p>+</p>
                </button>
                <p>{product.quanty}</p>
                <button onClick={decrease}>
                    <p>-</p>
                </button>
            </div>
        </>
    );
};

export default CartItemCounter;
