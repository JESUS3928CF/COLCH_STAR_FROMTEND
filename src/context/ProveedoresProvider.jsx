import { createContext, useEffect, useState } from 'react';
import proveedorAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const proveedoresContext = createContext();

const proveedoresProvider = ({ children }) => {
    const { config, auth } = useAuth();

    // primer state
    const [proveedores, setProveedores] = useState([]);

    // función para obtener los clientes solo cuando se carge el componente

    const consultarProveedores = async () => {
        try {
            const { data } = await proveedorAxios.get('/proveedores', config);

            setProveedores(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        consultarProveedores();
    }, [auth]);

    const agregarProveedor = async (proveedor, reset, handleClose) => {
        try {
            const res = await proveedorAxios.post('/proveedores', proveedor, config);

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Proveedor agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                reset();
                setProveedores([...proveedores, res.data.nuevoProveedor]);
                handleClose();
            });
        } catch (err) {
            if (err.response && err.response.status === 403) {
                Swal.fire({
                    title: 'Error',
                    text: err.response.data.message,
                    icon: 'error',
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
        }
    };

    const editarProveedor = (proveedor, handleClose, reset) => {

        const { tipoIdentificacion, identificador, nombre, telefono, direccion } = proveedor

        if (proveedor.id_proveedor) {
            axios
                .patch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/proveedores/${proveedor.id_proveedor
                    }`,
                    {
                        // campos en los que realiza el cambio
                        tipoIdentificacion: tipoIdentificacion.trim(),
                        identificador: identificador.trim(),
                        nombre: nombre.trim(),
                        telefono: telefono.trim(),
                        direccion: direccion.trim()
                    },
                    config
                )
                .then((response) => {
                    Swal.fire({
                        title: 'Proveedor actualizado',
                        text: response.data.message,
                        icon: 'success',
                    }).then(() => {
                        const proveedorActualizado = proveedores.map((proveedor) =>
                        proveedor.id_proveedor ===
                                response.data.proveedor.id_proveedor
                                ? response.data.proveedor
                                : proveedor
                        );
                        setProveedores(proveedorActualizado);
                        handleClose();
                        reset()
                    });
                })
                .catch((error) => {
                    console.error('Error al actualizar el proveedor', error);

                    if (error.response && error.response.status === 403) {
                        Swal.fire({
                            title: 'Error',
                            text: error.response.data.message,
                            icon: 'error',
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un error',
                            icon: 'error',
                        }).then(() => { });
                    }
                });
        } else {
            console.error('No se pudo obtener el ID del proveedor');
        }
    };

    const editarEstado = (id) => {

        let proveedorEditado = proveedores.find(proveedor => proveedor.id_proveedor === id);
        proveedorEditado.estado = !proveedorEditado.estado

        const proveedorActualizado = proveedores.map((proveedor) =>
        proveedor.id_proveedor == id ? proveedorEditado : proveedor
        );

        setProveedores(proveedorActualizado);
    };

    return (
        <proveedoresContext.Provider
            value={{ proveedores, agregarProveedor, editarProveedor, editarEstado }}
        >
            {children}
        </proveedoresContext.Provider>
    );
};

export { proveedoresProvider };
export default proveedoresContext;
