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
import {useColorsContex} from "../../context/ColorsProvider";



const SeleccionarColors = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    
    const agregarColors = useColorsContex() ||{};
    const [selectColorsName, setSelectColorsName] = useState ('')

    console.log(agregarColors)
   



    const agregarNewColors =  (data)=>{

        agregarColors(data)

        let selectColors = [];
        
        const id= data.id_color

        for (let i =0; i <colores.length; i++ ){
            const matchingColors = colors.find((Colors)=>Colors.id_color==colores[i].id_color);
            if(matchingColors){
                selectColors.push(matchingColors.color)
            }
        }
        setSelectColorsName(selectColors)


    };

    const [colors,setColors]= useState([])

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
                                handleSubmit(agregarNewColors)
                            }
                                className='row g-3 needs-validation'
                            >


<div className="col-md-6">



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
    {colors.map((F) => (
        <option
            key={F.id_color}
            value={F.id_color}
        >
            {F.nombre}
        </option>
    ))}
</select>

{/* {errors.diseno && (
    <AlertaError
        message={errors.diseno.message}
    />
)} */}


<label htmlFor='rol' className='col-form-label'>
    diseno: *
</label>




<div className="col-md-5 ml-6 mt-3">


{selectColorsName && (
    <div>
        <div>{selectColorsName}</div>
    </div>
)}




</div>

</div>


                               

                               

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