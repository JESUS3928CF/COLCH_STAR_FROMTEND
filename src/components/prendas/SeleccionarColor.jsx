import axios from "axios"
import { useForm } from "react-hook-form";
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from "../chared/HeaderModals";
import { validarEspaciosVacios } from "../../Validations/validations";
import AlertaError from "../chared/AlertaError";
import Swal from "sweetalert2";
import BotonNegro from "../chared/BotonNegro";
import { useEffect, useState } from "react";
import {useColorsContex} from "../../../context/ColorsProvider";



const SeleccionarColors = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    
    const agregarColors = useColorsContex();


    const [seleccionarColors,setSeleccionarColors]= useState([]);
    const [error,setError]= useState(null)
    const [colors, setColors]= useState([])



    const agregarNuewColors =  (data)=>{

        agregarColors(data)

        if(seleccionarColors.length==0){
            setError("Debes seleccionar un color")
            return;
        };

    }

    useEffect(()=>{
        axios.get('http://localhost:3000/api/colors').then((res)=>{
            setColors(res.data)
        })
    },[])



    return (
        <>

            <div className="modal fade" id="crearColor" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <HeaderModals title={'Agregar color'} />

                        <div className="modal-body">
                            <form onSubmit={
                                handleSubmit(agregarNuewColors)
                            }
                                className='row g-3 needs-validation'
                            >
                               

                               

                                <div className='modal-footer'>
                                <div style={{marginRight: 129}}>
                                        <BotonNegro text="Crear color"
                                            modalToOpen={'#myModalColors'}
                                            modalClouse={'modal'} />

                                    </div>
                                    <BotonNegro text={'Cancelar'} modalToOpen={'#myModal'} modalClouse={'modal'} />
                                    <GuardarModal />



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

export default SeleccionarColors