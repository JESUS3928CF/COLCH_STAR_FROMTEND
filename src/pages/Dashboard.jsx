import { Navigate } from "react-router-dom";
import InicioDashboard from "../components/Dashboard/Inicio";
import useAuth from '../hooks/useAuth';

export const Dashboard = () => {

    /// extrayendo la información para la autenticación
    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';


    return auth.usuario.permisos.includes('') ? (
        <div>

            <InicioDashboard />

        </div>
    ) : (
        <Navigate to={'/'} />
    );
};
