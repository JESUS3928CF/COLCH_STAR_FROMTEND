import { Navigate } from 'react-router-dom';
import AgregarCompra from '../components/compras/AgregarCompra';
import ListarCompra from '../components/compras/ListarCompra';
import useAuth from '../hooks/useAuth';

const Compras = () => {

    /// extrayendo la información para la autenticación
    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';

    return auth.usuario.permisos.includes('compra') ? (
        <div>
            <ListarCompra />
            <AgregarCompra />
        </div>
    ) : (
        <Navigate to={'/administracion'} />
    );
};

export default Compras;