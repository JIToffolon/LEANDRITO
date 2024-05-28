import React from "react";
import { IconBrandInstagram } from "@tabler/icons-react";
import { IconBrandTwitter } from "@tabler/icons-react";
import { IconBrandFacebook } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
    
        <footer className="footer footer-center p-4 bg-gray-600  text-white  text-sm">
            <div className="flex justify-center md:justify-start pt-4">
                <Link href="/contacto">
                    <div className="text-white hover:text-gray-400 text-xl font-[Poppins]">
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
                    {" "}
                    <IconBrandInstagram color="white" size={20} />
                </div>
                <div className=" hover:bg-gray-400 rounded-lg">
                    {" "}
                    <IconBrandTwitter color="white" size={20} />
                </div>
                <div className=" hover:bg-gray-400 rounded-lg">
                    {" "}
                    <IconBrandFacebook color="white" size={20} />
                </div>
            </div>
            <aside>
                <p>
                    © 2024 tattoo&ArtSebastianAlejandro, all rights // reserved.
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
