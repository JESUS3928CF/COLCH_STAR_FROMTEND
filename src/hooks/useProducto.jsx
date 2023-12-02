import { useContext } from 'react';
import productosContext from '../context/ProductosProvider';

const useProducto = () => {
    return useContext(productosContext);
};

export default useProducto;
