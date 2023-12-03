import '../css-general/cssgeneral.css';
import '../css-general/tailwind.min.css';
import useAuth from '../hooks/useAuth';
import logo from '../imgNavbar/LogoNegro.png';
import style from './Catalogo.module.css';
import { Link } from 'react-router-dom';
import logo1 from '../imgNavbar/designious2.jpg';
import logo2 from '../imgNavbar/designious1.jpg';
import logo3 from '../imgNavbar/designious3.jpg';
import logo4 from '../imgNavbar/camisaBasica.png';
import logo5 from '../imgNavbar/039.png';
import logo6 from '../imgNavbar/cBlanca.png';
import logo7 from '../imgNavbar/buzo.png';
import logo8 from '../imgNavbar/057.png';
import logo9 from '../imgNavbar/117.png';
import logoW from '../imgNavbar/whatsapp.svg'
import logo10 from '../imgNavbar/LogoPNG.png'
import { useDisenosContext } from '../context/disenosProvider';
import useProducto from '../hooks/useProducto';
import usePrendas from '../hooks/usePrendas';




//Componente
const Catalogo = () => {


    //traemos toda la informacion de prendas guardada
    const { Prendas } = usePrendas();
    //hacemos el conteno de cuanrto diseños hay guardadoa
    const cantidadPrendas = Prendas ? Prendas.length : 0;
    console.log(Prendas)


    //traemos toda la informacion de producto guardada
    const { productos } = useProducto();
    // const cantidadProductos = productos ? productos.length : 0;
    // console.log(productos)

    //traemos toda la informacion de diseños guardada
    const { disenosDB } = useDisenosContext();
    //hacemos el conteno de cuanrto diseños hay guardadoa
    const cantidadDisenos = disenosDB ? disenosDB.length : 0;
    console.log(disenosDB)





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
                    {/* <li>
                        <a href='#home' className={style.home_active}>
                            Home
                        </a>
                    </li> */}
                    <li>
                        <a href='#categories'>Categorias</a>
                    </li>
                    <li>
                        <a href='#products'>Productos</a>
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
                        <Link to={'/administracion'}> Iniciar sección </Link>
                    ) : (
                        <Link to={'/login'}> Iniciar sección </Link>
                    )}
                </div>
            </header>


            
            {/* <section
                className={`${style.home} ${style.swiper} ${style.section}`}
                id='home'
            >
                <div className={style['swiper-wrapper']}>
                    <div
                        className={`${style['swiper-slide']} ${style.container}`}
                    >
                        <div className={style['home-text']}>
                            <span>Nosotros somos colch star</span>
                            <h1>
                                ¡Renueva tu estilo <br /> con nuestra colección{' '}
                                <br /> de prendas de vestir <br /> de alta
                                calidad!
                            </h1>
                            <a href='#' className={style.btn}>
                                Comprar ahora{' '}
                                <i
                                    className={`${style.bx} ${style['bx-right-arrow-alt']}`}
                                ></i>
                            </a>
                        </div>
                        <img className={style.img} src={logo1} alt='' />
                    </div>
                    <div
                        className={`${style['swiper-slide']} ${style.container}`}
                    >
                        <div className={style['home-text']}>
                            <span>Nosotros somos colch star</span>
                            <h1>
                                ¡Renueva tu estilo <br /> con nuestra colección{' '}
                                <br /> de prendas de vestir <br /> de alta
                                calidad!
                            </h1>
                            <a href='#' className={style.btn}>
                                Comprar ahora{' '}
                                <i
                                    className={`${style.bx} ${style['bx-right-arrow-alt']}`}
                                ></i>
                            </a>
                        </div>
                        <img src={logo2} alt='' />
                    </div>

                    <div
                        className={`${style['swiper-slide']} ${style.container}`}
                    >
                        <div className={style['home-text']}>
                            <span>Nosotros somos colch star</span>
                            <h1>
                                ¡Renueva tu estilo <br /> con nuestra colección{' '}
                                <br /> de prendas de vestir <br /> de alta
                                calidad!
                            </h1>
                            <a href='#' className={style.btn}>
                                Comprar ahora{' '}
                                <i
                                    className={`${style.bx} ${style['bx-right-arrow-alt']}`}
                                ></i>
                            </a>
                        </div>
                        <img className={style.img} src={logo3} alt='' />
                    </div>
                </div>
                <div className='swiper-button-next'></div>
                <div className='swiper-button-prev'></div>
            </section> */}

                   
            <section
                className={style.categories + ' ' + style.section}
                id='categories'
            >
                <div className={`${style.heading} ${style.section}`}>
                    <h1>
                        Explore nuestros productos <br />
                        <span>Categorias</span>
                    </h1>
                    <a href='#' className={style.btn}>
                        Ver todo <i className={`bx bx-right-arrow-alt`}></i>
                    </a>
                </div>

                {/* Contenedor de contenido */}
                <div className={style['categories-container']}>
                    
                    {/* Box 1 */}
                    <div className={`${style.box} ${style.box1}`}>
                        <img className={style.img} src={logo4} alt='' />
                        <h2>Prendas</h2>
                        <span><p> {cantidadPrendas} Articulos </p></span>
                        <a href='#products'><i className={`bx bx-right-arrow-alt`}></i></a>
                    </div>

                    {/* Box 2 */}
                    <div className={`${style.box} ${style.box2}`}>
                        <img className={style.img} src={logo5} alt='' />
                        <h2>Diseños</h2>
                        <span><p> {cantidadDisenos} Articulos </p></span>
                        <a href='#diseños'><i className={`bx bx-right-arrow-alt`}></i></a>

                    </div>

                </div>
            </section>



            {/* //prendas */}
            <section className={style.products + ' ' + style.section} id="products" >
                <div className={style.heading}>
                    <h1>Nuestras Prendas  <br /> <span>Populares</span></h1>
                    <a href="#" className={style.btn}>Comprar <i className="bx bx-right-arrow-alt"></i></a>
                </div>

                <div className={style.productsconatiner}>

                    {Prendas
                        .filter((Prendas) => Prendas.publicado) // Filter only published designs
                        .map((Prendas) => (
                            <div className={style.box} key={Prendas.id_diseno}>
                                <img
                                    className={style.imagenProducto + " " + style.img}
                                    src={
                                        Prendas.imagen
                                            ? `${import.meta.env.VITE_BACKEND_URL}/${Prendas.imagen}`
                                            : ''
                                    }
                                    alt=""
                                />
                                <div className={style.informacionProducto}>
                                </div>
                                <span className={style.discount}>
                                    {/* {diseno.publicado ? 'Publicado' : 'No publicado'} */}{Prendas.nombre}
                                </span>
                                <img className={style.iconoWhatapp + " " + style.img} src={logoW} alt="" />
                            </div>
                        ))}
                </div>
            </section>






            {/* //productoss */}
            <section className={style.products + ' ' + style.section} id="" >
                <div className={style.heading}>
                    <h1>Nuestros Productos  <br /> <span>Populares</span></h1>
                    <a href="#" className={style.btn}>Comprar <i className="bx bx-right-arrow-alt"></i></a>
                </div>

                <div className={style.productsconatiner}>

                    {productos
                        .filter((productos) => productos.publicado) // Filter only published designs
                        .map((productos) => (
                            <div className={style.box} key={productos.id_diseno}>
                                <img
                                    className={style.imagenProducto + " " + style.img}
                                    src={
                                        productos.imagen
                                            ? `${import.meta.env.VITE_BACKEND_URL}/${productos.imagen}`
                                            : ''
                                    }
                                    alt=""
                                />
                                <div className={style.informacionProducto}>
                                </div>
                                <span className={style.discount}>
                                    {/* {diseno.publicado ? 'Publicado' : 'No publicado'} */}{productos.nombre}
                                </span>
                                <img className={style.iconoWhatapp + " " + style.img} src={logoW} alt="" />
                            </div>
                        ))}
                </div>
            </section>




                    {/* //diseñossss */}
            <section className={style.products + ' ' + style.section} id="diseños" >
                <div className={style.heading}>
                    <h1>Nuestros Diseños <br /> <span>Populares</span></h1>
                    <a href="#" className={style.btn}>Comprar <i className="bx bx-right-arrow-alt"></i></a>
                </div>

                <div className={style.productsconatiner}>

                    {disenosDB
                        .filter((diseno) => diseno.publicado) // Filter only published designs
                        .map((diseno) => (
                            <div className={style.box} key={diseno.id_diseno}>
                                <img
                                    className={style.imagenProducto + " " + style.img}
                                    src={
                                        diseno.imagen
                                            ? `${import.meta.env.VITE_BACKEND_URL}/${diseno.imagen}`
                                            : ''
                                    }
                                    alt=""
                                />
                                <div className={style.informacionProducto}>
                                </div>
                                <span className={style.discount}>
                                    {/* {diseno.publicado ? 'Publicado' : 'No publicado'} */}{diseno.nombre}
                                </span>
                                <img className={style.iconoWhatapp + " " + style.img} src={logoW} alt="" />
                            </div>
                        ))}
                </div>
            </section>





            <section className={style.about + ' ' + style.section} id="about" >
                <img className={style.img} src={logo10} alt="" />
                <div className={style.abouttext}>
                    <span>Nosotros</span>
                    <p>En Colch Star, nos dedicamos apasionadamente a plasmar diseños únicos en prendas de vestir. Desde nuestra fundación en 2022, nos hemos destacado en la industria de los estampados de ropa, brindando soluciones creativas y de alta calidad a nuestros clientes</p>
                    <p>Bienvenidos a Colch Star, donde transformamos prendas en obras de arte y convertimos tus ideas en realidad.</p>
                    <a href="#" className={style.btn}>Leer más <i className="bx bx-right-arrow-alt"></i></a>
                </div>
            </section>










        </div>
    );
};

export default Catalogo;
