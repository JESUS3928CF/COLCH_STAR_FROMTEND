import { Link } from 'react-router-dom';

const Catalogo = () => {
    return (
        <div>
            <h1> Catalogo </h1>

            <Link to={'/login'}> Iniciar sección </Link>
        </div>
    );
};

export default Catalogo;
