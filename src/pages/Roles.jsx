import { Navigate } from 'react-router-dom';
import AgregarRol from '../components/roles/AgregarRol';
import ListarRol from '../components/roles/ListarRol';
import useAuth from '../hooks/useAuth';

const Roles = () => {

    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';


    return auth.usuario.permisos.includes('roles') ? (
        <div>
            <ListarRol />
        </div>
    ) : (
        <Navigate to={'/'} />
    );
};

export default Roles;
