import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useMovimientos from '../hooks/useMovimientos';
import usePrendas from '../hooks/usePrendas';

const comprasContext = createContext();

const ComprasProviders = ({ children }) => {
    // Prendas para actualizar sus cantidades
    const { Prendas, consultPrendas } = usePrendas();

    /// Respaldo de las compras
    const [compras, setCompras] = useState([]);

    // Estado para el parámetro de búsqueda
    const [busqueda, setBusqueda] = useState('');

    const [detallesCompra, setDetallesCompra] = useState([]);

    const [totalCompra, setTotalCompra] = useState(0);

    const { config, auth } = useAuth();

    const {consultarMovimientos,notificaciones,notificacion}= useMovimientos()

    /// Calcular el total de la compra
    useEffect(() => {
        setTotalCompra(
            detallesCompra.reduce(
                (total, producto) =>
                    total + producto.cantidad * producto.precio,
                0
            )
        );
    }, [detallesCompra]);

    // función para obtener los clientes solo cuando se carge el componente

    const consultarCompras = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const { data } = await clienteAxios.get('/compras', config);

            setCompras(data.reverse());
        } catch (error) {
            Swal.fire({
                title: `error al consultar las compras`,
                icon: 'error',
            });
        }
    };

    useEffect(() => {
        consultarCompras();
    }, [auth]);

    const agregarCompra = async (data, reset, handleClose) => {
        const { fecha, fk_proveedor } = data;

        try {
            const newCompra = await clienteAxios.post(
                '/compras',
                {
                    total_de_compra: totalCompra,
                    fecha: fecha,
                    fk_proveedor: fk_proveedor,
                    DetallesCompras: detallesCompra,
                },
                config
            );

            Swal.fire({
                title: 'Compra Agregada',
                text: newCompra.data.message,
                icon: 'success',
            }).then(() => {
                consultarCompras();
                notificaciones(notificacion+1)
                consultarMovimientos();
                handleClose(reset);
                setTotalCompra(0);
                setDetallesCompra([]);
                consultPrendas();
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error. Vuelva a intentarlo.',
                icon: 'error',
            });
        }
    };

    const editarEstado = (id) => {
        let compraEditada = compras.find((compra) => compra.id_compra === id);
        compraEditada.estado = !compraEditada.estado;

        const compraActualizada = compras.map((compra) =>
            compra.id_compra == id ? compraEditada : compra
        );

        setCompras(compraActualizada);
        notificaciones(notificacion+1)
        consultarMovimientos();
        consultPrendas();
    };

    /// La funcionalidad para manipular los modales la voy a declarar desde aca

    //* Funcionalidad para cerra el modal de agregar
    const [show, setShow] = useState(false);

    const handleClose = (reset) => {
        setShow(false);

        if (!reset) return;
        setTotalCompra(0);
        setDetallesCompra([]);
        reset();
    };
    const handleShow = () => setShow(true);

    //* Funcionalidad para cerra el modal de detalles
    const [showDetalles, setShowDetalles] = useState(false);

    const handleCloseDetalles = () => {
        setShowDetalles(false);
    };
    const handleShowDetalles = () => setShowDetalles(true);

    const contextValue = {
        compras,
        agregarCompra,
        editarEstado,
        totalCompra,
        setTotalCompra,
        /// Modal agregar
        show,
        handleClose,
        handleShow,
        /// Detalles compra
        detallesCompra,
        setDetallesCompra,
        showDetalles,
        handleCloseDetalles,
        handleShowDetalles,
        busqueda,
        setBusqueda
    };

    return (
        <comprasContext.Provider value={contextValue}>
            {children}
        </comprasContext.Provider>
    );
};

export { ComprasProviders };
export default comprasContext;
