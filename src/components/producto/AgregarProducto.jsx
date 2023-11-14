import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import React, { useState, useEffect } from "react";
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import style from '../../pages/Productos.module.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import AlertaError from '../chared/AlertaError';
import { useForm } from 'react-hook-form';
import { validarEspaciosVacios, validarImagen } from '../../Validations/validations'
import BotonNegro from '../chared/BotonNegro';
import AgregarDisenoModal from './AgregarDisenoModal';
import { useDisenosContext } from '../../../context/disenosProvider';

const AgregarProducto = () => {



    const { disenos } = useDisenosContext();
    const {
        register, //regitra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envio del formulario
        formState: { errors }, //ver errores que tiene el formulario
        reset, //resetea el formulario
    } = useForm();


    //estado pa las prendas 
    const [Prendas, setPrendas] = useState([]);
    // traemos la informacion de las prendas y las guardamos en setPrendas y eso las manda a PrendAS
    useEffect(() => {
        // Realizar una solicitud para obtener la lista de roles desde el servidor
        axios.get("http://localhost:3000/api/prendas").then((response) => {
            setPrendas(response.data); // Almacenar la lista de roles en el estado
        });
    }, []);





    //Función que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = async (data) => {

        const { nombre, cantidad, precio, fk_prenda, imagen, publicado } = data

        console.log(disenos)
        try {
            // la ruta por donde voya mandar el objeto o el registro nuevo dat
            const res = await axios.post(
                'http://localhost:3000/api/productos',
                {
                    // Campos en los que realiza el cambio
                    nombre: nombre.trim(),
                    cantidad: cantidad.trim(),
                    precio: precio.trim(),
                    fk_prenda: fk_prenda.trim(),
                    publicado: publicado,
                    imagen: imagen[0],
                    disenos: JSON.stringify(disenos)
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            //luego de mandarlo ce cierra el modal

            reset() //luego de ser agregado y mandado resetea el formulario

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Producto agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => { //el hen se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
                location.reload(); //  recarga la pagina
            });

        } catch (err) {
            console.log(err)


            // En caso de otros errores, muestra una alerta genérica de error
            Swal.fire({
                title: 'Error',
                text: "Hubo un error",
                icon: 'error',

            }).then(() => {
                location.reload();
            });

        }
    }


    const [selectedDesigns, setSelectedDesigns] = useState([]);
    const [selectedDesignPrices, setSelectedDesignPrices] = useState([]);




    return (
        <div>
            {/* modal agregar producto */}
            <div className='modal' id='myModal'>
                <div className='modal-dialog modal-dialog-centered modal-lg '>
                    <div className='modal-content'>
                        <HeaderModals title={'Agregar Producto'} />

                        <div className='modal-body'>
                            <form
                                className='row g-3 needs-validation'
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className='col-md-6'>
                                    <label
                                        htmlFor='productoGuardar'
                                        className='col-form-label'
                                    >
                                        Producto:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='productoGuardar'
                                        name='nombre'
                                        placeholder='. . . '
                                        {...register('nombre', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El nombre es obligatorio',
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(
                                                    value
                                                );
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

                                <div className='col-md-6 ms-auto'>
                                    <label
                                        htmlFor='cantidadGuardar'
                                        className='col-form-label'
                                    >
                                        Cantidad:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='cantidad'
                                        id='cantidadGuardar'
                                        placeholder='. . .'
                                        {...register('cantidad', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El cantidad es obligatorio',
                                            },
                                            pattern: {
                                                value: /^\d+$/,
                                                message:
                                                    'No puede contener Letras ni espacios en blanco',
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(
                                                    value
                                                );
                                            },
                                        })}
                                    />
                                    {/* en esta etiqueta va salir el error de validación  */}
                                    {errors.cantidad && (
                                        <AlertaError
                                            message={errors.cantidad.message}
                                        />
                                    )}
                                </div>

                                <div className='col-md-6 mt-2' name='precio'>
                                    <label
                                        htmlFor='precioGuardar'
                                        className='col-form-label'
                                    >
                                        Precio:{' '}
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='precio'
                                        id='precioGuardar'
                                        placeholder='. . .'
                                        {...register('precio', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El precio es obligatorio',
                                            },
                                            pattern: {
                                                value: /^\d+(\.\d+)?$/,
                                                message:
                                                    'No puede contener Letras ni espacios en blanco',
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(
                                                    value
                                                );
                                            },
                                        })}
                                    />
                                    {errors.precio && (
                                        <AlertaError
                                            message={errors.precio.message}
                                        />
                                    )}
                                </div>

                                <div className='col-md-6 mt-2'>
                                    <label
                                        htmlFor='rol'
                                        className='col-form-label'
                                    >
                                        Prenda: *
                                    </label>
                                    <select
                                        name='fk_prenda'
                                        className='form-control'
                                        {...register('fk_prenda', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Debe seleccionar una prenda',
                                            },
                                        })}
                                    >
                                        <option value=''>
                                            Seleccionar prenda
                                        </option>
                                        {/* SE REALIZA un mapeo con la informacio traida de prendas y seleccionamos que queremos de ella */}
                                        esto se guarda en name = fk_prenda
                                        {Prendas.map((prenda) => {
                                            return (
                                                <option
                                                    key={prenda.id_prenda}
                                                    value={prenda.id_prenda}
                                                >
                                                    {prenda.nombre}
                                                </option>
                                            );
                                        })}
                                    </select>

                                    {errors.fk_prenda && (
                                        <AlertaError
                                            message={errors.fk_prenda.message}
                                        />
                                    )}
                                </div>



                                <div className='col-md-6' name='Publicado'>
                                    <label
                                        htmlFor='Publicar'
                                        className='col-form-control'
                                    >
                                        ¿Deseas publicarlo?
                                    </label>

                                    <select
                                        name='publicado'
                                        className={`form-control ${style.customerr}`}
                                        title='Seleccione una opcion'
                                        {...register('publicado', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El estado de publicación es obligatorio',
                                            },
                                        })}
                                    >
                                        <option value=''>
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

                                <div className='mb-2' name='Archivo'>
                                    <label
                                        htmlFor='Archivo'
                                        className='col-from-label'
                                    >
                                        Imagen del producto:
                                    </label>
                                    <input
                                        type='file'
                                        className={`form-control ${style.customer}`}
                                        name='imagen'
                                        title='Ingrese la imagen de la prenda'
                                        {...register('imagen', {
                                            required: {
                                                value: true,
                                                message:
                                                    'La imagen es obligatoria',
                                            },
                                            validate: (value) => {
                                                return validarImagen(value[0]);
                                            },
                                        })}
                                    />
                                    {/* en esta etiqueta va salir el error de validación  */}
                                    {errors.imagen && (
                                        <AlertaError
                                            message={errors.imagen.message}
                                        />
                                    )}
                                </div>

                                <div className='modal-footer'>
                                    <div className={style.bottonDiseno} >
                                        <BotonNegro
                                            text='Agregar Diseño'
                                            modalToOpen={'#myModalDiseno'}
                                        />
                                    </div>
                                    <CancelarModal modalToCancel='myModal' />
                                    <GuardarModal />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <AgregarDisenoModal />
        </div>
    );
}

export default AgregarProducto