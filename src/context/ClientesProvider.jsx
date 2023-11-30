import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const clientesContext = createContext();

const ClientesProvider = ({ children }) => {
    const { config, auth } = useAuth();

    // primer state
    const [clientes, setClientes] = useState([]);

    // función para obtener los clientes solo cuando se carge el componente

    const consultarClientes = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const { data } = await clienteAxios.get('/clientes', config);

            setClientes(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        consultarClientes();
    }, [auth]);

    const agregarCliente = async (cliente, reset, handleClose) => {
        try {
            
            const res = await clienteAxios.post('/clientes', cliente, config);

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Cliente agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                reset();
                setClientes([...clientes, res.data.nuevoCliente]);
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

    const editarCliente = (cliente, handleClose, reset) => {
        const {
            identificacion,
            tipoIdentificacion,
            nombre,
            apellido,
            telefono,
            email,
            direccion,
        } = cliente;

        if (cliente.id_cliente) {
            axios
                .patch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/clientes/${
                        cliente.id_cliente
                    }`,
                    {
                        // Campos en los que realiza el cambio
                        tipoIdentificacion: tipoIdentificacion.trim(),
                        identificacion: identificacion.trim(),
                        nombre: nombre.trim(),
                        apellido: apellido.trim(),
                        telefono: telefono.trim(),
                        email: email.trim(),
                        direccion: direccion.trim(),
                    },
                    config
                )
                .then((response) => {
                    Swal.fire({
                        title: 'Cliente actualizado',
                        text: response.data.message,
                        icon: 'success',
                    }).then(() => {
                        const clienteActualizado = clientes.map((cliente) =>
                            cliente.id_cliente ===
                            response.data.cliente.id_cliente
                                ? response.data.cliente
                                : cliente
                        );
                        setClientes(clienteActualizado);
                        handleClose();
                        reset()
                    });
                })
                .catch((error) => {
                    console.error('Error al actualizar el cliente', error);

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
                        }).then(() => {});
                    }
                });
        } else {
            console.error('No se pudo obtener el ID del cliente');
        }
    };

    const editarEstado = (id) => {

        let clienteEditado = clientes.find( cliente => cliente.id_cliente === id);
        clienteEditado.estado = !clienteEditado.estado

        const clienteActualizado = clientes.map((cliente) =>
            cliente.id_cliente == id ? clienteEditado : cliente
        );

        setClientes(clienteActualizado);
    };

    return (
        <clientesContext.Provider
            value={{ clientes, agregarCliente, editarCliente, editarEstado }}
        >
            {children}
        </clientesContext.Provider>
    );
};

export { ClientesProvider };
export default clientesContext;
