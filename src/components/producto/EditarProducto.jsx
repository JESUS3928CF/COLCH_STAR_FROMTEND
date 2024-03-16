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
import EditarDisenoModal from './EditarDisenoModal'
import { Modal } from 'react-bootstrap';
import useProducto from '../../hooks/useProducto.jsx';
import useAuth from '../../hooks/useAuth';
import { useDisenosContext } from '../../context/DisenosProvider';



//componente
const EditarProducto = ({ editarProducto, handleClose, show, handleClosee, handleShoww, showw, handleClosex }) => {

    //traigo la funciona para eidtar un producto
    const { editarProductos} = useProducto();

   

    //estado pa las prendas 
    const [Prendas, setPrendas] = useState([]);


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
            // setValue('cantidad', editarProducto.cantidad);
            setValue('precio', editarProducto.precio);
            setValue('publicado', editarProducto.publicado);
            setValue("fk_prenda", editarProducto.fk_prenda);
            setValue('imagen', []);

        }
    }, [editarProducto, show]);


    


    //funcion que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = (data) => {

        editarProductos(
            data,
            editarProducto,
            handleClose,
            // reset,
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
                    // setSelectedDisenoNombre([]);
                }}
                className='modal d-flex align-items-center justify-content-center'
                id='modalEditar'
            >
                <div className={`modal-content`}>
                    <HeaderModals
                        title={'Editar producto'}
                        handleClose={() => {
                            reset();
                            handleClose();
                            // setSelectedDisenoNombre([]);
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
                                    {/* esto se guarda en name = fk_prenda */}
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
                                    title='Seleccione una opcion'
                                    {...register('publicado', {
                                        validate: (value) =>
                                            validarBooleanos(value),
                                    })}
                                >
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
                                    Imagen del producto final: *
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
                                        text='Editar diseño'
                                        onClick={() => {
                                           
                                            handleShoww();
                                        }}
                                    />
                                </div>

                                <CancelarModal
                                    reset={reset}
                                    handleClose={handleClose}
                                    // setSelectedDisenoNombre={
                                    //     setSelectedDisenoNombre
                                    // }
                                />

                                <GuardarModal
                                    onSubmit={handleSubmit(onSubmit)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            <EditarDisenoModal
                // funcion para cerrar, abrir modal de EditarDiseñosModal
                editarProducto={editarProducto}
                handleClosee={handleClosee}
                handleShoww={handleShoww}
                showw={showw}
                handleClosex={handleClosex}
            />
        </div>
    );
}

export default EditarProducto
