



import '../../css-general/cssgeneral.css'
import '../../css-general/inicio_style.css'
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarEspaciosVacios } from '../../Validations/validations'
import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import useOrden from '../../hooks/useOrden.jsx'
import { AgregarDetallesOrden } from './AgregarDetallesOrden.jsx';
import BotonVerde from '../chared/BotonVerde';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import useClientes from '../../hooks/useCliente.jsx'




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


    // Función que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = async (data) => {
        const { fecha_entrega, precio_total, estado_de_orden, fk_cliente, } = data;


        //son los datos que se le van a mandar a la base de datos, se le pasan por medio de agregarProducto() que es una función
        //que esta en el provider la cual resive como parámetros los datos, y reset, y handelclsoent, en el provider los resiven
        //y los mandan por la ruta a la base de datos
        agregarOrden(
            {
                // Campos en los que realiza el cambio
                fecha_entrega: fecha_entrega.trim(),
                precio_total: precio_total.trim(),
                estado_de_orden: estado_de_orden.trim(),
                fk_cliente: fk_cliente,

            },

            reset,
            handleClose,

        );
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
                                            Fecha de la Orden: *
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
