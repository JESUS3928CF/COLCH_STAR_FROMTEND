import { useContext } from "react"
import ColorsContex from "../context/ColorsProvider"

const useColors = () =>{
    return useContext(ColorsContex)
}

export default useColors