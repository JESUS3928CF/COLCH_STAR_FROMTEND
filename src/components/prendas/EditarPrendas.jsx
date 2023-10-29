import PropTypes from 'prop-types';
import BotonNegro from '../chared/BotonNegro';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';

const EditarPrendas = () => {

    return (
        <>
       

        <div className='modal' id='modalEditarPrenda'>
        <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
                <HeaderModals title='Editar Diseño' />
                <div className='modal-body'>
                    {/* formulario para editar un Diseño */}
                    <form action='' id='formularioAgregarDiseño'>
                        <div className='mb-3'>
                            <label
                                htmlFor='nombre'
                                className='col-form-label'
                            >
                                Nombre:
                            </label>
                            <input
                                value={detallesPrendas.nombre}
                                type='text'
                                className='form-control'
                                placeholder='. . .'
                            />
                        </div>

                        <div className='modal-footer'>
                            {/* Botón para cancelar*/}
                            <CancelarModal />

                            {/* Botón para guardar*/}
                            <GuardarModal />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        </>
    );

};





export default EditarPrendas
