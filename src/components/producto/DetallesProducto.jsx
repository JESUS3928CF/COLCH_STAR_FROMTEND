import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { FcApproval, FcCancel } from 'react-icons/fc';
import styles from '../../css-general/estilosReutilizables.module.css';

const DetallesProducto = ({ editarProducto }) => {
    return (
        <div>
            <div className='modal' id='modalDetalles'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <HeaderModals title='Imagen del producto' />
                        <div className='formulario'>
                            <div className='modal-body'>
                                <div className='container'>
                                    <div className='col'>
                                        <div className='row d-flex justify-content-center align-items-center'>
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
    )
}

export default DetallesProducto



