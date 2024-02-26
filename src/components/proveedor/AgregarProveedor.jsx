// ------------------BRIAN PAREJA HERNANDEZ
//-------------------26 de septiembre 2023
//Nos permitira Agregar un proveedor, de ser necesario se podra agregar un proveedor mediante un formulario donde se pediran datos mas
//mas relevantes de este proveedor y luego mostrarlo en la tabla listar 
import '../../css-general/cssgeneral.css'
import '../../css-general/inicio_style.css'
import Swal from 'sweetalert2';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarEspaciosVacios } from '../../Validations/validations'
import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import useProveedor from '../../hooks/useProveedor.jsx';
import BotonVerde from '../chared/BotonVerde';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';



//COMPONENTE
const AgregarProveedor = () => {

    const { agregarProveedor } = useProveedor();


    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); }


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

            <BotonVerde text={'Agregar proveedor'} onClick={handleShow} />

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
                    <HeaderModals title={'Agregar proveedor'} handleClose={() => {
                        reset();
                        handleClose();
                    }} />

                    <div className='modal-body'>
                        {/* formulario para agregar proveedor */}
                        <form
                            className='row g-1 needs-validation'
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
                                                validate: (value) => {
                                                    if (value.includes(" ")) {
                                                        return 'No se permiten espacios en blanco';
                                                    }
                                                    // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                                                    if (!/^\d+$/.test(value)) {
                                                        return 'La identificación solo puede contener números';
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
                                                const inputValue = e.target.value.slice(0, 11); // Limitar la longitud máxima
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
                                    htmlFor='nombre'
                                    className='col-form-label'
                                >
                                    Nombre: *
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
                                                'El nombre es obligatorio', // es un mensaje que se mostrará si la validación falla.
                                        },
                                        validate: (value) => {
                                            if (value.trim().length < 3 || value.length > 20) {
                                                return 'El nombre debe tener entre 3 y 20 caracteres';
                                            }
                                            if (!/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s&]+$/.test(value)) {
                                                return 'El nombre solo puede contener letras';
                                            }
                                            if (value.includes(" ")) {
                                                return validarEspaciosVacios(value);
                                            }

                                            return true;
                                        },
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
                                        validate: (value) => {
                                            if (value.includes(" ")) {
                                                return 'No se permiten espacios en blanco';
                                            }
                                            if (!/^\d+$/.test(value)) {
                                                return 'La teléfono solo puede tener números';
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
                                        const inputValue = e.target.value.slice(0, 11); // Limitar la longitud máxima
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
                                <GuardarModal onSubmit={handleSubmit(onSubmit)}/>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AgregarProveedor