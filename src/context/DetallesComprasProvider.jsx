import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const DetalleCompraContext= createContext()

const  DetalleCompraProvider=({children})=>{
    const {config, auth}= useAuth()

    const [detalleCompra,setDetalleCompra]= useState([])






    const consultarDetalleCompra = async()=>{

        try{
            const res = await clienteAxios.get('/compraDetalles')
            setDetalleCompra(res.data)

        }catch (error){
            console.error('Error al consultar los movimientos',error)
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

