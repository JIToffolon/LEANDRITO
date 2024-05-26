import React, { useState } from "react";
import { IconShoppingCart } from "@tabler/icons-react";
import { IconMenu2 } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { useContext } from "react";
import { dataContext } from "./Context/DataContext";
import TotalItems from "./CartContent/TotalItems";

const NavBar = () => {
    const Links = [
        { name: "Shop", link: "/" },
        { name: "Tattoo Designs", link: "/" },
        { name: "About Us", link: "/" },
        { name: "Contact", link: "/" },
    ];

    const [open, setOpen] = useState(false);
    const {cartItemCount} = useContext(dataContext);

    return (
        <>
            <div className="shadow-md w-fulltop-0 left-0 font-[Poppins] z-30">
                <div className="md:flex items-center justify-between z-20 bg-gray-600 py-4 md:px-10 px-7">
                    <Link href="/cuadros">
                        <div className=" font-bold text-4xl text-white hover:text-gray-400 cursor-pointer flex items-center font-[Poppins]">
                            Art&tattoo's
                        </div>
                    </Link>

                    <div
                        onClick={() => setOpen(!open)}
                        className="text-3xl absolute right-8 top-3 cursor-pointer md:hidden text-white"
                    >
                        <IconMenu2 className="my-3" color="white" size={28} />
                    </div>
                    <ul
                        className={`md:flex md:items-center justify-items-center md:text-center gap-6  md:pb-0 pb-12 absolute md:static bg-gray-600 md:z-auto z-1[-1] left-0  w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in ${
                            open ? "top-15  opacity-100" : "top-[-490px]"
                        } md:opacity-100 opacity-0`}
                    >
                        {Links.map((Link) => (
                            <li
                                key={Link.name}
                                className="md:ml-8 text-2xl text-white md:my-0 my-7"
                            >
                                <a
                                    href={Link.link}
                                    className="md:   text-white hover:text-gray-400 duration-300"
                                >
                                    {" "}
                                    {Link.name}
                                </a>
                            </li>
                        ))}
                        <button className=" text-white py-2 px-7  rounded-full md:ml-8  hover:text-gray-400 duration-300">
                            <IconShoppingCart color="white" size={28} />
                            {cartItemCount}
                        </button>
                        

                    </ul>
                </div>
            </div>

        </>
    );
};

export default NavBar;
