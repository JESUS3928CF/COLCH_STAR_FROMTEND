import { createContext, useEffect, useState } from 'react';
import rolAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
const rolesContext = createContext();

const RolesProvider = ({ children }) => {
    const { config, auth } = useAuth();

    // primer state
    const [roles, setRoles] = useState([]);

    // función para obtener los clientes solo cuando se carge el componente

    const consultarRoles = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const { data } = await rolAxios.get('/rol', config);

            setRoles(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        consultarRoles();
    }, [auth]);

    const agregarRol = async (rol, reset, handleClose) => {
        try {
            const res = await rolAxios.post('/rol', rol, config);

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Rol agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                reset();
                consultarRoles();
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

    const editarRoles = (data, editarRol, permisos, setErrorPermisos, esRolAdministrador, handleClose) => {
        const { nombre } = data;

        if (permisos.length === 0 && !esRolAdministrador) {
            setErrorPermisos('Debes seleccionar al menos un permiso');
            return;
        } else {
            setErrorPermisos(null);
        }

        // Ruta
        if (editarRol && editarRol.id_rol) {
            axios
                .patch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/rol/${
                        editarRol.id_rol
                    }`,
                    {
                        nombre: nombre.trim(),
                        permisos: permisos,
                    },
                    config
                )
                .then((response) => {
                    console.log('Rol actualizado:', response.data);
                    Swal.fire({
                        title: 'Rol actualizado',
                        text: response.data.message,
                        icon: 'success',
                    }).then(() => {
                        consultarRoles();
                        handleClose();
                    });
                })
                .catch((error) => {

                    if (error.response && error.response.status === 403) {
                        Swal.fire({
                            title: 'Error',
                            text: error.response.data.message,
                            icon: 'error',
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un error',
                            icon: 'error',
                        })
                    }
                });
        } else {
            console.error('No se pudo obtener el ID del rol');
        }
    }

    const editarEstado = (id) => {

        let rolEditado = roles.find( rol => rol.id_rol === id);
            rolEditado.estado = !rolEditado.estado

        const rolActualizado = roles.map((rol) =>
            rol.id_rol == id ? rolEditado : rol
        );

        setRoles(rolActualizado);
    };


    return (
        <rolesContext.Provider
            value={{ roles, agregarRol, editarEstado, editarRoles}}
        >
            {children}
        </rolesContext.Provider>
    );
};



export { RolesProvider };
export default rolesContext;