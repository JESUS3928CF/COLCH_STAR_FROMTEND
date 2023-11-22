import { createContext, useRef } from 'react';


const generalContext = createContext();

const GeneralProvider = ({ children }) => {
    /// Referencia y función Para cerrar un modal
    const buttonRef = useRef();

    const handleClick = () => {
        // Simular clic automático
        console.log('Se le dio click al botón', buttonRef);
        buttonRef.current.click();
    };

    return (
        <generalContext.Provider value={{ buttonRef, handleClick }}>
            {children}
        </generalContext.Provider>
    );
};

export {  GeneralProvider };
export default generalContext;
