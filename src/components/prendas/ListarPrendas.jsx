//----------TOMAS SANTIAGO VANEGAS SANCHEZ---------------
//---------- 26 de septiembre 2023

//Permitirá ver los datos que están en la base de datos y la representara en una tabla y en un botón
// ver detalles donde nos mostrara una información mas completa

//Tiene una barra de búsqueda que nos ayudara a buscar una prenda en la tabla

import { useEffect, useState } from 'react';
import '../../css-general/cssgeneral.css';
import '../../css-general/tailwind.min.css';
import '../../css-general/inicio_style.css';
import '../../css-general/table.min.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import BotonNegro from '../chared/BotonNegro';
import EditarPrendas from './EditarPrendas';
import { DetallesPrendas } from '../prendas/DetallesPrendas';
import Buscador from '../chared/Buscador';
import Paginador from '../chared/Paginador';
import Swal from 'sweetalert2';
import Header from '../chared/header/Header';
import { calcularAnchoDePantalla } from '../../helpers/calcularAnchoDePantalla';
import styles from '../../css-general/CardStyleGenerar.module.css';
import {
    registrosPorPagina,
    resolucionCards,
} from '../../constantes/constantes.js';
import SeleccionarColorsEditar from './SelectColorEditar.jsx';
import usePrendas from '../../hooks/usePrendas.jsx';
import AgregarPrendas from './AgregarPrendas.jsx';
import AgregarColors from './AgregarColors.jsx';
import { formatMoney } from '../../helpers/Formato_de_datos.jsx';

