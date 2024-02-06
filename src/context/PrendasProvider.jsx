import { useEffect, useState } from 'react';
import { createContext } from 'react';
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/axios';
import axios from 'axios';
import Swal from 'sweetalert2';
import useColors from '../hooks/useColors';
import useMovimientos from '../hooks/useMovimientos';

const prendasContex = createContext();

const PrendasProvider = ({ children }) => {
    const { auth, token } = useAuth();
    const { colors, setColores } = useColors();
    const { consultarMovimientos } = useMovimientos();

    const [Prendas, setPrendas] = useState([]);
    const [selectColorsNombre, setSelectColorsNombre] = useState([]);

    const consultPrendas = async () => {
        try {
            const { data } = await clienteAxios.get('/prendas');

            setPrendas(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        consultPrendas();
    }, [auth]);

    const agregarPrendas = async (prenda, reset, handleClose) => {
        try {
            const res = await clienteAxios.post('/prendas', prenda, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            Swal.fire({
                title: 'Prenda agregada',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                reset();
                consultPrendas();
                consultarMovimientos();
                handleClose();
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error',
                icon: 'error',
            }).then(() => {
                handleClose();
            });
        }

        setSelectColorsNombre([]);
    };

    const updatePrendas = (data, detallesPrendas, handleClose) => {
        const {
            nombre,
            cantidad,
            precio,
            genero,
            imagen,
            tipo_de_tela,
            publicado,
            tallas,
        } = data;

        if (detallesPrendas.id_prenda) {
            axios
                .put(
                    `${import.meta.env.VITE_BACKEND_URL}/api/prendas/${
                        detallesPrendas.id_prenda
                    }`,
                    {
                        nombre: nombre,
                        cantidad: cantidad,
                        precio: precio,
                        tipo_de_tela: tipo_de_tela.trim(),
                        genero: genero,
                        imagen: imagen[0],
                        publicado: publicado,
                        tallas: tallas,
                        colores: JSON.stringify(selectColorsNombre),
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    Swal.fire({
                        title: 'Prenda Actualizada',
                        text: res.data.message,
                        icon: 'success',
                    }).then(() => {
                        consultPrendas();
                        consultarMovimientos();
                        handleClose();
                    });
                })
                .catch((error) => {
                  
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error',
                        icon: 'error',
                    });
                });
        } else {
            alert('No se encontró el Id');
        }

        setSelectColorsNombre([]);
    };

    const updateEstado = (id) => {
        let prendaUpdate = Prendas.find((prenda) => prenda.id_prenda == id);
        prendaUpdate.estado = !prendaUpdate.estado;

        const prendaActualizada = Prendas.map((prenda) =>
            prenda.id_prenda == id ? prendaUpdate : prenda
        );

        setPrendas(prendaActualizada);
        consultarMovimientos();
    };

    const updatePublicado = (id) => {
        let prendaUpdate = Prendas.find((prenda) => prenda.id_prenda == id);
        prendaUpdate.publicado = !prendaUpdate.publicado;

        const prendaActualizada = Prendas.map((prenda) =>
            prenda.id_prenda == id ? prendaUpdate : prenda
        );

        setPrendas(prendaActualizada);
        consultarMovimientos();
    };

    const contextValue = {
        Prendas,
        selectColorsNombre,
        agregarPrendas,
        consultPrendas,
        updatePrendas,
        updateEstado,
        updatePublicado,
        setSelectColorsNombre,
    };

    return (
        <prendasContex.Provider value={contextValue}>
            {children}
        </prendasContex.Provider>
    );
};

export { PrendasProvider };
export default prendasContex;
