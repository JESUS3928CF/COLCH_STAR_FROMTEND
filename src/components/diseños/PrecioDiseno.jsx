// ------------------JESÚS ANTONIO COCHERO FLORIÁN
//-------------------26 de septiembre 2023
//Nos permite Mostrar la información de los diseños precios de los diseños y editarlos por hay mismo si asi lo requiere

import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import { useForm } from 'react-hook-form';
import AlertaError from '../chared/AlertaError';

import { useDisenosContext } from '../../context/DisenosProvider.jsx';
import BotonVerde from '../chared/BotonVerde.jsx';
import { Fragment, useState } from 'react';
import { Modal } from 'react-bootstrap';

const PrecioDiseno = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
        reset,
    } = useForm({
        mode: 'onChange',
    });

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        reset();
        setShow(true);
    };

    // Para poner el precio correspondiente aca tamaño
    const definirPrecio = (precio) => {
        if (!precio) return setValue('precio', '');
        setValue('precio', precios[precio - 1].precio);
    };

    const { precios, actualizarPrecioDB } = useDisenosContext();

    const actualizarPrecio = handleSubmit(async (data) => {
        actualizarPrecioDB(data, reset, handleClose);
    });

    return (
        <Fragment>
            <BotonVerde text={'Modificar precios'} onClick={handleShow} />
            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                }}
                className='modal d-flex align-items-center justify-content-center'
            >
                <div className='modal-content'>
                    {/* Cabecero del modal */}
                    <HeaderModals
                        title='Modificar precio del los diseños'
                        handleClose={handleClose}
                    />

                    <div className='modal-body'>
                        {/* formulario para agregar un cliente  */}
                        <form
                            className='row g-3 needs-validation'
                            action=''
                            id='formularioModificar'
                        >
                            <select
                                id='select'
                                className='form-select'
                                aria-label='Default select example'
                                onClick={(e) => {
                                    definirPrecio(e.target.value);
                                }}
                                {...register('id_precio', {
                                    required: true,
                                })}
                                onChange={(e) => {
                                    setValue('id_precio', e.target.value);
                                    trigger('id_precio');
                                }}
                            >
                                <option value=''>Seleccione un tamaño</option>
                                {precios.map((precio) => (
                                    <option
                                        key={precio.id_precio_diseno}
                                        value={precio.id_precio_diseno}
                                    >
                                        {precio.tamano}
                                    </option>
                                ))}
                            </select>
                            {errors.id_precio && (
                                <AlertaError
                                    message={'Seleccione el tamaño a editar'}
                                />
                            )}

                            <div className='mb-3'>
                                <label
                                    htmlFor='precioGuardar'
                                    className='col-form-label'
                                >
                                    Precio: * 
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='precioGuardar'
                                    placeholder='Agregar precio para este tamaño'
                                    {...register('precio', {
                                        required: {
                                            value: true,
                                            message: 'El precio es obligatorio',
                                        },
                                        pattern: {
                                            value: /^(?!0)\d+(\.\d{1,2})?$/,
                                            message: 'Solo se permiten números y que el primer numero no sea 0',
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('precio', e.target.value);
                                        trigger('precio');
                                    }}
                                />
                                {errors.precio && (
                                    <AlertaError
                                        message={errors.precio.message}
                                    />
                                )}
                            </div>
                            <div className='modal-footer'>
                                {/* Botón para cancelar*/}
                                <CancelarModal
                                    reset={reset}
                                    handleClose={handleClose}
                                />

                                {/* Botón para guardar*/}
                                <GuardarModal onSubmit={actualizarPrecio}/>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default PrecioDiseno;
