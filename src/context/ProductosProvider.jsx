import { createContext, useEffect, useState } from "react";
import productoAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { useDisenosContext } from "./disenosProvider";
import useMovimientos from '../hooks/useMovimientos';
import clienteAxios from "../config/axios";



const productosContext = createContext();


const ProductosProvider = ({ children }) => {
    const { auth, token, config } = useAuth();
    const { consultarMovimientos } = useMovimientos();

    // Estado para el parámetro de búsqueda
    const [busqueda, setBusqueda] = useState('');

    // const { setDisenos } = useDisenosContext();

    // primer state
    const [productos, setProductos] = useState([]);
    const [detailsDiseno, setDetailsDisenos] = useState([]);

    const [selectedDisenoNombre, setSelectedDisenoNombre] = useState([]);

    // función para obtener los clientes solo cuando se carge el componente
    const consultarProductos = async () => {
        try {
            // const token = localStorage.getItem('token');
            // if (!token) return;

            const { data } = await productoAxios.get('/productos');

            setProductos(data.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const consultDetailsDiseno = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const { data } = await clienteAxios.get('/detalle_diseno', config);
            setDetailsDisenos(data);
        } catch (error) {
            console.log('Error al buscar los detalles de Disenos ');
        }
    };

    useEffect(() => {
        consultarProductos();
        consultDetailsDiseno();
    }, [auth]);

    const agregarProducto = async (producto, reset, handleClose) => {
        // console.log(producto)
        try {
            const res = await productoAxios.post('/productos', producto, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Producto agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                reset();
                // setProductos([...productos, res.data.nuevoProducto]);
                consultarProductos();
                consultarMovimientos();
                handleClose();
            });
        } catch (err) {
            if (err.response && err.response.status === 403) {
                Swal.fire({
                    title: 'Espera!',
                    text: err.response.data.message,
                    icon: 'warning',
                });
            } else {
                // En caso de otros errores, muestra una alerta genérica de error
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error',
                    icon: 'error',
                }).then(() => {
                    handleClose();
                });
            }
        } finally {
            // console.log("Hola")
            // console.log(setDisenos([]));
            setSelectedDisenoNombre([]);
        }
    };

    const { disenos } = useDisenosContext();

    const editarProductos = (data, editarProducto, handleClose) => {
        // Se guardan los datos a cambiar en el objeto data
        const { nombre, cantidad, fk_prenda, publicado, imagen } = data;

        console.log(disenos);
        if (editarProducto.id_producto) {
            axios
                .patch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/productos/${
                        editarProducto.id_producto
                    }`,
                    {
                        nombre: nombre.trim(),
                        cantidad: cantidad,
                        fk_prenda: fk_prenda,
                        publicado: publicado,
                        imagen: imagen[0],
                        disenos: JSON.stringify(disenos),
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log('Producto Actualizado:', response.data);
                    Swal.fire({
                        title: 'Producto Actualizado',
                        text: response.data.message,
                        icon: 'success',
                    }).then(() => {
                        consultarProductos();
                        consultarMovimientos();
                        handleClose();
                    });
                })
                .catch((err) => {
                    if (err.response && err.response.status === 403) {
                        Swal.fire({
                            title: 'Espera!!',
                            text: err.response.data.message,
                            icon: 'warning',
                        });
                    } else {
                        // En caso de otros errores, muestra una alerta genérica de error
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un error',
                            icon: 'error',
                        }).then(() => {
                            handleClose();
                        });
                    }
                })
                .finally(() => {
                    // This block will always execute, whether the request succeeds or fails
                    setSelectedDisenoNombre([]);
                });
        } else {
            console.error('No se pudo obtener el ID del usuario');
        }
    };

    const editarEstado = (id) => {
        let productoEditado = productos.find(
            (producto) => producto.id_producto === id
        );
        productoEditado.estado = !productoEditado.estado;

        const productoActualizado = productos.map((producto) =>
            producto.id_producto == id ? productoEditado : producto
        );

        setProductos(productoActualizado);
        consultarMovimientos();
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
        consultarMovimientos();
    };

    return (
        <productosContext.Provider
            value={{
                productos,
                editarEstado,
                agregarProducto,
                editarProductos,
                editarPublicacion,
                selectedDisenoNombre,
                setSelectedDisenoNombre,
                consultDetailsDiseno,
                detailsDiseno,
                // BUSQUEDA
                busqueda,
                setBusqueda,
                consultarProductos,
            }}
        >
            {children}
        </productosContext.Provider>
    );
};



export { ProductosProvider };
export default productosContext;