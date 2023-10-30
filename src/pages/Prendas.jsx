import { Navbar } from "../components/Navbar";

import AgregarPrendas from "../components/prendas/AgregarPrendas"

import {ListarPrendas} from "../components/prendas/ListarPrendas"



const Prendas =()=>{

    return(
        <>
        <Navbar/>
        <ListarPrendas/>
        <AgregarPrendas/>
        </>
    )
}

export default Prendas
