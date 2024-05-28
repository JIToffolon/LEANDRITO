import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import ProductDetails from "@/Components/Product/ProductDetails";
// import ProductCard from "@/Components/Product/ProductCard";
// import ProductDetail from "@/Components/ProductDetail";

export default function Product({ product,cuadros, id }) {
    // const product = cuadros.find((product = Product.id === id));
    // console.log(cuadros);
    return (
        <>
            <NavBar />
            <div className="p-10 m-10 flex justify-center">
                {/* <ProductDetail cuadros={props.cuadros} id={props.id} /> */}
                <ProductDetails product={product} />
                {/* <ProductCard/> */}
            </div>

            <Footer />
        </>
    );
}
