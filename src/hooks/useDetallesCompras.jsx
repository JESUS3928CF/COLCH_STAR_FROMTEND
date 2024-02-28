import { useContext } from "react"
import DetalleCompraContext from "../context/DetallesComprasProvider";


const useDetallesCompras = ()=>{
    return useContext(DetalleCompraContext)
}

export default useDetallesCompras;