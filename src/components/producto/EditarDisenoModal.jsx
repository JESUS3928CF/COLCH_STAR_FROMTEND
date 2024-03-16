import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AlertaError from '../chared/AlertaError';
import GuardarModal from '../chared/GuardarModal';
import { useDisenosContext } from '../../context/DisenosProvider';
import style from '../../pages/Productos.module.css'
import BotonNegro from '../chared/BotonNegro';
import logo from '../../imgNavbar/cruz.png'
import { Modal } from 'react-bootstrap';
import useProducto from '../../hooks/useProducto';


//Componente
const EditarDisenoModal = ({ showw, handleClosee, editarProducto }) => {

    // const {editarDisenosProducto} = useProducto()
    const {
        register, //registra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envió del formulario
        formState: { errors },
        reset
    } = useForm();

    

    //trae alguna funciones de disenos provider
    const { agregarDiseno, eliminarDiseno, setDisenos } = useDisenosContext();

    

    const {selectedDisenoNombre, setSelectedDisenoNombre} = useProducto();


    const eliminarDiseno01 = (index) => {
        // Crea una copia del array original
        const nuevosDisenos = [...selectedDisenoNombre];

        // Elimina el elemento en el índice especificado
        nuevosDisenos.splice(index, 1);

        // Actualiza el estado con la nueva array sin el elemento eliminado
        setSelectedDisenoNombre(nuevosDisenos);

        // editarDisenosProducto();
        
        eliminarDiseno(index)
    };



    const agregarNuevoDiseno = (data) => {
        
        

        const nuevoDiseno = detalle_diseno.find(
            (diseno) => diseno.id_diseno == data.id_diseno
        );
       

        setSelectedDisenoNombre([...selectedDisenoNombre, nuevoDiseno]);

        agregarDiseno(data);

    };



    //estado pa los diseños
    const [detalle_diseno, setDetalle_diseno] = useState([]);

    useEffect(() => {
        // Realizar una solicitud para obtener la lista de roles desde el servidor
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/disenos`).then((response) => {
            setDetalle_diseno(response.data); // Almacenar la lista de roles en el estado
        });
    }, []);


    const [Precio, setPrecio] = useState([]);
    // traemos la informacion de las prendas y las guardamos en setPrendas y eso las manda a PrendAS
    useEffect(() => {
        // Realizar una solicitud para obtener la lista de roles desde el servidor
        axios
            .get(
                `${import.meta.env.VITE_BACKEND_URL}/api/precio_disenos`
            )
            .then((response) => {
                setPrecio(response.data); // Almacenar la lista de roles en el estado
            });
    }, []);


    useEffect(() => {
        // Verificar que editarProducto.disenos esté definido antes de asignarlo a setSelectedDisenoNombre
        if (editarProducto && editarProducto.disenos) {
            setSelectedDisenoNombre(editarProducto.disenos);
            setDisenos(editarProducto.disenos)
        }
    }, [editarProducto.disenos]);



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
                        //al darle lcick al salir manda estos datos vacios
                        // setSelectedDisenoNombre([])
                        // setDisenos([])
                    }}
                />

                <div className='modal-body'>
                    <form action='' id='formularioModificar'>
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
                                    {detalle_diseno
                                        .filter((diseno) => diseno.estado)
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
                                    <option value=''>Seleccionar Precio</option>
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
                                    reset();
                                    handleClosee();
                                    
                                    // Asumiendo que handleClosee es una función que cierra el modal
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

export default EditarDisenoModal;
