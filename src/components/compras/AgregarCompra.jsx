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
import useCompras from '../../hooks/useCompras';
import { Modal } from 'react-bootstrap';
import BotonVerde from '../chared/BotonVerde';
import { AgregarDetallesCompra } from './AgregarDetallesCompra';
import Swal from 'sweetalert2';

const AgregarCompras = () => {
    const {
        agregarCompra,
        detallesCompra,
        setDetallesCompra,
        totalCompra,
        setTotalCompra,
    } = useCompras();

    const { proveedores } = useProveedor();
    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setTotalCompra(0);
        setDetallesCompra([]);
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

        if (detallesCompra.length === 0) {
            Swal.fire({
                title: 'Espera!!',
                text: 'Agrega los detalles de esta compra',
                icon: 'warning',
            });
        } else {
            console.log(detallesCompra);
            agregarCompra(data, reset, handleClose);
        }
    };

    return (
        <div>
            {/* modal agregar venta */}
            <BotonVerde text={'Agregar Compra'} onClick={handleShow} />
            <Modal
                show={show}
                onHide={() => {
                    setTotalCompra(0);
                    setDetallesCompra([]);
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
                            <form action='' id='formularioagregarCompra'>
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
                                    <p>Precio total = {totalCompra}</p>
                                </div>
                            </form>
                            <AgregarDetallesCompra />
                            <div className='modal-footer'>
                                <CancelarModal handleClose={handleClose} />
                                <GuardarModal
                                    onSubmit={handleSubmit(onSubmit)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AgregarCompras;
