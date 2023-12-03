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

    const agregarCompra =  async(data) => {
        const {
            fecha,
            fk_proveedor,
            cantidad,
            precio,
            total = cantidad * precio,
        } = data;

        try {
            const newCompra = await clienteAxios.post('/compra', {
                total_de_compra: total,
                fecha: fecha,
                fk_proveedor: fk_proveedor,
                DetallesCompras: [
                    {
                        cantidad: 4,
                        precio: 5,
                        fk_prenda: 1,
                    },
                    {
                        cantidad: 8,
                        precio: 2000,
                        fk_prenda: 1,
                    },
                ],
            });

            console.log(newCompra);

            Swal.fire({
                title: 'Prenda agregado',
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
    }

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
