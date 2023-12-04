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
import useProveedor from '../../hooks/useProveedor';
import AgregarDetallesCompra from './AgregarDetallesCompra';
import useCompras from '../../hooks/useCompras';
import { Modal } from 'react-bootstrap';
import BotonVerde from '../chared/BotonVerde';
import BotonNegro from '../chared/BotonNegro';
import usePrendas from '../../hooks/usePrendas';

const AgregarCompras = () => {
    
    const { agregarCompra } = useCompras();

    const { proveedores } = useProveedor();
    
    const { Prendas } = usePrendas();
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
        console.log(data);

        agregarCompra(data, reset, handleClose);

    };

    return (
        <div>
            {/* modal agregar venta */}
            <BotonVerde text={'Agregar Compra'} onClick={handleShow} />
            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                }}
                className='modal d-flex align-items-center justify-content-center '
                id='myModalAgregarComprar'
            >
                <div className='modal-content'>
                    <HeaderModals
                        title={'Agregar Compra'}
                        handleClose={() => {
                            reset();
                            handleClose();
                        }}
                    />
                    <div>
                        <div className='modal-body'>
                            <form
                                action=''
                                id='formularioagregarCompra'
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className='row'>
                                    {' '}
                                    <div className='col-md-6'>
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

                                            {proveedores.filter(proveedor => proveedor.estado ).map((proveedor) => {
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
                                    <div className='col-md-6'>
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
                                                validate: (value) =>
                                                    validarFecha(value),
                                            })}
                                            onChange={(e) => {
                                                setValue(
                                                    'fecha',
                                                    e.target.value
                                                );
                                                trigger('fecha');
                                            }}
                                        />

                                        {errors.fecha && (
                                            <AlertaError
                                                message={errors.fecha.message}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className='col-md-4 my-3'>
                                    <p>Precio total = 15000</p>
                                </div>

                                <p className='text-center'>
                                    {' '}
                                    Agregar los detalles de compras{' '}
                                </p>

                                <div className='col-md-12 '>
                                    <label
                                        htmlFor='rol'
                                        className='col-form-label'
                                    >
                                        Producto: *
                                    </label>

                                    <select
                                        name='fk_prenda'
                                        className='form-control'
                                        {...register('fk_prenda', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El producto es obligatorio',
                                            },
                                        })}
                                    >
                                        <option value=''>
                                            Seleccione el producto comprado
                                        </option>
                                        <option value='d'>
                                            Impresión de estampados
                                        </option>
                                        {Prendas.filter( prenda => prenda.estado).map((prenda) => {
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
                                                    message:
                                                        'La cantidad es obligatoria',
                                                },
                                                pattern: {
                                                    value: /^\d+$/,
                                                    message:
                                                        'No se permiten letras ni caracteres especiales',
                                                },
                                            })}
                                            onChange={(e) => {
                                                setValue(
                                                    'cantidad',
                                                    e.target.value
                                                );
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
                                                );
                                                trigger('precio');
                                            }}
                                        />
                                        {errors.precio && (
                                            <AlertaError
                                                message={errors.precio.message}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className='row py-3 text-center'>
                                    <div className='col-md-6 pl-1 '>
                                        <BotonNegro text={'Ver Detalles'} />
                                    </div>
                                    <div className='col-md-6 pr-1'>
                                        <GuardarModal text='Agregar Detalle' />
                                    </div>
                                </div>

                                <div className='modal-footer'>
                                    <CancelarModal handleClose={handleClose} />
                                    <GuardarModal />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AgregarCompras;
