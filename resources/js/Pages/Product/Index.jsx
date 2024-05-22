import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import ProductDetail from "@/Components/ProductDetail";

export default function Product(props) {
    return (
        <>
            <NavBar />
            <div className="p-10 m-10 flex justify-center">
                <ProductDetail cuadros={props.cuadros} id={props.id} />
            </div>

            <Footer />
        </>
    );
}
