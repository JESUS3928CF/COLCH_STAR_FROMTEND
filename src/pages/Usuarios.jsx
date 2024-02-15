import { Navigate } from 'react-router-dom';
import ListarUsuario from '../components/usuario/ListarUsuario';
import useAuth from '../hooks/useAuth';

const Usuarios = () => {

    /// extrayendo la información para la autenticación
    const { auth, loading } = useAuth();
    if (loading) return 'Cargando...';

    return auth.usuario.permisos.includes('usuarios') ? (
        <div>
            <ListarUsuario />
        </div>
    ) : (
        <Navigate to={'/'} />
    );
};

export default Usuarios;
