// ------------------BRIAN PAREJA HERNANDEZ
//-------------------26 de septiembre 2023
//Nos permitira Agregar un producto, de ser necesario se podra agregar un producto mediante un formulario donde se pediran datos mas
//mas relevantes de este producto y luego mostrarlo en la tabla listar, se podra agregar mediante un boton dferentes disños 


import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import { useState, useEffect } from "react";
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import style from '../../pages/Productos.module.css'
import axios from 'axios'
import AlertaError from '../chared/AlertaError';
import { useForm } from 'react-hook-form';
import { validarEspaciosVacios, validarImagen } from '../../Validations/validations'
import BotonNegro from '../chared/BotonNegro';
import AgregarDisenoModal from './AgregarDisenoModal';
import { useDisenosContext } from '../../context/disenosProvider';
import { Modal } from 'react-bootstrap';
import BotonVerde from '../chared/BotonVerde';
import useProducto from '../../hooks/useProducto.jsx';
import useAuth from '../../hooks/useAuth';



const AgregarProducto = () => {

    const { agregarProducto } = useProducto();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { disenos } = useDisenosContext();

    
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

    //estado pa las prendas 
    const [Prendas, setPrendas] = useState([]);
    const { config } = useAuth();
    // traemos la informacion de las prendas y las guardamos en setPrendas y eso las manda a PrendAS
    useEffect(() => {
        // Realizar una solicitud para obtener la lista de roles desde el servidor
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/prendas`, config)
            .then((response) => {
                setPrendas(response.data); // Almacenar la lista de roles en el estado
            });
    }, []);





    //Función que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = async (data) => {

        const { nombre, cantidad, fk_prenda, imagen, publicado } = data

        agregarProducto(
            {
                // Campos en los que realiza el cambio
                nombre: nombre.trim(),
                cantidad: cantidad.trim(),
                // precio: precio.trim(),
                fk_prenda: fk_prenda.trim(),
                publicado: publicado,
                imagen: imagen[0],
                disenos: JSON.stringify(disenos)
            },
            reset,
            handleClose
        )
    }

    return (
        <div>
            {/* modal agregar producto */}
            <BotonVerde text={'Agregar Producto'} onClick={handleShow} />

            <Modal
                show={show}
                onHide={handleClose}
                className="modal d-flex align-items-center justify-content-center "
                
                id='myModal'
            >

                <div  className={`modal-content ${style.taa}`} > 
                    <HeaderModals title={'Agregar Producto'} />

                    <div className='modal-body'>
                        <form
                            className="row g-3 needs-validation"
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
                                            message:
                                                'El nombre es obligatorio',
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(
                                                value
                                            );
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
                                            return validarEspaciosVacios(
                                                value
                                            );
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue(
                                            'cantidad',
                                            e.target.value
                                        );
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

                            <div className='col-md-6' name='Archivo'>
                                <label
                                    htmlFor='Archivo'
                                    className='col-from-label'
                                >
                                    Producto Final: *
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
                                <div className={style.bottonDiseno}>
                                    <BotonNegro
                                        // modalClouse= "myModal"
                                        text='Agregar Diseño'
                                        modalToOpen='#myModalDiseno'
                                        onClick={handleClose}
                                    />
                                </div>
                                <CancelarModal
                                    // modalToCancel='myModal'
                                    reset={reset}
                                    handleClose={handleClose}
                                />
                                <GuardarModal />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            <AgregarDisenoModal handleShow={handleShow} />
        </div>
    );
}

export default AgregarProducto