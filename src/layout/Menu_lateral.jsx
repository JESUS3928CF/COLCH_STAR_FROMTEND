// import { Outlet } from "react-router"
import styles from './Menu_lateral.module.css';
import logo from '../imgNavbar/LogoPNG.png';
import profile from '../imgNavbar/1153861.png';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { calcularAnchoDePantalla } from '../helpers/calcularAnchoDePantalla';

const MenuLateral = () => {
    // const [isSidebarOpen, setSidebarOpen] = useState(false); estado para el botón de cerrar menú
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
        /// Calcular el ancho de pantalla actual
        calcularAnchoDePantalla(setAnchoPantalla);
    }, []);

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
                                <Link to={'/administracion/productos'} className={styles.link_name}>
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
                <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default MenuLateral;
