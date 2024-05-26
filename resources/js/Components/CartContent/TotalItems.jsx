import React from 'react'
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const TotalItems = () => {
    const {getCartItemCount} = useContext(dataContext);
  return (
    <span className=' text-xl text-white'>{getCartItemCount}</span>
  )
}

export default TotalItems