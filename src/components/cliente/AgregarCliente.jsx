// ------------------HERLYN NORBEY DAVID POSO
//-------------------26 de septiembre 2023
//Nos permitira Agregar un cliente, de ser necesario se podra agregar un cliente mediante un formulario donde se pediran datos
//mas relevantes de este cliente y luego mostrarlo en la tabla listar
import '../../css-general/cssgeneral.css';
import '../../css-general/tailwind.min.css';
import '../../css-general/inicio_style.css';
import '../../css-general/table.min.css';
import { useForm } from 'react-hook-form';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarEspaciosVacios } from '../../Validations/validations';
import HeaderModals from '../chared/HeaderModals';
import useClientes from '../../hooks/useCliente';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import BotonVerde from '../chared/BotonVerde';

//Componente
const AgregarCliente = () => {
    const { agregarCliente } = useClientes();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        register, //Registra o identifica cada elemento o cada input
        handleSubmit, //Para manejar el envió del formulario
        formState: { errors }, //Ver errores que tiene el formulario
        setValue,
        trigger,
        reset, //Resetea el formulario
    } = useForm({
        mode: 'onChange',
    });

    //Función que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = async (data) => {
        const {
            nombre,
            apellido,
            identificacion,
            telefono,
            email,
            direccion,
            tipoIdentificacion,
        } = data;

        agregarCliente(
            {
                identificacion: identificacion.trim(),
                tipoIdentificacion: tipoIdentificacion.trim(),
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                telefono: telefono.trim(),
                email: email.trim(),
                direccion: direccion.trim(),
            },
            reset,
            handleClose
        );
    };
    return (
        <div>
            {/* modal agregar proveedor */}

            <BotonVerde text={'Agregar Cliente'} onClick={handleShow} />

            <Modal
                show={show}
                onHide={handleClose}
                className='modal d-flex align-items-center justify-content-center'
                id='myModal'
            >
                <div className='modal-content'>
                    <HeaderModals title={'Agregar Cliente'} />
                    <div>
                        <div className='modal-body'>
                            {/* <!-- formulario para agregar un usuario --> */}
                            <form
                                className='row g-3 needs-validation'
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
                                                            value: true,
                                                            message:
                                                                'El tipo de identificación es obligatorio',
                                                        },
                                                    }
                                                )}
                                            >
                                                <option value='C.C.'>
                                                    C.C.{' '}
                                                </option>
                                                <option value='C.E.'>
                                                    C.E.{' '}
                                                </option>
                                            </select>
                                        </div>
                                        <div className='col-md-10'>
                                            <input
                                                type='text'
                                                className='form-control '
                                                name='identificacion'
                                                placeholder='. . .'
                                                {...register('identificacion', {
                                                    required:
                                                        'La Identificación es obligatoria',
                                                    pattern: {
                                                        value: /^\d+$/, // Expresión regular para prohibir letras y espacios en blanco
                                                        message:
                                                            'No puede contener letras ni espacios en blanco',
                                                    },
                                                    validate: (value) => {
                                                        if (
                                                            value.length < 6 ||
                                                            value.length > 11
                                                        ) {
                                                            return 'La Identificación debe tener entre 6 y 11 dígitos';
                                                        }
                                                        return true;
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
                                                    errors.identificacion
                                                        .message
                                                }
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <label
                                        htmlFor='nombre'
                                        className='col-form-label'
                                    >
                                        Nombres: *
                                    </label>
                                    <input
                                        name='nombre'
                                        type='text'
                                        className='form-control'
                                        placeholder='. . .'
                                        {...register('nombre', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El Nombre es obligatorio',
                                            },
                                            validate: (value) => {
                                                // Valida espacios
                                                return validarEspaciosVacios(
                                                    value
                                                );
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

                                <div className='col-md-6'>
                                    <label
                                        htmlFor='apellido'
                                        className='col-form-label'
                                    >
                                        Apellidos: *
                                    </label>
                                    <input
                                        name='apellido'
                                        type='text'
                                        className='form-control'
                                        placeholder='. . .'
                                        {...register('apellido', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El apellido es obligatorio',
                                            },
                                            validate: (value) => {
                                                // Valida espacios
                                                return validarEspaciosVacios(
                                                    value
                                                );
                                            },
                                            pattern: {
                                                value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                                                message:
                                                    'El apellido no puede contener números ni caracteres especiales',
                                            },
                                        })}
                                        onChange={(e) => {
                                            setValue(
                                                'apellido',
                                                e.target.value
                                            );
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
                                        htmlFor='telefono'
                                        className='col-form-label'
                                    >
                                        Teléfono: *
                                    </label>
                                    <input
                                        name='telefono'
                                        type='text'
                                        className='form-control'
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
                                                    'No se permiten letras ni espacios en blanco',
                                            },
                                            validate: (value) => {
                                                const telefonoSinEspacios =
                                                    value.replace(/\s/g, ''); // Eliminar espacios en blanco
                                                if (
                                                    telefonoSinEspacios.length <
                                                        7 ||
                                                    telefonoSinEspacios.length >
                                                        12
                                                ) {
                                                    return 'El teléfono debe tener mínimo 7 dígitos y máximo 12';
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
                                        />
                                    )}
                                </div>

                                <div className='col-md-6'>
                                    <label
                                        htmlFor='direccion'
                                        className='col-form-label'
                                    >
                                        Dirección: *
                                    </label>
                                    <input
                                        name='direccion'
                                        type='text'
                                        className='form-control'
                                        placeholder='. . .'
                                        {...register('direccion', {
                                            required: {
                                                value: true,
                                                message:
                                                    'La dirección es obligatoria',
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
                                        />
                                    )}
                                </div>

                                <div className='mb-3'>
                                    <label
                                        htmlFor='email'
                                        className='col-form-label'
                                    >
                                        Email: *
                                    </label>
                                    <input
                                        name='email'
                                        type='text'
                                        className='form-control'
                                        placeholder='. . .'
                                        {...register('email', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El email es obligatorio',
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(
                                                    value
                                                );
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
                                    <CancelarModal
                                        modalToCancel='myModal'
                                        reset={reset}
                                    />
                                    <GuardarModal />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default AgregarCliente;
