import { useContext } from 'react';
import rolesContext from '../context/RolesProvider';

const useRoles = () => {
    return useContext(rolesContext);
};

export default useRoles;
