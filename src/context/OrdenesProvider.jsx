import { createContext, useEffect, useState } from 'react';
import ordenAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import useMovimientos from '../hooks/useMovimientos';
import usePrendas from '../hooks/usePrendas';



const ordenesContext = createContext();

const OrdenesProvider = ({ children }) => {
    const { config, auth } = useAuth();

    // Estado para el parámetro de búsqueda
    const [busqueda, setBusqueda] = useState('');

    const [detallesOrden, setDetallesOrden] = useState([]);

    const [detailsOrden, setDetailsOrden] = useState([]);

    const [editar, setEditar] = useState(false);

    const { consultPrendas } = usePrendas();


    const [totalOrden, setTotalOrden] = useState(0);
    const {consultarMovimientos,notificaciones,notificacion}= useMovimientos()


    /// Calcular el total de la orden
    useEffect(() => {
        setTotalOrden(
            detallesOrden.reduce(
                (total, producto) =>
                    total + producto.cantidad * producto.producto.precio,
                0
            )
        );
    }, [detallesOrden, setDetailsOrden]);

    // primer state
    const [ordenes, setOrdenes] = useState([]);

    // función para obtener los clientes solo cuando se carge el componente

    const consultarOrdenes = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const { data } = await ordenAxios.get('/ordenes', config);

            setOrdenes(data.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const consultarDetailsOrden = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const { data } = await clienteAxios.get('/DetalleOrden', config);
            setDetailsOrden(data);
        } catch (error) {
            console.log('error');
        }
    };

    useEffect(() => {
        consultarOrdenes();
        consultarDetailsOrden();
    }, [auth]);

    const agregarOrden = async (data, reset, handleClose) => {
        const { fecha_entrega, fk_cliente, estado_de_orden } = data;

        try {
            const newOrden = await ordenAxios.post(
                '/ordenes',
                {
                    precio_total: totalOrden,
                    fecha_entrega: fecha_entrega,
                    fk_cliente: fk_cliente,
                    detallesOrdenes: detallesOrden,
                    estado_de_orden: estado_de_orden || 'Creada',
                },
                config
            );

            Swal.fire({
                title: 'Compra Agregada',
                text: newOrden.data.message,
                icon: 'success',
            }).then(() => {
                consultarOrdenes();
                notificaciones(notificacion+1)
                consultarMovimientos();
                handleClose(reset);
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error. Vuelva a intentarlo.',
                icon: 'error',
            });
        }
    };

    const actualizarOrden = async (id_orden, data, reset, handleClose) => {
        const { fecha_entrega, fk_cliente } = data;
        try {
            const actulizarOrden = await ordenAxios.patch(
                `/ordenes/${id_orden}`,
                {
                    precio_total: totalOrden,
                    fecha_entrega: fecha_entrega,
                    fk_cliente: fk_cliente,
                    detalles: detallesOrden,
                },
                config
            );

            Swal.fire({
                title: 'Compra Agregada',
                text: actulizarOrden.data.message,
                icon: 'success',
            }).then(() => {
                consultarOrdenes();
                notificaciones(notificacion+1)
                consultarMovimientos();
                handleClose(reset);
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error. Vuelva a intentarlo.',
                icon: 'error',
            });
        }
    };

    const cambiarEstadoDeOrden = (estado, id) => {
        Swal.fire({
            title: `¿Deseas cambiar el estado de la venta a ${estado}?`,
            // text: "Este ",
            icon: 'question',
            iconColor: '#fa0000',
            showCancelButton: true,
            confirmButtonColor: '#3E5743',
            cancelButtonColor: '#252432',
            confirmButtonText: `Si, Cámbialo`,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //  Realiza la petición PATCH
                    const response = await clienteAxios.patch(
                        `/ordenes/estado/${id}`,
                        { estado: estado },
                        config
                    );

                    if (response.status === 200) {
                        Swal.fire({
                            title: `Cambio de estado exitoso`,
                            // text: "Este ",
                            icon: 'success',
                        },
                        notificaciones(notificacion+1),
                        consultarMovimientos());
                        consultPrendas()
                    } else {
                        Swal.fire(
                            'Error',
                            'Hubo un problema al cambiar el estado',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error('Error al realizar la petición:', error);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al cambiar el estado',
                        'error'
                    );
                }
            }

            consultarOrdenes();
        });
    };

    //* Funcionalidad para cerra el modal de agregar
    const [show, setShow] = useState(false);

    const handleClose = (reset) => {
        setShow(false);

        if (!reset) return;
        setDetallesOrden([]);
        reset();
    };
    const handleShow = () => setShow(true);

    //* Funcionalidad para cerra el modal de detalles
    const [showDetalles, setShowDetalles] = useState(false);

    const handleCloseDetalles = () => {
        setShowDetalles(false);
    };

    const handleShowDetalles = () => setShowDetalles(true);

    /// Funcionalidad para cerra el modal Editar
    const [showEditar, setShowEditar] = useState(false);

    const handleCloseEditar = () => setShowEditar(false);
    const handleShowEditar = () => setShowEditar(true);

    return (
        <ordenesContext.Provider
            value={{
                ordenes,
                agregarOrden,
                setDetallesOrden,
                detallesOrden,
                cambiarEstadoDeOrden,
                handleShowDetalles,
                handleCloseDetalles,
                showDetalles,
                handleClose,
                handleShow,
                show,
                handleShowEditar,
                detailsOrden,
                consultarDetailsOrden,
                handleCloseEditar,
                showEditar,
                totalOrden,
                setEditar,
                editar,
                actualizarOrden,
                consultarOrdenes,
                setTotalOrden,
                // BUSQUEDA
                busqueda,
                setBusqueda
            }}
        >
            {children}
        </ordenesContext.Provider>
    );
};

export { OrdenesProvider };
export default ordenesContext;
