import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const comprasContext = createContext();

const ComprasProviders = ({ children }) => {
    /// Respaldo de las compras
    const [compras, setCompras] = useState([]);

    const { config, auth } = useAuth();

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

    const agregarCompra = async (data) => {
        const { fecha, fk_proveedor } = data;

        //todo: hacer de esto un estado
        const detallesCompras = [
            {
                cantidad: 4,
                precio: 1000,
                fk_prenda: 1,
            },
            {
                cantidad: 3,
                precio: 2000,
                fk_prenda: 1,
            },
        ];

        //todo: Hacer de esto un estado
        const total = detallesCompras.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0);

        try {
            const newCompra = await clienteAxios.post('/compra', {
                total_de_compra: total,
                fecha: fecha,
                fk_proveedor: fk_proveedor,
                DetallesCompras: detallesCompras,
            });

            console.log(newCompra);

            Swal.fire({
                title: 'Compra Agregada',
                text: newCompra.data.message,
                icon: 'success',
            }).then(location.reload());
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error',
                icon: 'Vuelva a intentarlo',
            });
        }
    };

    const contextValue = {
        compras,
        agregarCompra,
    };

    return (
        <comprasContext.Provider value={contextValue}>
            {children}
        </comprasContext.Provider>
    );
};

export { ComprasProviders };
export default comprasContext;
