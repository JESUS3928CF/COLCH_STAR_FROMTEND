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
import Swal from 'sweetalert2';
import { validarEspaciosVacios } from '../../Validations/validations';
import { useEffect, useState } from 'react';
import HeaderModals from '../chared/HeaderModals';
import useAuth from '../../hooks/useAuth';

const AgregarUsuario = () => {
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

        try {
            // la ruta por donde voya mandar el objeto o el registro nuevo data
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,
                {
                    nombre: nombre.trim(),
                    apellido: apellido.trim(),
                    telefono: telefono.trim(),
                    email: email.trim(),
                    contrasena: contrasena.trim(),
                    fk_rol: fk_rol.trim(),
                },
                config
            );
            //Luego de mandarlo se cierra el modal

            reset(); //Luego de ser agregado y mandado resetea el formulario

            // Lanzar alerta del usuario agregado
            Swal.fire({
                title: 'Usuario Agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                //El then se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
                location.reload(); //  recarga la pagina
            });
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 403) {
                Swal.fire({
                    title: 'Error',
                    text: err.response.data.message,
                    icon: 'error',
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error',
                    icon: 'error',
                }).then(() => {
                    location.reload();
                });
            }
        }
    };

    return (
        <div>
            {/* modal agregar usuario */}

            <div className='modal' id='myModal'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <HeaderModals title={'Agregar Usuario'} />
                        <div className='modal-body'>
                            {/* <!-- formulario para agregar un usuario --> */}
                            <form
                                className='row g-3 needs-validation'
                                onSubmit={handleSubmit(onSubmit)}
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
                                                message:
                                                    'El nombre es obligatorio',
                                            },
                                            validate: (value) =>
                                                validarEspaciosVacios(value),
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
                                            validate: (value) =>
                                                validarEspaciosVacios(value),
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
                                        placeholder='. . . '
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
                                                    telefonoSinEspacios.length >
                                                        11
                                                ) {
                                                    return 'El telefono debe tener mínimo 7 dígitos y máximo 12';
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
                                        htmlFor='email'
                                        className='col-form-label'
                                    >
                                        Email: *
                                    </label>
                                    <input
                                        name='email'
                                        type='text'
                                        className='form-control'
                                        placeholder='. . . '
                                        {...register('email', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El email es obligatorio',
                                            },
                                            validate: (value) =>
                                                validarEspaciosVacios(value),

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
                                                value: /^\S{6,}$/, // Expresión regular que verifica al menos 6 caracteres.
                                                message:
                                                    'La contraseña debe tener al menos 6 caracteres sin espacios',
                                            },
                                        })}
                                        onChange={(e) => {
                                            setValue(
                                                'contrasena',
                                                e.target.value
                                            );
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
                                            setValue(
                                                'contrasenaConfirmar',
                                                e.target.value
                                            );
                                            trigger('contrasenaConfirmar');
                                        }}
                                    />
                                    {errors.contrasenaConfirmar && (
                                        <AlertaError
                                            message={
                                                errors.contrasenaConfirmar
                                                    .message
                                            }
                                        />
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='rol'
                                        className='col-form-label'
                                    >
                                        Rol: *
                                    </label>
                                    <select
                                        name='rol'
                                        className='form-control'
                                        {...register('fk_rol', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Debe seleccionar un rol',
                                            },
                                        })}
                                    >
                                        <option value=''>
                                            Seleccionar Rol
                                        </option>
                                        {roles.map((rol) => {
                                            if (
                                                rol.nombre !== 'Administrador'
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
                                    <CancelarModal reset={reset} />
                                    <GuardarModal />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarUsuario;
