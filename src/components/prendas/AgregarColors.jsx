import axios from "axios"
import { useForm } from "react-hook-form";
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from "../chared/HeaderModals";
import { validarEspaciosVacios } from "../../Validations/validations";
import AlertaError from "../chared/AlertaError";
import Swal from "sweetalert2";
import BotonNegro from "../chared/BotonNegro";


const AgregarColors = () => {

    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = (async (data) => {
        const { color, codigo } = data



        try {
            const res = await axios.post("http://localhost:3000/api/colors", {
                color: color.trim(),
                codigo: codigo.trim()
            })



            Swal.fire({
                title: 'Color agregado',
                text: res.data.message,
                icon: 'success',

            }).then(location.reload());
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error',
                icon: 'Vuelva a intentarlo',
            }).then(location.reload());
        }

    })
    


    return (
        <>

            <div className="modal fade" id="myModalColors" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <HeaderModals title={'Agregar color'} />

                        <div className="modal-body">
                            <form onSubmit={
                            handleSubmit(onSubmit)
}

                            
                                className='row g-3 needs-validation'
                            >
                                <div className='col-md-6' name='color'>
                                    <label
                                        htmlFor='color'
                                        className='col-form-label'
                                    >
                                        Color:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='color'
                                        placeholder='Nombre del color'
                                        title='Ingresa el nombre del color'
                                        {...register('color', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El color es obligatorio',
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(
                                                    value
                                                );
                                            }, pattern: {
                                                value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                                                message: 'Error no se puede numeros ni caracteres especiales'
                                            }
                                        })}
                                    />
                                    {errors.color && (
                                        <AlertaError
                                            message={errors.color.message}
                                        />
                                    )}
                                </div>

                                <div className='col-md-6 ms-auto'>
                                    <label
                                        htmlFor='codigo'
                                        className='col-form-label'
                                    >
                                        Codigo:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='codigo'
                                        placeholder='codigo'
                                        title='Ingresa el codigo'
                                        {...register('codigo', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El codigo es obligatorio',
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(
                                                    value
                                                );
                                            },
                                        })}
                                    />
                                    {errors.codigo && (
                                        <AlertaError
                                            message={errors.codigo.message}
                                        />
                                    )}
                                </div>

                                <div className='modal-footer'>
                                <BotonNegro  text={'Cancelar'} modalToOpen={'#myModal'} modalClouse={'modal'}/>
                                <GuardarModal/>


                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    )
}

// AgregarColors.prototype={
//     Colores: PropTypes.object.isRequired
// }

export default AgregarColors