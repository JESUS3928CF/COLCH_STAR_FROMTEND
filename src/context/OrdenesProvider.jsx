import { createContext, useEffect, useState } from 'react';
import ordenAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const ordenesContext = createContext();

const OrdenesProvider = ({ children }) => {
    const { config, auth } = useAuth();


    const [detallesOrden, setDetallesOrden] = useState([]);

    const [totalCompra, setTotalCompra] = useState(0);

    console.log(detallesOrden)


    /// Calcular el total de la compra
    useEffect(() => {
        setTotalCompra(
            detallesOrden.reduce(
                (total, producto) =>
                    total + producto.cantidad * producto.precio,
                0
            )
        );
    }, [detallesOrden]);


    // primer state
    const [ordenes, setOrdenes] = useState([]);


    // función para obtener los clientes solo cuando se carge el componente

    const consultarOrdenes = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const { data } = await ordenAxios.get('/ordenes', config);

            setOrdenes(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        consultarOrdenes ();
    }, [auth]);


    const agregarOrden = async (data, reset, handleClose) => {

        const { fecha_entrega, fk_cliente } = data;


        try {
            const newOrden = await ordenAxios.post(
                '/ordenes',
                {
                    total_de_compra:totalCompra ,
                    fecha_entrega: fecha_entrega,
                    fk_cliente: fk_cliente,
                    detallesOrdenes: detallesOrden,
                },
                config
            );

            Swal.fire({
                title: 'Compra Agregada',
                text: newOrden.data.message,
                icon: 'success',
            }).then(() => {
                consultarOrdenes();
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

    const editarEstado = (id) => {
        let compraEditada = compras.find((compra) => compra.id_compra === id);
        compraEditada.estado = !compraEditada.estado;

        const compraActualizada = compras.map((compra) =>
            compra.id_compra == id ? compraEditada : compra
        );

        setCompras(compraActualizada);
    };



    







    return (
        <ordenesContext.Provider
            value={{ ordenes,agregarOrden, setDetallesOrden, detallesOrden }}
        >
            {children}
        </ordenesContext.Provider>
    );

    
};

export { OrdenesProvider };
export default ordenesContext;
