import { useContext } from "react";
import prendasContex from "../context/PrendasProvider";

const usePrendas = ()=>{
    return useContext(prendasContex)
};

export default usePrendas