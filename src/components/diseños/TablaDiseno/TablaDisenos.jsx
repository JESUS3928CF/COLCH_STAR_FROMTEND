import PropTypes from 'prop-types';
import BotonCambioEstado from '../../chared/BotonCambioEstado';
import BotonNegro from '../../chared/BotonNegro';
import { useEffect, useState } from 'react';
import { calcularAnchoDePantalla } from '../../../helpers/calcularAnchoDePantalla';

import styles from '../../../css-general/CardStyleGenerar.module.css';
import { resolucionCards } from '../../../constantes/constantes';
import { useDisenosContext } from '../../../context/DisenosProvider';

const TablaDisenos = ({
    disenosFiltrar,
    LlenarInformacionModal,
    LlenarInformacionModalEditar,
    setBusqueda
}) => {

    const { editarEstado, editarPublicacion } = useDisenosContext();
    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

    useEffect(() => {
        /// Calcular el ancho de pantalla actual
        calcularAnchoDePantalla(setAnchoPantalla);
        setBusqueda('');
    }, []);

    
    return anchoPantalla >= resolucionCards ? (
        <div className='tabla'>
            <div className='table-responsive'>
                <table className='table caption-top'>
                    <thead>
                        <tr>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Imagen</th>
                            <th scope='col'>Publicado</th>
                            <th scope='col'>Estado</th>
                            <th scope='col'>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disenosFiltrar.map((diseno) => (
                            <tr key={diseno.id_diseno}>
                                <td>{diseno.nombre}</td>
                                <td>
                                    <BotonNegro
                                        text='Ver'
                                        modalToOpen='#modalDetalles'
                                        onClick={() =>
                                            LlenarInformacionModal(diseno)
                                        }
                                    />
                                </td>
                                <td>
                                    <BotonCambioEstado
                                        id={diseno.id_diseno}
                                        isChecked={diseno.publicado}
                                        nombreRegistro='diseño'
                                        ruta={`/disenos/publicado/${diseno.id_diseno}`}
                                        cambiarPublicacion={{
                                            estado: diseno.estado,
                                            paraPublicacion: true,
                                        }}
                                        editarEstado={editarPublicacion}
                                    />
                                </td>
                                <td>
                                    <BotonCambioEstado
                                        id={diseno.id_diseno}
                                        isChecked={diseno.estado}
                                        nombreRegistro='diseño'
                                        ruta={`/disenos/estado/${diseno.id_diseno}`}
                                        editarEstado={editarEstado}
                                    />
                                </td>
                                <td>
                                    {/* con el ternario determinamos si abrir o no el modal*/}
                                    <BotonNegro
                                        text='Editar'
                                        onClick={() =>
                                            LlenarInformacionModalEditar(diseno)
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <div className={`row pt-4 justify-content-center`}>
            {disenosFiltrar.map((diseno) => (
                <div
                    className={`col-md-4 col-sm-6 col-xs-12`}
                    key={diseno.id_diseno}
                >
                    <div className={`card mb-4 ${styles.contenedor_card}`}>
                        <img
                            className='card-img-top'
                            src={`${import.meta.env.VITE_BACKEND_URL}/${
                                diseno.imagen
                            }`}
                            alt={diseno.nombre}
                        ></img>
                        <div className='card-body'>
                            <p className={styles.text}>
                                Nombre: <span>{diseno.nombre}</span>
                            </p>

                            <div className='row pt-3'>
                                <div className='col-6 justify-content-center align-items-center '>
                                    <div className='text-center'>
                                        <strong
                                            className={`${styles.textoEstado}`}
                                        >
                                            {' '}
                                            Publicado{' '}
                                        </strong>
                                    </div>
                                    <div className='text-center'>
                                        <BotonCambioEstado
                                            id={diseno.id_diseno}
                                            isChecked={diseno.publicado}
                                            nombreRegistro='diseño'
                                            ruta={`/disenos/publicado/${diseno.id_diseno}`}
                                            cambiarPublicacion={{
                                                estado: diseno.estado,
                                                paraPublicacion: true,
                                            }}
                                            editarEstado={editarPublicacion}
                                        />
                                    </div>
                                </div>
                                <div className='col-6 justify-content-center align-items-center'>
                                    <div className='text-center'>
                                        <strong className={styles.textoEstado}>
                                            {' '}
                                            Inhabilitar{' '}
                                        </strong>
                                    </div>
                                    <div className='text-center'>
                                        <BotonCambioEstado
                                            id={diseno.id_diseno}
                                            isChecked={diseno.estado}
                                            nombreRegistro='diseño'
                                            ruta={`/disenos/estado/${diseno.id_diseno}`}
                                            editarEstado={editarEstado}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='row'>
                                <div
                                    className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                                >
                                    <BotonNegro
                                        text='Ver más'
                                        modalToOpen='#modalDetalles'
                                        onClick={() =>
                                            LlenarInformacionModal(diseno)
                                        }
                                    />
                                </div>
                                <div
                                    className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                                >
                                    <BotonNegro
                                        text='Editar'
                                        onClick={() =>
                                            LlenarInformacionModalEditar(diseno)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

TablaDisenos.propTypes = {
    disenosFiltrar: PropTypes.array.isRequired,
    LlenarInformacionModal: PropTypes.func.isRequired,
    LlenarInformacionModalEditar: PropTypes.func.isRequired,
    setBusqueda: PropTypes.func.isRequired
};

export default TablaDisenos;
