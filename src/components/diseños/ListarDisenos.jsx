import { useEffect, useState } from 'react';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import BotonNegro from '../chared/BotonNegro';
import clienteAxios from '../../config/axios';
import { DetalleDiseno } from './DetalleDiseno';
import EditarDiseno from './EditarDiseno';
import Swal from 'sweetalert2';

const ListarDisenos = () => {
    const [disenos, setDisenos] = useState([]);
    const [detalleDiseno, setDetalleDiseno] = useState({});

    /// Esta función es para paras los datos a los modales ya sea el de ver detalle o el de editar para usarlos desde allá
    const informacionModal = (diseno) => {
        setDetalleDiseno(diseno);
    };

    /// Use Effect para consultar la api cuando carge la pagina
    useEffect(() => {
        /// Query a la api
        const consultarDisenos = async () => {
            const respuesta = await clienteAxios.get('/disenos');
            setDisenos(respuesta.data);
        };

        /// Hacer la petición a la api
        consultarDisenos();
    }, []);

    /// Cambiar Estado del diseño
    const cambiarEstado = ({estado, id_diseno}, registro, ruta) => {

        Swal.fire({
            title: `¿Deseas ${
                estado ? 'inhabilitar' : 'habilitar'
            } este ${registro}?`,
            // text: "Este ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Si, ${estado ? 'inhabilítalo' : 'habilítalo'}`,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Realiza la petición PATCH
                    const response = await clienteAxios.patch(ruta, { estado });

                    if (response.status === 200) {
                        Swal.fire(
                            `${estado ? 'inhabilitado' : 'habilitado'}`,
                            'Cambio de estado exitoso',
                            'success'
                        );
                    } else {
                        Swal.fire(
                            'Error',
                            'Hubo un problema al cambiar el estado',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error('Error al realizar la petición:', error);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al cambiar el estado',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <>
            <div className='tabla'>
                <table className='table caption-top '>
                    <caption>Lista de diseños</caption>
                    <thead>
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Ver imagen</th>
                            <th scope='col'>Publicado</th>
                            <th scope='col'>Inhabilitar</th>
                            <th scope='col'>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disenos.map((diseno) => (
                            <tr key={diseno.id_diseno}>
                                <th scope='row'>{diseno.id_diseno}</th>
                                <td>{diseno.nombre}</td>
                                <td>
                                    <BotonNegro
                                        text='Ver'
                                        modalToOpen='#modalDetalles'
                                        onClick={() => informacionModal(diseno)}
                                    />
                                </td>
                                <td>
                                    <BotonCambioEstado
                                        isChecked={diseno.publicado}
                                    />
                                </td>
                                <td>
                                    <BotonCambioEstado
                                        isChecked={diseno.estado}
                                        cambiarEstado={() =>
                                            cambiarEstado(diseno, "diseño", `/disenos/estado/${diseno.id_diseno}`)
                                        }
                                    />
                                </td>
                                <td>
                                    <BotonNegro
                                        text='Editar'
                                        modalToOpen={'#modalDiseño'}
                                        onClick={() => informacionModal(diseno)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <!-- ver detalle de productos --> */}
            <DetalleDiseno detalleDiseno={detalleDiseno} />

            {/* <!-- modal para editar diseño --> */}
            <EditarDiseno detalleDiseno={detalleDiseno} />
        </>
    );
};

export default ListarDisenos;
