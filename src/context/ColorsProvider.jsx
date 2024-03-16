import { createContext, useContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useMovimientos from '../hooks/useMovimientos';
import useCompras from '../hooks/useCompras';

const ColorsContex = createContext();

const ColorsProvider = ({ children }) => {
    const { token, auth, config } = useAuth();
    const [colors, setColores] = useState([]);
    const [colorsDb, setColorsDb] = useState([]);
    const {consultarMovimientos,notificaciones,notificacion}= useMovimientos()

    const agregarColors = (data) => {
        const newColors = [...colors, data];
        setColores(newColors);
    };

    const eliminarColors = (index) => {
        const newColors = [...colors];
        newColors.splice(index, 1);
        setColores(newColors);
    };

    const consultColors = async () => {
        const res = await clienteAxios.get('/colors');
        setColorsDb(res.data);
        setColores(res.data);
    };

    useEffect(() => {
        consultColors();
    }, [auth]);

    const addcolors = async (colors, reset, handleClose) => {
        try {
            const res = await clienteAxios.post('/colors', colors, config);
            Swal.fire({
                title: 'Color agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                reset();
                consultColors();
                consultarMovimientos();
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

    const agregarColorsDb = async (formData, handleClose, reset) => {
        try {
            const res = await clienteAxios.post('/colors', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            Swal.fire({
                title: 'Color Agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                reset();
                setColorsDb([...colorsDb, res.data.newColors]);
                consultColors();
                notificaciones(notificacion+1)
                consultarMovimientos();
                handleClose();
            });
        } catch (error) {
            // Lanzar alerta de error
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error',
                icon: 'Vuelva a intentarlo',
            }).then(handleClose());
        }
    };

    const contextValue = {
        colors,
        agregarColors,
        colorsDb,
        addcolors,
        setColorsDb,
        agregarColorsDb,
        eliminarColors,
        setColores,
    };

    return (
        <ColorsContex.Provider value={contextValue}>
            {children}
        </ColorsContex.Provider>
    );
};

export { ColorsProvider };

export default ColorsContex;
