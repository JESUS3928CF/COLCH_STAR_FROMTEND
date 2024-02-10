import { useForm } from 'react-hook-form';
import AlertaError from '../chared/AlertaError';
import BotonNegro from '../chared/BotonNegro';
import GuardarModal from '../chared/GuardarModal';
import useProducto from '../../hooks/useProducto';
import useOrden from '../../hooks/useOrden';

export const AgregarDetallesOrden = () => {
    const { productos } = useProducto();

    const {
        detallesOrden,
        setDetallesOrden,
        handleShowDetalles,
        handleClose,
        handleCloseEditar,
        detailsOrden,
        editar,
    } = useOrden();

    const {
        register, //Registra o identifica cada elemento o cada input
        handleSubmit, //Para manejar el envió del formulario
        formState: { errors }, //Ver errores que tiene el formulario
        reset, //Resetea el formulario
    } = useForm({
        mode: 'onChange',
    });

    const guardarDetalle = (data) => {
        const productoEncontrado = productos.find(
            (producto) => producto.id_producto == data.fk_producto
        );

        if (productoEncontrado) {
            data.producto = {
                nombre: productoEncontrado.nombre,
                precio: productoEncontrado.precio,
            };
            data.subtotal = data.cantidad * productoEncontrado.precio
        } else {
            console.error('No se encontró la prenda con el ID proporcionado');
        }

        setDetallesOrden([...detallesOrden, data]);

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
                Agregar producto a la orden
            </p>

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

            <div className='row'>
                <div className='col-md-6'>
                    <label htmlFor='searchInput' className='col-form-label'>
                        Talla: *
                    </label>
                    <input
                        type='text'
                        name='Tallasss'
                        id='searchInput'
                        list='Tallasss'
                        className='form-control'
                        placeholder='. . .'
                        {...register('talla', {
                            required: {
                                value: true,
                                message: 'La talla es obligatoria',
                            },
                        })}
                    />

                    {errors.talla && (
                        <AlertaError message={errors.talla.message} />
                    )}

                    <datalist id='Tallasss'>
                        {Array.from(
                            new Set(
                                detailsOrden.map((details) => details.talla)
                            )
                        ).map((tipo, index) => (
                            <option key={index} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </datalist>
                </div>

                <div className='col-md-6'>
                    <label htmlFor='searchInput' className='col-form-label'>
                        Color: *
                    </label>
                    <input
                        type='text'
                        name='Colorrr'
                        id='searchInput'
                        list='Colorrr'
                        className='form-control'
                        placeholder='. . .'
                        {...register('color', {
                            required: {
                                value: true,
                                message: 'El color es obligatorio',
                            },
                        })}
                    />

                    {errors.color && (
                        <AlertaError message={errors.color.message} />
                    )}

                    <datalist id='Colorrr'>
                        {Array.from(
                            new Set(
                                detailsOrden.map((details) => details.color)
                            )
                        ).map((tipo, index) => (
                            <option key={index} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </datalist>
                </div>

                <div className='col-md-12'>
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
                            },
                        })}
                    />

                    {errors.cantidad && (
                        <AlertaError message={errors.cantidad.message} />
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
                        {...register('descripcion', {
                            required: {
                                value: true,
                                message: 'La descripción es obligatoria',
                            },
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
                        text={'Ver detalles'}
                        onClick={() => {
                            editar ? handleCloseEditar() : handleClose();
                            handleShowDetalles();
                        }}
                    />
                </div>

                <div className='col-md-6 pr-1'>
                    <GuardarModal text='Agregar detalle' />
                </div>
            </div>
        </form>
    );
};
