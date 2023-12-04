import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";
import axios from "axios";
import Swal from "sweetalert2";
import useColors from "../hooks/useColors"

const prendasContex = createContext();

const PrendasProvider = ({ children }) => {
  const { auth, token } = useAuth();
  const {colors,setColores} = useColors()

  const [Prendas, setPrendas] = useState([]);

  const consultPrendas = async () => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;

      const { data } = await clienteAxios.get("/prendas");

      setPrendas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    consultPrendas();
  }, [auth]);

  const agregarPrendas = async (prenda, reset, handleClose) => {

    try {
      const res = await clienteAxios.post("/prendas", prenda, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: "Prenda agregado",
        text: res.data.message,
        icon: "success",
      }).then(() => {
        reset();
        consultPrendas();
        handleClose();
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error",
        icon: "error",
      }).then(() => {
        handleClose();
      });
    }finally{
      console.log("setColores",setColores([]))
    }
  };







  const updatePrendas = (data, detallesPrendas, handleClose) => {

    const {
      nombre,
      cantidad,
      precio,
      genero,
      imagen,
      tipo_de_tela,
      publicado,
      tallas,
    } = data;


console.log(colors)

console.log(data.nombre)

const coloresEnviar = [{id_color: detallesPrendas.color[0].id_color}]


// console.log(nombre)

    if (updatePrendas) {
     
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/prendas/${
            detallesPrendas.id_prenda
          }`,
          {
            nombre: nombre,
            cantidad: cantidad,
            precio: precio,
            tipo_de_tela: tipo_de_tela.trim(),
            genero: genero,
            imagen: imagen[0],
            publicado: publicado,
            tallas: tallas,
            colores: JSON.stringify(colors== '' ? coloresEnviar: colors),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            title: "Prenda Actualizada",
            text: res.data.message,
            icon: "success",
          }).then(() => {
            consultPrendas();
            handleClose();
          });
        }) .catch((error)=>{

          Swal.fire({
            title: "Error",
            text: "Hubo un error",
            icon: "error",
        })

        })
    } else{
      alert('No se encotro el Id')
    }
  };



  const updateEstado = (id)=>{
    let prendaUpdate = Prendas.find((prenda)=> prenda.id_prenda == id)
    prendaUpdate.estado = !prendaUpdate.estado

    const prendaActualizada = Prendas.map((prenda)=> 
    prenda.id_prenda==id ? prendaUpdate : prenda)

    setPrendas(prendaActualizada)
    
  }


  const updatePublicado = (id)=>{
    let prendaUpdate = Prendas.find((prenda)=> prenda.id_prenda == id)
    prendaUpdate.publicado = !prendaUpdate.publicado

    const prendaActualizada = Prendas.map((prenda)=>prenda.id_prenda ==id ? prendaUpdate: prenda)

    setPrendas(prendaActualizada)
  }

  const contextValue = {
    Prendas,
    agregarPrendas,
    consultPrendas,
    updatePrendas,
    updateEstado,
    updatePublicado
  };

  return (
    <prendasContex.Provider value={contextValue}>
      {children}
    </prendasContex.Provider>
  );
};


export  {  PrendasProvider }
export default prendasContex
