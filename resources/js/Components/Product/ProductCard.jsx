import { Link } from "@inertiajs/react";
import React from "react";

const ProductCard = ({ product }) => {
    return (
        <>
            <div>
                <img src="{product.photo}" alt="{product.name}" />
                <div>
                    <h2>{product.name}</h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Assumenda ipsam id nulla eligendi magni est et
                        deserunt odio quibusdam officiis eaque deleniti
                        similique temporibus debitis enim quis unde, excepturi
                        asperiores!
                    </p>
                    <Link href="/product/${product.id}">More Info</Link>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
