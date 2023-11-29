import { createContext, useEffect, useState } from "react";
import productoAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const productosContext = createContext();
import axios from "axios";

const ProductosProvider = ({ children }) => {
    const { config, auth } = useAuth();

    // primer state
    const [productos, setProductos] = useState([]);

    // función para obtener los clientes solo cuando se carge el componente

    const consultarProductos = async () => {
        try {
            const { data } = await productoAxios.get("/productos", config);

            setProductos(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        consultarProductos();
    }, [auth]);

    const agregarProducto = async (producto, reset, handleClose) => {
        try {
            const res = await productoAxios.post("/productos", producto, config);

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: "Producto agregado",
                text: res.data.message,
                icon: "success",
            }).then(() => {
                reset();
                consultarProductos();
                handleClose();
            });
        } catch (err) {

            // En caso de otros errores, muestra una alerta genérica de error
            Swal.fire({
                title: "Error",
                text: "Hubo un error",
                icon: "error",
            }).then(() => {
                handleClose();
            });

        }
    };

    const editarProductos = (data, editarProducto, handleClose) => {
        //se guardan los datos  a cambiar al data
        const { nombre, cantidad, fk_prenda, publicado, imagen } = data

        if (editarProducto.id_producto) {
            axios
                .patch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/productos/${editarProducto.id_producto
                    }`,
                    {
                        nombre: nombre.trim(),
                        cantidad: cantidad,
                        // precio: precio,
                        fk_prenda: fk_prenda,
                        publicado: publicado,
                        imagen: imagen[0],
                        disenos: JSON.stringify(disenos)
                    },
                    config
                )
                .then((response) => {
                    console.log("Producto Actualizado:", response.data);
                    Swal.fire({
                        title: "Producto Actualizado",
                        text: response.data.message,
                        icon: "success",
                    }).then(() => {
                        consultarProductos();
                        handleClose();
                    });
                })
                .catch((error) => {
                    console.error("Error al actualizar el usuario", error);

                    Swal.fire({
                        title: "Error",
                        text: "Hubo un error",
                        icon: "error",
                    })

                });
        } else {
            console.error("No se pudo obtener el ID del usuario");
        }
    };

    const editarEstado = (id) => {
        let productoEditado = productos.find((producto) => producto.id_producto === id);
        productoEditado.estado = !productoEditado.estado;

        const productoActualizado = productos.map((producto) =>
        producto.id_producto == id ? productoEditado : producto
        );

        setProductos(productoActualizado);
    };

    return (
        <productosContext.Provider
            value={{ productos, editarEstado, agregarProducto, editarProductos }}
        >
            {children}
        </productosContext.Provider>
    );
};

export { ProductosProvider };
export default productosContext;
