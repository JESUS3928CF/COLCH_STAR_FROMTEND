import { Navigate } from 'react-router-dom';
import ListarCompra from '../components/compras/ListarCompra';
import useAuth from '../hooks/useAuth';

const Compras = () => {

    /// extrayendo la información para la autenticación
    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';

    return auth.usuario.permisos.includes('compras') ? (
        <div>
            <ListarCompra />
        </div>
    ) : (
        <Navigate to={'/'} />
    );
};

export default Compras;