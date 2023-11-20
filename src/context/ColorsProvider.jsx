import { createContext, useContext, useState } from "react";


const  ColorsContex = createContext();


export const ColorsProvider=({children})=>{
    const [colors, setColores]= useState([]);

    const agregarColors= (data)=>{
        const  newColors = [...colors,data];
        setColores(newColors);
    };

    const contextValue = {
        colors,
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