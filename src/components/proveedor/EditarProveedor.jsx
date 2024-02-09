// ------------------BRIAN PAREJA HERNANDEZ
//-------------------26 de septiembre 2023
//Nos permitira Editar un proveedor, luego de tener proveedores en la tabla listar se podra hacerle sus repectivas modificaciones
// a dichos proveedores



import React from 'react'
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import styles from '../../pages/proveedores.module.css';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react';
import { validarEspaciosVacios } from '../../Validations/validations'
import useProveedor from '../../hooks/useProveedor.jsx'
import HeaderModals from '../chared/HeaderModals';
import { Modal } from 'react-bootstrap';

//COMPONENTE
const EditarProveedor = ({ proveedor, handleClose, show }) => {

    /// Provider de clientes
    const { editarProveedor } = useProveedor();


    const {
        register, //regitra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envio del formulario
        formState: { errors }, //ver errores que tiene el formulario
        setValue, // Añade esta función para actualizar dinámicamente los valores
        trigger,
        reset, //Resetea el formulario
    } = useForm({
        mode: "onChange",
    });

    //por medio de editarproveedor se traen lo que hay en el listar, y por medio del estado setvalue
    //  le pasan todo a nombre telefono etc, y con eso se les pasa por medio del value=¨nombre telefono etc al input  
    useEffect(() => {
        if (proveedor) {
            setValue('tipoIdentificacion', proveedor.tipoIdentificacion);
            setValue('identificador', proveedor.identificador);
            setValue('nombre', proveedor.nombre);
            setValue('telefono', proveedor.telefono);
            setValue('direccion', proveedor.direccion);
        }
    }, [proveedor, show]);



    //funcion que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = (data) => {

        /// Le pasamos el id del cliente que queremos editar
        data.id_proveedor = proveedor.id_proveedor
        editarProveedor(data, handleClose, reset);


    };

    return (
        <div>
            {/* modal de editar proveedor */}

            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                }}
                className='modal d-flex align-items-center justify-content-center'
                id='modalEditar'
            >
                <div className='modal-content'>
                    <HeaderModals
                        title={'Editar proveedor'}
                        handleClose={() => {
                            reset();
                            handleClose();
                        }}
                    />
                    <div className='modal-body'>
                        <form
                            className='row g-1 needs-validation'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className='mb-3' name='divIdentificacion'>
                                <label
                                    htmlFor='identificacionEditar'
                                    className='col-form-label'
                                >
                                    Identificación: *
                                </label>
                                <br />

                                <div className='row'>
                                    <div className='col-md-2'>
                                        <select
                                            style={{ width: 80, height: 40 }}
                                            {...register('tipoIdentificacion', {
                                                required: {
                                                    // Es una propiedad que indica que el campo es obligatorio.
                                                    value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                    message:
                                                        'El tipo de identificación es obligatoria', // es un mensaje que se mostrará si la validación falla.
                                                },
                                            })}
                                        >
                                            <option value='C.C.'>C.C.</option>
                                            <option value='NIT.'>NIT.</option>
                                            <option value='C.E.'>C.E. </option>
                                        </select>
                                    </div>
                                    <div className='col-md-10'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='identificacionEditar'
                                            name='identificador'
                                            //register es una funcion, nos devuelve propiedades, para asigar esas propiedades al input  se pone . . .
                                            //  identificador Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                                            {...register('identificador', {
                                                required: {
                                                    // Es una propiedad que indica que el campo es obligatorio.
                                                    value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                    message:
                                                        'La Identificación es obligatorio', // es un mensaje que se mostrará si la validación falla.
                                                },
                                                pattern: {
                                                    value: /^\d+$/, //expreción regular para prohibir letras y espacios en blamco
                                                    message:
                                                        'No puede contener Letras ni  espacios en blanco',
                                                },
                                                validate: (value) => {
                                                    if (
                                                        value.length < 6 ||
                                                        value.length > 11
                                                    ) {
                                                        return 'La Identificación debe tener entre 6 y 11 dígitos';
                                                    }
                                                    return true; // La validación pasa si cumple ambas condiciones
                                                },
                                            })}
                                            onChange={(e) => {
                                                const inputValue = e.target.value.slice(0, 12); // Limitar la longitud máxima
                                                setValue('identificador', inputValue);
                                                trigger('identificador');
                                            }}
                                        />
                                    </div>
                                    {errors.identificador && (
                                        <AlertaError
                                            message={
                                                errors.identificador.message
                                            }
                                        /> //muestra el mensaje de validacion
                                    )}
                                </div>
                            </div>

                            <div className='mb-3' name='divNombre'>
                                <label
                                    htmlFor='nombreEditar'
                                    className='col-form-label'
                                >
                                    Nombre: *
                                </label>

                                <input
                                    type='text'
                                    className='form-control'
                                    id='nombreEditar'
                                    name='nombre'
                                    //register es una funcion, nos devuelv propiedades para asigar esas propiedades al input  se pone . . .
                                    //  Nombre Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                                    {...register('nombre', {
                                        required: {
                                            // Es una propiedad que indica que el campo es obligatorio.
                                            value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                            message: 'El Nombre es obligatorio', // es un mensaje que se mostrará si la validación falla.
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(value);
                                        },
                                        pattern: {
                                            value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/, //expreción regular para prohibir letras y caracteres
                                            message:
                                                'No puede contener números ni caracteres especiales',
                                        },
                                        minLength:{
                                            value: 4,
                                            message: 'Nombre no valido, minimo 4 Caracteres'
                                        },
                                        maxLength:{
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
                                    htmlFor='telefonoEditar'
                                    className='col-form-label'
                                >
                                    Teléfono: *
                                </label>

                                <input
                                    type='text'
                                    className='form-control'
                                    id='telefonoEditar'
                                    name='telefono'
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
                                                telefonoSinEspacios.length > 11
                                            ) {
                                                return 'El telefono debe tener minimo 7 digitos y maximo 10';
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
                                    htmlFor='direccionEditar'
                                    className='col-form-label'
                                >
                                    Dirección: *
                                </label>

                                <input
                                    type='text'
                                    className='form-control'
                                    id='direccionEditar'
                                    name='direccion'
                                    {...register('direccion', {
                                        required: {
                                            value: true,
                                            message:
                                                'La Dirección es obligatoria',
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(value);
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('direccion', e.target.value);
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
                                    handleClose={handleClose}
                                    reset={reset}
                                />

                                {/* Botón para guardar*/}
                                <GuardarModal />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default EditarProveedor
