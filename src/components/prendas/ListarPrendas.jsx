import axios from "axios";
import BotonAtrasPrendas from "./BotonAtras";
import { useEffect, useState } from "react";
import styles from "../../pages/proveedores.module.css";
import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import BotonCambioEstado from "../chared/BotonCambioEstado";
import BotonNegro from "../chared/BotonNegro";
import EditarPrendas from "./EditarPrendas";
import { DetallesPrendas } from "../prendas/DetallesPrendas";
import Buscador from "../chared/Buscador";
import clienteAxios from "../../config/axios";

export const ListarPrendas = () => {
  // conexión para traer todos los datos de la base de datos

  const [Prendas, setPrendas] = useState([]);
  const [detallesPrendas, setDetallesPrendas] = useState({});
  const [prendasFiltrar, setprendasFiltrar] = useState([]);

  const informacionModal = (Prendas) => {
    setDetallesPrendas(Prendas);
  };

  //  //Solicitud de la url
  useEffect(() => {

    const consultarPrendas=async()=>{
      const respuesta= await clienteAxios.get('/prendas')
      setPrendas(respuesta.data);
      setprendasFiltrar(respuesta.data)
    };

    consultarPrendas();
    
  },[]);

  const contentStyle = {
    marginLeft: "260px",
  };

  return (
    <>
      <div>
        <div style={contentStyle} className="contenedor">
          {/* {titulo} */}
          <h1 className="titulo"> Prendas</h1>

          {/* {boton de agregar */}
          <div className="container-fluid seccion3" style={{ width: 0 }}>
            <div className={styles.atras}>
              <BotonAtrasPrendas />
            </div>
            <div className={styles.ap}>
              <button
                type="button"
                className="btn-a"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                Agregar Prendas
              </button>
            </div>
          </div>

          {/* boton de buscar */}

          <div className="seccion3">
            <Buscador
              setDatosFiltrar={setprendasFiltrar}
              datos={Prendas}
              camposFiltrar={['nombre', 'cantidad']}
            />
          </div>

          {/* tabla de prendas */}

          <div className="tabla">
            <table className="table caption-top">
              {/* lista de prendas */}
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Detalles</th>
                  <th scope="col">Publicado</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Editar</th>
                </tr>
              </thead>
              <tbody>
                {/* {Datos traidos por el set prendas que realiza un mapeo} */}

                {prendasFiltrar.map((Prendas) => (
                  <tr key={Prendas.id}>
                    <td>{Prendas.id_prenda}</td>
                    <td>{Prendas.nombre}</td>
                    <td>{Prendas.cantidad}</td>
                    <td>{Prendas.precio}</td>
                    <td>
                      <BotonNegro
                        text="Ver"
                        modalToOpen="#modalDetallePrendas"
                        onClick={() => informacionModal(Prendas)}
                      />
                    </td>
                    <td>
                      <BotonCambioEstado isChecked={Prendas.publicado} ruta={`/prendas/publicado/${Prendas.id_prenda}`} />
                    </td>
                    <td>
                      <BotonCambioEstado isChecked={Prendas.estado} ruta={`/prendas/estado/${Prendas.id_prenda}`} />
                    </td>

                    <td>
                      <BotonNegro
                        text="Editar"
                        modalToOpen={"#modalEditarPrenda"}
                        onClick={() => informacionModal(Prendas)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DetallesPrendas detallesPrendas={detallesPrendas} />
      <EditarPrendas detallesPrendas={detallesPrendas} />
    </>
  );
};

export default ListarPrendas;
