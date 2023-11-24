import { createContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const generalContext = createContext();

const GeneralProvider = ({ children }) => {
    /// Estado Referencia y función Para cerrar un modal
    const [closeModal, setCloseModal] = useState(false);

    const buttonRef = useRef();

    const handleClick = () => {
        // Simular clic automático
        setCloseModal(!closeModal);
    };

    useEffect(() => {
        // Este efecto se ejecuta después de que el estado closeModal cambia
        if (closeModal) {
            console.log('Se le dio click al botón', buttonRef);
            buttonRef.current.click();
            setCloseModal(false);
        }
    }, [closeModal]);

    return (
        <generalContext.Provider
            value={{ buttonRef, handleClick, closeModal, setCloseModal }}
        >
            {children}
        </generalContext.Provider>
    );
};

// PropTypes para validar los props
GeneralProvider.propTypes = {
    children: PropTypes.array.isRequired,
};

export {  GeneralProvider };
export default generalContext;
