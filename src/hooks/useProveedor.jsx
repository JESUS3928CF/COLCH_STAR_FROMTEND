import { useContext } from 'react';
import proveedoresContext from '../context/ProveedoresProvider'


const useProveedor = () => {
    return useContext(proveedoresContext);
};

export default useProveedor;
