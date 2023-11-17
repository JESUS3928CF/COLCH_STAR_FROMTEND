import { createContext, useContext, useState } from "react";


const  ColorsContex = createContext();


export const ColorProvider=({colors})=>{
    const [colores, setColores]= useState([]);

    const agregarColors= (data)=>{
        const  newColors = [...colores,data];
        setColores(newColors);
    };

    const contexValues = {
        colores,
        agregarColors,
    };

    return(
        <ColorsContex.Provider value={contexValues}>
            {colors}
        </ColorsContex.Provider>
    );
};


export const useColorsContex =()=> {
    return useContext(ColorsContex);
};