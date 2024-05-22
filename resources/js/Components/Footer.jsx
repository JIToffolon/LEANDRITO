import React from "react";
import { IconBrandInstagram } from "@tabler/icons-react";
import { IconBrandTwitter } from "@tabler/icons-react";
import { IconBrandFacebook } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
        <section className="bg-gray-600 md:px-10 font-[Poppins]">
            <div className=" container flex flex-col items-center justify-between px-6 py-5 mx-auto space-y-12 md:py-5 ">
                <div className="flex justify-center md:justify-start pt-4">
                    <Link href="/contacto">
                        <div className="text-white hover:text-gray-400 text-xl">
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
                        <IconBrandInstagram color="white" size={28} />
                    </div>
                    <div className=" hover:bg-gray-400 rounded-lg">
                        {" "}
                        <IconBrandTwitter color="white" size={28} />
                    </div>
                    <div className=" hover:bg-gray-400 rounded-lg">
                        {" "}
                        <IconBrandFacebook color="white" size={28} />
                    </div>
                </div>
                <div>
                    <p className="text-sm text-center text-white  pb-4 flex">
                        © 2024 tattoo&ArtSebastianAlejandro, all rights
                        reserved.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Footer;
