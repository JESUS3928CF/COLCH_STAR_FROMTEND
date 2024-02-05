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

const SeleccionarColors = ({ handleClosee, showw, handleShoww }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { agregarColors, eliminarColors, colors, colorsDb } = useColors();

    const eliminarColors01 = (index) => {
        const newColors = [...selectColorsNombre];
        newColors.splice(index, 1);
        setSelectColorsNombre(newColors);
        eliminarColors(index);
    };

    const { selectColorsNombre, setSelectColorsNombre } = usePrendas();

    const agregarNuevoColor = (data) => {
        // Validar si el color ya está seleccionado
        //   if (selectColorsNombre.some((color) => color.id_color === data.id_color)) {
        //     Swal.fire({
        //       icon: "error",
        //       title: "Oops...",
        //       text: "Este color ya ha sido seleccionado.",
        //     });
        //     return; // Detener la función si el color ya está seleccionado
        //   }
        console.log(data);

        agregarColors(data);

        const newColor = colorsDb.find(
            (colores) => colores.id_color == data.id_color
        );
        setSelectColorsNombre([...selectColorsNombre, newColor]);

        console.log(selectColorsNombre);
    };

    // const [colors, setColors] = useState([]);

    // useEffect(() => {
    //   axios.get("http://localhost:3000/api/colors").then((res) => {
    //     setColors(res.data);
    //   });
    // }, []);

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
                        onSubmit={handleSubmit(agregarNuevoColor)}
                        className='row g-3 needs-validation'
                    >
                        <div className='col-md-12'>
                            <label htmlFor='rol' className='col-form-label'>
                                {' '}
                                Colores
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
                                <option
                                    value='Seleccionar colores'
                                    disabled={true}
                                ></option>
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
                                <p>Colores seleccionados</p>

                                {selectColorsNombre.map((color, index) => (
                                    <div key={index}>
                                        <p>
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
                                    handleClosee();
                                }}
                                modalClouse={'modal'}
                            />
                            <GuardarModal />
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default SeleccionarColors;
