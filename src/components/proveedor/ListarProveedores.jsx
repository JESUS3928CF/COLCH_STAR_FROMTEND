// ------------------BRIAN PAREJA HERNANDEZ
//-------------------26 de septiembre 2023
//* Nos permitira Listar un proveedor, traer la informacion de los proveedores de la base de datos y representarla en una tabla 
//* existira una barra buscar que nos permite buscar cualquier informacion mediante un filtro, la busqueda se realiza por cualquier campo

import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import style from '../../pages/Proveedores.module.css';
import styles from "../../css-general/CardStyleGenerar.module.css";
import BotonCambioEstado from '../chared/BotonCambioEstado';
import EditarProveedor from './EditarProveedor';
import Paginador from '../chared/Paginador'
import BotonNegro from '../chared/BotonNegro';
import Header from '../chared/header/Header'
import Buscador from '../chared/Buscador';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { calcularAnchoDePantalla } from "../../helpers/calcularAnchoDePantalla";
import { registrosPorPagina, resolucionCards } from "../../constantes/constantes.js";
import useProveedor from '../../hooks/useProveedor.jsx'
import AgregarProveedor from './AgregarProveedor.jsx';


//Componente
const ListarProveedores = () => {

    //proveedores que viene de useproveedor tiene todo los proveedores de la base de datos
    const { proveedores, editarEstado, busqueda, setBusqueda } = useProveedor();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //estado de la barra buscador
    const [ProveedoresFiltrar, setProveedoresFiltrar] = useState([]);


    const [proveedoresFiltrarBuscados, setProveedoresFiltrarBuscados] = useState([]);

    const [proveedoresListar, setProveedoresListar] = useState([]);


            /// Filtrar los 10 primeras ventas a mostrar en la vista
            useEffect(() => {
                if (busqueda === '') {
                    setProveedoresFiltrar(proveedores.slice(0, registrosPorPagina));
        
                    return;
                }
        
                setProveedoresFiltrarBuscados(ProveedoresFiltrar.slice(0, registrosPorPagina));
            }, [proveedores, busqueda]);

            useEffect(() => {
                setProveedoresListar([...ProveedoresFiltrar]);
            }, [proveedores, ProveedoresFiltrar]);
    


    //Estado para editar
    const [editarProveedor, setEditarProveedor] = useState("");

    //Si al darle click en editar el proveedor etsa inhabilitado no lo va dejar entrar, 
    //de lo contrario lo deja entrar a editar y mostrar la informacion
    
    const handleEditClick = (proveedor) => {

        if (!proveedor.estado) {
            return Swal.fire(
                'Acción inválida!',
                'Este proveedor no se puede editar porque está inhabilitado',
                'error'
            );
        }
        setEditarProveedor(proveedor);
        handleShow();
    };



    //ancho de la pantalla para el resposive
    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);


    useEffect(() => {
        /// Calcular el ancho de pantalla actual
        calcularAnchoDePantalla(setAnchoPantalla);
        setBusqueda('');
    }, []);


    return (
        <div>
            <div className='contenedor'>
                {/* titulo */}
                <Header titulo='Gestión de Proveedores' />

                {/* botón agregar */}
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
                                setDatosFiltrar={setProveedoresFiltrar} //se le manda por medio de setProveedoresFiltrar el resultado
                                datos={proveedores} //se le dice que datos son los que se van a filtrar y son por los que trae de la base de datos
                                camposFiltrar={[
                                    'nombre',
                                    'telefono',
                                    'direccion',
                                    'identificador',
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
                                    <th scope='col'>Identificación</th>
                                    <th scope='col'>Nombre</th>
                                    <th scope='col'>Teléfono</th>
                                    <th scope='col'>Dirección</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* // ProveedoresFiltrar hace el mapeo las busqueda de los datos y arroja el resultado  */}
                                {proveedoresListar.map((proveedor) => (
                                    <tr key={proveedor.id_proveedor}>
                                        <td>
                                            {' '}
                                            {proveedor.tipoIdentificacion}{' '}
                                            {proveedor.identificador}
                                        </td>
                                        <td>{proveedor.nombre}</td>
                                        <td>{proveedor.telefono}</td>
                                        <td>{proveedor.direccion}</td>
                                        <td>
                                            {' '}
                                            <BotonCambioEstado
                                                id={proveedor.id_proveedor}
                                                isChecked={proveedor.estado}
                                                nombreRegistro={'proveedor'}
                                                ruta={`/proveedores/estado/${proveedor.id_proveedor}`}
                                                editarEstado={editarEstado}
                                            />
                                        </td>
                                        <td>
                                            <BotonNegro
                                                text='Editar'
                                                modalToOpen={
                                                    proveedor.estado
                                                        ? '#modalEditar'
                                                        : ''
                                                }
                                                onClick={() =>
                                                    handleEditClick(proveedor)
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
                        {proveedoresListar.map((proveedor) => (
                            <div
                                className={`col-md-4 col-sm-6 col-xs-12`}
                                key={proveedor.id_proveedor}
                            >
                                <div
                                    className={`card mb-4 ${styles.contenedor_card}`}
                                >
                                    <div className='card-body'>
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
                                        <p className={styles.text}>
                                            Dirección:{' '}
                                            <span>{proveedor.direccion}</span>
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
                {/* //le mandamos el proveedor a editar la formulario EditarProveedor        */}
                <EditarProveedor proveedor={editarProveedor}
                    show={show}
                    handleClose={handleClose} />
            </div>


            <div className='seccion4'>
                {/* Es)}ta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador
                    setDatosFiltrar={setProveedoresFiltrar}
                    datos={busqueda === '' ? proveedores : ProveedoresFiltrar}
                />
            </div>
        </div>
    );
}

export default ListarProveedores
