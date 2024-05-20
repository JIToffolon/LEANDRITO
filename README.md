Readme de rutas para manejar el carrito.

-   Ruta GET "carrito.index", te habilita la vista de /resources/js/Pages/Carrito/Index.jsx (hay que crearlo el archivo en ese path si se quiere manejar esa Page) con  la variable productos, listando todos los items que fueron agregados al carrito.

otra alternativa es:

-    Ruta GET "carrito.get", Te devuelve en json toda la informacion del carrito si es que existe con los productos que tiene dentro. 

    Aclaracion: Se crea un carrito en la sesion del usuario cuando agrega un producto al carrito.

-   Ruta GET "carrito.itemsCount" esta ruta nos devuelve un entero con la cantidad de productos que tiene dentro del carrito. 

-   Ruta POST "producto.addToCart" se le envia el id del producto de la "tienda" a la ruta. Si es el primer producto que se agrega, se crea el carrito y agrega el producto con cantidad = 1 y el precio. Si se vuelve a enviar el mismo ID de producto por segunda vez, se actualiza la cantidad del producto y el precio. 


Con las siguientes rutas nos manejamos dentro del carrito:

-   Ruta PUT "producto.updateQuantity" se le envia el id del "carritoProducto"(cada producto dentro del carrito tiene un id unico) y en el request se envia la nueva quantity.  Esto nos actualiza la cantidad del producto y el precio. 

-   Ruta DELETE "producto.deleteInCart" se le envia el id del "carritoProducto" (cada producto dentro del carrito tiene un id unico). Sirve para eliminar un producto del carrito.

-   Tips: 
Recordar que con cada cambio que se realice en los productos dentro del carrito podemos obtener la info actualizada del carrito con el GET carrito.get
Con la ruta GET "carrito.itemsCount" vas a poder saber cuantos productos tiene el carrito por si queres mostrar en el boton del carrito el numerito en chiquito de cuantos productos tiene (tipo pedidosYa o cualquier carrito).