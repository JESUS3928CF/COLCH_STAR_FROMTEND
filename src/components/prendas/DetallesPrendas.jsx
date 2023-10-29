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
                                                <label htmlFor="Tela" className="col-form-label"> {detallesPrendas.tipo_de_tela} </label>
                                            </div>

                                            <div className='mb-3'>
                                                <label htmlFor="Img" className="col-form-label"> {detallesPrendas.imagen} </label>
                                            </div>

                                            <div className='mb-3'>
                                                <label htmlFor="Genero" className="col-form-label"> {detallesPrendas.genero} </label>


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