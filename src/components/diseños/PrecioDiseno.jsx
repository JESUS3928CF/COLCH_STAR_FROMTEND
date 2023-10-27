import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import HeaderModals from "../chared/HeaderModals";

const PrecioDiseno = () => {
    return (
        <div className='modal' id='myModalPrecio'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    {/* Cabecero del modal */}
                    <HeaderModals title='Modificar precio del los diseños' />

                    <div className='modal-body'>
                        {/* formulario para agregar un cliente  */}
                        <form action='' id='formularioModificar'>
                            <select
                                id='select'
                                className='form-select'
                                aria-label='Default select example'
                            >
                                <option value=''>Seleccione un tamaño</option>
                                <option value='1'>Pequeño (0-10cm)</option>
                                <option value='2'>Mediano (11-25cm)</option>
                                <option value='3'>Grande (26-60cm)</option>
                            </select>
                            <div className='mb-3'>
                                <label
                                    htmlFor='precioGuardar'
                                    className='col-form-label'
                                >
                                    Precio:
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='precioGuardar'
                                    placeholder='Agregar precio para este tamaño'
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
    );
};

export default PrecioDiseno;
