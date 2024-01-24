import { createContext, useEffect, useState } from 'react';
import ordenAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const ordenesContext = createContext();

const OrdenesProvider = ({ children }) => {
    const { config, auth } = useAuth();


    
};

export { OrdenesProvider };
export default ordenesContext;
