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
        reset
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
    }, [cliente, show]);

    /// Función para guardar el cliente en la DB
    const onSubmit = (data) => {

        /// Le pasamos el id del cliente que queremos editar
        data.id_cliente = cliente.id_cliente
        editarCliente(data, handleClose,reset);

    };

    return (
        <div>
            {/* modal de editar clientes */}
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
                        title={'Editar cliente'}
                        handleClose={() => {
                            reset();
                            handleClose();
                        }}
                    />
                    <div className='modal-body'>
                        {/* <!-- formulario para editar los datos de la tabla clientes --> */}
                        <form
                            className='row g-3 needs-validation'
                            action=''
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
                                                required: {
                                                    value: true, // Expresión regular para prohibir letras y espacios en blanco
                                                    message: "La identificación es obligatoria",
                                                  },
                                                validate: (value) => {
                                                    if (value.includes(" ")) {
                                                        return 'No se permiten espacios en blanco';
                                                    }
                                                    // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                                                    if (!/^\d+$/.test(value)) {
                                                        return 'La identificación solo puede tener números';
                                                    }
                                                    if (value.startsWith("0")) {
                                                        return 'La identificación no puede iniciar con 0';
                                                    }
                                                    if (value.length < 6 || value.length > 10) {
                                                        return 'La identificación debe tener entre 6 y 10 dígitos';
                                                    }
                                                    return true;
                                                },
                                            })}
                                            onChange={(e) => {
                                            const inputValue = e.target.value.slice(0,11)
                                                setValue(
                                                    'identificacion',
                                                    inputValue
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
                                    Nombres: *
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='nombreEditar'
                                    name='nombre'
                                    placeholder='. . .'
                                    {...register('nombre', {
                                        required: {
                                            value: true,
                                            message: 'El nombre es obligatorio',
                                        },
                                        validate: (value) => {
                                           if (value.trim().length < 3 || value.length > 20) {
                                                return 'El nombre debe tener entre 3 y 20 caracteres';
                                            }
                                            if (!/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(value)) {
                                                return 'El nombre solo puede tener letras';
                                            }
                                            if (value.includes(" ")) {
                                                return validarEspaciosVacios(value);
                                            }
                                            
                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(0,21)
                                        setValue('nombre', inputValue);
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
                                    Apellidos: *
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='apellidoEditar'
                                    name='apellido'
                                    placeholder='. . .'
                                    {...register('apellido', {
                                        required: {
                                            value: true,
                                            message:
                                                'El apellido es obligatorio',
                                        },
                                        validate: (value) => {
                                            if (value.trim().length < 3 || value.length > 20) {
                                                return 'El apellido debe tener entre 3 y 20 caracteres';
                                            }
                                            if (!/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(value)) {
                                                return 'El apellido solo puede tener letras';
                                            }
                                            if (value.includes(" ")) {
                                                return validarEspaciosVacios(value);
                                            }
                                            
                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(0,21)
                                        setValue('apellido', inputValue);
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
                                    Teléfono: *
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='telefonoEditar'
                                    name='telefono'
                                    placeholder='. . .'
                                    {...register('telefono', {
                                        required: {
                                            value: true,
                                            message:
                                                'El teléfono es obligatorio',
                                        },
                                        validate: (value) => {
                                            if (value.includes(" ")) {
                                                return 'No se permiten espacios en blanco';
                                            }
                                            if (!/^\d+$/.test(value)) {
                                                return 'El télefono solo puede tener números';
                                            }
                                            if (value.startsWith("0")) {
                                                return 'El teléfono no puede iniciar con 0';
                                            }
                                            if (value.length < 7 || value.length > 10) {
                                                return 'El teléfono debe tener entre 7 y 10 dígitos';
                                            }
                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(0,11)
                                        setValue('telefono', inputValue);
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
                                    Dirección: *
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='direccionEditar'
                                    name='direccion'
                                    placeholder='. . .'
                                    {...register('direccion', {
                                        required: {
                                            value: true,
                                            message:
                                                'La dirección es obligatoria',
                                        },
                                        validate: (value) => {
                                           if (value.trim().length < 4 || value.length > 50) {
                                                return 'La dirección debe tener entre 4 y 50 caracteres';
                                            }
                                            if (value.includes(" ")) {
                                                return validarEspaciosVacios(value);
                                            }
                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(0, 51); // Limitar la longitud máxima
                                        setValue('direccion', inputValue);
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
                                     Correo electrónico: *
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='emailEditar'
                                    name='email'
                                    placeholder='. . .'
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: 'El correo electrónico es obligatorio',
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(value);
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message:
                                                'El correo electrónico no tiene un formato válido',
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
                                    handleClose={handleClose}
                                    reset={reset}
                                />

                                <GuardarModal onSubmit={handleSubmit(onSubmit)}/>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EditarCliente;
