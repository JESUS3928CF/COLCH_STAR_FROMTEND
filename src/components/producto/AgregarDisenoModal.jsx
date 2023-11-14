import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AlertaError from '../chared/AlertaError';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import { useDisenosContext } from '../../../context/disenosProvider';

const AgregarDisenoModal = () => {
    const {
        register, //registra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envió del formulario
        formState: { errors },
    } = useForm();

    const { agregarDiseno } = useDisenosContext();

    const agregarNuevoDiseno = (data) => {
        
        agregarDiseno(data)
    };

    //estado pa los diseños
    const [detalle_diseno, setDetalle_diseno] = useState([]);

    useEffect(() => {
        // Realizar una solicitud para obtener la lista de roles desde el servidor
        axios.get('http://localhost:3000/api/disenos').then((response) => {
            setDetalle_diseno(response.data); // Almacenar la lista de roles en el estado
        });
    }, []);

    const [Precio, setPrecio] = useState([]);
    // traemos la informacion de las prendas y las guardamos en setPrendas y eso las manda a PrendAS
    useEffect(() => {
        // Realizar una solicitud para obtener la lista de roles desde el servidor
        axios
            .get('http://localhost:3000/api/precio_disenos')
            .then((response) => {
                setPrecio(response.data); // Almacenar la lista de roles en el estado
            });
    }, []);

    return (
        <div className='modal' id='myModalDiseno'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    {/* Cabecero del modal */}
                    <HeaderModals title='Modificar precio del los diseños' />

                    <div className='modal-body'>
                        {/* formulario para agregar un cliente  */}
                        <form
                            action=''
                            id='formularioModificar'
                            onSubmit={handleSubmit(agregarNuevoDiseno)}
                        >
                            <div className='col-md-6 mt-2'>
                                <label htmlFor='rol' className='col-form-label'>
                                    diseno: *
                                </label>
                                <select
                                    className='form-control' // Allow multiple selections
                                    {...register('id_diseno', {
                                        required: {
                                            value: true,
                                            message:
                                                'Debe seleccionar al menos un diseño',
                                        },
                                    })}
                                >
                                    <option value='' disabled>
                                        Seleccionar diseño
                                    </option>
                                    {detalle_diseno.map((diseno) => (
                                        <option
                                            key={diseno.id_diseno}
                                            value={diseno.id_diseno}
                                        >
                                            {diseno.nombre}
                                        </option>
                                    ))}
                                </select>

                                {errors.diseno && (
                                    <AlertaError
                                        message={errors.diseno.message}
                                    />
                                )}
                            </div>

                            <div className='col-md-6 mt-2'>
                                <label htmlFor='rol' className='col-form-label'>
                                    diseno: *
                                </label>
                                <select
                                    className='form-control' // Allow multiple selections
                                    {...register('id_precio_diseno', {
                                        required: {
                                            value: true,
                                            message:
                                                'Debe seleccionar al menos un tamaño',
                                        },
                                    })}
                                >
                                    <option value='' disabled>
                                        Seleccionar tamaño
                                    </option>
                                    {Precio.map((precio) => (
                                        <option
                                            key={precio.id_precio_diseno}
                                            value={precio.id_precio_diseno}
                                        >
                                            {precio.tamano}
                                        </option>
                                    ))}
                                </select>

                                {errors.diseno && (
                                    <AlertaError
                                        message={errors.diseno.message}
                                    />
                                )}
                            </div>

                            <div className='modal-footer'>
                                {/* Botón para cancelar*/}
                                <CancelarModal NoReset= {true} />

                                {/* Botón para guardar*/}
                                <GuardarModal />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarDisenoModal;
