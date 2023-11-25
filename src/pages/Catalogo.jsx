import '../css-general/cssgeneral.css'
import '../css-general/tailwind.min.css'
import useAuth from '../hooks/useAuth';
import logo from '../imgNavbar/LogoNegro.png';
import style from './Catalogo.module.css';
import { Link } from 'react-router-dom';
import logo1 from '../imgNavbar/designious2.jpg';
import logo2 from '../imgNavbar/designious1.jpg';
import logo3 from '../imgNavbar/designious3.jpg';
import logo4 from '../imgNavbar/camisaBasica.png';
import logo5 from '../imgNavbar/039.png';
// import logo6 from '../imgNavbar/cBlanca.png';
// import logo7 from '../imgNavbar/buzo.png';





const Catalogo = () => {

    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';

    return (
        <>
            <header>
                <a href="#" className={style.logo}>
                    <img src={logo} alt="" />
                    Colch Star
                </a>

                {/* <div className={`${style.bx} ${style['bx-menu']}`} id="menuicon"></div> */}

                <ul className={style.navbar}>
                    <li><a href="#home" className={style.home_active}>Home</a></li>
                    <li><a href="#categories">Categorias</a></li>
                    <li><a href="#products">Productos</a></li>
                    <li><a href="#about">Nosotros</a></li>
                </ul>

                <div className={style.profile}>
                    {auth?.usuario?.id_usuario ? (
                        <Link to={'/administracion'}> Iniciar sección </Link>
                    ) : (
                        <Link to={'/login'}> Iniciar sección </Link>
                    )}
                </div>
            </header>
            <body>


            // JSX
                <main className={`${style.home} ${style.swiper}`} id="home">
                    <div className={style['swiper-wrapper']} >

                        {/* Slide 1 */}
                        <div className={`${style['swiper-slide']} ${style.container}`}>
                            <div className={style['home-text']}>
                                <span>Nosotros somos colch star</span>
                                <h1>
                                    ¡Renueva tu estilo <br /> con nuestra colección <br /> de prendas de vestir <br /> de alta calidad!
                                </h1>
                                <a href="#" className={style.btn}>Comprar ahora <i className={`${style.bx} ${style['bx-right-arrow-alt']}`}></i></a>
                            </div>
                            <img src={logo1} alt="" />
                        </div>
                        {/* Slide 1 */}
                        <div className={`${style['swiper-slide']} ${style.container}`}>
                            <div className={style['home-text']}>
                                <span>Nosotros somos colch star</span>
                                <h1>
                                    ¡Renueva tu estilo <br /> con nuestra colección <br /> de prendas de vestir <br /> de alta calidad!
                                </h1>
                                <a href="#" className={style.btn}>Comprar ahora <i className={`${style.bx} ${style['bx-right-arrow-alt']}`}></i></a>
                            </div>
                            <img src={logo2} alt="" />
                        </div>

                        {/* Slide 1 */}
                        <div className={`${style['swiper-slide']} ${style.container}`}>
                            <div className={style['home-text']}>
                                <span>Nosotros somos colch star</span>
                                <h1>
                                    ¡Renueva tu estilo <br /> con nuestra colección <br /> de prendas de vestir <br /> de alta calidad!
                                </h1>
                                <a href="#" className={style.btn}>Comprar ahora <i className={`${style.bx} ${style['bx-right-arrow-alt']}`}></i></a>
                            </div>
                            <img src={logo3} alt="" />
                        </div>

                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </main>
                <main className={style.categories} id="categories">
                    <div className={style.heading}>
                        <h1>Explore nuestros productos <br /><span>Categorias</span></h1>
                        <a href="#" className={style.btn}>Ver todo <i className={`bx bx-right-arrow-alt`}></i></a>
                    </div>
                    {/* Contenedor de contenido */}
                    <div className={style['categoriescontainer']}>
                        {/* Box 1 */}
                        <div className={`${style.box} ${style.box1}`}>
                            <img src={logo4} alt="" />
                            <h2>Prendas</h2>
                            <span>22 Artículos</span>
                            <i className={`bx bx-right-arrow-alt`}></i>
                        </div>
                        {/* Box 2 */}
                        <div className={`${style.box} ${style.box2}`}>
                            <img src={logo5} alt="" />
                            <h2>Diseños</h2>
                            <span>360 Artículos</span>
                            <i className={`bx bx-right-arrow-alt`}></i>
                        </div>
                    </div>
                </main>

















            </body>
        </>





    );
};

export default Catalogo;
