import { createContext } from 'react';
import PropTypes from 'prop-types';

const generalContext = createContext();

const GeneralProvider = ({ children }) => {

    return (
        <generalContext.Provider
            value={{}}
        >
            {children}
        </generalContext.Provider>
    );
};

// PropTypes para validar los props
// PropTypes para validar los props
GeneralProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

export {  GeneralProvider };
export default generalContext;
