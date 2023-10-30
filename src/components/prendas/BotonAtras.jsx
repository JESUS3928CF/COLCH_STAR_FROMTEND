import { Link } from "react-router-dom";
import BotonNegro from "../chared/BotonNegro";


const BotonAtrasPrendas= ()=>{

    return(
        <Link to={'/productos'}>
        <BotonNegro text="Atras"/>
        </Link>
    )
}

export default BotonAtrasPrendas