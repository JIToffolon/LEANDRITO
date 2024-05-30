import React from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../../css/app.css";
import tattoo1 from "../../../../public/assets/tattoos/tattoo1.png";
import tattoo2 from "../../../../public/assets/tattoos/tattoo2.png";
import tattoo3 from "../../../../public/assets/tattoos/tattoo3.png";
import tattoo4 from "../../../../public/assets/tattoos/tattoo4.png";
import tattoo5 from "../../../../public/assets/tattoos/tattoo5.png";
import tattoo6 from "../../../../public/assets/tattoos/tattoo6.png";
import tattoo7 from "../../../../public/assets/tattoos/tattoo7.png";
import tattoo8 from "../../../../public/assets/tattoos/tattoo8.png";
import tattoo9 from "../../../../public/assets/tattoos/tattoo9.png";
import tattoo10 from "../../../../public/assets/tattoos/tattoo10.png";
import tattoo11 from "../../../../public/assets/tattoos/tattoo11.png";
import tattoo12 from "../../../../public/assets/tattoos/tattoo12.png";
import tattoo13 from "../../../../public/assets/tattoos/tattoo13.png";
import tattoo14 from "../../../../public/assets/tattoos/tattoo14.png";

export const Galery = () => {


    const images = [
        {
            original: tattoo1,
            thumbnail: tattoo1,
        },
        {
            original: tattoo2,
            thumbnail: tattoo2,
        },
        {
            original: tattoo3,
            thumbnail: tattoo3,
        },
        {
            original: tattoo4,
            thumbnail: tattoo4,
        },
        {
            original: tattoo5,
            thumbnail: tattoo5,
        },
        {
            original: tattoo6,
            thumbnail: tattoo6,
        },
        {
            original: tattoo7,
            thumbnail: tattoo7,
        },
        {
            original: tattoo8,
            thumbnail: tattoo8,
        },
        {
            original: tattoo9,
            thumbnail: tattoo9,
        },
        {
            original: tattoo10,
            thumbnail: tattoo10,
        },
        {
            original: tattoo11,
            thumbnail: tattoo11,
        },
        {
            original: tattoo12,
            thumbnail: tattoo12,
        },
        {
            original: tattoo13,
            thumbnail: tattoo13,
        },
        {
            original: tattoo14,
            thumbnail: tattoo14,
        },
    ];

    const renderCustomItem = (item) => (
        <div className="inline-block px-1 w-1/7 cursor-pointer">
            <img src={item.thumbnail} alt="Tattoo Design" />
        </div>
    );

        

    return (
        <div className="bg-gray-200 py-20 text-black ">
            <h1 className="text-center text-8xl mb-10 font-Rancho">
                Tattoo's Desings
            </h1>
            <ReactImageGallery items={images} renderItem={renderCustomItem} />
        </div>
    );
};
