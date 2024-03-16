import { useState } from 'react';
import styles from './Login.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { validarEspaciosVacios } from '../Validations/validations';
import AlertaError from '../components/chared/AlertaError';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types'; 

const LoginForm = ({ setIsActivate }) => {
    /// Variable de autenticación del provider
    const { setAuth } = useAuth();

    /// variables para el formulario
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const autenticarUsuario = handleSubmit(async (data) => {
        const { email, contrasena } = data;

        /// Hacer la petición al backend
        try {
            const respuesta = await clienteAxios.post('/usuarios/login', {
                email,
                contrasena,
            });

            localStorage.setItem('token', respuesta.data.usuario.token);

            setAuth(respuesta.data);

            navigate(`/administracion/${respuesta.data.usuario.permisos[0]}`);
        } catch (error) {   
            return Swal.fire({
                title: `${error.response.data.message}`,
                icon: 'error',
            });
        }
    });
    return (
        <form onSubmit={autenticarUsuario}>
            <h2 style={{ fontWeight: 'bold' }}>¡Bienvenido!</h2>
            <br />
            <div className={styles.input_box}>
                <span className={styles.icon}>
                    <i className='bx bxs-envelope'></i>
                </span>
                <input
                    type='email'
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'El usuario es obligatorio',
                        },
                        // validate: (value) => validarEspaciosVacios(value),
                        // pattern: {
                        //     value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        //     message: 'El correo electrónico no tiene un formato válido',
                        // },
                    })}
                />
                <label>Usuario</label>
                {errors.email && <AlertaError message={errors.email.message} />}
            </div>
            <div className={styles.input_box}>
                <span className={styles.icon}>
                    <i className='bx bxs-lock-alt'></i>
                </span>
                <input
                    type='password'
                    {...register('contrasena', {
                        required: {
                            value: true,
                            message: 'La contraseña es obligatoria',
                        },
                    })}
                />
                <label>Contraseña</label>
                {errors.contrasena && (
                    <AlertaError message={errors.contrasena.message} />
                )}
            </div>
            <div className={styles.button_group}>
                <button className={styles.btn} onClick={autenticarUsuario}>
                    {' '}
                    Iniciar sesión
                </button>
            </div>
            <div className={styles.create_account}>
                <p>
                    Olvido su contraseña?{' '}
                    <span
                        className={styles.cambiar_seccion}
                        onClick={() => setIsActivate(true)}
                    >
                        Click aquí
                    </span>
                </p>
            </div>
        </form>
    );
};

// Define PropTypes para las props del componente
LoginForm.propTypes = {
    setIsActivate: PropTypes.func.isRequired,
};

const Login = () => {
    const [isActivate, setIsActivate] = useState(false);

    /// variables para el formulario
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    // const navigate = useNavigate();


    const validarEmail = handleSubmit(async(data) => {

        try {
            const res = await clienteAxios.post('/usuarios/password-perdida', {
                email: data.email,
            });

            Swal.fire({
                title: "Correo enviado",
                text: res.data.message,
                icon: 'success',
            }).then( () => {
                reset()
            });

        } catch (error) {
            Swal.fire({
                 title: `${error.response.data.message}`,
                 icon: 'error',
             });
        }
    });

    return (
        <div className={styles.contenedor}>
            <div className={styles.contenedorFondo}>
                <div className={styles.bubbles}>
                    <span style={{ '--i': 11 }}></span>
                    <span style={{ '--i': 12 }}></span>
                    <span style={{ '--i': 24 }}></span>
                    <span style={{ '--i': 10 }}></span>
                    <span style={{ '--i': 14 }}></span>
                    <span style={{ '--i': 23 }}></span>
                    <span style={{ '--i': 18 }}></span>
                    <span style={{ '--i': 16 }}></span>
                    <span style={{ '--i': 19 }}></span>
                    <span style={{ '--i': 20 }}></span>
                    <span style={{ '--i': 22 }}></span>
                    <span style={{ '--i': 25 }}></span>
                    <span style={{ '--i': 18 }}></span>
                    <span style={{ '--i': 21 }}></span>
                    <span style={{ '--i': 15 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 26 }}></span>
                    <span style={{ '--i': 17 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 28 }}></span>

                    <span style={{ '--i': 12 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 27 }}></span>
                    <span style={{ '--i': 15 }}></span>
                    <span style={{ '--i': 19 }}></span>
                    <span style={{ '--i': 23 }}></span>
                    <span style={{ '--i': 17 }}></span>
                    <span style={{ '--i': 11 }}></span>
                    <span style={{ '--i': 19 }}></span>
                    <span style={{ '--i': 20 }}></span>
                    <span style={{ '--i': 27 }}></span>
                    <span style={{ '--i': 25 }}></span>
                    <span style={{ '--i': 22 }}></span>
                    <span style={{ '--i': 21 }}></span>
                    <span style={{ '--i': 23 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 26 }}></span>
                    <span style={{ '--i': 17 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 28 }}></span>
                </div>
            </div>

            <div className={styles.background}></div>
            <div className={styles.container}>
                <div
                    className={`${styles.login_section} ${
                        isActivate ? styles.active : ''
                    }`}
                >
                    <div className={`${styles.form_box} ${styles.login}`}>
                        <LoginForm setIsActivate={setIsActivate} />
                    </div>
                    <div className={`${styles.form_box} ${styles.register}`}>
                        <form onSubmit={validarEmail}>
                            <h2 style={{ fontWeight: 'bold' }}>
                                Recuperar contraseña
                            </h2>
                            <div className='col-12 text-center pl-sm-3'>
                                {' '}
                                <p>
                                    Ingrese su correo electrónico de
                                    recuperación
                                </p>
                            </div>
                            <br />
                            <div className={styles.input_box}>
                                <span className={styles.icon}>
                                    <i className='bx bxs-envelope'></i>
                                </span>
                                <input
                                    type='email'
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: 'El usuario es obligatorio',
                                        },
                                        validate: (value) =>
                                            validarEspaciosVacios(value),
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message:
                                                'El correo electrónico no tiene un formato válido',
                                        },
                                    })}
                                />
                                <label>Usuario</label>
                                {errors.email && (
                                    <AlertaError
                                        message={errors.email.message}
                                    />
                                )}
                            </div>
                            <button className={styles.btn}>Enviar</button>
                            <div className={styles.create_account}>
                                <p>
                                    <span
                                        className={styles.cambiar_seccion}
                                        onClick={() => setIsActivate(false)}
                                    >
                                        Inicio
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
