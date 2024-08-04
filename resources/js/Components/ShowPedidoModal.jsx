import React from 'react';

const ShowPedidoModal = ({ pedido, show, onHide }) => {
    if (!show || !pedido) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex justify-between items-start p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-black">Order #{pedido.data.id} Details:</h3>
                    <button onClick={onHide} className="text-gray-400 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-black">
                        <div>
                            <p><strong>Name:</strong> {pedido.data.customer_name}</p>
                            <p><strong>Email:</strong> {pedido.data.email}</p>
                            <p><strong>Address:</strong> {pedido.data.customer_address1} <strong>PC:</strong> {pedido.data.customer_postalcode}</p>
                            <p></p>
                        </div>
                        <div>
                            <p><strong>City:</strong> {pedido.data.customer_city}</p>
                            <p><strong>State:</strong> {pedido.data.customer_state}</p>
                            <p><strong>Country:</strong> {pedido.data.customer_country}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-black">Order Items:</h4>
                        <table className="w-full text-left border-collapse text-black">
                            <thead>
                                <tr>
                                    <th className="border-b py-2">Product</th>
                                    <th className="border-b py-2">Type</th>
                                    <th className="border-b py-2">Quantity</th>
                                    <th className="border-b py-2">Unit Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.data.cart.cart_items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-b py-2">{item.product.name}</td>
                                        <td className="border-b py-2">{item.product_type.name}</td>
                                        <td className="border-b py-2">{item.quantity}</td>
                                        <td className="border-b py-2">{item.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-right">
                        <p className="text-black"><strong>Total:</strong> ${pedido.totalCart}</p>
                    </div>
                </div>
                <div className="flex justify-end p-4">
                    <button className="bg-red-500 text-white rounded px-4 py-2" onClick={() => alert('Contactar al cliente')}>
                        Contactar al cliente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShowPedidoModal;
