import { useForm } from 'react-hook-form';
import AlertaError from '../chared/AlertaError';
import BotonNegro from '../chared/BotonNegro';
import GuardarModal from '../chared/GuardarModal';
import useProducto from '../../hooks/useProducto';
import useOrden from '../../hooks/useOrden';
import { number } from 'prop-types';



export const AgregarDetallesOrden = () => {
    const { productos } = useProducto();


    const {
        detallesOrden,
        setDetallesOrden,
        handleShowDetalles,
        handleClose
        
    } = useOrden();



    const {
        register, //Registra o identifica cada elemento o cada input
        handleSubmit, //Para manejar el envió del formulario
        formState: { errors }, //Ver errores que tiene el formulario
        setValue,
        trigger,
        reset, //Resetea el formulario
        watch,
    } = useForm({
        mode: 'onChange',
    });

    const guardarDetalle = (data) => {
        
        setDetallesOrden([...detallesOrden, data]);

        reset()


    };




    return ( 
        <form action='' className='' onSubmit={handleSubmit(guardarDetalle)} >
            <p className='text-center'style={{
                textAlign: 'center',
                fontStyle: 'italic',
                fontWeight:700,
                marginTop:10

            }}> Agregar el Producto a la  Ordenes </p>

            <div className='col-md-12 '>
                <label htmlFor='rol' className='col-form-label'>
                    Producto: *
                </label>

                <select
                    name='fk_producto'
                    className='form-control'
                    {...register('fk_producto', {
                        required: {
                            value: true,
                            message: 'El producto es obligatorio',
                        },
                    })}
                >
                    <option value=''>Seleccione el producto a comprar</option>

                    {productos.filter((producto) => producto.estado).map((producto) => {
                        return (
                            <option
                                key={producto.id_producto}
                                value={producto.id_producto}
                            >
                                {producto.nombre}
                            </option>
                        );
                    })}
                </select>

                {errors.fk_producto && (
                    <AlertaError message={errors.fk_producto.message} />
                )}
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <label
                        htmlFor='nombreCompraAgregar'
                        className='col-form-label'
                    >
                        Talla: *
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='nombreCompraAgregar'
                        name='nombreCompraAgregar'
                        placeholder='. . .'
                        {...register('talla', {
                            required: {
                                value: true,
                                message: 'La talla es obligatoria',
                            }

                        })}
                    />

                    {errors.talla && (
                        <AlertaError message={errors.talla.message} />
                    )}
                </div>

                <div className='col-md-6'>
                    <label
                        htmlFor='nombreCompraAgregar'
                        className='col-form-label'
                    >
                        color: *
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='nombreCompraAgregar'
                        name='nombreCompraAgregar'
                        placeholder='. . .'
                        {...register('color', {
                            required: {
                                value: true,
                                message: 'El color es obligatorio',
                            }

                        })}
                    />

                    {errors.color && (
                        <AlertaError message={errors.color.message} />
                    )}
                </div>
                <div className='col-md-6'>
                    <label
                        htmlFor='nombreCompraAgregar'
                        className='col-form-label'
                    >
                        Cantidad: *
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        id='nombreCompraAgregar'
                        name='nombreCompraAgregar'
                        placeholder='. . .'
                        {...register('cantidad', {
                            required: {
                                value: true,
                                message: 'La cantidad es obligatoria',
                            }

                        })}
                    />

                    {errors.cantidad && (
                        <AlertaError message={errors.cantidad.message} />
                    )}
                </div>

                <div className='col-md-6'>
                    <label
                        htmlFor='nombreCompraAgregar'
                        className='col-form-label'
                    >
                        subtotal: *
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        id='nombreCompraAgregar'
                        name='nombreCompraAgregar'
                        placeholder='. . .'
                        {...register('subtotal', {
                            required: {
                                value: true,
                                message: 'El color es obligatorio',
                            }

                        })}
                    />

                    {errors.subtotal && (
                        <AlertaError message={errors.subtotal.message} />
                    )}
                </div>

                <div className='col-md-12 ' style={{
                            textAlign: 'center',
                        }}>
                    <label htmlFor='rol' className='col-form-label' >
                        Descripcion:
                    </label>

                    <textarea

                        className='form-control custom-input-style' // Puedes cambiar 'custom-input-style' por el nombre de la clase que prefieras
                        style={{
                            textAlign: 'center',
                            height: 70
                        }}
                        {...register('descripcion', {
                            required: {
                                value: true,
                                message: 'la descripcion es obligatoria',
                            }

                        })}
                        
                    />

                    {errors.descripcion && (
                        <AlertaError message={errors.descripcion.message} />
                    )}
                </div>
            </div>

            <div className='row py-3 text-center'>
                <div className='col-md-6 pl-1 '>
                    <BotonNegro
                        text={'Ver Detalles'}
                        onClick={() => {
                            handleClose();
                            handleShowDetalles();
                        }}
                    />
                </div>

                <div className='col-md-6 pr-1'>
                    <GuardarModal text='Agregar Detalle' />
                </div>
            </div>
        </form>
    );
};
