// ------------------HERLYN NORBEY DAVID POSO
//-------------------10 de octubre 2023
// Nos permitirá Listar uno o todos los usuarios de la base de datos y que agreguemos por medio del agregar usuario,
// existirá una barra buscar que nos permite buscar cualquier información de estos usuarios, la busqueda se realiza por cualquier campo que este en esta tabla
import '../../css-general/cssgeneral.css';
import '../../css-general/tailwind.min.css';
import '../../css-general/inicio_style.css';
import '../../css-general/table.min.css';
import { useEffect, useState } from 'react';
import style from '../../pages/Clientes.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import EditarUsuario from './EditarUsuario';
import Buscador from '../chared/Buscador';
import Paginador from '../chared/Paginador';
import BotonNegro from '../chared/BotonNegro';
import Swal from 'sweetalert2';
import Header from '../chared/header/Header';
import editar from '../roles/editar.png';
import { calcularAnchoDePantalla } from '../../helpers/calcularAnchoDePantalla';
import styles from '../../css-general/CardStyleGenerar.module.css';
import {registrosPorPagina, resolucionCards } from '../../constantes/constantes.js';
import useUsuario from '../../hooks/useUsuario.jsx';
import AgregarUsuario from './AgregarUsuario.jsx';

const ListarUsuario = () => {
    const { usuarios, editarEstado, busqueda, setBusqueda } = useUsuario();

        /// Funcionalidad para cerra el modal
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

    //Estado de la barra de busqueda
    const [usuariosFiltrar, setUsuariosFiltrar] = useState([]);

    const [usuariosFiltrarBuscados, setUsuariosFiltrarBuscados] = useState([]);

    const [usuariosListar, setUsuariosListar] = useState([]);

            /// Filtrar los 10 primeras ventas a mostrar en la vista
            useEffect(() => {
                if (busqueda === '') {
                    setUsuariosFiltrar(usuarios.slice(0, registrosPorPagina));
        
                    return;
                }
        
                setUsuariosFiltrarBuscados(usuariosFiltrar.slice(0, registrosPorPagina));
            }, [usuarios, busqueda]);

            useEffect(() => {
                setUsuariosListar([...usuariosFiltrar]);
            }, [usuarios, usuariosFiltrar]);

    //Estado para editar
    const [editarUsuario, setEditarUsuario] = useState('');

    //Al hacer click  en editar trae el usuario y lo guarda en setUsuario
    const handleEditClick = (usuario) => {
        if (!usuario.estado) {
            return Swal.fire(
                'Acción inválida!',
                'Este usuario no se puede editar porque está inhabilitado',
                'error'
            );
        }
        setEditarUsuario(usuario);
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
            <div>
                <Header titulo='Gestión de Usuarios' />

                {/* botón agregar */}
                <div className='container-fluid'>
                    <div className='row'>
                        <div
                            className={`${style.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                          <AgregarUsuario/>
                        </div>

                        {/* Boton para Buscar/filtrar */}
                        <div
                            className={`${style.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                            {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                            <Buscador
                                setDatosFiltrar={setUsuariosFiltrar}
                                datos={usuarios}
                                camposFiltrar={[
                                    'nombre',
                                    'apellido',
                                    'telefono',
                                    'email',
                                    'rol'
                                ]}
                                busqueda={busqueda}
                                setBusqueda={setBusqueda}
                            />
                        </div>
                    </div>
                </div>
                {/* tabla  para listar usuarios */}
                {anchoPantalla >= resolucionCards ? (
                    <div className='tabla'>
                        <table className='table caption-top '>
                            <thead>
                                <tr>
                                    <th scope='col'>Nombre</th>
                                    <th scope='col'>Apellido</th>
                                    <th scope='col'>Teléfono</th>
                                    <th scope='col'>Correo electrónico</th>
                                    <th scope='col'>Rol</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuariosListar.map((usuario) => (
                                    <tr key={usuario.id_usuario}>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>{usuario.telefono}</td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            {usuario.rol
                                                ? usuario.rol.nombre
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {usuario.rol &&
                                            usuario.rol.nombre ===
                                                'Administrador' ? (
                                                <img
                                                    width='40px'
                                                    src={editar}
                                                    alt='No permitido'
                                                    style={{
                                                        marginLeft: '18px',
                                                    }}
                                                />
                                            ) : (
                                                <BotonCambioEstado
                                                    id={usuario.id_usuario}
                                                    isChecked={usuario.estado}
                                                    nombreRegistro={'usuario'}
                                                    ruta={`/usuarios/estado/${usuario.id_usuario}`}
                                                    editarEstado={editarEstado}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            <BotonNegro
                                                text='Editar'
                                                onClick={() =>
                                                    handleEditClick(usuario)
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
                        {usuariosListar.map((usuario) => (
                            <div
                                className={`col-md-4 col-sm-6 col-xs-12`}
                                key={usuario.id_usuario}
                            >
                                <div
                                    className={`card mb-4 ${styles.contenedor_card}`}
                                >
                                    <div className='card-body'>
                                        <p className={styles.text}>
                                            Nombres:{' '}
                                            <span>{usuario.nombre}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Apellidos:{' '}
                                            <span>{usuario.apellido}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Teléfono:{' '}
                                            <span>{usuario.telefono}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Email: <span>{usuario.email}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Rol:{' '}
                                            <span>
                                                {usuario.rol
                                                    ? usuario.rol.nombre
                                                    : 'N/A'}
                                            </span>
                                        </p>

                                        <div className='row pt-3'>
                                            <div className='col justify-content-start align-items-center '>
                                                <div className=''>
                                                    <strong
                                                        className={`${styles.textoEstado}`}
                                                    >
                                                        {' '}
                                                        Estado{' '}
                                                    </strong>
                                                </div>
                                                <div className=''>
                                                    {usuario.rol &&
                                                    usuario.rol.nombre ===
                                                        'Administrador' ? (
                                                        <img
                                                            width='50px'
                                                            src={editar}
                                                            alt='No permitido'
                                                            style={{
                                                                marginLeft:
                                                                    '18px',
                                                            }}
                                                        />
                                                    ) : (
                                                        <BotonCambioEstado
                                                            id={
                                                                usuario.id_usuario
                                                            }
                                                            isChecked={
                                                                usuario.estado
                                                            }
                                                            nombreRegistro={
                                                                'usuario'
                                                            }
                                                            ruta={`/usuarios/estado/${usuario.id_usuario}`}
                                                            editarEstado={
                                                                editarEstado
                                                            }
                                                        />
                                                    )}
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
                                                        handleEditClick(usuario)
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
                <EditarUsuario editarUsuario={editarUsuario}
                show={show}
                handleClose={handleClose}
                 />
            </div>

            <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador
                    setDatosFiltrar={setUsuariosFiltrar}
                    datos={busqueda === '' ? usuarios : usuariosFiltrar}
                />
            </div>
        </div>
    );
};
export default ListarUsuario;
