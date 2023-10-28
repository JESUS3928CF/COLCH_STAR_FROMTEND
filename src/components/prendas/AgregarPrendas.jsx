import { useState } from 'react';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import clienteAxios from '../../config/axios';
import AlertaError from '../chared/AlertaError';


const AgregarPrendas=()=>{
    const [prendas,setPrendas]=useState({

        nombre: '',
        cantidad: null,
        precio: null,
        tipo_de_tela: '',
        publicado: null ,
        estado:null,
    })

    const[archivo,setArchivo]=useState('');
    const [nombreError, setNombreError]= useState(null);
    const [cantidadError,setCantidadError]=useState(null);
    const [precioError,setPrecioError]=useState(null);
    const [tipo_de_telaError,setTipoDeTelaError]=useState('');
    const [archivoError,setArchivoError]=useState('');
    const [publicadoError,setPublicadoError]=useState(null);
    const [estadoError,setEstadoError]=useState(null);

    const leerInformacionPrendas =(e) =>{
        console.log(e.target.value)
        setPrendas({
            ...prendas,[e.target.name]:e.target.value
        });
    }

    const leerArchivo=(e)=>{
        setArchivo(e.target.file[0]);
    }

    const handleSubmit = async (e) => {
      e.preventeDefault();

      if (prendas.nombre.trim() === "") {
        setNombreError("El nombre es obligatorio");
        return;
      } else {
        setNombreError("");
      }

      if(prendas.cantidad===''){
        setCantidadError("La can")

      }





    };



    

}