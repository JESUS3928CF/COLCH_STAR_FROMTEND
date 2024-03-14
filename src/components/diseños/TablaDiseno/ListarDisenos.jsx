// ------------------JESÚS ANTONIO COCHERO FLORIÁN
//-------------------26 de septiembre 2023
// Nos permitirá Listar todos los diseños de la base de datos y que agreguemos por medio del agregar diseño,
// existirá una barra buscar que nos permite buscar cualquier informacion mediante un filtro, la busqueda se realiza por cualquier campo que este en esta tabla
import { useEffect, useState } from 'react';
import { DetalleDiseno } from '../DetalleDiseno';
import EditarDiseno from '../EditarDiseno';
import Buscador from '../../chared/Buscador';
import Paginador from '../../chared/Paginador';
import Swal from 'sweetalert2';
import TablaDisenos from './TablaDisenos';
import { useDisenosContext } from '../../../context/DisenosProvider';
import AgregarDiseno from '../AgregarDiseno';
import PrecioDiseno from '../PrecioDiseno';
import { registrosPorPagina } from '../../../constantes/constantes';

const ListarDisenos = () => {
    // este estado es un respaldo de los diseños para cuando se filtren luego se puedan recuperar los que fueron eliminados del filtro

    const { disenosDB, busqueda, setBusqueda } = useDisenosContext();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Este estado es para poder determinar que diseños concuerdan con la búsqueda y poder eliminar los que no
    const [disenosFiltrar, setDisenosFiltrar] = useState([]);
    
   const [disenosFiltrarBuscados, setDisenosFiltrarBuscados] = useState([]);

   const [disenosListar, setDisenosListar] = useState([]);



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
        handleShow();
    };

    const llenarInformacionModal = (diseno) => {
        setDetalleDiseno(diseno);
    };

    /// Use Effect para consultar la api cuando carge la pagina
    useEffect(() => {
        setDisenosFiltrar(disenosDB.slice(0, 10)); // Inicializa con los primeros 10 diseños
    }, [disenosDB]);


    /// Filtrar los 10 primeras ventas a mostrar en la vista
    useEffect(() => {
        if (busqueda === '') {
            setDisenosFiltrar(disenosDB.slice(0, registrosPorPagina));

            return;
        }

        setDisenosFiltrarBuscados(disenosFiltrar.slice(0, registrosPorPagina));
    }, [disenosDB, busqueda]);

    useEffect(() => {
        setDisenosListar([...disenosFiltrar]);
    }, [disenosDB, disenosFiltrar]);

    return (
        <>
            {/* Sección de los Botones de diseños*/}
            <div className='container-fluid'>
                <div className='row pl-4'>
                    {/* botón de agregar diseño  */}
                    <div className='col-md-3 col-sm-12  pb-md-0 pb-4  d-flex justify-content-around align-items-center'>
                        {/* modal de agregar diseño  */}
                        <AgregarDiseno />
                    </div>
                    <div className='col-md-3 col-sm-12 pb-md-0 pb-4  d-flex justify-content-around align-items-center'>
                        {/* modal de precio de los diseños  */}
                        <PrecioDiseno />
                    </div>
                    <div className='col-md-6 col-sm-12 pb-md-0 pb-4  d-flex justify-content-around align-items-center p-0'>
                        {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                        <Buscador
                            setDatosFiltrar={setDisenosFiltrar}
                            datos={disenosDB}
                            camposFiltrar={['nombre']}
                            busqueda={busqueda}
                            setBusqueda={setBusqueda}
                        />
                    </div>
                </div>
            </div>

            {/* este componente me permite listar los diseños mediante una tabla o una card dependiendo de la resolución actual des dispositivo */}
            <TablaDisenos
                disenosFiltrar={disenosListar}
                LlenarInformacionModal={llenarInformacionModal}
                LlenarInformacionModalEditar={LlenarInformacionModalEditar}
                setBusqueda={setBusqueda}
            />

            <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador
                    setDatosFiltrar={setDisenosListar}
                    datos={busqueda === '' ? disenosDB : disenosFiltrar}
                />
            </div>

            {/* <!-- ver detalle de productos --> */}
            <DetalleDiseno detalleDiseno={detalleDiseno} />

            {/* <!-- modal para editar diseño --> */}
            <EditarDiseno
                detalleDiseno={detalleDiseno}
                show={show}
                handleClose={handleClose}
            />
        </>
    );
};

export default ListarDisenos;
