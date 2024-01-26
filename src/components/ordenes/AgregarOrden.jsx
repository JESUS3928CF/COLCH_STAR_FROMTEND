



import '../../css-general/cssgeneral.css'
import '../../css-general/inicio_style.css'
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarEspaciosVacios } from '../../Validations/validations'
import { validarFecha } from '../../Validations/validations';
import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import useOrden from '../../hooks/useOrden.jsx'
import { AgregarDetallesOrden } from './AgregarDetallesOrden.jsx';
import BotonVerde from '../chared/BotonVerde';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import useClientes from '../../hooks/useCliente.jsx'
import Swal from 'sweetalert2';





//COMPONENTE
const AgregarOrden = () => {


    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); }

    const {
        register, //regitra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envio del formulario
        formState: { errors }, //ver errores que tiene el formulario
        setValue,
        trigger,
        reset, //resetea el formulario
    } = useForm({
        mode: "onChange",
    });


    //estado de las prendas para resivir la informacion que lleg de la base de datos
    const { clientes } = useClientes()

    // función que llega del provider que tiene todas las rutas
    const { agregarOrden,detallesOrden } = useOrden();


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

            <BotonVerde text={'Agregar Orden'} onClick={handleShow} />
            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();

                }}
                className='modal d-flex align-items-center justify-content-center '
            >
                <div className='modal-content'>
                    <HeaderModals
                        title={'Agregar orden'}
                        handleClose={() => {
                            reset();
                            handleClose();

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
                                                Seleccionar Cliente
                                            </option>

                                            {clientes
                                                .filter(cliente => cliente.estado)
                                                .map((cliente) => {
                                                    return (
                                                        <option
                                                            key={cliente.id_cliente}
                                                            value={cliente.id_cliente}
                                                        >
                                                            {cliente.nombre}
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
                                            htmlFor='totalCompraAgregar'
                                            className='col-form-label'
                                        >
                                            Fecha de Entrega: *
                                        </label>
                                        <input
                                            type='date'
                                            className='form-control'
                                            id='totalCompraAgregar'
                                            {...register('fecha_entrega', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'La fecha es obligatorio',
                                                },
                                            })}
                                        />

                                        {errors.fecha_entrega && (
                                            <AlertaError
                                                message={errors.fecha_entrega.message}
                                            />
                                        )}
                                    </div>
                                </div>

                            </form>
                            <AgregarDetallesOrden />

                            <div className='modal-footer'>
                                <CancelarModal
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








        </div>
    )
}

export default AgregarOrden
