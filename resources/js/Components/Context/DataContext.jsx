import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const dataContext = createContext();

const DataProvider = ({ children }) => {
    // const buyProduct = async (product) => {
    //     try {
    //         const response = await axios.post("/add-to-cart/" + product.id);
    //         if (response.status === 200) {
    //             const productRepeat = cart.find(
    //                 (item) => item.id === product.id
    //             );
    //             if (productRepeat) {
    //                 setCart(
    //                     cart.map((item) =>
    //                         item.id === product.id
    //                             ? {
    //                                   ...product,
    //                                   quantity: productRepeat.quantity + 1,
    //                               }
    //                             : item
    //                     )
    //                 );
    //             } else {
    //                 setCart([...cart, {product,quantity:1}]);
    //             }
    //         } else {
    //             console.error("Error al agregar el producto al carrito");
    //         }
    //     } catch (error) {
    //         console.error("Error al agregar el producto al carrito", error);
    //     }
    // };

    // const clearCart = () => {
    //     setCart([]);
    // };

    const [cart, setCart] = useState([]);
    const getCart = async () => {
        try {
            const response = await axios.get("/carritoJson");
            setCart(response.data);
        } catch (error) {
            console.error("Error al obtener el carrito", error);
        }
    };

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(`/add-to-cart/${productId}`);
            if (response.status === 200) {
                getCart(); // Actualiza el carrito después de agregar un producto
            } else {
                console.error("Error al agregar el producto al carrito");
            }
        } catch (error) {
            console.error("Error al agregar el producto al carrito", error);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        console.log(
            "updateQuantity - productId, quantity:",
            productId,
            quantity
        );
        try {
            const response = await axios.put(
                `/cartitem/${productId}/updateqty`,
                { quantity }
            );
            if (response.status === 200) {
                getCart(); // Actualiza el carrito después de actualizar la cantidad
            } else {
                console.error("Error al actualizar la cantidad del producto");
            }
        } catch (error) {
            console.error(
                "Error al actualizar la cantidad del producto",
                error
            );
        }
    };
    const decrease = (productoCarrito) => {
        const productRepeat = cart.find(
            (item) => item.producto_id === productoCarrito.product.id
        );
         console.log("decrease - productRepeat:", productRepeat);
         console.log("decrease - productoCarrito:", productoCarrito);
         console.log("cart:", cart);
         console.log("productoCarrito.id:", productoCarrito.product.id);
        if (productRepeat && productRepeat.quantity > 1) {
            updateQuantity(productoCarrito.product.id, productRepeat.quantity - 1);
        }
    };

    const increase = (productoCarrito) => {
        const productRepeat = cart.find(
            (item) => item.producto_id === productoCarrito.product.id
        );
        // console.log("increase - productRepeat:", productRepeat);
        // console.log("increase - productoCarrito:", productoCarrito);
        // console.log("cart:", cart);
        // console.log("productoCarrito.id:", productoCarrito.product.id);

        if (productRepeat) {
            updateQuantity(productoCarrito.product.id, productRepeat.quantity + 1);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`/deleteproduct/${productId}`);
            if (response.status === 200) {
                getCart(); // Actualiza el carrito después de eliminar un producto
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
                addToCart,
                updateQuantity,
                deleteProduct,
                getCart,
                increase,
                decrease,
            }}
        >
            {children}
        </dataContext.Provider>
    );
};

export default DataProvider;
