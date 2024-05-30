import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import ProductDetails from "@/Components/Product/ProductDetails";


export default function Product({ product }) {
 
    return (
        <>
            <NavBar />
            <div className=" bg-gray-300 p-10 flex justify-center">
                
                <ProductDetails product={product} />
                
            </div>

            <Footer />
        </>
    );
}
