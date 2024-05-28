import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

function ProductDetails({ product }) {
    const [selectedSize, setSelectedSize] = useState("");
    const [price, setPrice] = useState(0);
    const { addToCart } = useContext(dataContext);

    useEffect(() => {
        if (product && product.details && product.details.length > 0) {
            // Establecer el primer tamaño como seleccionado por defecto
            setSelectedSize(product.details[0].product_type.name);
            setPrice(product.details[0].price);
        }
    }, [product]);

    const handleSizeChange = (e) => {
        const selectedType = e.target.value;
        setSelectedSize(selectedType);

        // Obtener el precio del tamaño seleccionado
        const detail = product.details.find(
            (detail) => detail.product_type.name === selectedType
        );
        setPrice(detail.price);
    };

    // const handleAddToCart = () => {

    //     console.log(product.details);
    //     // Encontrar el detalle correspondiente al tamaño seleccionado
    //     const detail = product.details.find(
    //         (detail) => detail.product_type.name === selectedSize
    //     );
    //     // Agregar al carrito con el ID del producto y el ID del tipo de producto
    //     addToCart(product.id, detail.product_type_id);
    //     console.log(detail.product_type_id)
    // };


    const handleAddToCart = () => {
        if (!selectedSize || !product.details || product.details.length === 0) {
            console.error("No size selected or product details missing");
            return;
        }
    
        const detail = product.details.find(
            (detail) => detail.product_type.name === selectedSize
        );
    
        if (!detail) {
            console.error("Selected size not found in product details");
            return;
        }
    
        if (typeof addToCart !== "function") {
            console.error("addToCart is not a function");
            return;
        }
    
        addToCart(product.id, detail.product_type_id);
    };
    

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div key={product.id} className="flex  text-black">
            <div className="card card-compact w-96 bg-white shadow-xl">
                <figure>
                    <img src={`/assets/images/${product.photo}`} alt="Cuadro" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <div>
                        <label htmlFor="size">Choose a Size:</label>
                        <select id="size" value={selectedSize} onChange={handleSizeChange}>
                            {product.details && product.details.map(detail => (
                                <option key={detail.id} value={detail.product_type.name}>{detail.product_type.name}</option>
                            ))}
                        </select>
                    </div>
                    <p>Price: ${price}</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <div className="card-actions justify-end">
                        <button onClick={handleAddToCart} className="bg-gray-700 rounded-md py-2 px-3 text-white">
                            Add To Cart
                        </button>
                        <Link href={`/carrito`}>
                            <button className="bg-gray-700 rounded-md py-2 px-3 text-white">
                                Go to Cart
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
