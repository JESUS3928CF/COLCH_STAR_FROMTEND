import { Link } from 'react-router-dom';
import '../css-general/cssgeneral.css'
import '../css-general/tailwind.min.css'
import useAuth from '../hooks/useAuth';


const Catalogo = () => {

    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';

    return (
        <div>
            <h1> Catalogo </h1>

            {auth?.usuario?.id_usuario ? (
                <Link to={'/administracion'}> Entrar </Link>
            ) : (
                <Link to={'/login'}> Iniciar sección </Link>
            )}
        </div>
    );
};

export default Catalogo;
