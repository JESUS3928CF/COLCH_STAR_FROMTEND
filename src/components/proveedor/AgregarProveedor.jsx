// ------------------BRIAN PAREJA HERNANDEZ
//-------------------26 de septiembre 2023
//Nos permitira Agregar un proveedor, de ser necesario se podra agregar un proveedor mediante un formulario donde se pediran datos mas
//mas relevantes de este proveedor y luego mostrarlo en la tabla listar 
import '../../css-general/cssgeneral.css'
import '../../css-general/inicio_style.css'

import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarEspaciosVacios } from '../../Validations/validations'
import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import useProveedor from '../../hooks/useProveedor.jsx';
import BotonVerde from '../chared/BotonVerde';
import { Modal } from 'react-bootstrap';
import {  useState } from 'react';



//COMPONENTE
const AgregarProveedor = () => {

    const { agregarProveedor } = useProveedor();


    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
    //funcion que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = async (data) => {

        const { identificador, nombre, telefono, direccion, tipoIdentificacion } = data


        // la ruta por donde voya mandar el objeto o el registro nuevo data
        agregarProveedor(
            {
                //campos base de datos / campos que tiene la informacion. se manda toda la informacion
                identificador: identificador.trim(),
                tipoIdentificacion: tipoIdentificacion.trim(),
                nombre: nombre.trim(),
                telefono: telefono.trim(),
                direccion: direccion.trim()
            },
            reset,
            handleClose

        )
    }


    return (
        <div>
            {/* modal agregar proveedor */}

            <BotonVerde text={'Agregar Proveedor'} onClick={handleShow} />

            <Modal
                show={show}
                onHide={handleClose}
                className='modal d-flex align-items-center justify-content-center'
                id='myModal'
            >
                    <div className='modal-content'>
                        <HeaderModals title={'Agregar Proveedor'} />

                        <div className='modal-body'>
                            {/* formulario para agregar proveedor */}
                            <form
                                id='formularioAgregarProveedor'
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className='mb-3' name='divIdentificacion'>
                                    <label
                                        htmlFor='identificacionGuardar'
                                        className='col-form-label'
                                    >
                                        Identificación: *
                                    </label>

                                    <br />
                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <select
                                                style={{
                                                    width: 80,
                                                    height: 40,
                                                }}
                                                id='tipoIdentificacion'
                                                {...register(
                                                    'tipoIdentificacion',
                                                    {
                                                        required: {
                                                            // Es una propiedad que indica que el campo es obligatorio.
                                                            value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                            message:
                                                                'El tipo de identificación es obligatoria', // es un mensaje que se mostrará si la validación falla.
                                                        },
                                                    }
                                                )}
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
                                        <div className='col-md-10'>
                                            <input
                                                type='text'
                                                className='form-control '
                                                id='identificacionGuardar'
                                                name='identificador'
                                                placeholder='. . .'
                                                //register es una funcion, nos devuelve propiedades, para asigar esas propiedades al input  se pone . . .
                                                //  identificador Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                                                {...register('identificador', {
                                                    required: {
                                                        // Es una propiedad que indica que el campo es obligatorio.
                                                        value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                        message:
                                                            'La Identificación es obligatoria', // es un mensaje que se mostrará si la validación falla.
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
                                                    setValue(
                                                        'identificador',
                                                        e.target.value
                                                    );
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
                                        })}
                                        onChange={(e) => {
                                            setValue('nombre', e.target.value);
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
                                                    return 'El telefono debe tener minimo 7 digitos y maximo 12';
                                                }
                                                return true;
                                            },
                                        })}
                                        onChange={(e) => {
                                            setValue(
                                                'telefono',
                                                e.target.value
                                            );
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
    );
}

export default AgregarProveedor