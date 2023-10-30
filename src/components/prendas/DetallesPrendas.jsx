import PropTypes from 'prop-types';

import HeaderModals from '../chared/HeaderModals';

export const DetallesPrendas = ({ detallesPrendas }) => {
    return (
        <div className='modal' id='modalDetallePrendas'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <HeaderModals title='Detalle de la prenda' />
                    <div className='formulario'>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='col'>
                                    <div className='row'>
                                        <div>
                                            <div className='mb-3'>
                                            <h2 htmlFor="Tela" className="fs-4  text-nowrap bg-body-secondary border"  > Tipo de tela: {detallesPrendas.tipo_de_tela}</h2>
                                            </div>

                                            <div className='mb-3'>
                                                <label htmlFor="Genero" className="col-form-label"> Genero: {detallesPrendas.genero} </label>
                                            </div>

                                            <div className='container ml-12'>
                                                <img   src={`${
                                                    import.meta.env
                                                        .VITE_BACKEND_URL
                                                }/${detallesPrendas.imagen}`}
                                                width='250px'
                                                height='200px'
                                                alt=''/>
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

DetallesPrendas.propTypes = {
    detallesPrendas: PropTypes.object.isRequired,
};