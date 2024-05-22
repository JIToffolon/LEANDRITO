import { createContext, useState, useEffect } from "react";

export const dataContext = createContext();

const DataProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const buyProduct = (product) => {
        const productRepeat = cart.find((item) => item.id === product.id);
        if (productRepeat) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...product, quanty: productRepeat.quanty + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, product]);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <dataContext.Provider value={{cart, setCart, buyProduct,clearCart }}>
            {children}
        </dataContext.Provider>
    );
};

export default DataProvider;
