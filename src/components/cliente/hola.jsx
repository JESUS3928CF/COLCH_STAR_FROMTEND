import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import clienteAxios from '../../config/axios';
import AlertaError from '../chared/AlertaError';

import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';

//* Importa las funciones de validación
import { validarImagen } from '../../Validations/validations.js';

const AgregarDiseno = () => {
    /// Funciones del paquete react-hook-form necesarias para las validaciones
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const guardarDiseno = handleSubmit( async (data) => {
        console.log(data);

        /// Crear un form-data por que así el back puede recibir imágenes
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('publicado', data.publicado);
        formData.append('imagen', data.imagen[0]);

        /// Almacenar el diseño en la DB
        try {
            const res = await clienteAxios.post('/disenos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(res)

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Diseño agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                location.reload();
            });

        } catch (error) {
            console.log(error);
            // Lanzar alerta de error
            Swal.fire({
                title: 'Error',
                text: "Hubo un error",
                icon: 'Vuelva a intentarlo',
            }).then(
                location.reload()
            );
        }
    });

    return (
        <div className='modal' id='myModalAgregarDiseno'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    {/* Cabecero del modal */}
                    <HeaderModals title={'Agregar diseño'} />

                    <div className='modal-body'>
                        {/* formulario para agregar un Diseño */}
                        <form onSubmit={guardarDiseno}>
                            <div className='mb-3'>
                                <label
                                    htmlFor='nombre'
                                    className='col-form-label'
                                >
                                    Nombre:
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
                                    })}
                                />
                                {/* en esta etiqueta va salir el error de validación  */}
                                {errors.nombre && (
                                    <AlertaError
                                        message={errors.nombre.message}
                                    />
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='imagen' className='form-label'>
                                    Subir imagen
                                </label>
                                <input
                                    className='form-control'
                                    name='imagen'
                                    type='file'
                                    {...register('imagen', {
                                        required: {
                                            value: true,
                                            message: 'La imagen es obligatoria',
                                        },
                                        validate: (value) => {
                                            return validarImagen(value[0]);
                                        }
                                    })}
                                />
                                {/* en esta etiqueta va salir el error de validación  */}
                                {errors.imagen && (
                                    <AlertaError
                                        message={errors.imagen.message}
                                    />
                                )}
                            </div>

                            <div className='mb-3'>
                                <label
                                    htmlFor='rolGuardar'
                                    className='col-form-label'
                                >
                                    ¿Deseas publicarlo?
                                </label>
                                <select
                                    className='form-control'
                                    name='publicado'
                                    {...register('publicado', {
                                        required: {
                                            value: true,
                                            message:
                                                'El estado de publicación es obligatorio',
                                        }
                                    })}
                                >
                                    <option value='' disabled selected>
                                        Selecciona una opción
                                    </option>
                                    <option value='true'>Si</option>
                                    <option value='false'>No</option>
                                </select>
                                {/* en esta etiqueta va salir el error de validación  */}
                                {errors.publicado && (
                                    <AlertaError
                                        message={errors.publicado.message}
                                    />
                                )}
                            </div>

                            <div className='modal-footer'>
                                {/* Botón para cancelar*/}
                                <CancelarModal />

                                {/* Botón para guardar*/}
                                <GuardarModal />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarDiseno;
