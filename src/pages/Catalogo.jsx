import '../css-general/cssgeneral.css';
import '../css-general/tailwind.min.css';
import useAuth from '../hooks/useAuth';
import logo from '../imgNavbar/LogoNegro.png';
import style from './Catalogo.module.css';
import { Link } from 'react-router-dom';
import logoW from '../imgNavbar/whatsapp.svg'
import logo10 from '../imgNavbar/LogoPNG.png'
import { useDisenosContext } from '../context/DisenosProvider.jsx';
import useProducto from '../hooks/useProducto.jsx';
import usePrendas from '../hooks/usePrendas.jsx';
import { redirigirWhatsApp } from '../constantes/funciones.js';
import { useState } from 'react';
import DetalleCatalogoPrendas from './DetalleCatalogoPrendas.jsx';
import DetalleCatalogoProducto from './DetalleCatalogoProducto.jsx';




//Componente
const Catalogo = () => {




    /// Funcionalidad para cerra el modal dy abrir el modal de detalleprendas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /// Funcionalidad para cerra el modal dy abrir el modal de detalleproductos
    const [showProducto, setShowProducto] = useState(false);

    const handleCloseProducto = () => setShowProducto(false);
    const handleShowProducto = () => setShowProducto(true);



    const [DetallesPrendasCatalogo, setDetallesPrendasCatalogo] = useState({});

    const [DetallesProductoCatalogo, setDetallesProductoCatalogo] = useState({});


    const { Prendas } = usePrendas();





    //traemos toda la informacion de prendas guardada

    //hacemos el conteno de cuanrto diseños hay guardadoa
    // const cantidadPrendas = Prendas ? Prendas.filter(prenda => prenda.publicado).length : 0;


    //traemos toda la informacion de producto guardada
    const { productos } = useProducto();
    // const cantidadProductos = productos ? productos.length : 0;

    //traemos toda la informacion de diseños guardada
    const { disenosDB } = useDisenosContext();
    //hacemos el conteno de cuanrto diseños hay guardadoa
    // const cantidadDisenos = disenosDB ? disenosDB.filter(diseno => diseno.publicado).length : 0;

    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';




    return (
        <div className={style.contenedorCatalogo}>
            <header className={style.header}>
                <a href='#' className={style.logo}>
                    <img src={logo} alt='' />
                    Colch Star
                </a>

                {/* <div className={`${style.bx} ${style['bx-menu']}`} id="menuicon"></div> */}

                <ul className={style.navbar}>
                    <li>
                        <a href='#home' className={style.home_active}>
                            Inicio
                        </a>
                    </li>
                    {/* <li>
                        <a href='#categories'>Categorias</a>
                    </li> */}
                    <li>
                        <a href='#productos'>Productos</a>
                    </li>
                    <li>
                        <a href='#prendas'>Prendas</a>
                    </li>
                    <li>
                        <a href='#diseños'>Diseños</a>
                    </li>
                    <li>
                        <a href='#about'>Nosotros</a>
                    </li>
                </ul>

                <div className={style.profile}>
                    {auth?.usuario?.id_usuario ? (
                        <Link
                            to={`/administracion/${auth.usuario.permisos[0]}`}
                        >
                            {' '}
                            Entrar{' '}
                        </Link>
                    ) : (
                        <Link to={'/login'}> Iniciar sesión </Link>
                    )}
                </div>
            </header>

            <section
                className={`${style.home} ${style.swiper} ${style.section}`}
                id='home'
            >
                <div
                    id='carouselExampleControls'
                    className='carousel slide'
                    data-bs-ride='carousel'
                >
                    <div className={`carousel-inner ${style.todo}`}>
                        {productos
                            .filter(
                                (producto) =>
                                    producto.publicado &&
                                    producto.estado !== false
                            )
                            .map((producto, index) => (
                                <div
                                    className={`carousel-item ${
                                        index === 0 ? 'active' : ''
                                    }`}
                                    key={index}
                                >
                                    <div className={style['home-text']}>
                                        <span>Nosotros somos colch star</span>
                                        <h1>
                                            ¡Renueva tu estilo <br /> con
                                            nuestra colección <br /> de prendas
                                            de vestir <br /> de alta calidad!
                                        </h1>
                                    </div>
                                    <div className={style.oe}>
                                        <img
                                            key={index}
                                            src={
                                                producto.imagen
                                                    ? `${
                                                          import.meta.env
                                                              .VITE_BACKEND_URL
                                                      }/${producto.imagen}`
                                                    : ''
                                            }
                                            className={`d-block w-100 ${style.img} ${style.otro}`}
                                            alt=''
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                    <button
                        className='carousel-control-prev'
                        type='button'
                        data-bs-target='#carouselExampleControls'
                        data-bs-slide='prev'
                    >
                        {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
                        <span className='swiper-button-prev'></span>
                    </button>
                    <button
                        className='carousel-control-next'
                        type='button'
                        data-bs-target='#carouselExampleControls'
                        data-bs-slide='next'
                    >
                        {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
                        <span className='swiper-button-next'></span>
                    </button>
                </div>
            </section>

            {/* <section
                className={style.categories + ' ' + style.section}
                id='categories'
            >
                <div className={`${style.heading} ${style.section}`}>
                    <h1>
                        Explore nuestros productos <br />
                        <span>Categorias</span>
                    </h1>
                </div>

                <div className={style['categories-container']}>
                   
                    <div className={`${style.box} ${style.box1}`}>
                        <img className={style.img} src={logo4} alt='' />
                        <h2>Prendas</h2>
                        <span>
                            <p> {cantidadPrendas} Artículos </p>
                        </span>
                        <a href='#products'>
                            <i className={`bx bx-right-arrow-alt`}></i>
                        </a>
                    </div>

    
                    <div className={`${style.box} ${style.box2}`}>
                        <img className={style.img} src={logo5} alt='' />
                        <h2>Diseños</h2>
                        <span>
                            <p> {cantidadDisenos} Artículos </p>
                        </span>
                        <a href='#diseños'>
                            <i className={`bx bx-right-arrow-alt`}></i>
                        </a>
                    </div>
                </div>
            </section> */}

            {/* //productoss */}
            <div className={style.color}>
                <section
                    className={style.products + ' ' + style.section}
                    id='productos'
                >
                    <div className={style.heading}>
                        <h1>
                            Nuestros Productos <br />
                        </h1>
                        <a onClick={redirigirWhatsApp} className={style.btn}>
                            Comprar <i className='bx bx-right-arrow-alt'></i>
                        </a>
                    </div>

                    <div className={style.productsconatiner}>
                        {productos
                            .filter(
                                (productos) =>
                                    productos.publicado &&
                                    productos.estado !== false
                            ) // Filter only published designs
                            .map((productos, index) => (
                                <div className={style.box} key={index}>
                                    <img
                                        className={
                                            style.imagenProducto +
                                            ' ' +
                                            style.img
                                        }
                                        src={
                                            productos.imagen
                                                ? `${
                                                      import.meta.env
                                                          .VITE_BACKEND_URL
                                                  }/${productos.imagen}`
                                                : ''
                                        }
                                        alt=''
                                        onClick={() => {
                                            handleShowProducto();

                                            setDetallesProductoCatalogo(
                                                productos
                                            );
                                        }}
                                    />
                                    <div
                                        className={style.informacionProducto}
                                    ></div>
                                    <span className={style.discount}>
                                        {/* {diseno.publicado ? 'Publicado' : 'No publicado'} */}
                                        {productos.nombre}
                                    </span>
                                    <img
                                        onClick={redirigirWhatsApp}
                                        className={
                                            style.iconoWhatapp + ' ' + style.img
                                        }
                                        src={logoW}
                                        alt=''
                                    />
                                </div>
                            ))}
                    </div>
                </section>
            </div>

            {/* //prendas */}
            <section
                className={style.products + ' ' + style.section}
                id='prendas'
            >
                <div className={style.heading}>
                    <h1>
                        Nuestras Prendas <br />
                    </h1>
                    <a onClick={redirigirWhatsApp} className={style.btn}>
                        Comprar <i className='bx bx-right-arrow-alt'></i>
                    </a>
                </div>

                <div className={style.productsconatiner}>
                    {Prendas.filter(
                        (Prenda) => Prenda.publicado && Prenda.estado !== false
                    ).map((Prenda, index) => (
                        <div className={style.box} key={index}>
                            <img
                                className={
                                    style.imagenProducto + ' ' + style.img
                                }
                                src={
                                    Prenda.imagen
                                        ? `${
                                              import.meta.env.VITE_BACKEND_URL
                                          }/${Prenda.imagen}`
                                        : ''
                                }
                                alt=''
                                onClick={() => {
                                    handleShow();

                                    setDetallesPrendasCatalogo(Prenda);
                                }}
                            />
                            <div className={style.informacionProducto}></div>
                            <span className={style.discount}>
                                {Prenda.nombre}
                            </span>
                            <img
                                onClick={redirigirWhatsApp}
                                className={style.iconoWhatapp + ' ' + style.img}
                                src={logoW}
                                alt=''
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* //diseñossss */}
            <section
                className={style.products + ' ' + style.section}
                id='diseños'
            >
                <div className={style.heading}>
                    <h1>
                        Nuestros Diseños <br />
                    </h1>
                    <a onClick={redirigirWhatsApp} className={style.btn}>
                        Comprar <i className='bx bx-right-arrow-alt'></i>
                    </a>
                </div>

                <div className={style.productsconatiner}>
                    {disenosDB
                        .filter(
                            (diseno) =>
                                diseno.publicado && diseno.estado !== false
                        ) // Filter only published designs
                        .map((diseno) => (
                            <div className={style.box} key={diseno.id_diseno}>
                                <img
                                    className={
                                        style.imagenProducto + ' ' + style.img
                                    }
                                    src={
                                        diseno.imagen
                                            ? `${
                                                  import.meta.env
                                                      .VITE_BACKEND_URL
                                              }/${diseno.imagen}`
                                            : ''
                                    }
                                    alt=''
                                />
                                <div
                                    className={style.informacionProducto}
                                ></div>
                                <span className={style.discount}>
                                    {/* {diseno.publicado ? 'Publicado' : 'No publicado'} */}
                                    {diseno.nombre}
                                </span>
                                <img
                                    onClick={redirigirWhatsApp}
                                    className={
                                        style.iconoWhatapp + ' ' + style.img
                                    }
                                    src={logoW}
                                    alt=''
                                />
                            </div>
                        ))}
                </div>
            </section>

            <div className={style.color}>
                <section
                    className={style.about + ' ' + style.section}
                    id='about'
                >
                    <img className={style.img} src={logo10} alt='' />
                    <div
                        className={style.abouttext}
                        style={{ textAlign: 'justify' }}
                    >
                        <span>Nosotros</span>
                        <p>
                            En <strong>Colch Star</strong>, nos dedicamos
                            apasionadamente a plasmar diseños únicos en prendas
                            de vestir. Desde nuestra fundación en 2022, nos
                            hemos destacado en la industria de los estampados de
                            ropa, brindando soluciones creativas y de alta
                            calidad a nuestros clientes.
                        </p>
                        <p>
                            Bienvenidos a Colch Star, donde transformamos
                            prendas en obras de arte y convertimos tus ideas en
                            realidad.
                        </p>
                        {/* <a href="#" className={style.btn}>Leer más <i className="bx bx-right-arrow-alt"></i></a> */}
                    </div>
                </section>

                <div className={style.copyright}>
                    Copyright &copy; {new Date().getFullYear()} Colch Star.
                    Todos los derechos reservados.
                </div>
                <DetalleCatalogoPrendas
                    DetallesPrendasCatalogo={DetallesPrendasCatalogo}
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                />

                <DetalleCatalogoProducto
                    DetallesProductoCatalogo={DetallesProductoCatalogo}
                    showProducto={showProducto}
                    handleCloseProducto={handleCloseProducto}
                    handleShowProducto={handleShowProducto}
                />
            </div>
        </div>
    );
};

export default Catalogo;