export const ListarPrendas = () => {
    // conexión para traer todos los datos de la base de datos

    const { Prendas, updateEstado, updatePublicado, busqueda, setBusqueda } =
        usePrendas();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // funcion para cerrar, abrir modal de EditarDiseñosModal
    const [showw, setShoww] = useState(false);

    const handleClosee = () => {
        setShoww(false), handleShow();
    };
    const handleShoww = () => {
        setShoww(true), handleClose();
    };
    const handleClosex = () => setShoww(false);

    const [detallesPrendas, setDetallesPrendas] = useState({} || null);
    const [prendasFiltrar, setPrendasFiltrar] = useState([]);

    const [prendasFiltrarBuscados, setJPrendasFiltrarBuscados] = useState([]);

    const [prendasListar, setPrendasListar] = useState([]);

    useEffect(() => {
        if (busqueda === '') {
            setPrendasFiltrar(Prendas.slice(0, 10, registrosPorPagina));

            return;
        }

        setJPrendasFiltrarBuscados(prendasFiltrar.slice(0, registrosPorPagina));
    }, [Prendas, busqueda]);

    useEffect(() => {
        setPrendasListar([...prendasFiltrar]);
    }, [Prendas, prendasFiltrar]);

    const { setSelectColorsNombre } = usePrendas();

    const informacionModal = (Prendas) => {
        if (!Prendas.estado) {
            return Swal.fire(
                'Accion invalida!',
                'Esta prenda no se puede editar porque está inhabilitada',
                'error'
            );
        }
        setDetallesPrendas(Prendas);

        setSelectColorsNombre(Prendas.color);
        handleShow();
    };

    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

    useEffect(() => {
        /// Calcular el ancho de pantalla actual
        calcularAnchoDePantalla(setAnchoPantalla);
        setBusqueda('');
    }, []);

    return (
        <>
            <div>
                <Header titulo='Gestión de Prendas' />

                <div className='container-fluid'>
                    <div className='row pl-4'>
                        <div className='col-md-3 col-sm-12  pb-md-0 pb-4  d-flex justify-content-around align-items-center'>
                            <AgregarPrendas />
                        </div>
                        <div className='col-md-3 col-sm-12 pb-md-0 pb-4  d-flex justify-content-around align-items-center'>
                            {/* modal de precio de los diseños  */}
                            <AgregarColors />
                        </div>
                        <div className='col-md-6 col-sm-12 pb-md-0 pb-4  d-flex justify-content-around align-items-center p-0'>
                            {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                            <Buscador
                                setDatosFiltrar={setPrendasFiltrar}
                                datos={Prendas}
                                camposFiltrar={['nombre', 'cantidad', 'precio']}
                                busqueda={busqueda}
                                setBusqueda={setBusqueda}
                            />
                        </div>
                    </div>
                </div>

                {/* tabla de prendas */}
                {anchoPantalla >= resolucionCards ? (
                    <div className='tabla'>
                        <table className='table caption-top'>
                            {/* lista de prendas */}
                            <thead>
                                <tr>
                                    <th scope='col'>Nombre</th>
                                    <th scope='col'>Cantidad</th>
                                    <th scope='col'>Precio</th>
                                    <th scope='col'>Publicado</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Detalles</th>
                                    <th scope='col'>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {Datos traidos por el set prendas que realiza un mapeo} */}

                                {prendasListar.map((Prendas, index) => (
                                    <tr key={index}>
                                        <td>{Prendas.nombre}</td>
                                        <td>{Prendas.cantidad}</td>
                                        <td>{formatMoney(Prendas.precio)}</td>

                                        <td>
                                            <BotonCambioEstado
                                                id={Prendas.id_prenda}
                                                isChecked={Prendas.publicado}
                                                nombreRegistro={
                                                    'Prenda en el catalogo'
                                                }
                                                ruta={`/prendas/publicado/${Prendas.id_prenda}`}
                                                cambiarPublicacion={{
                                                    estado: Prendas.estado,
                                                    paraPublicacion: true,
                                                }}
                                                editarEstado={updatePublicado}
                                            />
                                        </td>
                                        <td>
                                            <BotonCambioEstado
                                                id={Prendas.id_prenda}
                                                isChecked={Prendas.estado}
                                                nombreRegistro={
                                                    'Prenda en el estado '
                                                }
                                                ruta={`/prendas/estado/${Prendas.id_prenda}`}
                                                editarEstado={updateEstado}
                                            />
                                        </td>

                                        <td>
                                            <BotonNegro
                                                text='Ver'
                                                modalToOpen='#modalDetallePrendas'
                                                onClick={() =>
                                                    setDetallesPrendas(Prendas)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <BotonNegro
                                                text='Editar'
                                                // modalToOpen={Prendas.estado ? "#modalEditarPrenda" : ""}
                                                onClick={() =>
                                                    informacionModal(Prendas)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={`row pt-4 justify-content-center`}>
                        {prendasListar.map((Prendas) => (
                            <div
                                className={`col-md-4 col-sm-6 col-xs-12`}
                                key={Prendas.id_prenda}
                            >
                                <div
                                    className={`card mb-4 ${styles.contenedor_card}`}
                                >
                                    <img
                                        className='card-img-top'
                                        src={`${
                                            import.meta.env.VITE_BACKEND_URL
                                        }/${Prendas.imagen}`}
                                        alt={Prendas.nombre}
                                    ></img>
                                    <div className='card-body'>
                                        <p className={styles.text}>
                                            Nombres:{' '}
                                            <span>{Prendas.nombre}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Cantidad:{' '}
                                            <span>{Prendas.cantidad}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Precio:{' '}
                                            <span>
                                                {formatMoney(Prendas.precio)}
                                            </span>
                                        </p>

                                        <div className='row pt-3'>
                                            <div className='col-6 justify-content-center align-items-center '>
                                                <div className='text-center'>
                                                    <strong
                                                        className={`${styles.textoEstado}`}
                                                    >
                                                        {' '}
                                                        Publicado{' '}
                                                    </strong>
                                                </div>
                                                <div className='text-center'>
                                                    <BotonCambioEstado
                                                        id={Prendas.id_prenda}
                                                        isChecked={
                                                            Prendas.publicado
                                                        }
                                                        nombreRegistro='Prendas'
                                                        ruta={`/prendas/publicado/${Prendas.id_prenda}`}
                                                        cambiarPublicacion={{
                                                            estado: Prendas.estado,
                                                            paraPublicacion: true,
                                                        }}
                                                        editarEstado={
                                                            updatePublicado
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-6 justify-content-center align-items-center'>
                                                <div className='text-center'>
                                                    <strong
                                                        className={
                                                            styles.textoEstado
                                                        }
                                                    >
                                                        {' '}
                                                        Inhabilitar{' '}
                                                    </strong>
                                                </div>
                                                <div className='text-center'>
                                                    <BotonCambioEstado
                                                        id={Prendas.id_prenda}
                                                        isChecked={
                                                            Prendas.estado
                                                        }
                                                        nombreRegistro='Prendas'
                                                        ruta={`/prendas/estado/${Prendas.id_prenda}`}
                                                        editarEstado={
                                                            updateEstado
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <div className='row'>
                                            <div
                                                className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                                            >
                                                <BotonNegro
                                                    text='Detalles'
                                                    modalToOpen='#modalDetallePrendas'
                                                    onClick={() =>
                                                        setDetallesPrendas(
                                                            Prendas
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div
                                                className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                                            >
                                                <BotonNegro
                                                    text='Editar'
                                                    onClick={() =>
                                                        informacionModal(
                                                            Prendas
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className='seccion4'>
                    {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                    <Paginador
                        setDatosFiltrar={setPrendasListar}
                        datos={busqueda === '' ? Prendas : prendasFiltrar}
                    />
                </div>
            </div>
            <DetallesPrendas detallesPrendas={detallesPrendas} />
            <EditarPrendas
                detallesPrendas={detallesPrendas}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
                //// funcion para cerrar, abrir modal de EditarDiseñosModal
                handleClosee={handleClosee}
                handleShoww={handleShoww}
                showw={showw}
                handleClosex={handleClosex}
            />
            <SeleccionarColorsEditar
                detallesPrendas={detallesPrendas}
                handleClosee={() => {}}
                showw={false}
            />
        </>
    );
};

export default ListarPrendas;
