import PropTypes from 'prop-types';

import HeaderModals from '../chared/HeaderModals';

export const DetalleDiseno = ( {detalleDiseno} ) => {
    return (
        <div className='modal' id='modalDetalles'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <HeaderModals title='Imagen del diseño' />
                    <div className='formulario'>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='col'>
                                    <div className='row'>
                                        <div>
                                            <img
                                                src={`${
                                                    import.meta.env
                                                        .VITE_BACKEND_URL
                                                }/${detalleDiseno.imagen}`}
                                                width='400px'
                                                height='250px'
                                                alt=''
                                            />
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