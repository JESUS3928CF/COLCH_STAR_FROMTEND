import { useContext } from 'react';
import clientesContext from '../context/ClientesProvider';

const useClientes = () => {
    return useContext(clientesContext);
};

export default useClientes;
