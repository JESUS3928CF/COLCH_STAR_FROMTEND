import '../../css-general/cssgeneral.css';
import '../../css-general/inicio_style.css';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarFechaOrden } from '../../Validations/validations';
import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import useOrden from '../../hooks/useOrden.jsx';
import { AgregarDetallesOrden } from './AgregarDetallesOrden.jsx';
import BotonVerde from '../chared/BotonVerde';
import { Modal } from 'react-bootstrap';
import useClientes from '../../hooks/useCliente.jsx';
import Swal from 'sweetalert2';
import { ModalVerDetallesOrden } from './ModalVerDetallesOrden.jsx';
import { formatMoney } from '../../helpers/Formato_de_datos.jsx';
import AgregarProducto from '../producto/AgregarProducto.jsx';

//COMPONENTE
const AgregarOrden = () => {
    /// Funcionalidad para cerra el modal
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => { setShow(true); }

    const {
        handleClose,
        handleShow,
        show,
        setEditar,
        setDetallesOrden,
        consultarOrdenes,
    } = useOrden();

    const {
        register, //regitra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envio del formulario
        formState: { errors }, //ver errores que tiene el formulario
        setValue,
        trigger,
        reset, //resetea el formulario
    } = useForm({
        mode: 'onChange',
    });

    //estado de las prendas para resivir la informacion que lleg de la base de datos
    const { clientes } = useClientes();

    // función que llega del provider que tiene todas las rutas
    const { agregarOrden, detallesOrden, totalOrden } = useOrden();

    // Función que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = async (data) => {
        if (detallesOrden.length === 0) {
            Swal.fire({
                title: 'Espera!!',
                text: 'Agrega los detalles de esta orden',
                icon: 'warning',
            });
        } else {
            agregarOrden(data, reset, handleClose);
        }
    };

    return (
        <div>
            <BotonVerde
                text={'Agregar orden'}
                onClick={() => {
                    handleShow();
                    setEditar(false);
                    setDetallesOrden([]);
                }}
            />
            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                    setDetallesOrden([]);
                    consultarOrdenes();
                }}
            >
                <div className='modal-content'>
                    <HeaderModals
                        title={'Agregar orden'}
                        handleClose={() => {
                            reset();
                            handleClose();
                            setDetallesOrden([]);
                            consultarOrdenes();
                        }}
                    />
                    <div>
                        <div className='modal-body'>
                            <form action='' onSubmit={handleSubmit(onSubmit)}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label
                                            htmlFor='rol'
                                            className='col-form-label'
                                        >
                                            Cliente: *
                                        </label>

                                        <select
                                            name='fk_cliente'
                                            className='form-control'
                                            {...register('fk_cliente', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'Debe seleccionar un cliente',
                                                },
                                            })}
                                        >
                                            <option value=''>
                                                Seleccionar cliente
                                            </option>

                                            {clientes
                                                .filter(
                                                    (cliente) => cliente.estado
                                                )
                                                .map((cliente) => {
                                                    return (
                                                        <option
                                                            key={
                                                                cliente.id_cliente
                                                            }
                                                            value={
                                                                cliente.id_cliente
                                                            }
                                                        >
                                                            {cliente.nombre} {cliente.apellido}
                                                        </option>
                                                    );
                                                })}
                                        </select>

                                        {errors.fk_cliente && (
                                            <AlertaError
                                                message={
                                                    errors.fk_cliente.message
                                                }
                                            />
                                        )}
                                    </div>

                                    <div className='col-md-6'>
                                        <label
                                            htmlFor='totalordenAgregar'
                                            className='col-form-label'
                                        >
                                            Fecha de entrega: *
                                        </label>
                                        <input
                                            type='date'
                                            className='form-control'
                                            id='totalordenAgregar'
                                            {...register('fecha_entrega', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'La fecha es obligatoria',
                                                },
                                                pattern: {
                                                    value: '^(?:d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])|(?!0000-00-00)d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])|(?!0000-00-00)d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])|(?!0000-00-00)d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])|(?!0000-00-00)d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[01]))$',
                                                    message: 'Error',
                                                },
                                                validate: (value) =>
                                                    validarFechaOrden(value),
                                            })}
                                            onChange={(e) => {
                                                setValue(
                                                    'fecha_entrega',
                                                    e.target.value
                                                );
                                                trigger('fecha_entrega');
                                            }}
                                        />
                                        {errors.fecha_entrega && (
                                            <AlertaError
                                                message={
                                                    errors.fecha_entrega.message
                                                }
                                            />
                                        )}
                                    </div>

                                    <div className='col-md-8 mt-3'>
                                        <p>
                                            {' '}
                                            Precio total:{' '}
                                            {formatMoney(totalOrden)}
                                        </p>
                                    </div>
                                </div>
                            </form>
                            <div className='col mt-3 d-flex justify-content-center align-items-center'>
                                <AgregarProducto
                                    texto='Crear nuevo producto'
                                />
                            </div>
                            <AgregarDetallesOrden />

                            <div className='modal-footer'>
                                <CancelarModal
                                    reset={reset}
                                    handleClose={() => {
                                        handleClose();
                                        consultarOrdenes();
                                    }}
                                    setDetallesOrden={setDetallesOrden}
                                />
                                <GuardarModal
                                    onSubmit={handleSubmit(onSubmit)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <ModalVerDetallesOrden />
        </div>
    );
};

export default AgregarOrden;