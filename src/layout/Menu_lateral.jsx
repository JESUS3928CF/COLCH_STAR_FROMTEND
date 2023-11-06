// import { Outlet } from "react-router"
import styles from './Menu_lateral.module.css';
import logo from '../imgNavbar/LogoPNG.png';
import profile from '../imgNavbar/1153861.png';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const MenuLateral = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    // "Esto es para el botón para cerrar el menú "
    // const toggleSidebar = () => { por ahora no lo necesitamos
    //     setSidebarOpen(!isSidebarOpen);
    // };

    useEffect(() => {
        const handleResize = () => {
            const nuevoAnchoPantalla = window.innerWidth;
            setAnchoPantalla(nuevoAnchoPantalla);
        };

        // Agregar el evento de cambio de tamaño de ventana
        window.addEventListener('resize', handleResize);

        // Limpia el evento cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div
                className={`${styles.sidebar} ${
                    isSidebarOpen || anchoPantalla <= 1200 ? styles.close : ''
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
                    <li>
                        <Link to={'/administracion'}>
                            <i className='bx bx-grid-alt'></i>
                            <span className={styles.link_name}>Dashboard</span>
                        </Link>

                        <ul className={`${styles.sub_menu} ${styles.blank}`}>
                            <li>
                                <Link
                                    to={'/administracion'}
                                    className={styles.link_name}
                                    href='#'
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={'/administracion/usuarios'}>
                            <i className='bx bx-user'></i>
                            <span className={styles.link_name}>Usuarios</span>
                        </Link>
                        <ul className={`${styles.sub_menu} ${styles.blank}`}>
                            <li>
                                <Link
                                    to={'/administracion/usuarios'}
                                    className={styles.link_name}
                                    href='#'
                                >
                                    Usuarios
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={'/administracion/roles'}>
                            <i className='bx bxs-user-detail'></i>
                            <span className={styles.link_name}>Roles</span>
                        </Link>
                        <ul className={`${styles.sub_menu} ${styles.blank}`}>
                            <li>
                                <Link
                                    to={'/administracion/roles'}
                                    className={styles.link_name}
                                    href='#'
                                >
                                    Roles
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to={'/administracion/proveedores'}>
                            <i className='bx bxs-phone'></i>
                            <span className={styles.link_name}>
                                Proveedores
                            </span>
                        </Link>
                        <ul className={`${styles.sub_menu} ${styles.blank}`}>
                            <li>
                                <Link
                                    to={'/administracion/proveedores'}
                                    className={styles.link_name}
                                    href='#'
                                >
                                    Proveedores
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className={`${isSubMenuOpen ? styles.showMenu : ''} `}>
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
                                <a className={styles.link_name} href='#'>
                                    Productos
                                </a>
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
                    <li>
                        <Link to={'/administracion/clientes'}>
                            <i className='bx bx-child'></i>
                            <span className={styles.link_name}>Clientes</span>
                        </Link>
                        <ul className={`${styles.sub_menu} ${styles.blank}`}>
                            <li>
                                <Link
                                    to={'/administracion/clientes'}
                                    className={styles.link_name}
                                    href='#'
                                >
                                    Clientes
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={'/administracion/compras'}>
                            <i className='bx bxs-cart-download'></i>
                            <span className={styles.link_name}>Compras</span>
                        </Link>
                        <ul className={`${styles.sub_menu} ${styles.blank}`}>
                            <li>
                                <Link
                                    to={'/administracion/compras'}
                                    className={styles.link_name}
                                    href='#'
                                >
                                    Compras
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={'/administracion/ordenes'}>
                            <i className='bx bx-credit-card-alt'></i>
                            <span className={styles.link_name}>Ordenes</span>
                        </Link>
                        <ul className={`${styles.sub_menu} ${styles.blank}`}>
                            <li>
                                <Link
                                    to={'/administracion/ordenes'}
                                    className={styles.link_name}
                                    href='#'
                                >
                                    Ordenes
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={'/'}>
                            <i className='bx bxs-purchase-tag'></i>
                            <span className={styles.link_name}>Catálogo</span>
                        </Link>
                        <ul className={`${styles.sub_menu} ${styles.blank}`}>
                            <li>
                                <Link
                                    to={'/'}
                                    className={styles.link_name}
                                    href='#'
                                >
                                    Catálogo
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles.profile_details}>
                            <div className={styles.profile_content}>
                                <img src={profile} alt='imagen de perfil' />
                            </div>
                            <div className={styles.name_job}>
                                <div className={styles.profile_name}>
                                    Jesús Cochero
                                </div>
                                <div className={styles.job}>Admin</div>
                            </div>
                            <Link to={'/login'}>
                                <i
                                    className='bx bx-log-out'
                                    style={{ paddingLeft: '17px' }}
                                ></i>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
            {/*<ButtonCloseMenu onClick={toggleSidebar} />*/}
            <section className={styles.home_section}>
                <div>
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default MenuLateral;
