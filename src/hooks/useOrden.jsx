import { useContext } from 'react';
import ordenesContext from '../context/OrdenesProvider'


const useOrden = () => {
    return useContext(ordenesContext);
};

export default useOrden;
