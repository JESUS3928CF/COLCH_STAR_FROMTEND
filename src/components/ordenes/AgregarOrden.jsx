



import '../../css-general/cssgeneral.css'
import '../../css-general/inicio_style.css'
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarEspaciosVacios } from '../../Validations/validations'
import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import useOrden from '../../hooks/useOrden.jsx'

import BotonVerde from '../chared/BotonVerde';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';



//COMPONENTE
const AgregarOrden = () => {


    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); }

    const {
        register, //regitra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envio del formulario
        formState: { errors }, //ver errores que tiene el formulario
        setValue,
        trigger,
        reset, //resetea el formulario
    } = useForm({
        mode: "onChange",
    });






    return (
        <div>

            <BotonVerde text={'Agregar Orden'} onClick={handleShow} />


            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                }}
                className='modal d-flex align-items-center justify-content-center'
                id='myModal'
            >

                <div className='modal-content'>
                    <HeaderModals title={'Agregar Orden'} handleClose={() => {
                        reset();
                        handleClose();
                    }} />

                    <div className='modal-body'>
                        {/* formulario para agregar proveedor */}
                        <form
                            className='row g-1 needs-validation'
                            onSubmit={handleSubmit()}
                        >
                            <div className='mb-3' name='divIdentificacion'>
                                <label
                                    htmlFor='identificacionGuardar'
                                    className='col-form-label'
                                >
                                    Cliente: *
                                </label>

                                <div className='col-md-2'>
                                        <select
                                            style={{
                                                width: 200,
                                                height: 40,
                                            }}
                                        >
                                            {/* <option value="">.</option> */}
                                            <option value='C.C. '>
                                                C.C.
                                            </option>
                                            <option value='NIT. '>
                                                NIT.
                                            </option>
                                            <option value='C.E. '>
                                                C.E.{' '}
                                            </option>
                                        </select>
                                    </div>

                               
                            </div>

                            <div className='mb-3' name='divNombre'>
                                <label
                                    htmlFor='nombre'
                                    className='col-form-label'
                                >
                                    Nombres: *
                                </label>

                                <input
                                    type='text'
                                    className='form-control'
                                    name='nombre'
                                    placeholder='. . .'
                                    //register es una funcion, nos devuelv propiedades para asigar esas propiedades al input  se pone . . .
                                    //  Nombre Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                                    {...register('nombre', {
                                        required: {
                                            // Es una propiedad que indica que el campo es obligatorio.
                                            value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                            message:
                                                'El Nombre es obligatorio', // es un mensaje que se mostrará si la validación falla.
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(
                                                value
                                            );
                                        },
                                        pattern: {
                                            value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                                            message:
                                                'No puede contener números ni caracteres especiales',
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'Nombre no valido, minimo 3 Caracteres'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Nombre no valido, maximo 20 Caracteres'
                                        }
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(0, 21); // Limitar la longitud máxima
                                        setValue('nombre', inputValue);
                                        trigger('nombre');
                                    }}
                                />
                                {errors.nombre && (
                                    <AlertaError
                                        message={errors.nombre.message}
                                    /> //muestra el mensaje de validacion
                                )}
                            </div>

                            <div className='mb-3' name='divTelefono'>
                                <label
                                    htmlFor='telefono'
                                    className='col-form-label'
                                >
                                    Teléfono: *
                                </label>

                                <input
                                    type='text'
                                    className='form-control'
                                    name='telefono'
                                    placeholder='. . .'
                                    {...register('telefono', {
                                        required: {
                                            value: true,
                                            message:
                                                'El teléfono es obligatorio',
                                        },
                                        pattern: {
                                            value: /^\d+$/,
                                            message:
                                                'No puede contener Letras ni espacios en blanco',
                                        },
                                        validate: (value) => {
                                            const telefonoSinEspacios =
                                                value.replace(/\s/g, ''); // Eliminar espacios en blanco
                                            if (
                                                telefonoSinEspacios.length <
                                                7 ||
                                                telefonoSinEspacios.length >
                                                11
                                            ) {
                                                return 'El telefono debe tener minimo 7 digitos y maximo 11';
                                            }
                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(0, 12); // Limitar la longitud máxima
                                        setValue('telefono', inputValue);
                                        trigger('telefono');
                                    }}
                                />
                                {errors.telefono && (
                                    <AlertaError
                                        message={errors.telefono.message}
                                    /> //muestra el mensaje de validacion
                                )}
                            </div>

                            <div className='mb-3' name='divDireccion'>
                                <label
                                    htmlFor='direccionGuardar'
                                    className='col-form-label'
                                >
                                    Dirección: *
                                </label>

                                <input
                                    type='text'
                                    className='form-control'
                                    id='direccionGuardar'
                                    name='direccion'
                                    placeholder='. . .'
                                    {...register('direccion', {
                                        required: {
                                            value: true,
                                            message:
                                                'La Dirección es obligatoria',
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(
                                                value
                                            );
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue(
                                            'direccion',
                                            e.target.value
                                        );
                                        trigger('direccion');
                                    }}
                                />
                                {errors.direccion && (
                                    <AlertaError
                                        message={errors.direccion.message}
                                    /> //muestra el mensaje de validacion
                                )}
                            </div>

                            <div className='modal-footer'>
                                {/* Botón para cancelar*/}
                                <CancelarModal
                                    reset={reset}
                                    name='Cancelar'
                                    handleClose={handleClose}
                                />

                                {/* Botón para guardar*/}
                                <GuardarModal />
                            </div>
                        </form>
                    </div>
                </div>
















            </Modal>








        </div>
    )
}

export default AgregarOrden
