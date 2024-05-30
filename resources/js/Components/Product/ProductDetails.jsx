import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import "../../../css/app.css";

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

    const handleButtonClick = () => {
        handleAddToCart();
        document.getElementById("my_modal_1").showModal();
    };

    const handlePhotoModal = () => {
        document.getElementById("my_modal_2").showModal();
    };

    return (
        <>
            <div
                key={product.id}
                className="flex flex-col md:flex-row gap-4  text-black"
            >
                <div className="card card-compact md:w-96 bg-white shadow-xl font-Rancho">
                    <figure>
                        <img
                            src={`/assets/images/${product.photo}`}
                            alt="Cuadro"
                            className="w-full cursor-pointer  transition-transform duration-300 transform hover:scale-105"
                            onClick={handlePhotoModal}
                        />
                        <dialog id="my_modal_2" className="modal">
                            <div className="modalbox">
                                <img
                                    src={`/assets/images/${product.photo}`}
                                    alt="Cuadro"
                                    className="w-full"
                                    onClick={handlePhotoModal}
                                />
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="bg-black rounded-md py-2 px-3 text-white hover:bg-gray-800 text-xl">
                                            Close
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </figure>
                    <div className="card-body p-4 md:p-6">
                        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
                            {product.name}
                        </h2>
                        <div className="relative text-lg md:text-xl font-rockSalt">
                            <label htmlFor="size ">Choose a Size:</label>
                            <select
                                id="size"
                                value={selectedSize}
                                onChange={handleSizeChange}
                                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {product.details &&
                                    product.details.map((detail) => (
                                        <option
                                            key={detail.id}
                                            value={detail.product_type.name}
                                        >
                                            {detail.product_type.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <p className="text-lg md:text-xl font-rockSalt">Price: ${price}</p>
                        <p className="text-lg md:text-xl font-rockSalt">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <div className="flex justify-between">
                            <button
                                className="bg-black rounded-md py-2 px-3 text-white mr-2 hover:bg-gray-800 text-xl font-rancho"
                                onClick={handleButtonClick}
                            >
                                Add To Cart
                            </button>
                            <dialog id="my_modal_1" className="modal ">
                                <div className="modal-box bg-black">
                                    <h3 className="font-bold text-4xl text-white">
                                        Hello!
                                    </h3>
                                    <p className="py-4 text-3xl text-white">
                                        The product was successfully added to
                                        the cart
                                    </p>
                                    <div className="modal-action ">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <Link href={`/carrito`}>
                                                <button className="rounded-md py-2 px-3 mx-2 text-white hover:bg-gray-800 text-xl">
                                                    Go To Cart
                                                </button>
                                            </Link>
                                            <button className="rounded-md py-2 px-3 mx-2 text-white hover:bg-gray-800 text-xl">
                                                Close
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                            <Link href={`/carrito`}>
                                <button className="bg-black rounded-md py-2 px-3 text-white hover:bg-gray-800 text-xl font-rancho">
                                    Cart
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-80 h-auto md:h-60 bg-white shadow-xl font-Rancho p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">
                        Details
                    </h2>
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </p>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
