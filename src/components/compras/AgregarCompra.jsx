import { useForm } from 'react-hook-form';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarFecha } from '../../Validations/validations';
import HeaderModals from '../chared/HeaderModals';
import useProveedor from '../../hooks/useProveedor';
import useCompras from '../../hooks/useCompras';
import { Modal } from 'react-bootstrap';
import BotonVerde from '../chared/BotonVerde';
import { AgregarDetallesCompra } from './AgregarDetallesCompra';
import Swal from 'sweetalert2';
import { ModalVerDetallesCompra } from './ModalVerDetallesCompra';
import { formatMoney } from '../../helpers/Formato_de_datos';

const AgregarCompras = () => {
    const {
        agregarCompra,
        detallesCompra,
        setDetallesCompra,
        totalCompra,
        setTotalCompra,
        show,
        handleClose,
        handleShow,
    } = useCompras();

    const { proveedores } = useProveedor();

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
        if (detallesCompra.length === 0) {
            Swal.fire({
                title: 'Espera!!',
                text: 'Agrega los detalles de esta compra',
                icon: 'warning',
            });
        } else {
            agregarCompra(data, reset, handleClose);
        }
    };

    return (
        <div>
            {/* modal agregar venta*/}
            <BotonVerde
                text={'Agregar compra'}
                onClick={() => {
                    handleShow();

                    setTotalCompra(0);
                    setDetallesCompra([]);
                }}
            />
            <Modal
                show={show}
                onHide={() => {
                    setTotalCompra(0);
                    setDetallesCompra([]);
                    handleClose(reset);
                }}
                className='modal d-flex align-items-center justify-content-center '
            >
                <div className='modal-content'>
                    <HeaderModals
                        title={'Agregar compra'}
                        handleClose={() => {
                            reset();
                            handleClose(reset);
                        }}
                    />
                    <div>
                        <div className='modal-body'>
                            <form action=''>
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
                                                        'Debe seleccionar un proveedor',
                                                },
                                            })}
                                        >
                                            <option value=''>
                                                Seleccionar Proveedor
                                            </option>

                                            {proveedores
                                                .filter(
                                                    (proveedor) =>
                                                        proveedor.estado
                                                )
                                                .map((proveedor) => {
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
                                            Fecha de compra: *
                                        </label>
                                        <input
                                            type='date'
                                            className='form-control'
                                            id='totalCompraAgregar'
                                            {...register('fecha', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'La fecha es obligatoria',
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
                                    <p>Precio total = {formatMoney(totalCompra)}</p>
                                </div>
                            </form>
                            <AgregarDetallesCompra />
                            <div className='modal-footer'>
                                <CancelarModal
                                    modalToCancel='myModalAgregarComprar'
                                    reset={reset}
                                    handleClose={handleClose}
                                />
                                <GuardarModal
                                    onSubmit={handleSubmit(onSubmit)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <ModalVerDetallesCompra />
        </div>
    );
};

export default AgregarCompras;
