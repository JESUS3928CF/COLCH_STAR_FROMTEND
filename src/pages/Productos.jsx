
import '../css-general/cssgeneral.css'
import '../css-general/tailwind.min.css'
import '../css-general/inicio_style.css'
import '../css-general/table.min.css'
import ListarProducto from '../components/producto/ListarProducto';
import AgregarProducto from '../components/producto/AgregarProducto';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';




const Productos = () => {
    /// extrayendo la información para la autenticación
    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';


    return auth.usuario.permisos.includes('productos') ? (
        <div>
            <ListarProducto />
            {/* <AgregarProducto /> */}
        </div>
    ) : (
        <Navigate to={'/'} />
    );
};

export default Productos;
