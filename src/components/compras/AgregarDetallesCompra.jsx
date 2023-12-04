import { useForm } from 'react-hook-form';
import usePrendas from '../../hooks/usePrendas';
import AlertaError from '../chared/AlertaError';
import BotonNegro from '../chared/BotonNegro';
import GuardarModal from '../chared/GuardarModal';
import useCompras from '../../hooks/useCompras';
import { ModalVerDetallesCompra } from './ModalVerDetallesCompra';

export const AgregarDetallesCompra = () => {
    const { Prendas } = usePrendas();

    const {setDetallesCompra, detallesCompra} = useCompras();

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
        console.log(data)
        if(data.fk_prenda == "d"){
            data.fk_prenda = ""
        }
        setDetallesCompra([...detallesCompra, data]);
        reset();
    };

    return (
        <>
            <form
                action=''
                className=''
                onSubmit={handleSubmit(guardarDetalle)}
            >
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
                    >
                        <option value=''>
                            Seleccione el producto comprado
                        </option>
                        <option value='d'>Impresión de estampados</option>
                        {Prendas.filter((prenda) => prenda.estado).map(
                            (prenda) => {
                                return (
                                    <option
                                        key={prenda.id_prenda}
                                        value={prenda.id_prenda}
                                    >
                                        {prenda.nombre}
                                    </option>
                                );
                            }
                        )}
                    </select>

                    {errors.fk_prenda && (
                        <AlertaError message={errors.fk_prenda.message} />
                    )}
                </div>

                <div className='row'>
                    <div className='col-md-6'>
                        <label
                            htmlFor='nombreCompraAgregar'
                            className='col-form-label'
                        >
                            Cantidad
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
                                pattern: {
                                    value:
                                        watch('fk_prenda') === 'd'
                                            ? /^\d+(\.\d{1,2})?$/
                                            : /^\d+$/,
                                    message:
                                        'No se permiten letras ni caracteres especiales',
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
                            Precio unitario
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
                                pattern: {
                                    value: /^\d+(\.\d{1,2})?$/,
                                    message:
                                        'No se permiten letras ni caracteres espaciales',
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
                            text={'Ver Detalles'}
                            modalToOpen={'#modalDetalleAgregarCompra'}
                        />
                    </div>

                    <div className='col-md-6 pr-1'>
                        <GuardarModal text='Agregar Detalle' />
                    </div>
                </div>
            </form>

            <ModalVerDetallesCompra />
        </>
    );
};
