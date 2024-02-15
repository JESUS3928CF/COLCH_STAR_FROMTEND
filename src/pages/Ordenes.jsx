import { Navigate } from "react-router-dom";
import ListarOrdenes from '../components/ordenes/ListarOrdenes';
import useAuth from "../hooks/useAuth";

const Ordenes = () => {

    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';


    return auth.usuario.permisos.includes('ordenes') ? (
        <div>
            <div>
            <ListarOrdenes />

            </div>
        </div>
    ) : (
        <Navigate to={'/'} />
    );
};

export default Ordenes;
