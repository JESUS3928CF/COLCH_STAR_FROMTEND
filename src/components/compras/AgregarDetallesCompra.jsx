import { useForm } from 'react-hook-form';
import usePrendas from '../../hooks/usePrendas';
import AlertaError from '../chared/AlertaError';
import BotonNegro from '../chared/BotonNegro';
import GuardarModal from '../chared/GuardarModal';
import useCompras from '../../hooks/useCompras';
import { useState } from 'react';

export const AgregarDetallesCompra = () => {
    const { Prendas } = usePrendas();

    const {
        setDetallesCompra,
        detallesCompra,
        handleShowDetalles,
        handleClose,
    } = useCompras();

    const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Estado para el producto seleccionado
    const [infoProductoSeleccionado, setInfoProductoSeleccionado] = useState(
        {}
    );

    // Función para manejar el cambio de producto seleccionado

    const handleProductoChange = (id_prenda) => {
        setValue('fk_prenda', id_prenda);

        trigger('fk_prenda');
        
        if (watch('cantidad') != "") {
            trigger('cantidad');
        }

        setProductoSeleccionado(id_prenda); // Actualizar el estado del producto seleccionado
        const productoEncontrado = Prendas.find(
            (prenda) => prenda.id_prenda == id_prenda
        );

        if (!productoEncontrado) {
            setInfoProductoSeleccionado({});
            return;
        }

        setInfoProductoSeleccionado(productoEncontrado);
    };

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
        /// Este if es para cuando se selecciona una compra de diseños
        data.id = Date.now();
        if (data.fk_prenda == 'd') {
            data.fk_prenda = '';
            data.producto = 'Impresión de estampados';
            data.Talla = [];
            data.color = [];
        } else {
            const prendaEncontrada = Prendas.find(
                (prenda) => prenda.id_prenda == data.fk_prenda
            );

            if (prendaEncontrada) {
                data.producto = prendaEncontrada.nombre;
            } else {
                console.error(
                    'No se encontró la prenda con el ID proporcionado'
                );
            }
        }
        setDetallesCompra([...detallesCompra, data]);
        reset();
    };

    return (
        <form action='' className=''>
            <p className='text-center'> Agregar los detalles de compras </p>

            <div className='col-md-12 '>
                <label htmlFor='rol' className='col-form-label'>
                    Producto: *
                </label>

                <select
                    name='fk_prenda'
                    className='form-control'
                    {...register('fk_prenda', {
                        required: {
                            value: true,
                            message: 'El producto es obligatorio',
                        },
                    })}
                    onChange={() => handleProductoChange(event.target.value)} // Manejar el cambio de prenda seleccionada
                >
                    <option value=''>Seleccione el producto comprado</option>
                    <option value='d'>Impresión de estampados</option>
                    {Prendas.filter((prenda) => prenda.estado).map((prenda) => {
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
                    <AlertaError message={errors.fk_prenda.message} />
                )}
            </div>
            {productoSeleccionado && productoSeleccionado != 'd' && (
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

                            {infoProductoSeleccionado.Talla.map((talla) => {
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

                            {infoProductoSeleccionado.color.map((color) => {
                                return (
                                    <option
                                        key={color.id_color}
                                        value={color.id_color}
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
                                if (value.includes(' ')) {
                                    return 'No se permiten espacios en blanco';
                                }

                                // Verificar si la prenda es 'd' (impresión de estampados)
                                if (watch('fk_prenda') === 'd') {
                                    // Validar solo números enteros y un punto opcional
                                    if (
                                        !/^(?!0+$)(?!0*\.0*$)\d*(\.\d+)?$/.test(
                                            value
                                        )
                                    ) {
                                        return 'La cantidad debe ser mayor que 0 y no debe terminar en punto';
                                    }
                                } else {
                                    // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                                    if (!/^\d+$/.test(value)) {
                                        return 'La cantidad solo puede contener números enteros';
                                    }
                                    if (value.startsWith('0')) {
                                        return 'La cantidad no puede iniciar con 0';
                                    }
                                    
                                }
                                return true;
                            },
                        })}
                        onChange={(e) => {
                            setValue('cantidad', e.target.value);
                            trigger('cantidad');
                        }}
                    />

                    {errors.cantidad && (
                        <AlertaError message={errors.cantidad.message} />
                    )}
                </div>

                <div className='col-md-6'>
                    <label
                        htmlFor='totalCompraAgregar'
                        className='col-form-label'
                    >
                        Precio unitario: *
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='totalCompraAgregar'
                        placeholder='. . .'
                        {...register('precio', {
                            required: {
                                value: true,
                                message: 'El precio es obligatorio',
                            },
                            validate: (value) => {
                                if (value.includes(' ')) {
                                    return 'No se permiten espacios en blanco';
                                }
                                // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                                if (!/^\d+$/.test(value)) {
                                    return 'El precio unitario solo puede tener números';
                                }
                                if (value.startsWith('0')) {
                                    return 'El precio unitario no puede iniciar con 0';
                                }
                                return true;
                            },
                        })}
                        onChange={(e) => {
                            setValue('precio', e.target.value);
                            trigger('precio');
                        }}
                    />
                    {errors.precio && (
                        <AlertaError message={errors.precio.message} />
                    )}
                </div>
            </div>

            <div className='row py-3 text-center'>
                <div className='col-md-6 pl-1 '>
                    <BotonNegro
                        text={'Ver detalles'}
                        onClick={() => {
                            handleClose();
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
