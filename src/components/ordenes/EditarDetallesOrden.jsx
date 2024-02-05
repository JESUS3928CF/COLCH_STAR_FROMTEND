import { useForm } from 'react-hook-form';
import AlertaError from '../chared/AlertaError';
import GuardarModal from '../chared/GuardarModal';
import useProducto from '../../hooks/useProducto';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

export const EditarDetallesOrden = ({ detallesOrden }) => {
    const { productos } = useProducto();

    const [detallesOrdenEditar, setDetallesOrdenEditar] = useState([]);

    useEffect(() => {
        setDetallesOrdenEditar(detallesOrden);
        console.log(detallesOrden);
    }, [detallesOrden]);

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
        setDetallesOrdenEditar([...detallesOrdenEditar, data]);

        reset();
    };

    return (
        <form action='' className='' onSubmit={handleSubmit(guardarDetalle)}>
            <p
                className='text-center'
                style={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                    fontWeight: 700,
                    marginTop: 10,
                }}
            >
                {' '}
                Editar el Producto a la Ordenes{' '}
            </p>

            <Carousel>
                {detallesOrdenEditar.map((detalle) => (
                    <Carousel.Item key={detalle.id_detalle_orden}>
                        <div className='col-md-12 '>
                            <label htmlFor='rol' className='col-form-label'>
                                Producto: * {detalle.talla}
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
                                <option value=''>
                                    Seleccione el producto a comprar
                                </option>

                                {productos
                                    .filter((producto) => producto.estado)
                                    .map((producto) => {
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
                                <AlertaError
                                    message={errors.fk_producto.message}
                                />
                            )}
                        </div>

                        <div className='row'>
                            <div className='col-md-6'>
                                <label
                                    htmlFor='nombreCompraAgregar'
                                    className='col-form-label'
                                >
                                    Talla: * {detalle.talla}
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
                                        },
                                    })}
                                    value={detalle.talla}
                                />

                                {errors.talla && (
                                    <AlertaError
                                        message={errors.talla.message}
                                    />
                                )}
                            </div>

                            <div className='col-md-6'>
                                <label
                                    htmlFor='nombreCompraAgregar'
                                    className='col-form-label'
                                >
                                    color: * {detalle.color}
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
                                        },
                                    })}
                                    value={detalle.color}
                                />

                                {errors.color && (
                                    <AlertaError
                                        message={errors.color.message}
                                    />
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
                                            message:
                                                'La cantidad es obligatoria',
                                        },
                                    })}
                                    value={detalle.cantidad}
                                />

                                {errors.cantidad && (
                                    <AlertaError
                                        message={errors.cantidad.message}
                                    />
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
                                        },
                                    })}
                                    value={detalle.subtotal}
                                />

                                {errors.subtotal && (
                                    <AlertaError
                                        message={errors.subtotal.message}
                                    />
                                )}
                            </div>

                            <div
                                className='col-md-12 '
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <label htmlFor='rol' className='col-form-label'>
                                    Descripcion:
                                </label>

                                <textarea
                                    className='form-control custom-input-style' // Puedes cambiar 'custom-input-style' por el nombre de la clase que prefieras
                                    style={{
                                        textAlign: 'center',
                                        height: 70,
                                    }}
                                />

                                {errors.descripcion && (
                                    <AlertaError
                                        message={errors.descripcion.message}
                                    />
                                )}
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            <div className='row py-3 text-center'>
                <div className='col-md-6 pr-1'>
                    <GuardarModal text='Agregar Detalle' />
                </div>
            </div>
        </form>
    );
};