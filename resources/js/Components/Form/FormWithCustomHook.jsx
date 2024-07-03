import React, { useState, useEffect } from "react";
import { useForm } from "@/hooks/useForm";
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
import axios from "axios";
import '../../../css/app.css'

export const FormWithCustomHook = () => {
    const [formValues, handleInputChange, reset] = useForm({
        name: "",
        last_name: "",
        email: "",
        message: "",
    });

    const { name, last_name, email, message } = formValues;
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    
    useEffect(() => {
        if (successMessage) {
            setSuccessMessage(successMessage); // Muestra el mensaje
            const timer = setTimeout(() => {
                setSuccessMessage(null); // Elimina el mensaje después de 20 segundos
            }, 20000);
            return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
        }
    }, [successMessage]);


   const storeMessage = async (data) => {
        try {
            const response = await axios.post(route('contacto.store'), data);
            setSuccessMessage(response.data.success);
            setErrors({});
            reset();
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error al enviar email:', error);
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        storeMessage(formValues);
    };



    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-300 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="md:w-full px-5 md:px-20 py-20 m-5 rounded-xl bg-black text-start flex flex-col"
                >
                    <div className="container flex flex-col mt-5 text-white font-Rancho">
                        <h1 className="prose text-5xl text-start">Contact</h1>
                        <p className="prose prose-gray prose-sm w-full py-3 text-lg text-center">
                            to art&tattooSebastianAlejandro
                        </p>
                    </div>
                    {successMessage && (
                <div className="bg-green-500 text-white p-4 rounded mb-4 text-center relative">
                    {successMessage}
                    <button
                        className="absolute top-1 right-2 text-2xl leading-none"
                        onClick={() => setShowMessage(null)}
                    >
                        &times;
                    </button>
                </div>
            )}
                    <div className="py-3 w-full font-rockSalt">
                        <div className="py-3 flex flex-col md:flex-row gap-5">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block rounded-t-lg px-2.5 pb-1.5 pt-8 w-full text-sm text-gray-900 bg-gray-50 dark:bg-white border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                                    placeholder=" "
                                    autoComplete="off"
                                    value={name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute text-lg text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    First Name
                                </label>
                                {errors.name && <span className="text-red-500 text-sm">{errors.name[0]}</span>}
                            </div>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    className="block rounded-t-lg px-2.5 pb-1.5 pt-8 w-full text-sm text-gray-900 bg-gray-50 dark:bg-white border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                                    placeholder=" "
                                    autoComplete="off"
                                    value={last_name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label
                                    htmlFor="last_name"
                                    className="absolute text-lg text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Last Name
                                </label>
                                {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name[0]}</span>}
                            </div>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="block rounded-t-lg px-2.5 pb-1.5 pt-8 w-full text-sm text-gray-900 bg-gray-50 dark:bg-white border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                                    placeholder=" "
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute text-lg text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Email Address
                                </label>
                                {errors.email && <span className="text-red-500 text-sm">{errors.email[0]}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="relative font-rockSalt">
                        <input
                            type="text"
                            name="message"
                            id="message"
                            className="block rounded-t-lg px-2.5 py-5 pb-1.5 pt-14 w-full text-sm text-gray-900 bg-gray-50 dark:bg-white border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                            placeholder=" "
                            autoComplete="off"
                            value={message}
                            onChange={handleInputChange}
                            required
                        />
                        <label
                            htmlFor="message"
                            className="absolute text-lg text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Message
                        </label>
                        {errors.message && <span className="text-red-500 text-sm">{errors.message[0]}</span>}
                    </div>
                    <button
                        className="bg-black btn btn-ghost text-white text-xl font-rockSalt px-3 py-2 rounded-md w-60 mt-4 border border-white"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};