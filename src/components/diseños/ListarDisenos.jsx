// ------------------JESÚS ANTONIO COCHERO FLORIÁN
//-------------------26 de septiembre 2023
// Nos permitira Listar todos los diseños de la base de datos y que agreguemos por medio del agregar diseño,
// existira una barra buscar que nos permite buscar cualquier informacion mediante un filtro, la busqueda se realiza por cualquier campo que este en esta tabla
import { useEffect, useState } from 'react';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import BotonNegro from '../chared/BotonNegro';
import clienteAxios from '../../config/axios';
import { DetalleDiseno } from './DetalleDiseno';
import EditarDiseno from './EditarDiseno';
import Buscador from '../chared/Buscador';
import Paginador from '../chared/Paginador';
import Swal from 'sweetalert2';

const ListarDisenos = () => {
    // este estado es un respaldo de los diseños para cuando se filtren luego se puedan recuperar los que fueron eliminados del filtro
    const [disenos, setDisenos] = useState([]);

    // Este estado es para poder determinar que diseños concuerdan con la búsqueda y poder eliminar los que no
    const [disenosFiltrar, setDisenosFiltrar] = useState([]);

    const [detalleDiseno, setDetalleDiseno] = useState({});

    /// Esta función es para paras los datos a los modales ya sea el de ver detalle o el de editar para usarlos desde allá
    const informacionModalEditar = (diseno) => {
        /// Aca enviamos una alerta para cundo no se puede editar el modal
        if (!diseno.estado) {
            return Swal.fire(
                'Acción inválida!',
                'Este diseño no se puede editar porque está inhabilitado',
                'error'
            );
        }
        setDetalleDiseno(diseno);
    };

    const informacionModal = (diseno) => {
        setDetalleDiseno(diseno);
    };

    /// Use Effect para consultar la api cuando carge la pagina
    useEffect(() => {
        /// Query a la api
        const consultarDisenos = async () => {
            const respuesta = await clienteAxios.get('/disenos');
            setDisenos(respuesta.data);
            setDisenosFiltrar(respuesta.data.slice(0, 10)); // Inicializa con los primeros 10 diseños
        };

        /// Hacer la petición a la api
        consultarDisenos();
    }, []);

    return (
        <>
            <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Buscador
                    setDatosFiltrar={setDisenosFiltrar}
                    datos={disenos}
                    camposFiltrar={['nombre', 'publicacion']}
                />
            </div>
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
                        {disenosFiltrar.map((diseno) => (
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
                                        nombreRegistro={'diseño'}
                                        ruta={`/disenos/publicado/${diseno.id_diseno}`}
                                        cambiarPublicacion={{
                                            estado: diseno.estado,
                                            paraPublicacion: true,
                                        }}
                                    />
                                </td>
                                <td>
                                    <BotonCambioEstado
                                        id={diseno.id_diseno}
                                        isChecked={diseno.estado}
                                        nombreRegistro={'diseño'}
                                        ruta={`/disenos/estado/${diseno.id_diseno}`}
                                    />
                                </td>
                                <td>
                                    {/* con el ternario determinamos si abrir o no el modal*/}
                                    <BotonNegro
                                        text='Editar'
                                        modalToOpen={
                                            diseno.estado ? '#modalDiseño' : ''
                                        }
                                        onClick={() =>
                                            informacionModalEditar(diseno)
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador
                    setDatosFiltrar={setDisenosFiltrar}
                    datos={disenos}
                />
            </div>

            {/* <!-- ver detalle de productos --> */}
            <DetalleDiseno detalleDiseno={detalleDiseno} />

            {/* <!-- modal para editar diseño --> */}
            <EditarDiseno detalleDiseno={detalleDiseno} />
        </>
    );
};

export default ListarDisenos;
