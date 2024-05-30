import React from "react";
import { IconBrandInstagram } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import '../../css/app.css'


const Footer = () => {
    return (
    
        <footer className="footer footer-center p-4 bg-black  text-white  text-sm">
            <div className="flex justify-center md:justify-start pt-4">
                <Link href="/contacto">
                    <div className="text-white hover:text-gray-400 text-lg  font-rockSalt">
                        {" "}
                        Contact Us{" "}
                    </div>
                </Link>
            </div>
            <div
                className="container flex flex-row items-center justify-center gap-3
         "
            >
                <div className=" hover:bg-gray-400 rounded-lg">
                   <a href="https://www.instagram.com/toffo.stone/"> <IconBrandInstagram color="white" size={20} /></a>
                </div>
               
            </div>
            <aside>
                <p className=" font-rockSalt text-lg">
                    © 2024 tattoo&ArtSebastianAlejandro, all rights // reserved.
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
