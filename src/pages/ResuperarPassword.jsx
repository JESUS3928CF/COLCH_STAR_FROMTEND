/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styles from './Login.module.css'; // Import the CSS module
import { useNavigate, useParams } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import AlertaError from '../components/chared/AlertaError';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const RecuperarPassword = () => {
    const [isActivate, setIsActivate] = useState(false);
    const [isActivateConfirm, setIsActivateConfirm] = useState(false);

    // Para que cuando el token no sea valido no muestre el formulario
    const[ tokenValid, setTokenValid] = useState(false);

    const params = useParams();
    const token = params.token.slice(1)

    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                await clienteAxios(`/usuarios/password-perdida/${token}`);
                setTokenValid(true);
            } catch (error) {
                Swal.fire({
                    title: `Hubo un error con el enlace`,
                    icon: 'error',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login')
                    }
                });
            }
        };

        fetchData();
    }, [token]);

    /// variables para el formulario
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        getValues
    } = useForm();

    // const navigate = useNavigate();

    const validarEmail = handleSubmit( async (data) => {

        try {
            const url = `/usuarios/password-perdida/${token}`;
            const res =  await clienteAxios.post(url, {contrasena: data.contrasena});

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: res.data.message,
                icon: 'success',
            }).then(() => {
                navigate('/login');
            });
        } catch (error) {
            Swal.fire({
                title: `Hubo un error`,
                icon: 'error',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
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
                <div className={`${styles.login_section}`}>
                    <div className={`${styles.form_box} ${styles.login}`}>
                        {tokenValid && <form onSubmit={validarEmail}>
                            <h2 style={{ fontWeight: 'bold' }}>
                                Ingrese su nueva contraseña
                            </h2>
                            <br />
                            <div className={styles.input_box}>
                                <span className={styles.icon}>
                                    <i
                                        className='bx bxs-lock-alt'
                                        onClick={() =>
                                            setIsActivate(!isActivate)
                                        }
                                    ></i>
                                </span>
                                <input
                                    name='contrasena'
                                    type={isActivate ? 'text' : 'password'}
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
                                <label>Nueva contraseña</label>
                                {errors.contrasena && (
                                    <AlertaError
                                        message={errors.contrasena.message}
                                    />
                                )}
                            </div>
                            <br />
                            <div className={`${styles.input_box} mt-5`}>
                                <span className={styles.icon}>
                                    <i
                                        className='bx bxs-lock-alt'
                                        onClick={() =>
                                            setIsActivateConfirm(
                                                !isActivateConfirm
                                            )
                                        }
                                    ></i>
                                </span>
                                <input
                                    name='confirmarContrasena'
                                    type={
                                        isActivateConfirm ? 'text' : 'password'
                                    }
                                    {...register('confirmarContrasena', {
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
                                            'confirmarContrasena',
                                            inputValue
                                        );
                                        trigger('confirmarContrasena');
                                    }}
                                />
                                <label>Confirmar contraseña</label>
                                {errors.confirmarContrasena && (
                                    <AlertaError
                                        message={
                                            errors.confirmarContrasena.message
                                        }
                                    />
                                )}
                            </div>
                            <button className={`${styles.btn} mt-2`}>
                                Cambiar
                            </button>
                        </form>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecuperarPassword;
