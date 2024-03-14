import { useForm } from 'react-hook-form';
import AlertaError from '../chared/AlertaError';
import BotonNegro from '../chared/BotonNegro';
import GuardarModal from '../chared/GuardarModal';
import useProducto from '../../hooks/useProducto';
import useOrden from '../../hooks/useOrden';
import { useState } from 'react';

export const AgregarDetallesOrden = ({handleOpenModal}) => {
    const { productos } = useProducto();

    const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Estado para el producto seleccionado
    const [infoProductoSeleccionado, setInfoProductoSeleccionado] = useState(
        {}
    );

    // Función para manejar el cambio de producto seleccionado
    const handleProductoChange = (event) => {

         setValue('fk_producto', event.target.value);
         trigger('fk_producto');



        setProductoSeleccionado(event.target.value); // Actualizar el estado del producto seleccionado
        const productoEncontrado = productos.find(
            (producto) => producto.id_producto == event.target.value
        );
        setInfoProductoSeleccionado(productoEncontrado);
    };

    const {
        detallesOrden,
        setDetallesOrden,
        handleShowDetalles,
        handleClose,
        handleCloseEditar,
        editar,
        setPrecio
    } = useOrden();

    const {
        register, //Registra o identifica cada elemento o cada input
        handleSubmit, //Para manejar el envió del formulario
        formState: { errors }, //Ver errores que tiene el formulario
        reset, //Resetea el formulario
        setValue,
        trigger,
    } = useForm({
        mode: 'onChange',
    });

    const guardarDetalle = (data) => {
        const productoEncontrado = productos.find(
            (producto) => producto.id_producto == data.fk_producto
        );

        if (productoEncontrado) {
            const precioTotal = data.precio_total; 
            setPrecio(precioTotal); 
            data.producto = {
                nombre: productoEncontrado.nombre,
                precio: productoEncontrado.precio,
            };
            data.subtotal = data.cantidad * productoEncontrado.precio;
        } else {
            console.error('No se encontró la prenda con el ID proporcionado');
        }

        setDetallesOrden([...detallesOrden, data]);

        reset();
    };

    return (
        <form action='' className=''>
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
                Agregar producto a la orden
            </p>

            {/* <Button onClick={handleOpenModal}>Abrir Modal</Button> */}


            <div className='col-md-12'>
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
                    onChange={handleProductoChange} // Manejar el cambio de producto seleccionado
                >
                    <option value=''>Seleccione el producto a comprar</option>

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
                    <AlertaError message={errors.fk_producto.message} />
                )}
            </div>

            {productoSeleccionado && (
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor='rol' className='col-form-label'>
                            Talla: *
                        </label>

                        <select
                            name='talla'
                            className='form-control'
                            {...register('talla', {
                                required: {
                                    value: true,
                                    message: 'La talla es obligatoria',
                                },
                            })}
                        >
                            <option value=''>Seleccione la talla</option>

                            {infoProductoSeleccionado.tallas.map((talla) => {
                                return (
                                    <option key={talla} value={talla}>
                                        {talla}
                                    </option>
                                );
                            })}
                        </select>

                        {errors.talla && (
                            <AlertaError message={errors.talla.message} />
                        )}
                    </div>

                    <div className='col-md-6'>
                        <label htmlFor='rol' className='col-form-label'>
                            Color: *
                        </label>

                        <select
                            name='color'
                            className='form-control'
                            {...register('color', {
                                required: {
                                    value: true,
                                    message: 'El color es obligatorio',
                                },
                            })}
                        >
                            <option value=''>Seleccione el color</option>

                            {infoProductoSeleccionado.colores.map((color) => {
                                return (
                                    <option
                                        key={color.id_color}
                                        value={color.color}
                                    >
                                        {color.color}
                                    </option>
                                );
                            })}
                        </select>

                        {errors.color && (
                            <AlertaError message={errors.color.message} />
                        )}
                    </div>
                </div>
            )}

            <div className='row'>
                <div className='col-md-6'>
                    <label
                        htmlFor='nombreCompraAgregar'
                        className='col-form-label'
                    >
                        Cantidad: *
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='nombreCompraAgregar'
                        name='nombreCompraAgregar'
                        placeholder='. . .'
                        {...register('cantidad', {
                            required: {
                                value: true,
                                message: 'La cantidad es obligatoria',
                            },
                            validate: (value) => {
                                // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                                if (!/^\d+$/.test(value)) {
                                    return 'La cantidad solo puede tener números';
                                }
                                // Convertir el número a cadena para realizar la validación de inicio con cero
                                const valueAsString = value.toString();

                                // Verificar si el número comienza con cero
                                if (valueAsString.startsWith('0')) {
                                    return 'El cantidad no puede iniciar en 0';
                                }

                                return true;
                            },
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
                        Margen de ganacia: *
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='nombreCompraAgregar'
                        name='nombreCompraAgregar'
                        placeholder='. . .'
                        {...register('precio_total', {
                            required: {
                                value: true,
                                message: 'El margen de ganancia es obligatorio',
                            },
                            validate: (value) => {
                                // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                                if (!/^\d+$/.test(value)) {
                                    return 'El margen de ganancia solo puede tener números';
                                }
                                // Convertir el número a cadena para realizar la validación de inicio con cero
                                const valueAsString = value.toString();

                                // Verificar si el número comienza con cero
                                if (valueAsString.startsWith('0')) {
                                    return 'El margen de ganancia no puede iniciar en 0';
                                }

                                return true;
                            },
                        })}
                    />

                    {errors.precio_total && (
                        <AlertaError message={errors.precio_total.message} />
                    )}
                </div>

                <div
                    className='col-md-12 '
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <label htmlFor='rol' className='col-form-label'>
                        Descripción:
                    </label>

                    <textarea
                        className='form-control custom-input-style' // Puedes cambiar 'custom-input-style' por el nombre de la clase que prefieras
                        style={{
                            textAlign: 'center',
                            height: 70,
                        }}
                        {...register('descripcion')}
                    />

                    {errors.descripcion && (
                        <AlertaError message={errors.descripcion.message} />
                    )}
                </div>
            </div>

            <div className='row py-3 text-center'>
                <div className='col-md-6 pl-1 '>
                    <BotonNegro
                        text={'Ver detalles'}
                        onClick={() => {
                            editar ? handleCloseEditar() : handleClose();
                            handleShowDetalles();
                        }}
                    />
                </div>

                <div className='col-md-6 pr-1'>
                    <GuardarModal
                        text='Agregar detalle'
                        onSubmit={handleSubmit(guardarDetalle)}
                    />
                </div>
            </div>
        </form>
    );
};
