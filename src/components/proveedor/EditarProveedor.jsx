// ------------------BRIAN PAREJA HERNANDEZ
//-------------------26 de septiembre 2023
//Nos permitira Editar un proveedor, luego de tener proveedores en la tabla listar se podra hacerle sus repectivas modificaciones
// a dichos proveedores



import React from 'react'
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import styles from '../../pages/proveedores.module.css';
import axios from 'axios'
import Swal from 'sweetalert2';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError'
import { set, useForm } from 'react-hook-form'
import { useEffect } from 'react';
import { validarEspaciosVacios } from '../../Validations/validations'


//COMPONENTE
const EditarProveedor = ({ editarProveedor }) => {




    const {
        register, //regitra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envio del formulario
        formState: { errors }, //ver errores que tiene el formulario
        setValue, // Añade esta función para actualizar dinámicamente los valores
    } = useForm();

    //por medio de editarproveedor se traen lo que hay en el listar, y por medio del estado setvalue
    //  le pasan todo a nombre telefono etc, y con eso se les pasa por medio del value=¨nombre telefono etc al input  
    useEffect(() => {
        if (editarProveedor) {
            setValue('tipoIdentificacion', editarProveedor.tipoIdentificacion);
            setValue('identificador', editarProveedor.identificador);
            setValue('nombre', editarProveedor.nombre);
            setValue('telefono', editarProveedor.telefono);
            setValue('direccion', editarProveedor.direccion);
        }
    }, [editarProveedor]);



    //funcion que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = (data) => {
        //se guardan los datos  a cambiar al data
        const { tipoIdentificacion, identificador, nombre, telefono, direccion } = data


        if (editarProveedor.id_proveedor) {
            // ruta 
            axios.patch(`http://localhost:3000/api/proveedores/${editarProveedor.id_proveedor}`, {
                // campos en los que realiza el cambio
                tipoIdentificacion: tipoIdentificacion.trim(),
                identificador: identificador.trim(),
                nombre: nombre.trim(),
                telefono: telefono.trim(),
                direccion: direccion.trim()
            })
                .then(response => {
                    console.log('Proveedor actualizado:', response.data);
                    //alerta de proveedor actualizado
                    Swal.fire({
                        title: 'Proveedor actualizado',
                        text: response.data.message,
                        icon: 'success',
                    }).then(() => {
                        location.reload();
                    });
                })
                .catch(error => {
                    console.error('Error al actualizar el proveedor', error);

                    if (error.response && error.response.status === 400) {
                        Swal.fire({
                            title: 'Error',
                            text: error.response.data.message,
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
                });
        } else {
            console.error('No se pudo obtener el ID del proveedor');
        }
    };

    return (
        <div>
            {/* modal de editar proveedor */}
            <div className="modal" id="modalEditar">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="editar edi">
                            <h5 className="modal-title">Editar datos del proveedor</h5>
                            <button type="button" id="xEditar" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">


                            <form action="" id="formularioEditarProveedor" onSubmit={handleSubmit(onSubmit)} >

                                <div className="mb-3" name="divIdentificacion">

                                    <label htmlFor="identificacionEditar"
                                        className="col-form-label">Identificacion: *
                                    </label>
                                    <br />

                                    <div className='row'>
                                        <div className='col-md-2'>




                                            <select style={{ width: 80, height: 40 }} {...register('tipoIdentificacion', {
                                                required: {          // Es una propiedad que indica que el campo es obligatorio. 
                                                    value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                    message: 'El tipo de identificación es obligatoria', // es un mensaje que se mostrará si la validación falla.
                                                }
                                            })}>
                                                <option value="C.C.">C.C.</option>
                                                <option value="NIT.">NIT.</option>
                                                <option value="C.E.">C.E. </option>
                                            </select>
                                        </div>
                                        <div className='col-md-10'>

                                            <input type="text" className="form-control"
                                                id='identificacionEditar'
                                                name="identificador"
                                                placeholder="Ingresar su identificacion"
                                                //register es una funcion, nos devuelve propiedades, para asigar esas propiedades al input  se pone . . .
                                                //  identificador Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                                                {...register('identificador', {
                                                    required: {          // Es una propiedad que indica que el campo es obligatorio. 
                                                        value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                        message: 'La Identificación es obligatorio', // es un mensaje que se mostrará si la validación falla.
                                                    },
                                                    pattern: {
                                                        value: /^\d+$/,   //expreción regular para prohibir letras y espacios en blamco 
                                                        message: "No puede contener Letras ni  espacios en blanco"
                                                    },
                                                    validate: (value) => {
                                                        if (value.length < 6 || value.length > 11) {
                                                            return 'La Identificación debe tener entre 6 y 11 dígitos';
                                                        }
                                                        return true; // La validación pasa si cumple ambas condiciones
                                                    },


                                                })}
                                            />
                                        </div>
                                        {errors.identificador && (
                                            <AlertaError message={errors.identificador.message} /> //muestra el mensaje de validacion
                                        )}
                                    </div>


                                </div>

                                <div className="mb-3" name="divNombre">

                                    <label htmlFor="nombreEditar"
                                        className="col-form-label">Nombres: *
                                    </label>

                                    <input type="text" className="form-control" id="nombreEditar"
                                        name="nombre"
                                        placeholder="Ingresar nombre"
                                        //register es una funcion, nos devuelv propiedades para asigar esas propiedades al input  se pone . . .
                                        //  Nombre Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                                        {...register('nombre', {
                                            required: {     // Es una propiedad que indica que el campo es obligatorio.
                                                value: true,  // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                message: 'El Nombre es obligatorio',  // es un mensaje que se mostrará si la validación falla.
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(value);
                                            },
                                            pattern: {
                                                value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/, //expreción regular para prohibir letras y caracteres 
                                                message: "No puede contener números ni caracteres especiales"
                                            }
                                        })}
                                    />
                                    {errors.nombre && (
                                        <AlertaError message={errors.nombre.message} /> //muestra el mensaje de validacion
                                    )}

                                </div>

                                <div className="mb-3" name="divTelefono">

                                    <label htmlFor="telefonoEditar"
                                        className="col-form-label">Teléfono: *
                                    </label>

                                    <input type="text" className="form-control" id="telefonoEditar"
                                        name="telefono"
                                        placeholder="Ingresar teléfono"
                                        {...register('telefono', {
                                            required: {
                                                value: true,
                                                message: 'El teléfono es obligatorio',
                                            },
                                            pattern: {
                                                value: /^\d+$/,
                                                message: "No puede contener Letras ni espacios en blanco"
                                            },
                                            validate: (value) => {
                                                const telefonoSinEspacios = value.replace(/\s/g, ''); // Eliminar espacios en blanco
                                                if (telefonoSinEspacios.length < 7 || telefonoSinEspacios.length > 11) {
                                                    return 'El telefono debe tener minimo 7 digitos y maximo 12';
                                                }
                                                return true;
                                            },
                                        })}
                                    />
                                    {errors.telefono && (
                                        <AlertaError message={errors.telefono.message} /> //muestra el mensaje de validacion
                                    )}

                                </div>

                                <div className="mb-3" name="divDireccion">

                                    <label htmlFor="direccionEditar"
                                        className="col-form-label">Dirección: *
                                    </label>

                                    <input type="text" className="form-control" id="direccionEditar"
                                        name="direccion"
                                        placeholder="Ingresar dirección"
                                        {...register('direccion', {
                                            required: {
                                                value: true,
                                                message: 'La Dirección es obligatoria',
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(value);
                                            }
                                        })}
                                    />
                                    {errors.direccion && (
                                        <AlertaError message={errors.direccion.message} /> //muestra el mensaje de validacion
                                    )}

                                </div>

                                <div className="modal-footer">

                                    {/* Botón para cancelar*/}
                                    <CancelarModal modalToCancel="modalEditar" />

                                    {/* Botón para guardar*/}
                                    <GuardarModal />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditarProveedor
