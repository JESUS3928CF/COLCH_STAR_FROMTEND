// ------------------BRIAN PAREJA HERNANDEZ
//-------------------26 de septiembre 2023
//Nos permitirá Agregar un producto, de ser necesario se podrá agregar un producto mediante un formulario donde se pedirán datos más
//mas relevantes de este producto y luego mostrarlo en la tabla listar, se podra agregar mediante un boton dferentes disños

import '../../css-general/cssgeneral.css';
import '../../css-general/tailwind.min.css';
import '../../css-general/inicio_style.css';
import '../../css-general/table.min.css';
import { useState } from 'react';
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
import { useDisenosContext } from '../../context/DisenosProvider.jsx';
import { Modal } from 'react-bootstrap';
import BotonVerde from '../chared/BotonVerde';
import useProducto from '../../hooks/useProducto.jsx';
import usePrendas from '../../hooks/usePrendas.jsx';

//Componenteee
const AgregarProducto = ({
    texto = 'Agregar producto'
}) => {
    //llamamos esto para vaciar los disenos seleeccionado
    const { setSelectedDisenoNombre } = useProducto();

    // función que llega del provider que tiene todas las rutas
    const { agregarProducto } = useProducto();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    // funcion para cerrar modal de AgregarDiseñosModal
    const [showw, setShoww] = useState(false);

    //funciones de cerrar modal de agregar producto
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    //funcione de cerrsr y abir el de agregar diseños
    const handleClosee = () => {
        setShoww(false), handleShow();
    };
    const handleShoww = () => {
        setShoww(true), handleClose();
    };
    const handleClosex = () => {
        setShoww(false);
    };

    const handleOpenModal = () => {
        setShow(true);
    };

    //nos traemos los diseños que hemos seleccionado en AgregarDiseñoModal,
    // nos traemos setDisenos para vaciar los disenos que se seleccionaron al agregar un nuevoproducto
    // disenos los guardamos
    const { disenos, setDisenos } = useDisenosContext();

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

    //estado de las prendas para resivir la informacion que lleg de la base de datos,
    const { Prendas } = usePrendas();

    //Función que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = async (data) => {
        // cantidad,
        const { nombre, fk_prenda, imagen, publicado } = data;

        //son los datos que se le van a mandar a la base de datos, se le pasan por medio de agregarProducto() que es una función
        //que esta en el provider la cual resive como parámetros los datos, y reset, y handelclsoent, en el provider los resiven
        //y los mandan por la ruta a la base de datos
        agregarProducto(
            {
                // Campos en los que realiza el cambio
                nombre: nombre.trim(),
                // cantidad: cantidad.trim(),
                // precio: precio.trim(),
                fk_prenda: fk_prenda.trim(),
                publicado: publicado,
                imagen: imagen[0],
                disenos: JSON.stringify(disenos),
            },

            reset,
            handleClose
        );
    };
    return (
        <div>
            {/* modal agregar producto */}
            <BotonVerde
                text={texto}
                onClick={() => {
                    handleShow();
                    setSelectedDisenoNombre([]); //se vacia la parte donde se muestra el diseño seleccionado
                    setDisenos([]); // se vacia los diseños guardados en el producto
                }}
            />

            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                    // setSelectedDisenoNombre([])
                }}
                className='modal d-flex align-items-center justify-content-center '
                id='myModal'
            >
                <div className={`modal-content `}>
                    <HeaderModals
                        title={'Agregar producto'}
                        handleClose={() => {
                            reset();
                            handleClose();
                            // setSelectedDisenoNombre([])
                        }}
                    />
                    {/* <p style={{ fontSize: 14}}>Recuerde tener la cantidad de unidades en stock necesarias</p> */}

                    <div className='modal-body'>
                        <form className='row g-3 needs-validation'>
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
                                            if (
                                                value.trim().length < 3 ||
                                                value.length > 20
                                            ) {
                                                return 'El nombre debe tener entre 3 y 20 caracteres';
                                            }
                                            if (/^\d/.test(value)) {
                                                return 'El nombre no puede empezar con números';
                                            }

                                            if (
                                                !/^[a-zA-Z0-9áéíóúñÑÁÉÍÓÚ\s]+$/.test(
                                                    value
                                                )
                                            ) {
                                                return 'El nombre solo puede tener números y letras';
                                            }
                                            if (value.includes(' ')) {
                                                return validarEspaciosVacios(
                                                    value
                                                );
                                            }
                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(
                                            0,
                                            21
                                        ); // Limitar la longitud máxima
                                        setValue('nombre', inputValue);
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
                                    {Prendas.filter(
                                        (prenda) => prenda.estado
                                    ).map((prenda) => {
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
                                    ¿Deseas publicarlo?: *
                                </label>

                                <select
                                    name='publicado'
                                    className={`form-control ${style.customerr}`}
                                    title='Seleccione una opción'
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
                                    Producto final: *
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
                                <div className='pr-5'>
                                    <BotonNegro
                                        // modalClouse= "myModal"
                                        text='Agregar diseño'
                                        onClick={handleShoww}
                                    />
                                </div>
                                <CancelarModal
                                    reset={reset}
                                    handleClose={handleClose}
                                    // setSelectedDisenoNombre={setSelectedDisenoNombre}
                                />
                                <GuardarModal
                                    onSubmit={handleSubmit(onSubmit)}
                                />
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
