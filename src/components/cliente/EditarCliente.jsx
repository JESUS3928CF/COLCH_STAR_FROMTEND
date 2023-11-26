// ------------------HERLYN NORBEY DAVID POSO
//-------------------26 de septiembre 2023
//Nos permitirá Editar un cliente, luego de tener clientes en la tabla listar, se le podrá hacer sus respectivas modificaciones
// a dichos clientes
import '../../css-general/cssgeneral.css';
import '../../css-general/inicio_style.css';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import { useForm } from 'react-hook-form';
import { validarEspaciosVacios } from '../../Validations/validations';
import { useEffect } from 'react';
import AlertaError from '../chared/AlertaError';
import { Modal } from 'react-bootstrap';
import HeaderModals from '../chared/HeaderModals';
import useClientes from '../../hooks/useCliente';

//Componente
const EditarCliente = ({ cliente, handleClose, show }) => {

    /// Provider de clientes
    const { editarCliente } = useClientes();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // Añade esta función para actualizar dinámicamente los valores
        trigger,
    } = useForm({
        mode: 'onChange',
    });

    // Cuando editarCliente cambia, actualiza los valores del formulario
    useEffect(() => {
        if (cliente) {
            setValue('tipoIdentificacion', cliente.tipoIdentificacion);
            setValue('identificacion', cliente.identificacion);
            setValue('nombre', cliente.nombre);
            setValue('apellido', cliente.apellido);
            setValue('telefono', cliente.telefono);
            setValue('email', cliente.email);
            setValue('direccion', cliente.direccion);
        }
    }, [cliente]);

    /// Función para guardar el cliente en la DB
    const onSubmit = (data) => {

        /// Le pasamos el id del cliente que queremos editar
        data.id_cliente = cliente.id_cliente
        editarCliente(data, handleClose);

    };

    return (
        <div>
            {/* modal de editar clientes */}
            <Modal
                show={show}
                onHide={handleClose}
                className='modal d-flex align-items-center justify-content-center'
                id='modalEditar'
            >
                <div className='modal-content'>
                    <HeaderModals title={'Editar Cliente'} />
                    <div className='modal-body'>
                        {/* <!-- formulario para editar los datos de la tabla clientes --> */}
                        <form
                            className='row g-3 needs-validation'
                            action=''
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className='mb-3' name='divIdentificacion'>
                                <label
                                    htmlFor='identificacionEditar'
                                    className='col-form-label'
                                >
                                    Identificación:
                                </label>
                                <br />

                                <div className='row'>
                                    <div className='col-md-2'>
                                        <select
                                            style={{
                                                width: 80,
                                                height: 40,
                                            }}
                                            {...register('tipoIdentificacion')}
                                        >
                                            <option value='C.C.'>C.C.</option>
                                            <option value='C.E.'>C.E.</option>
                                        </select>
                                    </div>
                                    <div className='col-md-10'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='identificacion'
                                            placeholder='. . .'
                                            //register es una funcion, nos devuelve propiedades, para asigar esas propiedades al input  se pone . . .
                                            //  identificador Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                                            {...register('identificacion', {
                                                required:
                                                    'La Identificación es obligatoria',
                                                pattern: {
                                                    value: /^\d+$/, //expreción regular para prohibir letras y espacios en blamco
                                                    message:
                                                        'No puede contener letras ni  espacios en blanco',
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
                                                    'identificacion',
                                                    e.target.value
                                                );
                                                trigger('identificacion');
                                            }}
                                        />
                                    </div>
                                    {errors.identificacion && (
                                        <AlertaError
                                            message={
                                                errors.identificacion.message
                                            }
                                        /> //muestra el mensaje de validacion
                                    )}
                                </div>
                            </div>

                            <div className='col-md-6' name='divNombre'>
                                <label
                                    htmlFor='nombreEditar'
                                    className='col-form-label'
                                >
                                    Nombres:
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='nombreEditar'
                                    name='nombre'
                                    placeholder=''
                                    {...register('nombre', {
                                        required: {
                                            value: true,
                                            message: 'El nombre es obligatorio',
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(value);
                                        },
                                        pattern: {
                                            value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                                            message:
                                                'El nombre no puede contener números ni caracteres especiales',
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
                                    />
                                )}
                            </div>
                            <div className='col-md-6' name='divApellido'>
                                <label
                                    htmlFor='apellidoEditar'
                                    className='col-form-label'
                                >
                                    Apellidos:
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='apellidoEditar'
                                    name='apellido'
                                    placeholder=''
                                    {...register('apellido', {
                                        required: {
                                            value: true,
                                            message:
                                                'El apellido es obligatorio',
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(value);
                                        },
                                        pattern: {
                                            value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                                            message:
                                                'El apellido no puede contener números ni caracteres especiales',
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('apellido', e.target.value);
                                        trigger('apellido');
                                    }}
                                />
                                {errors.apellido && (
                                    <AlertaError
                                        message={errors.apellido.message}
                                    />
                                )}
                            </div>
                            <div className='col-md-6'>
                                <label
                                    htmlFor='telefonoEditar'
                                    className='col-form-label'
                                >
                                    Teléfono:
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='telefonoEditar'
                                    name='telefono'
                                    placeholder=''
                                    {...register('telefono', {
                                        required: {
                                            value: true,
                                            message:
                                                'El telefono es obligatorio',
                                        },
                                        pattern: {
                                            value: /^\d+$/,
                                            message:
                                                'No se permiten letras ni espacios en blanco',
                                        },
                                        validate: (value) => {
                                            const telefonoSinEspacios =
                                                value.replace(/\s/g, ''); // Eliminar espacios en blanco
                                            if (
                                                telefonoSinEspacios.length <
                                                    7 ||
                                                telefonoSinEspacios.length > 11
                                            ) {
                                                return 'El telefono debe tener minimo 7 digitos y maximo 12';
                                            }
                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('telefono', e.target.value);
                                        trigger('telefono');
                                    }}
                                />
                                {errors.telefono && (
                                    <AlertaError
                                        message={errors.telefono.message}
                                    />
                                )}
                            </div>
                            <div className='col-md-6'>
                                <label
                                    htmlFor='direccionEditar'
                                    className='col-form-label'
                                >
                                    Dirección:
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='direccionEditar'
                                    name='direccion'
                                    placeholder=''
                                    {...register('direccion', {
                                        required: {
                                            value: true,
                                            message:
                                                'La dirección es obligatoria',
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
                                    />
                                )}
                            </div>
                            <div className='mb-3'>
                                <label
                                    htmlFor='emailEditar'
                                    className='col-form-label'
                                >
                                    Email:
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='emailEditar'
                                    name='email'
                                    placeholder=''
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: 'El email es obligatorio',
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(value);
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message:
                                                'El Email no tiene un formato válido',
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('email', e.target.value);
                                        trigger('email');
                                    }}
                                />
                                {errors.email && (
                                    <AlertaError
                                        message={errors.email.message}
                                    />
                                )}
                            </div>

                            <div className='modal-footer'>
                                <CancelarModal handleClose={handleClose}/>

                                <GuardarModal />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EditarCliente;
