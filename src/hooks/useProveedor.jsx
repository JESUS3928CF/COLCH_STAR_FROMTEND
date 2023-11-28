import { useContext } from 'react';
import proveedoresContext from '../context/ProveedoresProvider'


const useProveedores = () => {
    return useContext(proveedoresContext);
};

export default useProveedores;
