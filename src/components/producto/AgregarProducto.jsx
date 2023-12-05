// ------------------BRIAN PAREJA HERNANDEZ
//-------------------26 de septiembre 2023
//Nos permitira Agregar un producto, de ser necesario se podra agregar un producto mediante un formulario donde se pediran datos mas
//mas relevantes de este producto y luego mostrarlo en la tabla listar, se podra agregar mediante un boton dferentes disños

import '../../css-general/cssgeneral.css';
import '../../css-general/tailwind.min.css';
import '../../css-general/inicio_style.css';
import '../../css-general/table.min.css';
import { useState, useEffect } from 'react';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import style from '../../pages/Productos.module.css';
import AlertaError from '../chared/AlertaError';
import { useForm } from 'react-hook-form';
import {
    validarEspaciosVacios,
    validarImagen,
} from '../../Validations/validations';
import BotonNegro from '../chared/BotonNegro';
import AgregarDisenoModal from './AgregarDisenoModal';
import { useDisenosContext } from '../../context/disenosProvider';
import { Modal } from 'react-bootstrap';
import BotonVerde from '../chared/BotonVerde';
import useProducto from '../../hooks/useProducto.jsx';
import usePrendas from '../../hooks/usePrendas.jsx';


//Componente
const AgregarProducto = () => {

    const { setSelectedDisenoNombre } = useProducto();




    // función que llega del provider que tiene todas las rutas
    const { agregarProducto } = useProducto();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false) };
    const handleShow = () => setShow(true);

    // funcion para cerrar modal de AgregarDiseñosModal
    const [showw, setShoww] = useState(false);

    const handleClosee = () => {
        setShoww(false), handleShow();
    };
    const handleShoww = () => {
        setShoww(true), handleClose();
    };
    const handleClosex = () => {
        setShoww(false);
    };

    //nos traemos los diseños que hemos seleccionado en AgregarDiseñoModal
    const { disenos } = useDisenosContext();

    const {
        register, //regitra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envio del formulario
        formState: { errors }, //ver errores que tiene el formulario
        setValue,
        trigger,
        reset, //resetea el formulario
    } = useForm({
        mode: 'onChange',
    });

    //estado de las prendas para resivir la informacion que lleg de la base de datos
    const { Prendas } = usePrendas()


    //Función que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = async (data) => {
        const { nombre, cantidad, fk_prenda, imagen, publicado } = data;


        //son los datos que se le van a mandar a la base de datos, se le pasan por medio de agregarProducto() que es una funcion
        //que esta en el provider la cual resive como parametros los datos, y reset, y handelclsoent, en el provider los resiven
        //y los mandan por la ruta a la base de datos
        agregarProducto(
            {
                // Campos en los que realiza el cambio
                nombre: nombre.trim(),
                cantidad: cantidad.trim(),
                // precio: precio.trim(),
                fk_prenda: fk_prenda.trim(),
                publicado: publicado,
                imagen: imagen[0],
                disenos: JSON.stringify(disenos),
            },

            reset,
            handleClose,

        );
    };
    return (
        <div>
            {/* modal agregar producto */}
            <BotonVerde text={'Agregar Producto'} onClick={handleShow} />

            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                }}
                className='modal d-flex align-items-center justify-content-center '
                id='myModal'
            >
                <div className={`modal-content `}>
                    <HeaderModals
                        title={'Agregar Producto'}
                        handleClose={() => {
                            reset();
                            handleClose();
                            setSelectedDisenoNombre([])
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

                            <div className='col-md-12' name='Archivo'>
                                <label
                                    htmlFor='Archivo'
                                    className='col-from-label'
                                >
                                    Producto Final: *
                                </label>

                                <input
                                    type='file'
                                    className={`form-control `}
                                    name='imagen'
                                    title='Ingrese la imagen de la prenda'
                                    {...register('imagen', {
                                        required: {
                                            value: true,
                                            message: 'La imagen es obligatoria',
                                        },

                                        validate: (value) => {
                                            validarImagen(value[0]);
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
                                <div className='pr-5'>
                                    <BotonNegro
                                        // modalClouse= "myModal"
                                        text='Agregar Diseño'
                                        modalToOpen='#myModalDiseno'
                                        onClick={handleShoww}
                                    />
                                </div>
                                <CancelarModal
                                    reset={reset}
                                    handleClose={handleClose}
                                    setSelectedDisenoNombre={setSelectedDisenoNombre}
                                />
                                <GuardarModal />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            <AgregarDisenoModal
                // le pasamos las funciones a AgregarDiseñoModal
                handleClosee={handleClosee}
                handleShoww={handleShoww}
                showw={showw}
                handleClosex={handleClosex}
            />
        </div>
    );
};

export default AgregarProducto;