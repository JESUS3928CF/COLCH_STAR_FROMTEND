import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { FcApproval, FcCancel } from 'react-icons/fc';
import styles from '../../css-general/estilosReutilizables.module.css';


const DetallesProducto = ({ editarProducto }) => {

    return (
        <div>
            <div className='modal' id='modalDetalles'>

                <div className='modal-dialog modal-dialog-centered modal '>
                    <div className='modal-content ' >
                        <HeaderModals title='Imagen del producto' />
                        <div className='formulario'>
                            <div className='modal-body'>
                                <div className='container'>
                                    <div className='col'>
                                        <div className='row'>

                                            <div className='row d-flex justify-content-center align-items-center'>
                                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                                                    <div className="carousel-inner">

                                                        <div className ={`carousel-item active ${styles.tamano}`}>
                                                            <div className={styles.titu} >
                                                                <h2 >Producto:</h2>
                                                            </div>

                                                            <img
                                                                src={
                                                                    editarProducto.imagen
                                                                        ? `${import.meta.env
                                                                            .VITE_BACKEND_URL
                                                                        }/${editarProducto.imagen
                                                                        }`
                                                                        : ''

                                                                }
                                                                alt={editarProducto.nombre}
                                                                title={editarProducto.nombre}
                                                                className={styles.contenedor_imagen}
                                                            />
                                                        </div>

                                                        <div className={`carousel-item  ${styles.tamano}`} >

                                                            <div className={styles.titu} >
                                                                <h2 >Prenda</h2>
                                                            </div>

                                                            <img
                                                                src={
                                                                    editarProducto.imagen
                                                                        ? `${import.meta.env
                                                                            .VITE_BACKEND_URL
                                                                        }/${editarProducto.prenda && editarProducto.prenda.imagen
                                                                        }`
                                                                        : ''
                                                                }
                                                                alt={editarProducto.nombre}
                                                                title={editarProducto.nombre}
                                                                className={styles.contenedor_imagen}
                                                            />
                                                        </div>



                                                        {editarProducto.disenos && editarProducto.disenos.map(diseno => (
                                                            <div key={diseno.nombre} className={`carousel-item  ${styles.tamano}`}>

                                                                <div className={styles.titu} >
                                                                    <h2 >Diseños</h2>
                                                                </div>

                                                                <a href=""
                                                                    className={styles.contenedor_imagen}>

                                                                    <img src={diseno.imagen ? `${import.meta.env
                                                                        .VITE_BACKEND_URL
                                                                        }/${diseno.imagen && diseno.imagen
                                                                        }`
                                                                        : ''}
                                                                        alt={diseno.nombre}
                                                                        title= {diseno.nombre}
                                                                        className={styles.contenedor_imagen}
                                                                        
                                                                    />

                                                                </a>
                                                                <br />

                                                                <p>Tamaño: {diseno.tamano}</p>

                                                            </div>
                                                        ))}

                                                    </div>
                                                    <button  className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className={` carousel-control-prev-icon ${styles.flecha}`} aria-hidden="true"></span>
                                                        <span  className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className={`carousel-control-next-icon ${styles.flecha}`} aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>







                                                {/* <div className='col-md-5 ml-5'> */}
                                                <div className={` card-body  ${styles.car}`}>


                                                    <h2
                                                        htmlFor='nombre'
                                                        className='card-title'
                                                    >
                                                        {' '}
                                                        <b>Genero:</b>{' '}
                                                        {editarProducto.prenda && editarProducto.prenda.genero}
                                                    </h2>
                                                    <h2
                                                        htmlFor='nombre'
                                                        className='card-title'
                                                    >
                                                        {' '}
                                                        <b>Tela:</b>{' '}
                                                        {editarProducto.prenda && editarProducto.prenda.tipo_de_tela}
                                                    </h2>


                                                </div>
                                            </div>

                                        </div>


                                        <div className='text-center mt-4 d-flex justify-content-center align-items-center'>
                                            <h3
                                                htmlFor='publicado'
                                                className='card-title'
                                            >
                                                {' '}
                                                <b>Publicado </b>
                                            </h3>
                                            <div
                                                style={{
                                                    fontSize: '40px',
                                                    paddingLeft: '10px',
                                                    paddingBottom: '5px',
                                                }}
                                            >
                                                {editarProducto.publicado &&
                                                    editarProducto.estado ? (
                                                    <FcApproval />
                                                ) : (
                                                    <FcCancel />
                                                )}
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>


    )
}

export default DetallesProducto