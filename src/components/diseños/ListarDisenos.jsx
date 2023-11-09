// ------------------JESÚS ANTONIO COCHERO FLORIÁN
//-------------------26 de septiembre 2023
// Nos permitira Listar todos los diseños de la base de datos y que agreguemos por medio del agregar diseño,
// existira una barra buscar que nos permite buscar cualquier informacion mediante un filtro, la busqueda se realiza por cualquier campo que este en esta tabla
import { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { DetalleDiseno } from './DetalleDiseno';
import EditarDiseno from './EditarDiseno';
import Buscador from '../chared/Buscador';
import Paginador from '../chared/Paginador';
import Swal from 'sweetalert2';
import TablaDisenos from './TablaDiseno/TablaDisenos';

const ListarDisenos = () => {
    // este estado es un respaldo de los diseños para cuando se filtren luego se puedan recuperar los que fueron eliminados del filtro
    const [disenos, setDisenos] = useState([]);

    // Este estado es para poder determinar que diseños concuerdan con la búsqueda y poder eliminar los que no
    const [disenosFiltrar, setDisenosFiltrar] = useState([]);
    /// Para capturar el ancho de pantalla

    const [detalleDiseno, setDetalleDiseno] = useState({});
    

    /// Esta función es para paras los datos a los modales ya sea el de ver detalle o el de editar para usarlos desde allá
    const LlenarInformacionModalEditar = (diseno) => {
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

    const llenarInformacionModal = (diseno) => {
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
            <div className='p-2 pt-4 d-flex justify-content-center align-items-center'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Buscador
                    setDatosFiltrar={setDisenosFiltrar}
                    datos={disenos}
                    camposFiltrar={['nombre', 'publicacion']}
                />
            </div>

            {/* este componente me permite listar los diseños mediante una tabla o una card dependiendo de la resolución actual des dispositivo */}
            <TablaDisenos
                disenosFiltrar={disenosFiltrar}
                LlenarInformacionModal={llenarInformacionModal}
                LlenarInformacionModalEditar={LlenarInformacionModalEditar}
            />

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
