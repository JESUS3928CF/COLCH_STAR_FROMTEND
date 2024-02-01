import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const movimientosContext= createContext()

const  MovimientosProvider=({children})=>{
    const {config, auth}= useAuth()

    const [movimiento,setMovimiento]= useState([])
    const [movimientoDb, setMovimientoDb]= useState([])


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


    useEffect(()=>{
        consultarMovimientos()
    },[auth]);
 




    return(<movimientosContext.Provider value={{consultarMovimientos,movimiento,agregarMovimientos,movimientoDb}}>
    {children}
    </movimientosContext.Provider>)
}

export {MovimientosProvider}
export default movimientosContext

