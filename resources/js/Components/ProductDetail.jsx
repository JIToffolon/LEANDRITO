import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { useContext } from "react";
import { dataContext } from "./Context/DataContext";

function ProductDetail({ cuadros, id }) {
    const [product, setProduct] = useState(null);
    const {buyProduct } = useContext(dataContext);

    useEffect(() => {
        const foundProduct = cuadros.find(
            (product) => product.id === Number(id)
        );
        setProduct(foundProduct);
    }, [id, cuadros]);

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
                    <p> $ {product.price}</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <div className="card-actions justify-end">
                        <button  onClick={() => buyProduct(product)} className=" bg-gray-700 rounded-md py-2 px-3 text-white">
                            Add To Cart
                        </button>
                        <Link href={`/cart`}>
                            <button className=" bg-gray-700 rounded-md py-2 px-3 text-white">
                                Go to CarT
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
