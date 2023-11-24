import { useContext } from 'react';
import generalContext from '../context/GeneralProvider';

const useGeneral = () => {
    return useContext(generalContext);
};

export default useGeneral;
