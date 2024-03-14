// ------------------JESÚS ANTONIO COCHERO FLORIÁN
//-------------------26 de septiembre 2023
//Nos permitirá Agregar un diseño, de ser necesario se podrá agregar un diseño mediante un formulario donde se pedirán datos
//mas relevantes de este diseño y luego mostrarlo en la tabla listar

import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import AlertaError from '../chared/AlertaError';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

//* Importa las funciones de validación
import {
    validarEspaciosVacios,
    validarImagen,
} from '../../Validations/validations.js';
import { Fragment, useState } from 'react';
import BotonVerde from '../chared/BotonVerde.jsx';
import { useDisenosContext } from '../../context/DisenosProvider.jsx';

const AgregarDiseno = () => {
    const { agregarDisenoDB } = useDisenosContext();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        reset();
        setShow(true);
    };

    /// Funciones del paquete react-hook-form necesarias para las validaciones
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

    const guardarDiseno = handleSubmit(async (data) => {
        /// Crear un form-data por que así el back puede recibir imágenes
        const formData = new FormData();
        formData.append('nombre', data?.nombre.trim());
        formData.append('publicado', data?.publicado);
        formData.append('imagen', data?.imagen[0]);

        /// Almacenar en la DB
        agregarDisenoDB(formData, handleClose, reset);
    });

    return (
        <Fragment>
            <BotonVerde text={'Agregar diseño'} onClick={handleShow} />
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
                        title={'Agregar diseño'}
                        handleClose={handleClose}
                    />

                    <div className='modal-body'>
                        {/* formulario para agregar un Diseño */}
                        <form >
                            <div className='mb-3'>
                                <label
                                    htmlFor='nombre'
                                    className='col-form-label'
                                >
                                    Nombre: *
                                </label>
                                <input
                                    name='nombre'
                                    type='text'
                                    className='form-control'
                                    placeholder='. . .'
                                    {...register('nombre', {
                                        required: {
                                            value: true,
                                            message: 'El nombre es obligatorio',
                                        },
                                        validate: (value) =>
                                            validarEspaciosVacios(value),
                                        maxLength: {
                                            value: 50,
                                            message:
                                                'El nombre debe tener máximo 50 caracteres',
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(
                                            0,
                                            51
                                        );
                                        setValue('nombre', inputValue)
                                        trigger('nombre');
                                    }}
                                />
                                {/* en esta etiqueta va salir el error de validación  */}
                                {errors.nombre && (
                                    <AlertaError
                                        message={errors.nombre.message}
                                    />
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='imagen' className='form-label'>
                                    Subir imagen: *
                                </label>
                                <input
                                    className='form-control'
                                    name='imagen'
                                    type='file'
                                    {...register('imagen', {
                                        required: {
                                            value: true,
                                            message: 'La imagen es obligatoria',
                                        },
                                        validate: (value) =>
                                            validarImagen(value[0]),
                                    })}
                                />
                                {/* en esta etiqueta va salir el error de validación  */}
                                {errors.imagen && (
                                    <AlertaError
                                        message={errors.imagen.message}
                                    />
                                )}
                            </div>

                            <div className='mb-3'>
                                <label
                                    htmlFor='rolGuardar'
                                    className='col-form-label'
                                >
                                    ¿Deseas publicarlo?: *
                                </label>
                                <select
                                    className='form-control'
                                    name='publicado'
                                    {...register('publicado', {
                                        required: {
                                            value: true,
                                            message:
                                                'El estado de publicación es obligatorio',
                                        },
                                    })}
                                >
                                    <option value=''>
                                        Selecciona una opción
                                    </option>
                                    <option value='true'>Si</option>
                                    <option value='false'>No</option>
                                </select>
                                {/* en esta etiqueta va salir el error de validación  */}
                                {errors.publicado && (
                                    <AlertaError
                                        message={errors.publicado.message}
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
                                <GuardarModal onSubmit={guardarDiseno}/>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default AgregarDiseno;
