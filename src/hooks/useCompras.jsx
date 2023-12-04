import { useContext } from 'react';
import comprasContext from '../context/ComprasProvider';

const useCompras = () => {
    return useContext(comprasContext);
};

export default useCompras;
