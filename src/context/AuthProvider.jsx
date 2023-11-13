import { createContext, useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    //! Este use effect Para que cuando carge la app revisar si el usuario esta autenticado o no
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    'content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config);

                console.log(data);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.message);
                setAuth({});
            }
        };

        autenticarUsuario();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider };
export default AuthContext;
