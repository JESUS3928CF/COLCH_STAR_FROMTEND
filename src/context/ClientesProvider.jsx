import { createContext, useEffect, useState } from "react"
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useGeneral from "../hooks/useGeneral";

const clientesContext = createContext()

const ClientesProvider = ({children}) => {

    const { handleClick, closeModal } = useGeneral();
    const { config, auth } = useAuth();
  
    // primer state
    const [ clientes , setClientes ] = useState([]);


    // función para obtener los clientes solo cuando se carge el componente

    const consultarClientes = async () => {
        try {
            const { data } = await clienteAxios.get('/clientes', config);

            setClientes(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect( () => {
        consultarClientes();
    }, [auth])


    const agregarCliente = async (cliente, reset) => {

        /// Si el modal esta para cerrar no se agregara un nuevo cliente
        if(closeModal) return reset();

        try {
            const res = await clienteAxios.post('/clientes', cliente, config);

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Cliente agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                
            });

            // Cerrar modal
            handleClick();

            

            // consultarClientes();
            const nuevoCliente = [...clientes, cliente];
            setClientes(nuevoCliente);
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
                    location.reload();
                });
            }
        }
    }


    return (
        <clientesContext.Provider value={{ clientes, agregarCliente }}>
            {children}
        </clientesContext.Provider>
    );
}

export { ClientesProvider };
export default  clientesContext

