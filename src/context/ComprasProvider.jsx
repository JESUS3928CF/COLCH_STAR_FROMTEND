import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const comprasContext = createContext();

const ComprasProviders = ({ children }) => {
    /// Respaldo de las compras
    const [compras, setCompras] = useState([]);

    const [detallesCompra, setDetallesCompra] = useState([]);

    const [totalCompra, setTotalCompra] = useState(0)

    const { config, auth } = useAuth();


    /// Calcular el total de la compra
    useEffect(() => {
        setTotalCompra(detallesCompra.reduce(
            (total, producto) => total + producto.cantidad * producto.precio,
            0
        ))
    },[detallesCompra])

    // función para obtener los clientes solo cuando se carge el componente

    const consultarCompras = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const { data } = await clienteAxios.get('/compras', config);

            setCompras(data);
        } catch (error) {
            console.log(error);
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

            console.log(newCompra);

            Swal.fire({
                title: 'Compra Agregada',
                text: newCompra.data.message,
                icon: 'success',
            }).then(() => {
                reset();
                consultarCompras();
                handleClose();
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

    const editarEstado = (id) => {
        let compraEditada = compras.find((compra) => compra.id_compra === id);
        compraEditada.estado = !compraEditada.estado;

        const compraActualizada = compras.map((compra) =>
            compra.id_compra == id ? compraEditada : compra
        );

        setCompras(compraActualizada);
    };

    const contextValue = {
        compras,
        agregarCompra,
        editarEstado,
        detallesCompra,
        setDetallesCompra,
        totalCompra,
    };

    return (
        <comprasContext.Provider value={contextValue}>
            {children}
        </comprasContext.Provider>
    );
};

export { ComprasProviders };
export default comprasContext;
