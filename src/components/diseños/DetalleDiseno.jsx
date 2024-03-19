// ------------------JESÚS ANTONIO COCHERO FLORIÁN
//-------------------26 de septiembre 2023
//Nos permitirá Mostrar la información de los diseños que no se muestra en la taba listar
import PropTypes from 'prop-types';

import HeaderModals from '../chared/HeaderModals';

import { FcApproval, FcCancel } from 'react-icons/fc';

import '../prendas/IconCss/style.Icon.css';
import styles from '../../css-general/estilosReutilizables.module.css';

export const DetalleDiseno = ({ detalleDiseno }) => {
    return (
        <div className='modal' id='modalDetalles'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <HeaderModals
                        title='Imagen del diseño'
                    />
                    <div className='formulario'>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='col'>
                                    <div className='row d-flex justify-content-center align-items-center'>
                                        <a
                                            href={
                                                detalleDiseno.imagen
                                                    ? `${import.meta.env.VITE_BACKEND_URL}/${detalleDiseno.imagen}`
                                                    : ''
                                            }
                                            className={styles.contenedor_imagen}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={
                                                    detalleDiseno.imagen
                                                        ? `${import.meta.env.VITE_BACKEND_URL}/${detalleDiseno.imagen}`
                                                        : ''
                                                }
                                                alt={detalleDiseno.nombre}
                                                title='Ver imagen completa'
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
                                                {detalleDiseno.publicado &&
                                                    detalleDiseno.estado ? (
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
    );
};

DetalleDiseno.propTypes = {
    detalleDiseno: PropTypes.object.isRequired,
};
