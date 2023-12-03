
import Header from '../components/chared/header/Header';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import ListarDisenos from '../components/diseños/TablaDiseno/ListarDisenos';

export const Diseno = () => {
    /// extrayendo la información para la autenticación
    const { auth, loading } = useAuth();
    if (loading) return 'Cargando...';


    return auth.usuario.permisos.includes('producto') ? (
        <div>
            <div>
                <Header titulo='Gestionar Diseños' />

                
                {/* Tabla para listar diseños */}
                <ListarDisenos />
            </div>
        </div>
    ) : (
        <Navigate to={'/administracion'} />
    );
};

export default Diseno;
