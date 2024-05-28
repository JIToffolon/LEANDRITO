import React, { useState } from "react";
import { IconShoppingCart } from "@tabler/icons-react";
import { IconMenu2 } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { useContext } from "react";
import { dataContext } from "./Context/DataContext";
import TotalItems from "./CartContent/TotalItems";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { cartItemCount } = useContext(dataContext);

    return (
        <>
            <div className="navbar bg-gray-600">
                <div className="flex-1">
                    <Link href="/cuadros">
                        <p className="btn btn-ghost font-bold text-4xl text-white font-[Poppins]">
                            Art&tattoo's
                        </p>
                    </Link>
                </div>

                <div className="hidden md:flex flex-1 text-2xl text-white">
                    <ul className="flex flex-row items-center justify-around gap-8 font-[Poppins]">
                        <li className=" hover:text-gray-400 cursor-pointer">
                            Shop
                        </li>
                        <li className=" hover:text-gray-400 cursor-pointer">
                            Tattoo Designs
                        </li>
                        <li className=" hover:text-gray-400 cursor-pointer">
                            About Us
                        </li>
                        <Link href="/contacto">
                            <li className=" hover:text-gray-400 cursor-pointer">
                                Contact
                            </li>
                        </Link>
                    </ul>

                    <button className="text-white hover:text-gray-400 duration-300 flex items-center mx-8">
                        <Link href="/carrito">
                            {" "}
                            <IconShoppingCart color="white" size={22} />
                        </Link>
                        <span className="ml-2">{cartItemCount}</span>
                    </button>
                </div>

                <div className="flex md:hidden flex-none">
                    <button
                        className="btn btn-square btn-ghost"
                        onClick={toggleMenu}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-5 h-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-gray-600">
                    <ul className="flex flex-col text-2xl text-white gap-4 p-4 font-[Poppins]">
                        <li className=" hover:text-gray-400 cursor-pointer">
                            Shop
                        </li>
                        <li className=" hover:text-gray-400 cursor-pointer">
                            Tattoo Designs
                        </li>
                        <li className=" hover:text-gray-400 cursor-pointer">
                            About Us
                        </li>
                        <Link href="/contacto">
                            <li className=" hover:text-gray-400 cursor-pointer">
                                Contact
                            </li>
                        </Link>
                        <button className="text-white hover:text-gray-400 duration-300 flex items-center">
                            <Link href="/carrito">
                                <IconShoppingCart color="white" size={22} />
                            </Link>
                            <span className="ml-2">{cartItemCount}</span>
                        </button>
                    </ul>
                </div>
            )}

        </>
    );
};

export default NavBar;
