import { useForm } from "react-hook-form";
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from "../chared/HeaderModals";
import { validarEspaciosVacios } from "../../Validations/validations";
import AlertaError from "../chared/AlertaError";
import { useState } from "react";
import BotonVerde from "../chared/BotonVerde";
import { Modal } from "react-bootstrap";
import CancelarModal from "../chared/CancelarModal";
import useColors from "../../hooks/useColors";



const AgregarColors = () => {

    const {addcolors}= useColors()

    const [show, setShow]= useState(false)
    const handleClose=()=> setShow(false)
    const handleShow= ()=> setShow(true)

    // const [showw, setShoww]= useState(false)

    // const handleClosee=()=>{
    //     setShoww(false), handleShow()
    // }

    // const handleShoww=()=>{
    //     setShoww(true), handleClose()
    // }
    // const handleClosex = () =>{
    //     setShoww(false)
    // }


    const {
        register,
        handleSubmit,
        formState:{ errors },
        setValue,
        trigger,
        reset,
        getValues
        
    } = useForm({mode: 'onChange'});



    const onSubmit = async (data) => {
        const { color, codigo } = data

        addcolors({
            color: color.trim(),
            codigo: codigo.trim()
        },
        reset,
        handleClose
        )}



    return (
        <>



<BotonVerde text={'Crear color'} onClick={handleShow}/>


<Modal show={show}
onHide={()=>{
    reset()
    handleClose()
}}

id="#myModalColors">

            <div className='modal-lg'>

                        <HeaderModals title={'Agregar color'}
                        handleClose={()=>{
                            reset()
                            handleClose()
                        }}
                        
                        />

                        <div className="modal-body">
                            <form
                                className='row g-3 needs-validation'
                            >
                                <div className='col-md-6' name='color'>
                                    <label
                                        htmlFor='color'
                                        className='col-form-label'
                                    >
                                        Color: *
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
                                        Código: *
                                    </label>
                                    <input
                                        type='color'
                                        className='form-control'
                                        name='codigo'
                                        placeholder='codigo'
                                        title='Ingresa el codigo'
                                        {...register('codigo', {
                                            required: {
                                                value: true,
                                                message:
                                                    'El código es obligatorio',
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

                                    <CancelarModal reset={reset} handleClose={handleClose}/>
                                    <GuardarModal onSubmit={
                                handleSubmit(onSubmit)
                            }/>

                                </div>
                            </form>
                        </div>
                   
            </div>
        </Modal>



        </>
    )
}


export default AgregarColors