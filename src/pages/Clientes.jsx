import { Navigate, useNavigate } from 'react-router-dom';
import ListarCliente from '../components/cliente/ListarCliente';
import useAuth from '../hooks/useAuth';


const Clientes = () => {
    const navigate = useNavigate();
    const { auth, loading } = useAuth();

    /// Verificar que tenga una sección iniciada
    const token = localStorage.getItem('token');
    if (!token) return navigate('');


    /// Verificar que el token que esta en el navegador sea valido
    if (loading) return 'Cargando...';


    
    

    return auth.usuario.permisos.includes('clientes') ? (
        <div>
            <ListarCliente />
            {/* <EditarCliente/> */}
        </div>
    ) : (
        <Navigate to={'/'} />
    );
};

export default Clientes;
