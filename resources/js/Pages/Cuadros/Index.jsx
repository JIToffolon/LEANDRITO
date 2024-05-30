import React from "react";
import { CuadrosList } from "@/Components/CuadrosList";
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";



export default function Cuadros({  cuadros }) {
    
    return (
       <>
        <NavBar/>
        <CuadrosList cuadros={cuadros}/>
        <Footer/>
       </>
          
    )
}
