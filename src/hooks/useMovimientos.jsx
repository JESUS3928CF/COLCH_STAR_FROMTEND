import { useContext } from "react"
import movimientosContext from "../context/MovimientosProvider"

const useMovimientos = ()=>{
    return useContext(movimientosContext)
}

export default useMovimientos;