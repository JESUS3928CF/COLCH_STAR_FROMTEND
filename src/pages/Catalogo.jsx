import { Link } from 'react-router-dom';
import '../css-general/cssgeneral.css'
import '../css-general/tailwind.min.css'

const Catalogo = () => {
    return (
        <div>
            <h1> Catalogo </h1>

            <Link to={'/login'}> Iniciar sección </Link>
        </div>
    );
};

export default Catalogo;
