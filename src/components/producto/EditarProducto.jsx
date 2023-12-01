import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import style from '../../pages/Productos.module.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';
import { validarEspaciosVacios, validarImagen, validarBooleanos } from '../../Validations/validations'
import HeaderModals from '../chared/HeaderModals'
import BotonNegro from '../chared/BotonNegro'
import { useDisenosContext } from '../../context/disenosProvider';
import EditarDisenoModal from './EditarDisenoModal'
import { Modal } from 'react-bootstrap';
import useProducto from '../../hooks/useProducto.jsx';
import useAuth from '../../hooks/useAuth';





const EditarProducto = ({ editarProducto, handleClose, show, handleShow }) => {

    const { editarProductos } = useProducto();


    const { config } = useAuth();


    const {
        register, //regitra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envio del formulario
        formState: { errors }, //ver errores que tiene el formulario
        setValue, // Añade esta función para actualizar dinámicamente los valores
        trigger,
        reset, //Resetea el formulario
    } = useForm({
        mode: "onChange",
    });

    //estado pa las prendas 
    const [Prendas, setPrendas] = useState([]);
    // traemos la informacion de las prendas y las guardamos en setPrendas y eso las manda a PrendAS
    useEffect(() => {

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/prendas`, config)
            .then((response) => {
                setPrendas(response.data); // Almacenar la lista de roles en el estado
            });
    }, []);



    //por medio de editarproveedor se traen lo que hay en el listar, y por medio del estado setvalue
    //  le pasan todo a nombre telefono etc, y con eso se les pasa por medio del value=¨nombre telefono etc al input  
    useEffect(() => {
        if (editarProducto) {
            setValue('nombre', editarProducto.nombre);
            setValue('cantidad', editarProducto.cantidad);
            setValue('precio', editarProducto.precio);
            setValue('publicado', editarProducto.publicado);
            setValue("fk_prenda", editarProducto.fk_prenda);

        }
    }, [editarProducto, show]);





    //funcion que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = (data) => {

        editarProductos(
            data,
            editarProducto,
            handleClose
        )
    };


    return (
        <div>
            {/* modal agregar producto */}
            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                }}
                className='modal d-flex align-items-center justify-content-center'
                id='modalEditar'
            >
                <div className={`modal-content`}>
                    <HeaderModals
                        title={'Editar Producto'}
                        handleClose={() => {
                            reset();
                            handleClose();
                        }}
                    />

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
                                    Producto: *
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
                                            message: 'El nombre es obligatorio',
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(value);
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('nombre', e.target.value);
                                        trigger('nombre');
                                    }}
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
                                    Cantidad: *
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
                                            return validarEspaciosVacios(value);
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('cantidad', e.target.value);
                                        trigger('cantidad');
                                    }}
                                />
                                {/* en esta etiqueta va salir el error de validación  */}
                                {errors.cantidad && (
                                    <AlertaError
                                        message={errors.cantidad.message}
                                    />
                                )}
                            </div>

                            <div className='col-md-6 mt-2'>
                                <label htmlFor='rol' className='col-form-label'>
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
                                    <option value=''>Seleccionar prenda</option>
                                    {/* SE REALIZA un mapeo con la informacio traida de prendas y seleccionamos que queremos de ella */}
                                    {/* esto se guarda en name = fk_prenda */}
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
                                        validate: (value) =>
                                            validarBooleanos(value),
                                    })}
                                >
                                    <option value='' disabled>
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

                            <div className='col-md-12' name='Archivo'>
                                <label
                                    htmlFor='Archivo'
                                    className='col-from-label'
                                >
                                    Imagen de la Producto Final: *
                                </label>

                                <input
                                    type='file'
                                    className={`form-control`}
                                    name='imagen'
                                    title='Ingrese la imagen de la prenda'
                                    {...register('imagen', {
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

                            <div className='modal-footer '>
                                <div className='pr-5'>
                                    <BotonNegro
                                        text='Agregar Diseño'
                                        modalToOpen='#myModalDisenoE'
                                        onClick={handleClose}
                                    />
                                </div>

                                <CancelarModal
                                    reset={reset}
                                    handleClose={handleClose}
                                />

                                <GuardarModal />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            <EditarDisenoModal
                handleClose={handleClose}
                handleShow={handleShow}
            />
        </div>
    );
}

export default EditarProducto
