import '../components/Navbar.css';
import logo from '../../../public/imgNavbar/LogoPNG.png';
import profileImg from '../../../public/imgNavbar/1153861.png';
import { Link } from 'react-router-dom';

export const Navbar = () => {


    return (
        <div className='sidebar close'>
            <div className='logo-detalle'>
                <i>
                    <img src={logo} alt='imagen del logo' width='39px' />
                </i>
                <span className='nombre_logo'>Colch Star</span>
            </div>
            <ul className='nav-links'>
                <li>
                    <div className='iocn-link'>
                        <Link to={'/dashboard'}>
                            <i className='bx bx-grid-alt'></i>
                            <span className='link_name'>Inicio</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div id='permisosUsuario' className='iocn-link'>
                        <Link to={'/usuarios'}>
                            <i className='bx bx-user'></i>
                            <span className='link_name'>Usuarios</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div id='permisosRoles' className='iocn-link'>
                        <Link to={'/roles'}>
                            <i className='bx bxs-user-detail'></i>
                            <span className='link_name'>Roles</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='iocn-link'>
                        <Link to={'/proveedores'}>
                            <i className='bx bxs-phone'></i>
                            <span className='link_name'>Proveedores</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='iocn-link'>
                        <Link to={'/productos'}>
                            <i className='bx bxs-truck'></i>
                            <span className='link_name'>Productos</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='iocn-link'>
                        <Link to={'/clientes'}>
                            <i className='bx bx-child'></i>
                            <span className='link_name'>Clientes</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='iocn-link'>
                        <Link to={'/compras'}>
                            <i className='bx bxs-cart-download'></i>
                            <span className='link_name'>Compras</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='iocn-link'>
                        <Link to={'/ventas'}>
                            <i className='bx bx-credit-card-alt'></i>
                            <span className='link_name'>Ventas</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='iocn-link'>
                        <Link to={'/'}>
                            <i className='bx bxs-purchase-tag'></i>
                            <span className='link_name'>Catalogo</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='perfil-detalles'>
                        <div className='contenido-perfil'>
                            <img src={profileImg} alt='imagen del perfil' />
                        </div>
                        <div className='perfil'>
                            <div id='nombre-usuario' className='nombre-usuario'>
                                Jesús Cochero
                            </div>
                            <div id='nombre-rol' className='nombre-rol'>
                                Admin
                            </div>
                        </div>
                        <Link to={'/login'}>
                            <i className='bx bx-log-out ,salir-icono'></i>{' '}
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

// export default Navbar
