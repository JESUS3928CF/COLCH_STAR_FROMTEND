import { createContext, useContext, useState } from "react";

const ComprasContex = createContext();


export const ComprasProviders =({children})=>{
    const [compras, setCompras]= useState([])

    const agregarDetalleCompras = (data)=>{
        const newDetallesCompras=[...compras,data];
        setCompras(newDetallesCompras);
    };

    const contextValue={
        compras,
        agregarDetalleCompras,
    }

    return(
        <ComprasContex.Provider value={contextValue}>
            {children}
        </ComprasContex.Provider>
    )
};

export const useComprasContex=()=>{
    return useContext(ComprasContex)
};