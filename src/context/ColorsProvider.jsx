import { createContext, useContext, useState } from "react";


const  ColorsContex = createContext();


export const ColorsProvider=({children})=>{
    const [colores, setColores]= useState([]);

    const agregarColors= (data)=>{
        const  newColors = [...colores,data];
        setColores(newColors);
    };

    const contextValue = {
        colores,
        agregarColors,
    };

    return(
        <ColorsContex.Provider value={contextValue}>
            {children}
        </ColorsContex.Provider>
    );
};


export const useColorsContex =()=> {
    return useContext(ColorsContex);
};