import { useEffect } from 'react';
import { useState } from 'react';
import clienteAxios from '../config/axios';
import { AuthContext } from './AuthProvider';

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();

    //! Este use effect Para que cuando carge la app revisar si el usuario esta autenticado o no
    useEffect(async () => {
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
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
