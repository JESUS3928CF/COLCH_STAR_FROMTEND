import { createContext, useContext, useState } from 'react';

// Crear el contexto
const DisenosContext = createContext();

// Proveedor del contexto, que proporciona el estado y las funciones de actualización
export const DisenosProvider = ({ children }) => {
    const [disenos, setDisenos] = useState([]);

    const agregarDiseno = (data) => {
        const nuevoDisenos = [...disenos, data];
        setDisenos(nuevoDisenos);
    };

    // Proporcionar el estado y las funciones de actualización a los componentes hijos
    const contextValue = {
        disenos,
        agregarDiseno,
    };

    return (
        <DisenosContext.Provider value={contextValue}>
            {children}
        </DisenosContext.Provider>
    );
};

// Función personalizada para utilizar el contexto en componentes hijos
export const useDisenosContext = () => {
    return useContext(DisenosContext);
};
