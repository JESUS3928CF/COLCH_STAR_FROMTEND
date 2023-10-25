import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';

const AgregarDiseno = () => {
    return (
        <div className='modal' id='myModalAgregarDiseno'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    {/* Cabecero del modal */}
                    <HeaderModals title={'Agregar diseño'} />

                    <div className='modal-body'>
                        {/* formulario para agregar un Diseño */}
                        <form action='' id='formularioAgregarDiseño'>
                            <div className='mb-3'>
                                <label
                                    htmlFor='nombre'
                                    className='col-form-label'
                                >
                                    Nombre:
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='. . .'
                                />
                            </div>
                            <div className='mb-3'>
                                <label
                                    htmlFor='imagen'
                                    className='form-label'
                                >
                                    Subir imagen
                                </label>
                                <input
                                    className='form-control'
                                    name='imagen'
                                    type='file'
                                />
                            </div>

                            <div className='mb-3'>
                                <label
                                    htmlFor='rolGuardar'
                                    className='col-form-label'
                                >
                                    ¿Deseas publicarlo?
                                </label>
                                <select
                                    className='form-control'
                                    name='selectRol'
                                >
                                    <option value='true'>Si</option>
                                    <option value='false'>No</option>
                                </select>
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
    );
};

export default AgregarDiseno;
