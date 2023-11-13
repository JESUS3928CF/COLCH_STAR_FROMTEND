import { createContext } from "react";
import { useState } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState();

    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider }
export default AuthContext