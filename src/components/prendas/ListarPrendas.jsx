//----------TOMAS SANTIAGO VANEGAS SANCHEZ---------------
//---------- 26 de septiembre 2023

//Permitira ver los datos que estan en la base de datos y la representara en una tabla y en un boton
// ver detalles donde nos mostrara una informacion mas completa

//Tiene una barra de busquede que nos ayudara a buscar una prenda en la tabla 


import { useEffect, useState } from "react";
import style from "../../pages/proveedores.module.css";
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
import Paginador from "../chared/Paginador";
import Swal from "sweetalert2";
import Header from "../chared/header/Header";
import { calcularAnchoDePantalla } from "../../helpers/calcularAnchoDePantalla";
import styles from "../../css-general/CardStyleGenerar.module.css";
import { resolucionCards } from "../../constantes/constantes.js";

export const ListarPrendas = () => {
  // conexión para traer todos los datos de la base de datos

  const [Prendas, setPrendas] = useState([]);
  const [detallesPrendas, setDetallesPrendas] = useState({});
  const [prendasFiltrar, setprendasFiltrar] = useState([]);



  const informacionModal = (Prendas) => {

    if (!Prendas.estado) {
      return Swal.fire("Accion invalida!", "", "error");
    }
    setDetallesPrendas(Prendas);
  };

  //Solicitud de la url
  useEffect(() => {
    const consultarPrendas = async () => {
      const respuesta = await clienteAxios.get("/prendas");
      setPrendas(respuesta.data);
      setprendasFiltrar(respuesta.data);
    };

    consultarPrendas();
  }, []);

  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  useEffect(() => {
    /// Calcular el ancho de pantalla actual
    calcularAnchoDePantalla(setAnchoPantalla);
  }, []);


  return (
    <>
      <div>
        <Header titulo='Gestión de Prendas' />


        <div className='container-fluid'>
          <div className='row'>
            <div
              className={`${style.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
            >
              <button
                type='button'
                className='btn-a'
                data-bs-toggle='modal'
                data-bs-target='#myModal'
              >
                Agregar Prenda
              </button>
            </div>

            {/* Boton para Buscar/filtrar */}
            <div
              className={`${style.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
            >
              {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
              <Buscador
                setDatosFiltrar={setprendasFiltrar}
                datos={Prendas}
                camposFiltrar={[
                  'id_prenda',
                  'nombre',
                  'cantidad',
                  'precio'

                  


                ]}
              />
            </div>
          </div>
        </div>





        {/* tabla de prendas */}
        {anchoPantalla >= resolucionCards ? (<div className="tabla">
          <table className="table caption-top">
            {/* lista de prendas */}
            <thead>
              <tr >
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Publicado</th>
                <th scope="col">Estado</th>
                <th scope="col">Detalles</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {/* {Datos traidos por el set prendas que realiza un mapeo} */}

              {prendasFiltrar.map((Prendas, index) => (
                <tr key={index}>

                  <td>{Prendas.id_prenda}</td>
                  <td>{Prendas.nombre}</td>
                  <td>{Prendas.cantidad}</td>
                  <td>{Prendas.precio}</td>

                  <td>
                    <BotonCambioEstado
                      id={1}
                      isChecked={Prendas.publicado}
                      nombreRegistro={'Prenda en el catalogo'}
                      ruta={`/prendas/publicado/${Prendas.id_prenda}`}
                      cambiarPublicacion={{

                        estado: Prendas.estado,
                        paraPublicacion: true

                      }
                      }
                    />
                  </td>
                  <td>
                    <BotonCambioEstado
                      id={2}
                      isChecked={Prendas.estado}
                      nombreRegistro={'Prenda en el estado '}
                      ruta={`/prendas/estado/${Prendas.id_prenda}`}

                    />
                  </td>

                  <td>
                    <BotonNegro
                      text="Ver"
                      modalToOpen=
                      "#modalDetallePrendas"

                      onClick={() => setDetallesPrendas(Prendas)}
                    />
                  </td>
                  <td>
                    <BotonNegro
                      text="Editar"
                      modalToOpen={Prendas.estado ? "#modalEditarPrenda" : ""}
                      onClick={() => informacionModal(Prendas)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>) : (<div className={`row pt-4 justify-content-center`}>
          {prendasFiltrar.map((Prendas) => (
            <div
              className={`col-md-4 col-sm-6 col-xs-12`}
              key={Prendas.id_prenda}
            >
              <div
                className={`card mb-4 ${styles.contenedor_card}`}
              >
                <div className='card-body'>
                  <p className={styles.text}>
                    Id: <span>{Prendas.id_prenda}</span>
                  </p>
                  <p className={styles.text}>
                    Nombres: <span>{Prendas.nombre}</span>
                  </p>
                  <p className={styles.text}>
                    Cantidad:{' '}
                    <span>{Prendas.cantidad}</span>
                  </p>
                  <p className={styles.text}>
                    Precio:{' '}
                    <span>{Prendas.telefono}</span>
                  </p>

                  <div className='row pt-3'>
                    <div className='col-6 justify-content-center align-items-center '>
                      <div className='text-center'>
                        <strong
                          className={`${styles.textoEstado}`}
                        >
                          {' '}
                          Publicado{' '}
                        </strong>
                      </div>
                      <div className='text-center'>
                        <BotonCambioEstado
                          id={Prendas.id_prenda}
                          isChecked={Prendas.publicado}
                          nombreRegistro='Prendas'
                          ruta={`/prendas/publicado/${Prendas.id_prenda}`}
                          cambiarPublicacion={{
                            estado: Prendas.estado,
                            paraPublicacion: true,
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-6 justify-content-center align-items-center'>
                      <div className='text-center'>
                        <strong className={styles.textoEstado}>
                          {' '}
                          Inhabilitar{' '}
                        </strong>
                      </div>
                      <div className='text-center'>
                        <BotonCambioEstado
                          id={Prendas.id_prenda}
                          isChecked={Prendas.estado}
                          nombreRegistro='Prendas'
                          ruta={`/prendas/estado/${Prendas.id_prenda}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-footer'>
                  <div className='row'>
                    <div
                      className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                    >
                      <BotonNegro
                        text='Detalles'
                        modalToOpen='#modalDetallePrendas'
                        onClick={() =>
                          setDetallesPrendas(Prendas)
                        }
                      />
                    </div>
                    <div
                      className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                    >
                      <BotonNegro
                        text='Editar'
                        modalToOpen={
                          Prendas.estado ? '#modalEditarPrenda' : ''
                        }
                        onClick={() =>
                          informacionModal(Prendas)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>)}



        <div className="seccion4">
          {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
          <Paginador setDatosFiltrar={setprendasFiltrar} datos={Prendas} />
        </div>
      </div>
      <DetallesPrendas detallesPrendas={detallesPrendas} />
      <EditarPrendas detallesPrendas={detallesPrendas} />
    </>
  );
};

export default ListarPrendas;
