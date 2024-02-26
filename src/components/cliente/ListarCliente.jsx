// ------------------HERLYN NORBEY DAVID POSO
//-------------------26 de septiembre 2023
// Nos permitirá Listar uno o todos los clientes de la base de datos y que agreguemos por medio del agregar cliente,
// existirá una barra buscar que nos permite buscar cualquier informacion mediante un filtro, la busqueda se realiza por cualquier campo que este en esta tabla
import '../../css-general/cssgeneral.css';
import '../../css-general/tailwind.min.css';
import '../../css-general/inicio_style.css';
import '../../css-general/table.min.css';
import { useEffect, useState } from 'react';
import style from '../../pages/Clientes.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import EditarCliente from './EditarCliente';
import Buscador from '../chared/Buscador';
import Paginador from '../chared/Paginador';
import BotonNegro from '../chared/BotonNegro';
import Swal from 'sweetalert2';
import { DetallesClientes } from './DetallesClientes';
import Header from '../chared/header/Header';
import { calcularAnchoDePantalla } from '../../helpers/calcularAnchoDePantalla';
import styles from '../../css-general/CardStyleGenerar.module.css';
import { registrosPorPagina, resolucionCards } from '../../constantes/constantes.js';
import useClientes from '../../hooks/useCliente.jsx';
import AgregarCliente from './AgregarCliente.jsx';

//Componente
const ListarCliente = () => {
    const { clientes, editarEstado, busqueda, setBusqueda } = useClientes();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //Estado de la barra de busqueda
    const [clientesFiltrar, setClientesFiltrar] = useState([]);

    const [detallesClientes, setDetallesClientes] = useState({});

    const [clientesFiltrarBuscados, setClientesFiltrarBuscados] = useState([]);

    const [clientesListar, setClientesListar] = useState([]);

   
        /// Filtrar los 10 primeras ventas a mostrar en la vista
        useEffect(() => {
            if (busqueda === '') {
                setClientesFiltrar(clientes.slice(0, registrosPorPagina));
    
                return;
            }
    
            setClientesFiltrarBuscados(clientesFiltrar.slice(0, registrosPorPagina));
        }, [clientes, busqueda]);

        
        useEffect(() => {
            setClientesListar([...clientesFiltrar]);
        }, [clientes, clientesFiltrar]);


    //Esatdo para editar
    const [editarCliente, setEditarCliente] = useState('');

    //Al hacer click  en editar trae el cliente y lo guarda en setCliente
    const handleEditClick = (cliente) => {
        if (!cliente.estado) {
            return Swal.fire(
                'Acción inválida!',
                'Este cliente no se puede editar porque está inhabilitado',
                'error'
            );
        }
        setEditarCliente(cliente);
        /// Para poder abrir el modal
        handleShow();
    };
    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

    useEffect(() => {
        /// Calcular el ancho de pantalla actual
        calcularAnchoDePantalla(setAnchoPantalla);
        setBusqueda('');
    }, []);

    return (
        <div>
            <div >
                <Header titulo='Gestión de Clientes' />

                {/* botón agregar */}
                <div className='container-fluid'>
                    <div className='row'>
                        <div
                            className={`${style.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                            <AgregarCliente />
                        </div>

                        {/* Boton para Buscar/filtrar */}
                        <div
                            className={`${style.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                            {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                            <Buscador
                                setDatosFiltrar={setClientesFiltrar}
                                datos={clientes}
                                camposFiltrar={[
                                    'nombre',
                                    'apellido',
                                    'identificacion',
                                    'telefono',
                                    'email',
                                    'direccion',
                                ]}
                                busqueda={busqueda}
                                setBusqueda={setBusqueda}
                            />
                        </div>
                    </div>
                </div>

                {/* tabla  para listar clientes */}
                {anchoPantalla >= resolucionCards ? (
                    <div className='tabla'>
                        <table className='table caption-top '>
                            <thead>
                                <tr>
                                    <th scope='col'>Identificación</th>
                                    <th scope='col'>Nombre</th>
                                    <th scope='col'>Apellido</th>
                                    <th scope='col'>Teléfono</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Detalles</th>
                                    <th scope='col'>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientesListar.map((cliente) => (
                                    <tr key={cliente.id_cliente}>
                                        <td>
                                            {cliente.tipoIdentificacion}{' '}
                                            {cliente.identificacion}
                                        </td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.apellido}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>
                                            <BotonCambioEstado
                                                id={cliente.id_cliente}
                                                isChecked={cliente.estado}
                                                nombreRegistro={'cliente'}
                                                ruta={`/clientes/estado/${cliente.id_cliente}`}
                                                editarEstado={editarEstado}
                                            />
                                        </td>
                                        <td>
                                            <BotonNegro
                                                text='Ver'
                                                modalToOpen='#modalDetalleCliente'
                                                onClick={() =>
                                                    setDetallesClientes(cliente)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <BotonNegro
                                                text='Editar'
                                                onClick={() =>
                                                    handleEditClick(cliente)
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
                        {clientesListar.map((cliente) => (
                            <div
                                className={`col-md-4 col-sm-6 col-xs-12`}
                                key={cliente.id_cliente}
                            >
                                <div
                                    className={`card mb-4 ${styles.contenedor_card}`}
                                >
                                    <div className='card-body'>
                                        <p className={styles.text}>
                                            Identificación:{' '}
                                            <span>
                                                {cliente.tipoIdentificacion}{' '}
                                                {cliente.identificacion}
                                            </span>
                                        </p>
                                        <p className={styles.text}>
                                            Nombres:{' '}
                                            <span>{cliente.nombre}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Apellidos:{' '}
                                            <span>{cliente.apellido}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Teléfono:{' '}
                                            <span>{cliente.telefono}</span>
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
                                                        id={cliente.id_cliente}
                                                        isChecked={
                                                            cliente.estado
                                                        }
                                                        nombreRegistro={
                                                            'cliente'
                                                        }
                                                        ruta={`/clientes/estado/${cliente.id_cliente}`}
                                                        editarEstado={
                                                            editarEstado
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
                                                    modalToOpen='#modalDetalleCliente'
                                                    onClick={() =>
                                                        setDetallesClientes(
                                                            cliente
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
                                                        handleEditClick(cliente)
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

                <DetallesClientes detallesClientes={detallesClientes} />
                <EditarCliente
                    cliente={editarCliente}
                    show={show}
                    handleClose={handleClose}
                />
            </div>

            <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador
                    setDatosFiltrar={setClientesFiltrar}
                    datos={busqueda === '' ? clientes: clientesFiltrar}
                />
            </div>
        </div>
    );
};

export default ListarCliente;
