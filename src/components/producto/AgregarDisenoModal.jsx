import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AlertaError from '../chared/AlertaError';
import GuardarModal from '../chared/GuardarModal';
import { useDisenosContext } from '../../context/DisenosProvider';
import style from '../../pages/Productos.module.css';
import BotonNegro from '../chared/BotonNegro';
import logo from '../../imgNavbar/cruz.png';
import { Modal } from 'react-bootstrap';
import useProducto from '../../hooks/useProducto';

//Componente
const AgregarDisenoModal = ({ handleClosee, showw }) => {

    
        const {
            register, //registra o identifica cada elemento o cada input
            handleSubmit, //para manejar el envió del formulario
            formState: { errors },
            reset,
        } = useForm();

        //funciones y  propiedades que nos traemos de Diseño contex
        const { agregarDiseno, eliminarDiseno, disenosDB } = useDisenosContext();

        // estados para mostrar los disenos seleccionados
        const { selectedDisenoNombre, setSelectedDisenoNombre } = useProducto();



        //funcion que se ejecuta aal dalr click en el diseno seleccionado se elimine
        const eliminarDiseno01 = (index) => {
            // Crea una copia del array original
            const nuevosDisenos = [...selectedDisenoNombre];
            // Elimina el elemento en el índice especificado
            nuevosDisenos.splice(index, 1);
            // Actualiza el estado con la nueva array sin el elemento eliminado
            setSelectedDisenoNombre(nuevosDisenos);

            eliminarDiseno(index);
        };


        //funcion que se ejecuta aal dalr click en el diseno seleciconado para mostrar
        const agregarNuevoDiseno = (data) => {


            //para mostrar los diseños al
            const nuevoDiseno = disenosDB.find(
                (diseno) => diseno.id_diseno == data.id_diseno
            );
            setSelectedDisenoNombre([...selectedDisenoNombre, nuevoDiseno]);

            //se le manda los datos recibidos a agregar diseno
            agregarDiseno(data);

        };


        //estado para traerel tanmaño y el precio de diseños
        const [Precio, setPrecio] = useState([]);

        // traemos la informacion de las prendas y las guardamos en setPrendas y eso las manda a PrendAS
        useEffect(() => {
            // Realizar una solicitud para obtener la lista de roles desde el servidor
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/api/precio_disenos`)
                .then((response) => {
                    setPrecio(response.data); // Almacenar la lista de roles en el estado
                });
        }, []);

        useEffect(() => {

            if (selectedDisenoNombre.length === 0) {
                reset()
            }
        }, [selectedDisenoNombre]);

        return (
            <Modal
                show={showw}
                onHide={() => {
                    reset();
                    handleClosee();
                }}
                className='modal d-flex align-items-center justify-content-center '
                id='myModalDiseno'
            >
                <div className='modal-content'>
                    {/* Cabecero del modal */}

                    <HeaderModals
                        title='Diseño y  tamaño'
                        handleClose={() => {
                            reset();
                            handleClosee();
                            //para que se restablesca el modal cuando se cierre el modal
                            // setSelectedDisenoNombre([]);
                            // setDisenos([]);
                        }}
                    />

                    <div className='modal-body'>
                        <form
                            action=''
                            id='formularioModificar'
                            onSubmit={handleSubmit(agregarNuevoDiseno)}
                        >
                            <div className='row '>
                                <div className='col-md-6'>
                                    <label htmlFor='rol' className='col-form-label'>
                                        Diseños: *
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
                                        <option value=''>Seleccionar diseño</option>
                                        {disenosDB
                                            .filter((diseno) => diseno.estado) // Filtrar solo los elementos habilitados
                                            .map((diseno) => (
                                                <option
                                                    key={diseno.id_diseno}
                                                    value={diseno.id_diseno}
                                                >
                                                    {diseno.nombre}
                                                </option>
                                            ))}
                                    </select>

                                    {errors.id_diseno && (
                                        <AlertaError
                                            message={errors.id_diseno.message}
                                        />
                                    )}

                                    <label htmlFor='rol' className='col-form-label'>
                                        Tamaño: *
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
                                        <option value=''>Seleccionar tamaño</option>
                                        {Precio.map((precio) => (
                                            <option
                                                key={precio.id_precio_diseno}
                                                value={precio.id_precio_diseno}
                                            >
                                                {precio.tamano}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.id_precio_diseno && (
                                        <AlertaError
                                            message={
                                                errors.id_precio_diseno.message
                                            }
                                        />
                                    )}
                                </div>
                                <div className='col-md-6'>
                                    <p className={style.diseñosModalTitle}>
                                        Diseños seleccionados:
                                    </p>

                                    {selectedDisenoNombre.map((diseno, index) => (
                                        <div
                                            key={index}
                                            className={style.disenocontainer}
                                        >
                                            <p>
                                                <span
                                                    className={style.disenonombre}
                                                >
                                                    - {diseno.nombre}
                                                    {diseno.tamano}
                                                </span>

                                                <span
                                                    onClick={() =>
                                                        eliminarDiseno01(index)
                                                    }
                                                >
                                                    <img
                                                        src={logo}
                                                        alt=''
                                                        className={style.logoimg}
                                                    />
                                                </span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <br />

                            <div className='modal-footer'>
                                {/* Botón para cancelar*/}
                                <BotonNegro
                                    text={'Regresar'}
                                    modalClouse={'modal'}
                                    onClick={() => {
                                        // setSelectedDisenoNombre([]);
                                        // setDisenos([]);  
                                        handleClosee(); // Asumiendo que handleClosee es una función que cierra el modal
                                        reset()
                                    }}
                                />

                                {/* Botón para guardar*/}
                                <GuardarModal
                                    onSubmit={handleSubmit(agregarNuevoDiseno)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        );
    };



export default AgregarDisenoModal;
