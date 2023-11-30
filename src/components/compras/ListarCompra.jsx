import React from "react";
import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import style from "../../pages/Clientes.module.css";
import Header from "../chared/header/Header";
import Buscador from "../chared/Buscador";
import Paginador from "../chared/Paginador";
import BotonNegro from "../chared/BotonNegro";
import BotonCambioEstado from "../chared/BotonCambioEstado";
import { useEffect, useState } from "react";
import axios from "axios";
import {DetalleCompras} from "./DetallesCompras";
import AgregarCompras from "./AgregarCompra";
import useAuth from "../../hooks/useAuth";

const ListarCompra = () => {
  //Estado de la barra de busqueda
  const [comprasFiltrar, setComprasFiltrar] = useState([]);

  // Conexión para traer todos los datos de la base de datos, con la compra que es que se va hacer el mapeo en la tabla listar
  const [compra, setCompras] = useState([]);
  const [details, setDetails]= useState([])
  const [detallesCompras, setDetalleCompra] = useState({});
  const [proveedor,setProveedor]= useState({})

  // useEffect(()=>{
  //   axios.get('')
  // })

  

  const { auth } = useAuth();

useEffect(()=>{
  const token = localStorage.getItem('token');
  if (!token) return;

  axios.get('http://localhost:3000/api/compraDetalles')
  .then((res)=>{
    setDetails(res.data)
  })
},[auth])


  // Solicitud a la url
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Realiza una solicitud al backend para obtener la lista de usuarios
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/compra`)
      .then((response) => {
        // Actualiza el estado con la lista de compras
        setCompras(response.data);

        setComprasFiltrar(response.data.slice(0, 10));
      })
      .catch((error) => {
        console.error("Error al obtener la lista de compras:", error);
      });
  }, [auth]);




  return (
    <>
    <div>
      <div>
        <Header titulo="Gestión de Compras" />

        {/* botón agregar */}
        <div className="container-fluid">
          <div className="row">
            <div
              className={`${style.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
            >
              <button
                type="button"
                className="btn-a"
                data-bs-toggle="modal"
                data-bs-target="#myModalAgregarComprar"
              >
                Agregar Compra
              </button>
            </div>

            {/* Boton para Buscar/filtrar */}
            <div
              className={`${style.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
            >
              {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
              <Buscador
                setDatosFiltrar={setComprasFiltrar}
                datos={compra}
                camposFiltrar={["proveedor", "fecha" ,"total_de_compra"]}
              />
            </div>
          </div>
        </div>
        <div className="tabla">
          <table className="table caption-top ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre proveedor</th>
                <th scope="col">Total compra</th>
                <th scope="col">Fecha de compra</th>
                <th scope="col">Estado</th>
                <th scope="col">Detalles</th>

              </tr>
            </thead>
            <tbody>
              {comprasFiltrar.map((compra) => (
                <tr key={compra.id_compra}>
                  <td>{compra.id_compra}</td>
                  <td>{compra.proveedor ? compra.proveedor.nombre : "N/A"}</td>
                  <td>{compra.total_de_compra}</td>
                  <td>{compra.fecha}</td>
                  <td>
                    <BotonCambioEstado
                      id={compra.id_compra}
                      isChecked={compra.estado}
                      nombreRegistro={"compra"}
                      ruta={`/compra/estado/${compra.id_compra}`}
                    />
                  </td>
                  <td>
                    <BotonNegro
                      text="Ver"
                      modalToOpen= {"#modalDetalleCompra"}
                      onClick={() => setDetalleCompra(compra)}
                    />
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="seccion4">
        {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
        <Paginador setDatosFiltrar={setComprasFiltrar} datos={compra} />
      </div>
    </div>
    <DetalleCompras detallesCompras={detallesCompras}/>


    </>
  );
};

export default ListarCompra;
