import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { FcApproval, FcCancel } from 'react-icons/fc';
import styles from '../../css-general/estilosReutilizables.module.css';

const DetallesProducto = ({ editarProducto }) => {
    return (
        <div>
            <div className='modal' id='modalDetalles'>

                <div className='modal-dialog modal-dialog-centered  '>
                    <div className='modal-content ' style={{ width: '1400%' }} >
                        <HeaderModals title='Imagen del producto' />
                        <div className='formulario'>
                            <div className='modal-body'>
                                <div className='container'>
                                    <div className='col'>
                                        <div className='row'>
                                            <div className='row gx-0'>
                                                <div className='col-md-6'>
                                                    <div className='row d-flex justify-content-center align-items-center'>

                                                        <div className='col-md-16'>
                                                            <h2 style={{ textAlign: 'center', fontWeight: 600 }}>Producto:</h2>
                                                            <a
                                                                href={`${import.meta.env.VITE_BACKEND_URL
                                                                    }/${editarProducto.imagen}`}
                                                                className={styles.contenedor_imagen}
                                                            >
                                                                {' '}
                                                                <img
                                                                    src={`${import.meta.env
                                                                        .VITE_BACKEND_URL
                                                                        }/${editarProducto.imagen}`}
                                                                    alt={editarProducto.nombre}
                                                                    title='Ver Imagen Completa'
                                                                />
                                                            </a>
                                                            <h2 style={{ textAlign: 'center', fontWeight: 600 }}>Prenda:</h2>
                                                            <a
                                                                href={`${import.meta.env.VITE_BACKEND_URL
                                                                    }/${editarProducto.prenda && editarProducto.prenda.imagen}`}
                                                                className={styles.contenedor_imagen}
                                                            >
                                                                {' '}
                                                                <img
                                                                    src={`${import.meta.env
                                                                        .VITE_BACKEND_URL
                                                                        }/${editarProducto.prenda && editarProducto.prenda.imagen}`}
                                                                    alt={editarProducto.nombre}
                                                                    title='Ver Imagen Completa'
                                                                />
                                                            </a>
                                                        </div>

                                                        

                                                            <div className='card-body'>
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
                                                                    fontSize: '45px',
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


                    </div>
                </div>
            </div>
        </div>


    )
}

export default DetallesProducto