import { useForm } from 'react-hook-form';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import AlertaError from '../chared/AlertaError';
import BotonNegro from '../chared/BotonNegro';
import logo from '../../imgNavbar/cruz.png';
import style from '../../pages/Productos.module.css';
import useColors from '../../hooks/useColors';
import usePrendas from '../../hooks/usePrendas';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const SeleccionarColors = ({ handleClosee, showw }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { agregarColors, eliminarColors, colorsDb } = useColors();

    const eliminarColors01 = (index) => {
        const newColors = [...selectColorsNombre];
        newColors.splice(index, 1);
        setSelectColorsNombre(newColors);
        eliminarColors(index);
    };

    const { selectColorsNombre, setSelectColorsNombre } = usePrendas();

    const agregarNuevoColor = (data) => {
        // Validar si el color ya está seleccionado
        if (
            selectColorsNombre.some((color) => color.id_color == data.id_color)
        ) {
            Swal.fire({
                icon: 'warning',
                //   title: "No es necesario",
                text: 'Este color ya ha sido seleccionado.',
                customClass: {
                    popup: 'small-alert-popup', // Clase CSS para personalizar el tamaño
                    content: 'small-alert-content', // Clase CSS para personalizar el tamaño
                },
                heightAuto: false, // Desactiva el ajuste automático de altura
                timer: 3000, // Tiempo en milisegundos antes de cerrar automáticamente (en este caso, 2 segundos)
                showConfirmButton: false, // No mostrar el botón de confirmación
                position: 'top-end', // Posiciona la alerta en la esquina superior derecha
                html: '<i class="small-icon"></i> Este color ya ha sido seleccionado.', // Usar la opción html para personalizar el contenido y el icono
            });
            return; // Detener la función si el color ya está seleccionado
        }
        agregarColors(data);

        const newColor = colorsDb.find(
            (colores) => colores.id_color == data.id_color
        );
        setSelectColorsNombre([...selectColorsNombre, newColor]);
    };

    return (
        <Modal
            show={showw}
            onHide={() => {
                reset();
                handleClosee();
            }}
            // className="modal fade"
            className='modal d-flex align-items-center justify-content-center '
            id='crearColor'
        >
            <div className='modal-content'>
                <HeaderModals
                    title='Agregar colores'
                    handleClose={() => {
                        reset();
                        handleClosee();
                    }}
                />
                <div className='modal-body'>
                    <form
                        className='row g-3 needs-validation'
                    >
                        <div className='col-md-12'>
                            <label htmlFor='rol' className='col-form-label'>
                                {' '}
                                Colores: *
                            </label>
                            <select
                                className='form-control' // Allow multiple selections
                                {...register('id_color', {
                                    required: {
                                        value: true,
                                        message:
                                            'Debe seleccionar al menos un color',
                                    },
                                })}
                            >
                                <option value=''>Seleccionar colores</option>
                                {colorsDb.map((F) => (
                                    <option key={F.id_color} value={F.id_color}>
                                        {F.color}
                                    </option>
                                ))}
                            </select>

                            {errors.id_color && (
                                <AlertaError
                                    message={errors.id_color.message}
                                />
                            )}

                            <div className='col-12 ml-6 mt-3'>
                                <p>Colores seleccionados:</p>
                                {selectColorsNombre.map((color, index) => (
                                    <div
                                        key={index}
                                        className='selected-color-container'
                                    >
                                        <div
                                            className='color-div-agregar'
                                            style={{
                                                backgroundColor: `${color.codigo}`,
                                            }}
                                        ></div>
                                        <p className='ml-1'>
                                            <span>-{color.color}</span>
                                            <span
                                                onClick={() =>
                                                    eliminarColors01(index)
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

                        <div className='modal-footer'>
                            {/* <div style={{ marginRight: 129 }}>
                    <BotonNegro
                      text="Crear color"
                      modalToOpen={"#myModalColors"}
                      modalClouse={"modal"}
                      onClick={handleShoww}

                    />
                  </div> */}
                            <BotonNegro
                                text={'Regresar'}
                                onClick={() => {
                                    reset();
                                    handleClosee();
                                }}
                                modalClouse={'modal'}
                            />
                            <GuardarModal text='Agregar color' onSubmit={handleSubmit(agregarNuevoColor)} />
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

// Definir las propTypes para validar los tipos de las props
GuardarModal.propTypes = {
    text: PropTypes.string, // text es una cadena opcional
    onSubmit: PropTypes.func.isRequired, // onSubmit debe ser una función requerida
};

export default SeleccionarColors;
