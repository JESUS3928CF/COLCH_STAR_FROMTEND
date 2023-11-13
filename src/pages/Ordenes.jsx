import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Ordenes = () => {

    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';


    return auth.usuario.permisos.includes('orden') ? (
        <div>
            <div>
                <h1>Ordenes</h1>
            </div>
        </div>
    ) : (
        <Navigate to={'/administracion'} />
    );
};

export default Ordenes;
