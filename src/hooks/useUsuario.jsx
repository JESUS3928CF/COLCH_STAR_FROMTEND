import { useContext } from 'react';
import usuariosContext from '../context/UsuariosProvider';

const useUsuario = () => {
    return useContext(usuariosContext);
};

export default useUsuario;
