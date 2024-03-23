// import { Outlet } from "react-router"
import styles from './Menu_lateral.module.css';
import logo from '../imgNavbar/LogoPNG.png';
import profile from '../imgNavbar/1153861.png';
import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { calcularAnchoDePantalla } from '../helpers/calcularAnchoDePantalla';

import useAuth from '../hooks/useAuth';

const MenuLateral = () => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

    /// extrayendo la información para la autenticación
    const { auth, loading, singOff } = useAuth();

    const navigate = useNavigate();

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    useEffect(() => {
        /// Calcular el ancho de pantalla actual
        calcularAnchoDePantalla(setAnchoPantalla);
    }, []);

    useEffect(() => {
        if (!loading && auth.usuario === undefined) return navigate('/login');
    }, [loading]);

    if (loading || !auth.usuario) return 'Cargando...';

    return (
        <>
            <div
                className={`${styles.sidebar} ${
                    anchoPantalla <= 1200 ? styles.close : ''
                } `}
            >
                <div className={`${styles.logo_details}`}>
                    <i>
                        <img
                            src={logo}
                            alt='imagen del logo'
                            width='39px'
                            style={{ marginLeft: 22, marginTop: 9 }}
                        />
                    </i>
                    <span className={styles.logo_name}>Colch Star</span>
                </div>
                <ul className={styles.nav_links}>
                    {auth.usuario.permisos.includes('') ? (
                        <li>
                            <Link to={'/administracion'}>
                                <i className='bx bx-grid-alt'></i>
                                <span className={styles.link_name}>
                                    Dashboard
                                </span>
                            </Link>

                            <ul
                                className={`${styles.sub_menu} ${styles.blank}`}
                            >
                                <li>
                                    <Link
                                        to={'/administracion'}
                                        className={styles.link_name}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        ''
                    )}
                    {auth.usuario.permisos.includes('roles') ? (
                        <li>
                            <Link to={'/administracion/roles'}>
                                <i className='bx bxs-user-detail'></i>
                                <span className={styles.link_name}>Roles</span>
                            </Link>
                            <ul
                                className={`${styles.sub_menu} ${styles.blank}`}
                            >
                                <li>
                                    <Link
                                        to={'/administracion/roles'}
                                        className={styles.link_name}
                                    >
                                        Roles
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        ''
                    )}

                    {auth.usuario.permisos.includes('usuarios') ? (
                        <li>
                            <Link to={'/administracion/usuarios'}>
                                <i className='bx bx-user'></i>
                                <span className={styles.link_name}>
                                    Usuarios
                                </span>
                            </Link>
                            <ul
                                className={`${styles.sub_menu} ${styles.blank}`}
                            >
                                <li>
                                    <Link
                                        to={'/administracion/usuarios'}
                                        className={styles.link_name}
                                    >
                                        Usuarios
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        ''
                    )}

                    {auth.usuario.permisos.includes('proveedores') ? (
                        <li>
                            <Link to={'/administracion/proveedores'}>
                                <i className='bx bx-phone-call'></i>
                                <span className={styles.link_name}>
                                    Proveedores
                                </span>
                            </Link>
                            <ul
                                className={`${styles.sub_menu} ${styles.blank}`}
                            >
                                <li>
                                    <Link
                                        to={'/administracion/proveedores'}
                                        className={styles.link_name}
                                    >
                                        Proveedores
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        ''
                    )}

                    {auth.usuario.permisos.includes('productos') ? (
                        <li
                            className={`${
                                isSubMenuOpen ? styles.showMenu : ''
                            } `}
                        >
                            <div className={styles.iocn_link}>
                                <Link to={'/administracion/productos'}>
                                    <i className='bx bxs-truck'></i>
                                    <span className={styles.link_name}>
                                        Productos
                                    </span>
                                </Link>
                                <i
                                    className={`bx bxs-chevron-down ${styles.arrow}`}
                                    onClick={toggleSubMenu}
                                ></i>
                            </div>
                            <ul className={styles.sub_menu}>
                                <li>
                                    <Link
                                        to={'/administracion/productos'}
                                        className={styles.link_name}
                                    >
                                        Productos
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/administracion/prendas'}>
                                        Prendas
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/administracion/disenos'}>
                                        Diseños
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        ''
                    )}

                    {auth.usuario.permisos.includes('clientes') ? (
                        <li>
                            <Link to={'/administracion/clientes'}>
                                <i className='bx bx-child'></i>
                                <span className={styles.link_name}>
                                    Clientes
                                </span>
                            </Link>
                            <ul
                                className={`${styles.sub_menu} ${styles.blank}`}
                            >
                                <li>
                                    <Link
                                        to={'/administracion/clientes'}
                                        className={styles.link_name}
                                    >
                                        Clientes
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        ''
                    )}

                    {auth.usuario.permisos.includes('compras') ? (
                        <li>
                            <Link to={'/administracion/compras'}>
                                <i className='bx bxs-cart-download'></i>
                                <span className={styles.link_name}>
                                    Compras
                                </span>
                            </Link>
                            <ul
                                className={`${styles.sub_menu} ${styles.blank}`}
                            >
                                <li>
                                    <Link
                                        to={'/administracion/compras'}
                                        className={styles.link_name}
                                    >
                                        Compras
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        ''
                    )}

                    {auth.usuario.permisos.includes('ordenes') ? (
                        <li>
                            <Link to={'/administracion/ordenes'}>
                                <i className='bx bx-credit-card-alt'></i>
                                <span className={styles.link_name}>
                                    Ordenes
                                </span>
                            </Link>
                            <ul
                                className={`${styles.sub_menu} ${styles.blank}`}
                            >
                                <li>
                                    <Link
                                        to={'/administracion/ordenes'}
                                        className={styles.link_name}
                                    >
                                        Ordenes
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        ''
                    )}

                    <li>
                        <a href='/' target='_blank' rel='noopener noreferrer'>
                            <i className='bx bxs-purchase-tag'></i>
                            <span className={styles.link_name}>Catálogo</span>
                        </a>
                        <ul className={`${styles.sub_menu} ${styles.blank}`}>
                            <li>
                                <a
                                    href='/'
                                    className={styles.link_name}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    Catálogo
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href={import.meta.env.VITE_LINK_DRIVE_APP_MOVIL}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <i className='bx bxs-phone'></i>
                            <span className={styles.link_name}>App Movil</span>
                        </a>
                        <ul className={`${styles.sub_menu} ${styles.blank}`}>
                            <li>
                                <a
                                    href={
                                        import.meta.env
                                            .VITE_LINK_DRIVE_APP_MOVIL
                                    }
                                    target='_blank'
                                    rel='noreferrer'
                                    className={styles.link_name}
                                >
                                    App Movil
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles.profile_details}>
                            <div className={styles.profile_content}>
                                <img
                                    onClick={singOff}
                                    src={profile}
                                    alt='imagen de perfil'
                                />
                            </div>
                            <div className={styles.name_job}>
                                <div className={styles.profile_name}>
                                    {auth.usuario.nombre.split(' ')[0] +
                                        ' ' +
                                        auth.usuario.apellido.split(' ')[0]}
                                </div>
                                <div className={styles.job}>
                                    {auth.usuario.rol.nombre}
                                </div>
                            </div>
                            <i
                                className='bx bx-log-out'
                                style={{ paddingLeft: '17px' }}
                                onClick={singOff}
                            ></i>
                        </div>
                    </li>
                </ul>
            </div>
            {/*<ButtonCloseMenu onClick={toggleSidebar} />*/}
            <section className={styles.home_section}>
                <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    {auth?.usuario ? <Outlet /> : <Navigate to={'/login'} />}
                </div>
            </section>
        </>
    );
};

export default MenuLateral;
