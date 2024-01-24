import { createContext, useEffect, useState } from 'react';
import ordenAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const ordenesContext = createContext();

const OrdenesProvider = ({ children }) => {
    const { config, auth } = useAuth();


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







    return (
        <ordenesContext.Provider
            value={{ ordenes }}
        >
            {children}
        </ordenesContext.Provider>
    );

    
};

export { OrdenesProvider };
export default ordenesContext;
