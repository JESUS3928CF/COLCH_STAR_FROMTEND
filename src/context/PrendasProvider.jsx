import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const prendasContex = createContext();

export const PrendasProvider = ({ children }) => {
  const { config, auth } = useAuth();
  const [Prendas, setPrendas] = useState([]);

  const agregarPrendas = (data) => {
    const newPrendas = [...Prendas, data];
    setPrendas(newPrendas);
  };

  const consultarPrendas = async () => {
    const respuesta = await clienteAxios.get("/prendas");
    // console.log(respuesta.data);
    setPrendas(respuesta.data);
    // setprendasFiltrar(respuesta.data);
  };

  useEffect(() => {
    consultarPrendas();
  }, [auth]);

  const contextValue = {
    Prendas,
    agregarPrendas,
    consultarPrendas,
  };

  return (
    <prendasContex.Provider value={contextValue}>
      {children}
    </prendasContex.Provider>
  );
};

export const usePrendasContex = () => {
  return useContext(prendasContex);
};
