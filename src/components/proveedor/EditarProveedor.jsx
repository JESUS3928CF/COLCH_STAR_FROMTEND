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
import { useForm } from 'react-hook-form'
import {  useEffect } from 'react';
import { validarEspaciosVacios } from '../../Validations/validations'


//COMPONENTE
const EditarProveedor = ({ editarProveedor }) => {

    // //estado para llenar los input con la informacion de proveedor a editar
    // const [identificador, setIdentificador] = useState('');
    // const [nombre, setNombre] = useState('');
    // const [telefono, setTelefono] = useState('');
    // const [direccion, setDireccion] = useState('');
    // const [id_proveedor, setIdProveedor] = useState(null);


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
            setValue('identificador', editarProveedor.identificador);
            setValue('nombre', editarProveedor.nombre);
            setValue( 'telefono', editarProveedor.telefono);
            setValue('direccion', editarProveedor.direccion);
        }
    }, [editarProveedor]);


    //funcion que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = (data) => {
        //se guardan los datos  a cambiar al data
        const { identificador, nombre, telefono, direccion } = data


        if (editarProveedor.id_proveedor) {
            // ruta 
            axios.patch(`http://localhost:3000/api/proveedores/${editarProveedor.id_proveedor}`, {
                // campos en los que realiza el cambio
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
                    //alerta
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al actualizar el Proveedor',
                        icon: 'error',
                    });
                });
        } else {
            console.error('No se pudo obtener el ID del proveedor');
        }
    };

    return (
        <div>
            {/* modal de editar proveedor */}
            <div class="modal" id="modalEditar">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="editar edi">
                            <h5 class="modal-title">Editar datos del proveedor</h5>
                            <button type="button" id="xEditar" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            {/* onSubmit={handleFormSubmit} */}
                            <form action="" id="formularioEditarProveedor" onSubmit={handleSubmit(onSubmit)} >

                                <div class="mb-3" name="divIdentificacion">
                                    <label for="identificacionEditar"
                                        class="col-form-label">Identificacion:
                                    </label>
                                    <br />

                                    <div className={styles.identi}>

                                        <select style={{ width: 80, height: 40 }} id="tipoIdentificacion" >
                                            <option value="cedula">CC</option>
                                            <option value="nit">NIT</option>
                                        </select>

                                        <input type="text" class="form-control"
                                            id={styles.identificacionEditar}
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
                                                    return validarEspaciosVacios(value); //validacion para no dejar tener espacios vacios
                                                },


                                            })}
                                        />
                                        {errors.identificador && (
                                            <AlertaError message={errors.identificador.message} /> //muestra el mensaje de validacion
                                        )}

                                    </div>
                                </div>

                                <div class="mb-3" name="divNombre">

                                    <label for="nombreEditar"
                                        class="col-form-label">Nombre:
                                    </label>

                                    <input type="text" class="form-control" id="nombreEditar"
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
                                                value: /^[A-Za-z\s]+$/,  //expreción regular para prohibir letras y caracteres 
                                                message: "No puede contener números ni caracteres especiales"
                                            }
                                        })}
                                    />
                                    {errors.nombre && (
                                        <AlertaError message={errors.nombre.message} /> //muestra el mensaje de validacion
                                    )}

                                </div>

                                <div class="mb-3" name="divTelefono">

                                    <label for="telefonoEditar"
                                        class="col-form-label">Teléfono:
                                    </label>

                                    <input type="text" class="form-control" id="telefonoEditar"
                                        name="telefono"
                                        placeholder="Ingresar teléfono"
                                        {...register('telefono', {
                                            required: {
                                                value: true,
                                                message: 'El teléfono es obligatorio',
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(value);
                                            },
                                            pattern: {
                                                value: /^\d+$/,
                                                message: "No puede contener Letras ni espacios en blanco"
                                            }

                                        })}
                                    />
                                    {errors.telefono && (
                                        <AlertaError message={errors.telefono.message} /> //muestra el mensaje de validacion
                                    )}

                                </div>

                                <div class="mb-3" name="divDireccion">

                                    <label for="direccionEditar"
                                        class="col-form-label">Dirección:
                                    </label>

                                    <input type="text" class="form-control" id="direccionEditar"
                                        name="direccion"
                                        placeholder="Ingresar dirección"
                                        {...register('direccion', {
                                            required: 'La Dirección es obligatorio',
                                        })}
                                    />
                                    {errors.direccion && (
                                        <AlertaError message={errors.direccion.message} /> //muestra el mensaje de validacion
                                    )}

                                </div>

                                <div class="modal-footer">

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
        </div>

    )
}

export default EditarProveedor
