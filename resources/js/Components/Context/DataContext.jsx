import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const dataContext = createContext();

const DataProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);

    const getCart = async () => {
        try {
            const response = await axios.get(route("carrito.get"));
            console.log("getCart - response.data:", response.data);
            setCart(response.data);
        } catch (error) {
            console.error("Error al obtener el carrito", error);
        }
    };

    const getCartItemCount = async () => {
        try {
            const response = await axios.get(route("carrito.itemsCount"));
            console.log("getCartItemCount - response.data:", response.data);
            console.log("getCartItemCount - response.data:", response);

            setCartItemCount(response.data);
        } catch (error) {
            console.error(
                "Error al obtener la cantidad de items en el carrito"
            );
        }
    };

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(`/add-to-cart/${productId}`);
            if (response.status === 200) {
                console.log("addToCart - response.status:", response.status);
                getCart();
                // Actualiza el carrito después de agregar un producto
                getCartItemCount();
                // Actualizamos el contador después de agregar un producto
            } else {
                console.error("Error al agregar el producto al carrito");
            }
        } catch (error) {
            console.error("Error al agregar el producto al carrito", error);
        }
    };

    useEffect(() => {
        console.log("useEffect - Se está ejecutando");
        getCart();
        getCartItemCount();
    }, []);

    const increaseQuantity = async (productId) => {
        try {
            const response = await axios.put(
                `/cartitem/${productId}/updateqty`,
                {
                    quantity:
                        cart.find((item) => item.producto_id === productId)
                            .quantity + 1,
                }
            );
            if (response.status === 200) {
                getCart();
                getCartItemCount();
            } else {
                console.error(
                    "Error al aumentar la cantidad del producto en el carrito"
                );
            }
        } catch (error) {
            console.error(
                "Error al aumentar la cantidad del producto en el carrito",
                error
            );
        }
    };

    const decreaseQuantity = async (productId) => {
        try {
            const currentQuantity = cart.find(
                (item) => item.producto_id === productId
            ).quantity;
            if (currentQuantity > 1) {
                const response = await axios.put(
                    `/cartitem/${productId}/updateqty`,
                    {
                        quantity: currentQuantity - 1,
                    }
                );
                if (response.status === 200) {
                    getCart();
                    getCartItemCount();
                } else {
                    console.error(
                        "Error al disminuir la cantidad del producto en el carrito"
                    );
                }
            } else {
                console.log("La cantidad mínima es 1");
            }
        } catch (error) {
            console.error(
                "Error al disminuir la cantidad del producto en el carrito",
                error
            );
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`/deleteproduct/${productId}`);
            if (response.status === 200) {
                getCart();
                getCartItemCount(); // Actualiza el carrito después de eliminar un producto
            } else {
                console.error("Error al eliminar el producto del carrito");
            }
        } catch (error) {
            console.error("Error al eliminar el producto del carrito", error);
        }
    };

    return (
        <dataContext.Provider
            value={{
                cart,
                setCart,
                getCart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                deleteProduct,
                cartItemCount,
                getCartItemCount,
            }}
        >
            {children}
        </dataContext.Provider>
    );
};

export default DataProvider;
