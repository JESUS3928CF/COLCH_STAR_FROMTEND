import { createContext, useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import clienteAxios from '../config/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    //! Este use effect Para que cuando carge la app revisar si el usuario esta autenticado o no
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    'content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.message);
                /// Esto es para cerrar sección para cuando el token expire o no sea valido
                if(error.response.data.message === "Token no valido"){
                    singOff();
                }
                setAuth({});
            }

            setLoading(false);
        };

        autenticarUsuario();
    }, [loading]);

    const navigate = useNavigate();
    /// Función para cerrar sección
    const singOff = () => {
        localStorage.removeItem('token');
        setAuth({});

        navigate('/login');
    };

    /// Funcionalidad para cerrar y abrir el menú lateral
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // "Esto es para el botón para cerrar el menú "
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <AuthContext.Provider
            value={{ auth, setAuth, loading, singOff, config, token }}
        >
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider };
export default AuthContext;
