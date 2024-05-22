import React from 'react'
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const TotalItems = () => {
    const { cart } = useContext(dataContext);
    const itemsContador = cart.reduce ((acc,el)=> acc + el.quanty, 0)
  return (
    <span className=' text-xl text-white'>{itemsContador}</span>
  )
}

export default TotalItems