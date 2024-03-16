import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

const DetalleCompraContext= createContext()

const  DetalleCompraProvider=({children})=>{
    const {config, auth}= useAuth()

    const [detalleCompra,setDetalleCompra]= useState([])






    const consultarDetalleCompra = async()=>{

        try{
            const res = await clienteAxios.get('/compraDetalles')
            setDetalleCompra(res.data)

        }catch (error){
            Swal.fire({
                title: 'Error',
                text: 'Error al consultar los movimientos, Intente de nuevo',
                icon: 'error',
            }).then(() => {});
        }
        
    }

  


    useEffect(()=>{
        consultarDetalleCompra()
    },[auth]);
 




    return(<DetalleCompraContext.Provider value={{detalleCompra, consultarDetalleCompra}}>
    {children}
    </DetalleCompraContext.Provider>)
}

export {DetalleCompraProvider}
export default DetalleCompraContext

