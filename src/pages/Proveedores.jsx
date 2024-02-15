import { Navigate } from 'react-router-dom';
import ListarProveedores from '../components/proveedor/ListarProveedores';
import useAuth from '../hooks/useAuth';


const Proveedores = () => {

    /// extrayendo la información para la autenticación
    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';


    return auth.usuario.permisos.includes('proveedores') ? (
        <div>
            <ListarProveedores />
        </div>
    ) : (
        <Navigate to={'/'} />
    );
};


export default Proveedores;
