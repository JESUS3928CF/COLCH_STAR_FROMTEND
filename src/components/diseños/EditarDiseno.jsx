// ------------------JESÚS ANTONIO COCHERO FLORIÁN
//-------------------26 de septiembre 2023
//Nos permitirá Editar un diseño, luego de tener diseños en la tabla listar, se le podrá hacer sus respectivas modificaciones
// a dichos diseños

import PropTypes from 'prop-types';

import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    validarBooleanos,
    validarEspaciosVacios,
    validarImagen,
} from '../../Validations/validations';
import AlertaError from '../chared/AlertaError';
import { Modal } from 'react-bootstrap';
import { useDisenosContext } from '../../context/DisenosProvider';

const EditarDiseno = ({ detalleDiseno, handleClose, show }) => {
    const { editarDisenoDB } = useDisenosContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        trigger
    } = useForm({
        mode: 'onChange',
    });

    // Cuando recibe el detalleDiseno, actualiza los valores del formulario
    useEffect(() => {
        if (detalleDiseno) {
            setValue('nombre', detalleDiseno.nombre);
            setValue('publicado', detalleDiseno.publicado);
            setValue('imagen', []);
            // Añade las demás propiedades aquí
        }
    }, [detalleDiseno, show]);

    const editarDiseno = handleSubmit(async (data) => {
        /// Crear un form-data por que así el back puede recibir imágenes
        let formData = new FormData();
        formData.append('nombre', data?.nombre.trim());
        formData.append('publicado', data?.publicado);
        formData.append('imagen', data?.imagen[0]);
        
        editarDisenoDB(formData, detalleDiseno, handleClose);

    });

    return (
        <Modal
            show={show}
            onHide={() => {
                reset();
                handleClose();
            }}
            className='modal d-flex align-items-center justify-content-center'
        >
            <div className='modal-content'>
                <HeaderModals
                    title='Editar diseño'
                    handleClose={() => {
                        reset();
                        handleClose();
                    }}
                />
                <div className='modal-body'>
                    {/* formulario para editar un Diseño */}
                    <form
                        action=''
                        id='formularioAgregarDiseño'
                    >
                        <div className='mb-3'>
                            <label htmlFor='nombre' className='col-form-label'>
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
                                    setValue('nombre', inputValue);
                                    trigger('nombre');
                                }}
                            />
                            {/* en esta etiqueta va salir el error de validación  */}
                            {errors.nombre && (
                                <AlertaError message={errors.nombre.message} />
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
                                    validate: (value) =>
                                        validarImagen(value[0]),
                                })}
                            />
                            {/* en esta etiqueta va salir el error de validación  */}
                            {errors.imagen && (
                                <AlertaError message={errors.imagen.message} />
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
                                    validate: (value) =>
                                        validarBooleanos(value),
                                })}
                            >
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
                                handleClose={handleClose}
                                reset={reset}
                            />

                            {/* Botón para guardar*/}
                            <GuardarModal onSubmit={editarDiseno}/>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

EditarDiseno.propTypes = {
    detalleDiseno: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

export default EditarDiseno;
