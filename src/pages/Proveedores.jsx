import { Navigate } from 'react-router-dom';
import AgregarProveedor from '../components/proveedor/AgregarProveedor';
import ListarProveedores from '../components/proveedor/ListarProveedores';
import useAuth from '../hooks/useAuth';


const Proveedores = () => {

    /// extrayendo la información para la autenticación
    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';


    return auth.usuario.permisos.includes('proveedor') ? (
        <div>
            <ListarProveedores />
            {/* <AgregarProveedor /> */}
        </div>
    ) : (
        <Navigate to={'/administracion'} />
    );
};


export default Proveedores;
