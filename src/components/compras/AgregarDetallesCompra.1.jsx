import { useForm } from 'react-hook-form';
import usePrendas from '../../hooks/usePrendas';
import AlertaError from '../chared/AlertaError';
import BotonNegro from '../chared/BotonNegro';
import GuardarModal from '../chared/GuardarModal';

export const AgregarDetallesCompra = () => {
    const { Prendas } = usePrendas();

    const {
        register, //Registra o identifica cada elemento o cada input
        handleSubmit, //Para manejar el envió del formulario
        formState: { errors }, //Ver errores que tiene el formulario
        setValue,
        trigger,
        reset, //Resetea el formulario
    } = useForm({
        mode: 'onChange',
    });

    return (
        <div action='' className='formDetallesCompras'>
            <form
                action=''
                className='row g-3 needs-validation'
                onSubmit={handleSubmit()}
            >
                <label htmlFor=' '>Agregale los detalles de compras</label>

                <div className='col-md-5 '>
                    <label htmlFor='rol' className='col-form-label'>
                        Productos: *
                    </label>

                    <select
                        name='fk_prenda'
                        className='form-control'
                        {...register('fk_prenda', {})}
                    >
                        <option value=''>Diseños</option>
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
                        <AlertaError message={errors.fk_prenda.message} />
                    )}
                </div>

                <div className='col-md-4'>
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
                                value: /^\d+$/,
                                message:
                                    'No se peremiten letras ni caracteres especiales',
                            },
                        })}
                        onChange={(e) => {
                            setValue('cantidad', e.target.value),
                                trigger('cantidad');
                        }}
                    />

                    {errors.cantidad && (
                        <AlertaError message={errors.cantidad.message} />
                    )}
                </div>

                <div className='col-md-4'>
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
                                value: /^\d+$/,
                                message:
                                    'No se permiten letras ni caracteres espaciales',
                            },
                        })}
                        onChange={(e) => {
                            setValue('precio', e.target.value),
                                trigger('precio');
                        }}
                    />
                    {errors.precio && (
                        <AlertaError message={errors.precio.message} />
                    )}
                </div>

                <div className='botonGuardarDetalles'>
                    <BotonNegro text={'Agregar Detalles'} />
                    <GuardarModal />
                </div>
            </form>
        </div>
    );
};
