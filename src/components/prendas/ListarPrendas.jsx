import axios from "axios";
import { useEffect, useState } from "react";
import logof from "../../imgNavbar/light_switch off.svg";
import logon from "../../imgNavbar/light_switch on.svg";
import styles from "../../pages/proveedores.module.css";
import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import BotonCambioEstado from "../chared/BotonCambioEstado";
import BotonNegro from "../chared/BotonNegro";
import { DetallesPrendas } from "../prendas/DetallesPrendas";
import {EditarPrendas} from "./EditarPrendas";


export const ListarPrendas = () => {
  // conexión para traer todos los datos de la base de datos

  const [Prendas, setPrendas] = useState([]);
  const [detallesPrendas, setDetallesPrendas] = useState({});


  const informacionModal = (Prendas) => {
    setDetallesPrendas(Prendas);
};

  //  //Solicitud de la url
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/prendas")
      .then((res) => {
        setPrendas(res.data);
      })
      .catch((e) => {
        console.log("Error a listar las prendas");
      });
  }, [Prendas]);

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
        <div className="container-fluid seccion2" style={{ width: 0 }}>
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

          {/* boton de buscar */}
          <div className={styles.buscador}>
            <form className="d-flex">
              <input
                id="barra-buscar"
                className="form-control me-2"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
              />

              <div id="resultados-container"></div>
            </form>
          </div>
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

              {Prendas.map((Prendas) => (
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
                    <BotonCambioEstado isChecked={Prendas.publicado} />
                  </td>
                  <td>
                    <BotonCambioEstado isChecked={Prendas.estado} />
                  </td>

                  <td>

                  <BotonNegro text="Editar" modalToOpen={'#modalEditarPrenda'} onClick={EditarPrendas} />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <DetallesPrendas detallesPrendas={detallesPrendas} />
    

    </>
  );
};

export default ListarPrendas;
