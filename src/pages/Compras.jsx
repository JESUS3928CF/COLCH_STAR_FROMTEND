import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Compras = () => {
    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';

    return auth.usuario.permisos.includes('compra') ? (
        <div>
            <div>
                <h1>compras</h1>
            </div>
        </div>
    ) : (
        <Navigate to={'/administracion'} />
    );
};

export default Compras;
