

import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import Paginador from '../chared/Paginador'
import BotonNegro from '../chared/BotonNegro';
import Header from '../chared/header/Header'
import Buscador from '../chared/Buscador';
import AgregarOrden from '../ordenes/AgregarOrden.jsx';
import DetallesOrden from './DetallesOrden.jsx';
import EditarOrden from './EditarOrden.jsx';
import style from '../../pages/proveedores.module.css';
import useOrden from '../../hooks/useOrden.jsx'
import { useEffect, useState } from 'react';
import { calcularAnchoDePantalla } from "../../helpers/calcularAnchoDePantalla";
import { registrosPorPagina, resolucionCards } from "../../constantes/constantes.js";
import styles from "../../css-general/CardStyleGenerar.module.css";

import Swal from 'sweetalert2';


//Componente
const ListarOrdenes = () => {

    //ordenes tiene la consulta de todos las ordenes de la base de datos
    const { ordenes,cambiarEstadoDeOrden } = useOrden();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [OrdenesFiltrar, setOrdenesFiltrar] = useState([]);
    //detallesProductos
    const [detallesOrdenes, setDetallesOrdenes] = useState({});



    //Estado para editar
    const [editarOrden, setEditarOrden] = useState({});


    //codicion que se le asigna al boton editar que si el estado de la  orde de entrega esta en Entregado no te va permitir editar
    const handleEditClick = (orden) => {

        if (
            orden.estado_de_orden === 'Entregada' ||
            orden.estado_de_orden === 'Finalizada'
        ) {
            return Swal.fire(
                'Acción inválida!',
                `Esta Orden ha sido ${
                    orden.estado_de_orden ===
                    "Finalizada" ? 'Finalizada' : 'Entregada'
                } , No se puede editar`,
                'error'
            );
        }


        setEditarOrden(orden);
        handleShow();
    };



    // solicitud  a la url
    useEffect(() => {
        setOrdenesFiltrar(ordenes.slice(0, registrosPorPagina))
    }, [ordenes]);


    // ancho de la pantalla para el resposive
    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);


    useEffect(() => {
        /// Calcular el ancho de pantalla actual
        calcularAnchoDePantalla(setAnchoPantalla);
    }, []);



    return (
        <div>
            <div className='contenedor'>
                <Header titulo='Gestión de Ordenes' />
                <div className='container-fluid '>
                    <div className='row'>
                        <div
                            className={`${style.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                            <AgregarOrden />
                        </div>

                        {/* botón de buscar */}
                        <div
                            className={`${style.buscador} col-md-6 col-ms-8 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                            <Buscador
                                setDatosFiltrar={setOrdenesFiltrar} //se le manda por medio de setProveedoresFiltrar el resultado
                                datos={ordenes} //se le dice que datos son los que se van a filtrar y son por los que trae de la base de datos
                                camposFiltrar={[
                                    'precio_total',
                                    'fecha_entrega',
                                    'estado_de_orden',
                                ]} //se le manda los campos por donde se puede filtrar
                            />
                        </div>
                    </div>
                </div>
                {/* tabla  para listar el proveedor */}
                {anchoPantalla >= resolucionCards ? (
                    <div className='tabla'>
                        <table className='table caption-top '>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Precio total</th>
                                    <th scope='col'>Dirección</th>
                                    <th scope='col'>Fecha entrega</th>
                                    <th scope='col'>Detalles</th>
                                    <th scope='col'>Estado orden</th>
                                    <th scope='col'>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* // ProveedoresFiltrar hace el mapeo las busqueda de los datos y arroja el resultado  */}
                                {OrdenesFiltrar.map((orden) => (
                                    <tr key={orden.id_orden}>
                                        <td>{orden.id_orden}</td>
                                        <td>
                                            {orden.cliente.nombre}{' '}
                                            {orden.cliente.apellido}
                                        </td>
                                        <td>{orden.precio_total}</td>
                                        <td>{orden.cliente.direccion}</td>
                                        <td>{orden.fecha_entrega}</td>
                                        <td>
                                            <BotonNegro
                                                text='Ver'
                                                modalToOpen='#modalDetalles'
                                                onClick={() =>
                                                    setDetallesOrdenes(orden)
                                                }
                                            />
                                        </td>
                                        <select
                                            name='estado_de_orden'
                                            value={orden.estado_de_orden}
                                            onChange={(e) =>
                                                cambiarEstadoDeOrden(
                                                    e.target.value,
                                                    orden.id_orden
                                                )
                                            }
                                        >
                                            <option value='Creada'>
                                                Creada
                                            </option>
                                            <option value='En Proceso'>
                                                En Proceso
                                            </option>
                                            <option value='Finalizada'>
                                                Finalizada
                                            </option>
                                            <option value='Entregada'>
                                                Entregada
                                            </option>
                                        </select>
                                        <td>
                                            <BotonNegro
                                                text='Editar'
                                                onClick={() =>
                                                    handleEditClick(orden)
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
                        {OrdenesFiltrar.map((orden) => (
                            <div
                                className={`col-md-4 col-sm-6 col-xs-12`}
                                key={orden.id_orden}
                            >
                                <div
                                    className={`card mb-4 ${styles.contenedor_card}`}
                                >
                                    <div className='card-body'>
                                        <p className={styles.text}>
                                            Id: <span>{orden.id_orden}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Nombre:: {orden.cliente.nombre}{' '}
                                            {orden.cliente.apellido}
                                        </p>
                                        <p className={styles.text}>
                                            Precio Total:{' '}
                                            <span>{orden.precio_total}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Dirección:{' '}
                                            <span>
                                                {orden.cliente.direccion}
                                            </span>
                                        </p>
                                        <p className={styles.text}>
                                            Fecha Entrega:{' '}
                                            <span>{orden.fecha_entrega}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Estado de Orden:{' '}
                                            <select
                                                name='estado_de_orden'
                                                value={orden.estado_de_orden}
                                                onChange={(e) =>
                                                    cambiarEstadoDeOrden(
                                                        e.target.value,
                                                        orden.id_orden
                                                    )
                                                }
                                            >
                                                <option value='Creada'>
                                                    Creada
                                                </option>
                                                <option value='En Proceso'>
                                                    En Proceso
                                                </option>
                                                <option value='Finalizada'>
                                                    Finalizada
                                                </option>
                                                <option value='Entregada'>
                                                    Entregada
                                                </option>
                                            </select>
                                        </p>
                                    </div>

                                    <div className='card-footer'>
                                        <div className='row'>
                                            <div
                                                className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                                            >
                                                <BotonNegro
                                                    text='Ver'
                                                    modalToOpen='#modalDetalles'
                                                    onClick={() =>
                                                        setDetallesOrdenes(
                                                            orden
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div
                                                className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                                            >
                                                <BotonNegro
                                                    text='Editar'
                                                    modalToOpen={
                                                        !orden.estado_de_orden ===
                                                            'Finalizada' ||
                                                        !orden.estado_de_orden ===
                                                            'Entregada'
                                                            ? '#modalEditar'
                                                            : ''
                                                    }
                                                    onClick={() =>
                                                        handleEditClick(orden)
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
            </div>
            <EditarOrden
                orden={editarOrden}
                handleClose={handleClose}
                show={show}
            />
            <DetallesOrden detallesOrdenes={detallesOrdenes} />

            <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador
                    setDatosFiltrar={setOrdenesFiltrar}
                    datos={ordenes}
                />
            </div>
        </div>
    );

















}

export default ListarOrdenes