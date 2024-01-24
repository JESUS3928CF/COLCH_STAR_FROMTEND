

import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import Paginador from '../chared/Paginador'
import BotonNegro from '../chared/BotonNegro';
import Header from '../chared/header/Header'
import Buscador from '../chared/Buscador';
import AgregarProveedor from '../proveedor/AgregarProveedor.jsx';

import style from '../../pages/proveedores.module.css';
import useOrden from '../../hooks/useOrden.jsx'
import { useEffect, useState } from 'react';
import { calcularAnchoDePantalla } from "../../helpers/calcularAnchoDePantalla";
import { registrosPorPagina, resolucionCards } from "../../constantes/constantes.js";
import styles from "../../css-general/CardStyleGenerar.module.css";

import Swal from 'sweetalert2';



//Componente
const ListarOrdenes = () => {

    const { ordenes } = useOrden();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [OrdenesFiltrar, setOrdenesFiltrar] = useState([]);

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
                            <AgregarProveedor />
                        </div>

                        {/* botón de buscar */}
                        <div
                            className={`${style.buscador} col-md-6 col-ms-8 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                            <Buscador
                                setDatosFiltrar={setOrdenesFiltrar} //se le manda por medio de setProveedoresFiltrar el resultado
                                datos={ordenes} //se le dice que datos son los que se van a filtrar y son por los que trae de la base de datos
                                camposFiltrar={[
                                    'nombre',
                                    'telefono',
                                    'direccion',
                                    'identificador',
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
                                    <th scope='col'>Precio Total</th>
                                    <th scope='col'>Direccion</th>
                                    <th scope='col'>Fecha</th>
                                    <th scope='col'>Detalles</th>
                                    <th scope='col'>Estado orden</th>
                                    <th scope='col'>Editar</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* // ProveedoresFiltrar hace el mapeo las busqueda de los datos y arroja el resultado  */}
                                {OrdenesFiltrar.map((orden) => (
                                    <tr key={orden.id_orden}>
                                        <td>{orden.id_proveedor}</td>
                                        <td>{orden.cliente.nombre}</td>
                                        <td>{orden.precio_total}</td>
                                        <td>{orden.precio_total}</td>
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
                                key={proveedor.id_proveedor}
                            >
                                <div
                                    className={`card mb-4 ${styles.contenedor_card}`}
                                >
                                    <div className='card-body'>
                                        <p className={styles.text}>
                                            Id:{' '}
                                            <span>
                                                {proveedor.id_proveedor}
                                            </span>
                                        </p>
                                        <p className={styles.text}>
                                            Nombre:{' '}
                                            <span>{proveedor.nombre}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Teléfono:{' '}
                                            <span>{proveedor.telefono}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Identificación:{' '}
                                            <span>
                                                {proveedor.tipoIdentificacion}{' '}
                                                {proveedor.identificador}
                                            </span>
                                        </p>

                                        <div className='row pt-3'>
                                            <div className='col justify-content-center align-items-center '>
                                                <div className='text-center'>
                                                    <strong
                                                        className={`${styles.textoEstado}`}
                                                    >
                                                        {' '}
                                                        Estado{' '}
                                                    </strong>
                                                </div>
                                                <div className='text-center'>
                                                    <BotonCambioEstado
                                                        id={
                                                            proveedor.id_proveedor
                                                        }
                                                        isChecked={
                                                            proveedor.estado
                                                        }
                                                        nombreRegistro={
                                                            'proveedor'
                                                        }
                                                        ruta={`/proveedores/estado/${proveedor.id_proveedor}`}
                                                        editarEstado={editarEstado}
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
                                                    text='Editar'
                                                    onClick={() =>
                                                        handleEditClick(
                                                            proveedor
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










            </div>











        </div>
    )

















}

export default ListarOrdenes