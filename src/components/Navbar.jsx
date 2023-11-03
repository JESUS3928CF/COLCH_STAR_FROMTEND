import styles from './Navbar.module.css';
import logo from '../imgNavbar/LogoPNG.png';
import profileImg from '../imgNavbar/1153861.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';




export const Navbar = () => {

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };



    return (
        <div className={`${styles.sidebar} ${styles.close}`}>
            <div className={`${styles.logo_detalle}`}>
                <i>
                    <img src={logo} alt='imagen del logo' width='39px' style={{ marginLeft: 30, marginTop: 11 }} />
                </i>
                <span className={`${styles.nombre_logo}`} style={{ marginTop: 9 }}>Colch Star</span>
            </div>
            <ul className={`${styles.nav_links}`}>
                <li>
                    <div className={`${styles.iocn_link}`}>
                        <Link to={'/dashboard'}>
                            <i className='bx bx-grid-alt'></i>
                            <span className={`${styles.link_name}`}>
                                Inicio
                            </span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={`${styles.iocn_link}`}>
                        <Link to={'/usuarios'}>
                            <i className='bx bx-user'></i>
                            <span className={`${styles.link_name}`}>
                                Usuarios
                            </span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={`${styles.iocn_link}`}>
                        <Link to={'/roles'}>
                            <i className='bx bxs-user-detail'></i>
                            <span className={`${styles.link_name}`}>Roles</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={`${styles.iocn_link}`}>
                        <Link to={'/proveedores'}>
                            <i className='bx bxs-phone'></i>
                            <span className={`${styles.link_name}`}>
                                Proveedores
                            </span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={`${styles.iocn_link}`}>
                        <Link to={'/productos'}>
                            <i className='bx bxs-truck'></i>
                            <span className={`${styles.link_name}`}>
                                Productos
                            </span>
                        </Link>
                        <i className='bx bx-right-arrow-alt' onClick={toggleSubMenu}></i>
                    </div>
                </li>

                {isSubMenuOpen && (
                    <div className={`${styles.submenuu}`} >
                        <ul className={`${styles.submenu}`}>

                            <div className={`${styles.siu}`}>
                                <Link to="/prendas" className={`${styles.si}`} >
                                    <span className={`${styles.sub}`}>
                                        <span className={`${styles.spanImg}`}><i className='bx bxs-t-shirt'></i></span>
                                        Prendas
                                    </span>
                                </Link>
                            </div>

                            <Link to="/diseno" className={`${styles.si}`} >
                                <span className={`${styles.sub}`}>
                                    <span className={`${styles.spanImg}`}><i className='bx bxs-doughnut-chart'></i></span>
                                    Diseños
                                </span>
                            </Link>

                        </ul>
                    </div>
                )}


                <li>
                    <div className={`${styles.iocn_link}`}>
                        <Link to={'/clientes'}>
                            <i className='bx bx-child'></i>
                            <span className={`${styles.link_name}`}>
                                Clientes
                            </span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={`${styles.iocn_link}`}>
                        <Link to={'/compras'}>
                            <i className='bx bxs-cart-download'></i>
                            <span className={`${styles.link_name}`}>
                                Compras
                            </span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={`${styles.iocn_link}`}>
                        <Link to={'/ventas'}>
                            <i className='bx bx-credit-card-alt'></i>
                            <span className={`${styles.link_name}`}>
                                Ventas
                            </span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={`${styles.iocn_link}`}>
                        <Link to={'/'}>
                            <i className='bx bxs-purchase-tag'></i>
                            <span className={`${styles.link_name}`}>
                                Catalogo
                            </span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={`${styles.perfil_detalles}`}>
                        <div className={`${styles.contenido_perfil}`}>
                            <img src={profileImg} alt='imagen del perfil' />
                        </div>
                        <div className='perfil'>
                            <div className={`${styles.nombre_usuario}`}>
                                Jesús Cochero
                            </div>
                            <div className={`${styles.nombre_rol}`}>Admin</div>
                        </div>
                        <Link to={'/login'}>
                            <i className='bx bx-log-out'></i>{' '}
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

// export default Navbar
