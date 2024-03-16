import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const movimientosContext= createContext()

const  MovimientosProvider=({children})=>{
    const { auth}= useAuth()

    const [movimiento,setMovimiento]= useState([])
    const [movimientoDb, setMovimientoDb]= useState([])
    const [notificacion, setNotificacion]=useState()

1
    const agregarMovimientos = (data)=>{
        const nuevoMovimientos=[...movimiento,data]
        setMovimiento(nuevoMovimientos)
    }




    const consultarMovimientos = async()=>{

        try{
            const res = await clienteAxios.get('/movimientos')
        setMovimientoDb(res.data)
        setMovimiento(res.data)

        }catch (error){
            console.error('Error al consultar los movimientos',error)
        }
        
    }

    const notificaciones = (notificacion=0) =>{
        const cantidadDenotificaciones = notificacion
        setNotificacion(cantidadDenotificaciones)
    }



    useEffect(()=>{
        consultarMovimientos()
        notificaciones()
    },[auth]);
 




    return(<movimientosContext.Provider value={{consultarMovimientos,movimiento,agregarMovimientos,movimientoDb,notificaciones,notificacion}}>
    {children}
    </movimientosContext.Provider>)
}

export {MovimientosProvider}
export default movimientosContext

