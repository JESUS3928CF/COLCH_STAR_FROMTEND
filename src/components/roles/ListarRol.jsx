// ------------------HERLYN NORBEY DAVID POSO
//-------------------10 de octubre 2023
// Nos permitirá Listar uno o todos los roles de la base de datos y que agreguemos por medio del agregar rol,
// existirá una barra buscar que nos permite buscar cualquier de este rol informacion mediante un filtro, la busqueda se realiza por cualquier campo que este en esta tabla
import '../../css-general/cssgeneral.css';
import '../../css-general/inicio_style.css';
import { useEffect, useState } from 'react';
import style from '../../pages/Roles.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import EditarRol from './EditarRol';
import Buscador from '../chared/Buscador';
import Paginador from '../chared/Paginador';
import BotonNegro from '../chared/BotonNegro';
import Swal from 'sweetalert2';
import Header from '../chared/header/Header';
import editar from '../roles/editar.png';
import { calcularAnchoDePantalla } from '../../helpers/calcularAnchoDePantalla';
import styles from '../../css-general/CardStyleGenerar.module.css';
import {
    registrosPorPagina,
    resolucionCards,
} from '../../constantes/constantes.js';
import useRol from '../../hooks/useRol.jsx';
import AgregarRol from './AgregarRol.jsx';

const ListarRol = () => {
    const { roles, editarEstado } = useRol();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /// Estado de la barra de búsqueda
    const [rolesFiltrar, setRolesFiltrar] = useState([]);

    useEffect(() => {
        setRolesFiltrar(roles.slice(0, 10, registrosPorPagina));
    }, [roles]);

    // Estado para editar
    const [editarRol, setEditarRol] = useState('');

    // Al hacer clic en editar, trae el rol y lo guarda en setEditarRol
    const handleEditClick = (rol) => {
        if (!rol.estado) {
            return Swal.fire(
                'Acción inválida!',
                'Este rol no se puede editar porque está inhabilitado',
                'error'
            );
        }
        setEditarRol(rol);
        handleShow();
    };

    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

    useEffect(() => {
        /// Calcular el ancho de pantalla actual
        calcularAnchoDePantalla(setAnchoPantalla);
    }, []);

    return (
        <div>
            <div>
                <Header titulo='Gestión de Roles' />

                <div className='container-fluid'>
                    <div className='row'>
                        <div
                            className={`${style.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                            <AgregarRol />
                        </div>

                        {/* Boton para Buscar/filtrar */}
                        <div
                            className={`${style.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                            {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                            <Buscador
                                setDatosFiltrar={setRolesFiltrar}
                                datos={roles}
                                camposFiltrar={[
                                    'nombre',
                                    'fecha_creacion',
                                    'permisos',
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* tabla  para listar roles */}
                {anchoPantalla >= resolucionCards ? (
                    <div className='tabla'>
                        <table className='table caption-top '>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Roles</th>
                                    <th scope='col' className='text-center'>
                                        Permisos
                                    </th>
                                    <th scope='col'>Fecha de creación</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rolesFiltrar.map((rol) => (
                                    <tr key={rol.id_rol}>
                                        <td>{rol.id_rol}</td>
                                        <td>{rol.nombre}</td>
                                        <td>
                                            {rol.permisos.map(
                                                (permiso, index) =>
                                                    index ===
                                                    rol.permisos.length - 1
                                                        ? permiso
                                                        : permiso + ', '
                                            )}
                                        </td>

                                        <td>{rol.fecha_creacion}</td>
                                        <td>
                                            {rol.nombre === 'Administrador' ? (
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
                                                    id={rol.id_rol}
                                                    isChecked={rol.estado}
                                                    nombreRegistro='rol'
                                                    ruta={`/rol/estado/${rol.id_rol}`}
                                                    editarEstado={editarEstado}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {rol.nombre === 'Administrador' ? (
                                                <img
                                                    width='40px'
                                                    src={editar}
                                                    alt='No permitido'
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                />
                                            ) : (
                                                <BotonNegro
                                                    text='Editar'
                                                    onClick={() =>
                                                        handleEditClick(rol)
                                                    }
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={`row pt-4`}>
                        {rolesFiltrar.map((rol) => (
                            <div
                                className={`col-md-4 col-sm-6 col-xs-12`}
                                key={rol.id_rol}
                            >
                                <div
                                    className={`card mb-4 ${styles.contenedor_card}`}
                                >
                                    <div className='card-body'>
                                        <p className={styles.text}>
                                            Id: <span>{rol.id_rol}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Roles: <span>{rol.nombre}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Permisos:{' '}
                                            <span>
                                                {rol.permisos.map(
                                                    (permiso, index) =>
                                                        index ===
                                                        rol.permisos.length - 1
                                                            ? permiso
                                                            : permiso + ', '
                                                )}
                                            </span>
                                        </p>
                                        <p className={styles.text}>
                                            Fecha Creación:{' '}
                                            <span>{rol.fecha_creacion}</span>
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
                                                    {rol.nombre ===
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
                                                            id={rol.id_rol}
                                                            isChecked={
                                                                rol.estado
                                                            }
                                                            nombreRegistro='rol'
                                                            ruta={`/rol/estado/${rol.id_rol}`}
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
                                                {rol.nombre ===
                                                'Administrador' ? (
                                                    ''
                                                ) : (
                                                    <BotonNegro
                                                        text='Editar'
                                                        onClick={() =>
                                                            handleEditClick(rol)
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <EditarRol
                    editarRol={editarRol}
                    show={show}
                    handleClose={handleClose}
                />
            </div>
            <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador setDatosFiltrar={setRolesFiltrar} datos={roles} />
            </div>
        </div>
    );
};
export default ListarRol;
