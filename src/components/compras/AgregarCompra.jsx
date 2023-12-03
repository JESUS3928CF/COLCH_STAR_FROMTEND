import '../../css-general/cssgeneral.css';
import '../../css-general/tailwind.min.css';
import '../../css-general/inicio_style.css';
import '../../css-general/table.min.css';
import './Css/style.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarFecha } from '../../Validations/validations';
import HeaderModals from '../chared/HeaderModals';
import BotonNegro from '../chared/BotonNegro';
import useProveedor from '../../hooks/useProveedor';

const AgregarCompras = () => {

    const { proveedores } = useProveedor();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

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

    const onSubmit = async (data) => {
        console.log(data)
    };

    return (
        <div>
            <div className='modal' id='myModalAgregarComprar'>
                <div className='modal-dialog modal-dialog-centered modal-lg'>
                    <div className='modal-content'>
                        <HeaderModals title={'Agregar Compra'} />
                        <div>
                            <div className='modal-body '>
                                <form
                                    action=''
                                    id='formularioagregarCompra'
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className='col-md-4'>
                                        <label
                                            htmlFor='rol'
                                            className='col-form-label'
                                        >
                                            Proveedor: *
                                        </label>

                                        <select
                                            name='fk_proveedor'
                                            className='form-control'
                                            {...register('fk_proveedor', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'Debe seleccionar una proveedor',
                                                },
                                            })}
                                        >
                                            <option value=''>
                                                Seleccionar Proveedor
                                            </option>
                                            {/* SE REALIZA un mapeo con la informacio traida de prendas y seleccionamos que queremos de ella */}
                                            esto se guarda en name =
                                            fk_proveedor
                                            {proveedores.map((proveedor) => {
                                                return (
                                                    <option
                                                        key={
                                                            proveedor.id_proveedor
                                                        }
                                                        value={
                                                            proveedor.id_proveedor
                                                        }
                                                    >
                                                        {proveedor.nombre}
                                                    </option>
                                                );
                                            })}
                                        </select>

                                        {errors.fk_proveedor && (
                                            <AlertaError
                                                message={
                                                    errors.fk_proveedor.message
                                                }
                                            />
                                        )}
                                    </div>

                                    <div className='col-md-4'>
                                        <label
                                            htmlFor='totalCompraAgregar'
                                            className='col-form-label'
                                        >
                                            Fecha
                                        </label>
                                        <input
                                            type='date'
                                            className='form-control'
                                            id='totalCompraAgregar'
                                            {...register('fecha', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'la fecha es obligatorio',
                                                },
                                                pattern: {
                                                    value: '^d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$',
                                                    message: 'Error',
                                                },
                                                validate: (value) => {
                                                    return validarFecha(value);
                                                },
                                            })}
                                            onChange={(e) => {
                                                setValue(
                                                    'fecha',
                                                    e.target.value
                                                ),
                                                    trigger('fecha');
                                            }}
                                        />

                                        {errors.fecha && (
                                            <AlertaError
                                                message={errors.fecha.message}
                                            />
                                        )}
                                    </div>

                                    <div className='col-md-4'>
                                        <label
                                            htmlFor='totalCompraAgregar'
                                            className='col-form-label'
                                        >
                                            Precio Total
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='totalCompraAgregar'
                                            readOnly
                                        />

                                        {errors.total_de_compra && (
                                            <AlertaError
                                                message={
                                                    errors.total_de_compra
                                                        .message
                                                }
                                            />
                                        )}
                                    </div>

                                    <div className='modal-footer'>
                                        <CancelarModal
                                            handleClose={handleClose}
                                        />
                                        <GuardarModal />
                                    </div>
                                </form>

                                <div action='' className='formDetallesCompras'>
                                    <form
                                        action=''
                                        className='row g-3 needs-validation'
                                        onSubmit={handleSubmit()}
                                    >
                                        <label htmlFor=' '>
                                            Agregale los detalles de compras
                                        </label>

                                        <div className='col-md-5 '>
                                            <label
                                                htmlFor='rol'
                                                className='col-form-label'
                                            >
                                                Productos: *
                                            </label>

                                            <select
                                                name='fk_prenda'
                                                className='form-control'
                                                {...register('fk_prenda', {})}
                                            >
                                                <option value=''>
                                                    Diseños
                                                </option>
                                                {/* SE REALIZA un mapeo con la informacio traida de prendas y seleccionamos que queremos de ella */}
                                                esto se guarda en name =
                                                fk_prenda
                                                {Prendas.map((prenda) => {
                                                    return (
                                                        <option
                                                            key={
                                                                prenda.id_prenda
                                                            }
                                                            value={
                                                                prenda.id_prenda
                                                            }
                                                        >
                                                            {prenda.nombre}
                                                        </option>
                                                    );
                                                })}
                                            </select>

                                            {errors.fk_prenda && (
                                                <AlertaError
                                                    message={
                                                        errors.fk_prenda.message
                                                    }
                                                />
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
                                                        message:
                                                            'La cantidad es obligatoria',
                                                    },
                                                    pattern: {
                                                        value: /^\d+$/,
                                                        message:
                                                            'No se peremiten letras ni caracteres especiales',
                                                    },
                                                })}
                                                onChange={(e) => {
                                                    setValue(
                                                        'cantidad',
                                                        e.target.value
                                                    ),
                                                        trigger('cantidad');
                                                }}
                                            />

                                            {errors.cantidad && (
                                                <AlertaError
                                                    message={
                                                        errors.cantidad.message
                                                    }
                                                />
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
                                                        message:
                                                            'El precio es obligatorio',
                                                    },
                                                    pattern: {
                                                        value: /^\d+$/,
                                                        message:
                                                            'No se permiten letras ni caracteres espaciales',
                                                    },
                                                })}
                                                onChange={(e) => {
                                                    setValue(
                                                        'precio',
                                                        e.target.value
                                                    ),
                                                        trigger('precio');
                                                }}
                                            />
                                            {errors.precio && (
                                                <AlertaError
                                                    message={
                                                        errors.precio.message
                                                    }
                                                />
                                            )}
                                        </div>

                                        <div className='botonGuardarDetalles'>
                                            <BotonNegro
                                                text={'Agregar Detalles'}
                                            />
                                            <GuardarModal />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarCompras;
