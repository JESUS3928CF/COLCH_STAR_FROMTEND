import '../../css-general/cssgeneral.css';
import '../../css-general/tailwind.min.css';
import '../../css-general/inicio_style.css';
import '../../css-general/table.min.css';
import Paginador from '../chared/Paginador';
import BotonNegro from '../chared/BotonNegro';
import Header from '../chared/header/Header';
import Buscador from '../chared/Buscador';
import AgregarOrden from '../ordenes/AgregarOrden.jsx';
import DetallesOrden from './DetallesOrden.jsx';
import EditarOrden from './EditarOrden.jsx';
import style from '../../pages/Proveedores.module.css';
import useOrden from '../../hooks/useOrden.jsx';
import { useEffect, useState } from 'react';
import { calcularAnchoDePantalla } from '../../helpers/calcularAnchoDePantalla';
import {
    registrosPorPagina,
    resolucionCards,
} from '../../constantes/constantes.js';
import styles from '../../css-general/CardStyleGenerar.module.css';

import Swal from 'sweetalert2';
import useProducto from '../../hooks/useProducto.jsx';
import { formatDate, formatMoney } from '../../helpers/Formato_de_datos.jsx';
const ListarOrdenes = () => {
    //ordenes tiene la consulta de todos las ordenes de la base de datos
    const {
        ordenes,
        cambiarEstadoDeOrden,
        handleShowEditar,
        showEditar,
        handleCloseEditar,
        setEditar,
        setDetallesOrden,
        busqueda,
        setBusqueda,
    } = useOrden();

    const { consultarProductos } = useProducto();

    /// Datos para listar
    const [OrdenesFiltrar, setOrdenesFiltrar] = useState([]);

    const [ordenesFiltrarBuscados, setOrdenesFiltrarBuscados] = useState([]);

    const [ordenesListar, setOrdenesListar] = useState([]);

    //detallesProductos
    const [detallesOrdenActual, setDetallesOrdenActual] = useState({});

    //Estado para editar
    const [editarOrden, setEditarOrden] = useState({});

    //codicion que se le asigna al boton editar que si el estado de la  orde de entrega esta en Entregado no te va permitir editar
    const handleEditClick = (orden) => {
        setEditar(true);
        if (
            orden.estado_de_orden === 'Entregada' ||
            orden.estado_de_orden === 'Finalizada' ||
            orden.estado_de_orden === 'En Proceso' ||
            orden.estado_de_orden === 'Cancelada'
        ) {
            return Swal.fire(
                'Acción inválida!',
                `Esta orden está en ${orden.estado_de_orden === 'Finalizada'
                    ? 'Finalizada'
                    : orden.estado_de_orden === 'Entregada'
                        ? 'Entregada'
                        : 'Proceso'
                }, no se puede editar`,
                'error'
            );

        }
        setDetallesOrden(orden.detalles);

        setEditarOrden(orden);
        handleShowEditar();
    };

    const handleValidarCambioDeOrden = (e, orden) => {
        // Verifica si el nuevo estado es 'Creada' y el estado actual es 'En Proceso'
        if (
            (e.target.value === 'Creada' &&
                orden.estado_de_orden === 'En Proceso') ||
            // Verifica si el nuevo estado es 'En Proceso' y el estado actual es 'Finalizada'
            (e.target.value === 'En Proceso' &&
                orden.estado_de_orden === 'Finalizada') ||
            (e.target.value === 'Creada' &&
                orden.estado_de_orden === 'Finalizada') ||
            // Verifica si el nuevo estado es 'Finalizada' y el estado actual es 'Entregada'
            (e.target.value === 'Finalizada' &&
                orden.estado_de_orden === 'Entregada') ||
            // Verifica si el nuevo estado es 'En Proceso' y el estado actual es 'Entregada'
            (e.target.value === 'En Proceso' &&
                orden.estado_de_orden === 'Entregada') ||
            (e.target.value === 'Creada' &&
                orden.estado_de_orden === 'Entregada') ||
            (e.target.value === 'Creada' &&
                orden.estado_de_orden === 'Cancelada') ||
            (e.target.value === 'En Proceso' &&
                orden.estado_de_orden === 'Cancelada') ||
            (e.target.value === 'Finalizada' &&
                orden.estado_de_orden === 'Cancelada') ||
            (e.target.value === 'Entregada' &&
                orden.estado_de_orden === 'Cancelada') ||
            (e.target.value === 'Cancelada' &&
                orden.estado_de_orden === 'En Proceso') ||
            (e.target.value === 'Cancelada' &&
                orden.estado_de_orden === 'Finalizada') ||
            (e.target.value === 'Cancelada' &&
                orden.estado_de_orden === 'Entregada')
        ) {
            return Swal.fire(
                'Acción inválida!',
                `No se puede cambiar el estado a '${e.target.value}', porque esta orden esta '${orden.estado_de_orden}'!!`,
                'error'
            );
        } else if (
            // Verifica si el nuevo estado es 'Creada' y el estado actual es 'Entregada'
            (e.target.value === 'Creada' &&
                orden.estado_de_orden === 'Entregada') ||
            (e.target.value === 'Entregada' &&
                orden.estado_de_orden === 'Creada') ||
            (e.target.value === 'Finalizada' &&
                orden.estado_de_orden === 'Creada')
        ) {
            return Swal.fire(
                'Acción inválida!',
                `La orden esta ${orden.estado_de_orden} solo puede pasar a estado de Producción `,
                'error'
            );
        } else if (
            (e.target.value === 'Entregada' &&
                orden.estado_de_orden !== 'Finalizada') ||
            (e.target.value === 'Entregada' &&
                orden.estado_de_orden === 'En Proceso')
        ) {
            return Swal.fire(
                'Acción inválida!',
                `Para cambiar el estado a 'Entregada', primero debe pasar por 'Finalizada'!!`,
                'error'
            );
        }
        // Si no hay restricciones, permite cambiar el estado
        cambiarEstadoDeOrden(e.target.value, orden);
    };

    // solicitud  a la url
    useEffect(() => {
        if (busqueda === '') {
            setOrdenesFiltrar(ordenes.slice(0, registrosPorPagina));

            return;
        }

        setOrdenesFiltrarBuscados(OrdenesFiltrar.slice(0, registrosPorPagina));
    }, [ordenes, busqueda]);

    useEffect(() => {
        setOrdenesListar([...OrdenesFiltrar]);
    }, [ordenes, OrdenesFiltrar]);

    // ancho de la pantalla para el resposive
    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

    useEffect(() => {
        /// Calcular el ancho de pantalla actual
        calcularAnchoDePantalla(setAnchoPantalla);
        setBusqueda('');
        consultarProductos();
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
                                    'cliente',
                                    'precio_total',
                                    'fecha_creacion',
                                    'fecha_entrega',
                                    'estado_de_orden',
                                ]} //se le manda los campos por donde se puede filtrar
                                busqueda={busqueda}
                                setBusqueda={setBusqueda}
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
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Precio total</th>
                                    <th scope='col'>Dirección</th>
                                    <th scope='col'>Fecha creación</th>
                                    <th scope='col'>Fecha entrega</th>
                                    <th scope='col'>Detalles</th>
                                    <th scope='col'>Estado orden</th>
                                    <th scope='col'>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* // ProveedoresFiltrar hace el mapeo las busqueda de los datos y arroja el resultado  */}
                                {ordenesListar.map((orden) => (
                                    <tr key={orden.id_orden}>
                                        <td>
                                            {orden.cliente.nombre}{' '}
                                            {orden.cliente.apellido}
                                        </td>
                                        <td>
                                            {formatMoney(orden.precio_total)}
                                        </td>
                                        <td>{orden.cliente.direccion}</td>
                                        <td>
                                            {formatDate(orden.fecha_creacion)}
                                        </td>
                                        <td>
                                            {formatDate(orden.fecha_entrega)}
                                        </td>
                                        <td>
                                            <BotonNegro
                                                text='Ver'
                                                modalToOpen='#modalDetalles'
                                                onClick={() =>
                                                    setDetallesOrdenActual(
                                                        orden
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>
                                            <select
                                                name='estado_de_orden'
                                                value={orden.estado_de_orden}
                                                onChange={(e) =>
                                                    handleValidarCambioDeOrden(
                                                        e,
                                                        orden
                                                    )
                                                }
                                            >
                                                <option value='Cancelada'>
                                                    Cancelada
                                                </option>
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
                                        </td>
                                        <td>
                                            <BotonNegro
                                                text='Editar'
                                                onClick={() => {
                                                    handleEditClick(orden);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={`row pt-4 justify-content-center`}>
                        {ordenesListar.map((orden) => (
                            <div
                                className={`col-md-4 col-sm-6 col-xs-12`}
                                key={orden.id_orden}
                            >
                                <div
                                    className={`card mb-4 ${styles.contenedor_card}`}
                                >
                                    <div className='card-body'>
                                        <p className={styles.text}>
                                            Nombre: {orden.cliente.nombre}{' '}
                                            {orden.cliente.apellido}
                                        </p>
                                        <p className={styles.text}>
                                            Precio total:{' '}
                                            <span>
                                                {formatMoney(
                                                    orden.precio_total
                                                )}
                                            </span>
                                        </p>
                                        <p className={styles.text}>
                                            Dirección:{' '}
                                            <span>
                                                {orden.cliente.direccion}
                                            </span>
                                        </p>
                                        <p className={styles.text}>
                                            Fecha creación:{' '}
                                            <span>
                                                {formatDate(
                                                    orden.fecha_creacion
                                                )}
                                            </span>
                                        </p>
                                        <p className={styles.text}>
                                            Fecha de entrega:{' '}
                                            <span>
                                                {formatDate(
                                                    orden.fecha_entrega
                                                )}
                                            </span>
                                        </p>
                                        <p className={styles.text}>
                                            Estado de Orden:{' '}
                                            <select
                                                name='estado_de_orden'
                                                value={orden.estado_de_orden}
                                                onChange={(e) =>
                                                    handleValidarCambioDeOrden(
                                                        e,
                                                        orden
                                                    )
                                                }
                                            >
                                                <option value='Cancelada'>
                                                    Cancelada
                                                </option>
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
                                                        setDetallesOrdenActual(
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
                                                            'Entregada' ||
                                                        !orden.estado_de_orden ===
                                                            'En Proceso'
                                                            ? '#modalEditar'
                                                            : ''
                                                    }
                                                    onClick={() => {
                                                        handleEditClick(orden);
                                                    }}
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
                handleCloseEditar={handleCloseEditar}
                showEditar={showEditar}
            />
            <DetallesOrden detallesOrdenes={detallesOrdenActual} />

            <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador
                    setDatosFiltrar={setOrdenesListar}
                    datos={busqueda === '' ? ordenes : OrdenesFiltrar}
                />
            </div>
        </div>
    );
};

export default ListarOrdenes;