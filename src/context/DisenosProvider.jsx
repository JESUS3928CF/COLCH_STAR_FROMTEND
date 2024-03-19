import { createContext, useContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useMovimientos from '../hooks/useMovimientos';

// Crear el contexto
const DisenosContext = createContext();

// Proveedor del contexto, que proporciona el estado y las funciones de actualización
export const DisenosProvider = ({ children }) => {

    
    const { token, auth, config} = useAuth();

    const [disenos, setDisenos] = useState([]);
    const [disenosDB, setDisenosDB] = useState([]);
    const {consultarMovimientos,notificaciones,notificacion}= useMovimientos()

    // Estado para el parámetro de búsqueda
    const [busqueda, setBusqueda] = useState('');

    const [precios, setPrecios] = useState([]);

    const consultarPrecios = async () => {
        const respuesta = await clienteAxios.get('/precio_disenos');
        setPrecios(respuesta.data);
    };
    

    //funciones para  guardar los disenos seleccionado en productos
    const agregarDiseno = (data) => {
        const nuevoDisenos = [...disenos, data];
        setDisenos(nuevoDisenos);
    };

    const eliminarDiseno = (index) => {
        const nuevosDisenos = [...disenos];
        nuevosDisenos.splice(index, 1);
        setDisenos(nuevosDisenos);
    };

    /// Query a la api
    const consultarDisenos = async () => {
        // const token = localStorage.getItem('token');
        // if (!token) return;
        const respuesta = await clienteAxios.get('/disenos');
        setDisenosDB(respuesta.data.reverse());
    };

    useEffect(() => {
        /// Hacer la petición a la api
        consultarDisenos();
        consultarPrecios();
    }, [auth]);

    const agregarDisenoDB = async (formData, handleClose, reset) => {
        /// Almacenar el diseño en la DB
        try {
            const res = await clienteAxios.post('/disenos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Diseño agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                reset();

                const respaldoDisenos = [...disenosDB];
                respaldoDisenos.unshift(res.data.nuevoDiseno);
                setDisenosDB(respaldoDisenos);
                notificaciones(notificacion+1)
                consultarMovimientos();
                handleClose();
            });
        } catch (err) {
            if (err.response && err.response.status === 403) {
            // Lanzar alerta de error
            Swal.fire({
                title: 'Espera!!',
                text: err.response.data.message,
                icon: 'warning',
            });
        }  else {
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

    const editarDisenoDB = async (formData, detalleDiseno, handleClose) => {
        /// editar el diseño
        try {
            const res = await clienteAxios.put(
                `/disenos/${detalleDiseno.id_diseno}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Diseño Editado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                consultarDisenos();
                notificaciones(notificacion+1)
                consultarMovimientos();
                handleClose();
            });
        } catch (err) {
        if (err.response && err.response.status === 403) {

            Swal.fire({
                title: 'Espera!!',
                text: err.response.data.message,
                icon: 'warning',
            });
        }  else {
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

    const editarEstado = (id) => {
        let disenoEditado = disenosDB.find((diseno) => diseno.id_diseno === id);
        disenoEditado.estado = !disenoEditado.estado;

        const clienteActualizado = disenosDB.map((diseno) =>
            diseno.id_diseno == id ? disenoEditado : diseno
        );

        setDisenosDB(clienteActualizado);
        notificaciones(notificacion+1)
        consultarMovimientos();
    };

    const editarPublicacion = (id) => {
        let disenoEditado = disenosDB.find((diseno) => diseno.id_diseno === id);
        disenoEditado.publicado = !disenoEditado.publicado;

        const clienteActualizado = disenosDB.map((diseno) =>
            diseno.id_diseno == id ? disenoEditado : diseno
        );

        setDisenosDB(clienteActualizado);
        notificaciones(notificacion+1)
        consultarMovimientos();
    };

    const actualizarPrecioDB = async (data, reset, handleClose) => {
        try {
            const res = await clienteAxios.put(
                '/precio_disenos/' + data?.id_precio,
                {
                    precio: data?.precio,
                },
                config
            );

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Precio Editado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                consultarPrecios();
                reset();
                handleClose();
            });
        } catch (error) {
            // Lanzar alerta de error
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error',
                icon: 'Vuelva a intentarlo',
            }).then(() => {
                reset();
                handleClose();
            });
        }
    };

    // Proporcionar el estado y las funciones de actualización a los componentes hijos
    const contextValue = {
        disenos,
        agregarDiseno,
        disenosDB,
        setDisenosDB,
        agregarDisenoDB,
        editarDisenoDB,
        editarEstado,
        editarPublicacion,
        eliminarDiseno,
        setDisenos,
        precios,
        actualizarPrecioDB,
        // BUSQUEDA
        busqueda,
        setBusqueda,
    };

    return (
        <DisenosContext.Provider value={contextValue}>
            {children}
        </DisenosContext.Provider>
    );
};

// Función personalizada para utilizar el contexto en componentes hijos
export const useDisenosContext = () => {
    return useContext(DisenosContext);
};
