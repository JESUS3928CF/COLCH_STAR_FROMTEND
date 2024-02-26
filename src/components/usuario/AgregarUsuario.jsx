// ------------------HERLYN NORBEY DAVID POSO
//-------------------10 de octubre 2023
//Nos permitirá Agregar un usuario, se podrá agregar el usuario mediante un formulario con sus respectivas validaciones donde se pediran los datos
//mas relevantes de este usuario y luego se mostrara en la tabla listar usuarios
import '../../css-general/cssgeneral.css';
import '../../css-general/inicio_style.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarEspaciosVacios } from '../../Validations/validations';
import { useEffect, useState } from 'react';
import HeaderModals from '../chared/HeaderModals';
import { Modal } from 'react-bootstrap';
import BotonVerde from '../chared/BotonVerde';
import useUsuario from '../../hooks/useUsuario';
import useAuth from '../../hooks/useAuth';

const AgregarUsuario = () => {
    const { agregarUsuario } = useUsuario();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        register, //Regitra o identifica cada elemento o cada input
        handleSubmit, //Para manejar el envio del formulario
        formState: { errors }, //Ver errores que tiene el formulario
        setValue,
        trigger,
        reset, //Resetea el formulario
        getValues,
    } = useForm({
        mode: 'onChange',
    });

    const [roles, setRoles] = useState([]);
    const { config } = useAuth();

    useEffect(() => {
        // Realizar una solicitud para obtener la lista de roles desde el servidor
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/rol`, config)
            .then((response) => {
                setRoles(response.data); // Almacenar la lista de roles en el estado
            });
    }, []);

    //Función que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = async (data) => {
        const { nombre, apellido, telefono, email, contrasena, fk_rol } = data;

        agregarUsuario(
            {
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                telefono: telefono.trim(),
                email: email.trim(),
                contrasena: contrasena.trim(),
                fk_rol: fk_rol.trim(),
            },
            reset,
            handleClose
        );
    };

    return (
        <div>
            <BotonVerde text={'Agregar usuario'} onClick={handleShow} />

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
                    <HeaderModals
                        title={'Agregar usuario'}
                        handleClose={() => {
                            reset();
                            handleClose();
                        }}
                    />
                    <div className='modal-body'>
                        {/* <!-- formulario para agregar un usuario --> */}
                        <form
                            className='row g-3 needs-validation'
                        >
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
                                            message: 'El nombre es obligatorio',
                                        },
                                        validate: (value) => {
                                            if (
                                                value.trim().length < 3 ||
                                                value.length > 20
                                            ) {
                                                return 'El nombre debe tener entre 3 y 20 caracteres';
                                            }
                                            if (
                                                !/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(
                                                    value
                                                )
                                            ) {
                                                return 'El nombre solo puede tener letras';
                                            }
                                            if (value.includes(' ')) {
                                                return validarEspaciosVacios(
                                                    value
                                                );
                                            }

                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(
                                            0,
                                            21
                                        );
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
                                            if (
                                                value.trim().length < 3 ||
                                                value.length > 20
                                            ) {
                                                return 'El apellido debe tener entre 3 y 20 caracteres';
                                            }
                                            if (
                                                !/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(
                                                    value
                                                )
                                            ) {
                                                return 'El apellido solo puede tener letras';
                                            }
                                            if (value.includes(' ')) {
                                                return validarEspaciosVacios(
                                                    value
                                                );
                                            }

                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(
                                            0,
                                            21
                                        );
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
                                    htmlFor='telefono'
                                    className='col-form-label'
                                >
                                    Teléfono: *
                                </label>
                                <input
                                    name='telefono'
                                    type='text'
                                    className='form-control'
                                    placeholder='. . . '
                                    {...register('telefono', {
                                        required: {
                                            value: true,
                                            message:
                                                'El teléfono es obligatorio',
                                        },
                                        validate: (value) => {
                                            if (value.includes(' ')) {
                                                return 'No se permiten espacios en blanco';
                                            }
                                            if (!/^\d+$/.test(value)) {
                                                return 'El télefono solo puede tener números';
                                            }
                                            if (value.startsWith('0')) {
                                                return 'El teléfono no puede iniciar con 0';
                                            }
                                            if (
                                                value.length < 7 ||
                                                value.length > 10
                                            ) {
                                                return 'El teléfono debe tener entre 7 y 10 dígitos';
                                            }
                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(
                                            0,
                                            11
                                        );
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
                                    htmlFor='email'
                                    className='col-form-label'
                                >
                                    Correo electrónico: *
                                </label>
                                <input
                                    name='email'
                                    type='text'
                                    className='form-control'
                                    placeholder='. . . '
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: 'El correo electrónico es obligatorio',
                                        },
                                        validate: (value) =>
                                            validarEspaciosVacios(value),

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
                            <div className='col-md-6'>
                                <label
                                    htmlFor='contrasena'
                                    className='col-form-label'
                                >
                                    Contraseña: *
                                </label>
                                <input
                                    name='contrasena'
                                    type='password'
                                    className='form-control'
                                    placeholder='. . . '
                                    {...register('contrasena', {
                                        required: {
                                            value: true,
                                            message:
                                                'La contraseña es obligatoria',
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])[^\s]{8,15}$/,
                                            message: 'La contraseña debe tener entre 8 y 15 dígitos, una mayúscula, una minúscula, un número y un carácter especial.',
                                        }
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(
                                            0,
                                            16
                                        );
                                        setValue('contrasena', inputValue);
                                        trigger('contrasena');
                                    }}
                                />
                                {errors.contrasena && (
                                    <AlertaError
                                        message={errors.contrasena.message}
                                    />
                                )}
                            </div>
                            <div className='col-md-6'>
                                <label
                                    htmlFor='contrasenaConfirmar'
                                    className='col-form-label'
                                >
                                    Confirmar contraseña: *
                                </label>
                                <input
                                    name='contrasenaConfirmar'
                                    type='password'
                                    className='form-control'
                                    placeholder='. . . '
                                    {...register('contrasenaConfirmar', {
                                        required: {
                                            value: true,
                                            message:
                                                'Confirmar la contraseña es obligatorio',
                                        },
                                        validate: (value) => {
                                            const password =
                                                getValues('contrasena');
                                            return (
                                                value === password ||
                                                'Las contraseñas no coinciden'
                                            );
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(
                                            0,
                                            16
                                        );
                                        setValue(
                                            'contrasenaConfirmar',
                                            inputValue
                                        );
                                        trigger('contrasenaConfirmar');
                                    }}
                                />
                                {errors.contrasenaConfirmar && (
                                    <AlertaError
                                        message={
                                            errors.contrasenaConfirmar.message
                                        }
                                    />
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='rol' className='col-form-label'>
                                    Rol: *
                                </label>
                                <select
                                    name='rol'
                                    className='form-control'
                                    {...register('fk_rol', {
                                        required: {
                                            value: true,
                                            message: 'Debe seleccionar un rol',
                                        },
                                    })}
                                >
                                    <option value=''>Seleccionar rol</option>
                                    {roles.map((rol) => {
                                        if (
                                            rol.nombre !== 'Administrador' &&
                                            rol.estado
                                        ) {
                                            return (
                                                <option
                                                    key={rol.id_rol}
                                                    value={rol.id_rol}
                                                >
                                                    {rol.nombre}
                                                </option>
                                            );
                                        }
                                        return null;
                                    })}
                                </select>

                                {errors.fk_rol && (
                                    <AlertaError
                                        message={errors.fk_rol.message}
                                    />
                                )}
                            </div>
                            <div className='modal-footer'>
                                <CancelarModal
                                    modalToCancel='myModal'
                                    reset={reset}
                                    handleClose={handleClose}
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

export default AgregarUsuario;
