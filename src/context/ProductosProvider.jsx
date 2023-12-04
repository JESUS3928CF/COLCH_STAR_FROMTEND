import { createContext, useEffect, useState } from "react";
import productoAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { useDisenosContext } from "./disenosProvider";


const productosContext = createContext();


const ProductosProvider = ({ children }) => {
    const {  auth, token } = useAuth();

    const { setDisenos } = useDisenosContext();

    // primer state
    const [productos, setProductos] = useState([]);

    // función para obtener los clientes solo cuando se carge el componente

    const consultarProductos = async () => {
        try {
            // const token = localStorage.getItem('token');
            // if (!token) return;

            const { data } = await productoAxios.get("/productos");

            setProductos(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        consultarProductos();
    }, [auth]);

    const agregarProducto = async (producto, reset, handleClose) => {
        // console.log(producto)
        try {
            const res = await productoAxios.post("/productos", producto, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: "Producto agregado",
                text: res.data.message,
                icon: "success",
            }).then(() => {
                reset();
                // setProductos([...productos, res.data.nuevoProducto]);
                consultarProductos()
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

        } finally {
            console.log("Hola")
            console.log(setDisenos([]));
        }
    };

    const { disenos } = useDisenosContext();

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
                    {headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },}
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

    const editarPublicacion = (id) => {
        let productoEditado = productos.find(
            (producto) => producto.id_producto === id
        );
        productoEditado.publicado = !productoEditado.publicado;

        const productoActualizado = productos.map((producto) =>
        producto.id_producto == id ? productoEditado : producto
        );

        setProductos(productoActualizado);
    };

    return (
        <productosContext.Provider
            value={{ productos, editarEstado, agregarProducto, editarProductos, editarPublicacion }}
        >
            {children}
        </productosContext.Provider>
    );
};

export { ProductosProvider };
export default productosContext;
