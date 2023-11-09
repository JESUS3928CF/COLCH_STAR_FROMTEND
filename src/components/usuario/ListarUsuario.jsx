// ------------------HERLYN NORBEY DAVID POSO
//-------------------10 de octubre 2023
// Nos permitirá Listar uno o todos los usuarios de la base de datos y que agreguemos por medio del agregar usuario,
// existirá una barra buscar que nos permite buscar cualquier información de estos usuarios, la busqueda se realiza por cualquier campo que este en esta tabla
import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import style from "../../pages/Clientes.module.css";
import BotonCambioEstado from "../chared/BotonCambioEstado";
import EditarUsuario from "./EditarUsuario";
import Buscador from "../chared/Buscador";
import Paginador from "../chared/Paginador";
import BotonNegro from "../chared/BotonNegro";
import Swal from "sweetalert2";
import Header from "../chared/header/Header";
import crossing_out from "../roles/crossing_out.svg";
import { calcularAnchoDePantalla } from "../../helpers/calcularAnchoDePantalla";
import styles from "../../css-general/CardStyleGenerar.module.css";
import { resolucionCars } from "../../constantes/constantes.js";

const ListarUsuario = () => {
  //Estado de la barra de busqueda
  const [usuariosFiltrar, setUsuariosFiltrar] = useState([]);

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Realiza una solicitud al backend para obtener la lista de usuarios
    axios
      .get("http://localhost:3000/api/usuarios")
      .then((response) => {
        // Actualiza el estado con la lista de usuarios
        setUsuarios(response.data);

        setUsuariosFiltrar(response.data.slice(0, 10));
      })
      .catch((error) => {
        console.error("Error al obtener la lista de usuarios:", error);
      });
  }, []);

  //Esatdo para editar
  const [editarUsuario, setEditarUsuario] = useState("");

  //Al hacer click  en editar trae el usuario y lo guarda en setUsuario
  const handleEditClick = (usuario) => {
    if (!usuario.estado) {
      return Swal.fire(
        "Acción inválida!",
        "Este usuario no se puede editar porque está Inhabilitado",
        "error"
      );
    }
    setEditarUsuario(usuario);
  };

  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  useEffect(() => {
    /// Calcular el ancho de pantalla actual
    calcularAnchoDePantalla(setAnchoPantalla);
  }, []);

  return (
    <div>
      <div>
        <Header titulo="Gestión de Usuarios" />

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
                data-bs-target="#myModal"
              >
                Agregar Usuario
              </button>
            </div>

            {/* Boton para Buscar/filtrar */}
            <div
              className={`${style.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
            >
              {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
              <Buscador
                setDatosFiltrar={setUsuariosFiltrar}
                datos={usuarios}
                camposFiltrar={["nombre", "apellido", "telefono", "email"]}
              />
            </div>
          </div>
        </div>
        {/* tabla  para listar usuarios */}
        {anchoPantalla >= resolucionCars ? (<div className="tabla">
          <table className="table caption-top ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Email</th>
                <th scope="col">Rol</th>
                <th scope="col">Estado</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrar.map((usuario) => (
                <tr key={usuario.id_usuario}>
                  <td>{usuario.id_usuario}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol ? usuario.rol.nombre : "N/A"}</td>
                  <td>
                    {usuario.rol && usuario.rol.nombre === "Administrador" ? (
                      <img
                        width="50px"
                        src={crossing_out}
                        alt="No permitido"
                        style={{ marginLeft: "18px" }}
                      />
                    ) : (
                      <BotonCambioEstado
                        id={usuario.id_usuario}
                        isChecked={usuario.estado}
                        nombreRegistro={"usuario"}
                        ruta={`/usuarios/estado/${usuario.id_usuario}`}
                      />
                    )}
                  </td>
                  <td>
                    <BotonNegro
                      text="Editar"
                      modalToOpen={usuario.estado ? "#modalEditar" : ""}
                      onClick={() => handleEditClick(usuario)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ):(<div className={`row pt-4 justify-content-center`}>
        {usuariosFiltrar.map((usuario) => (
          <div
            className={`col-md-4 col-sm-6 col-xs-12`}
            key={usuario.id_usuario}
          >
            <div className={`card mb-4 ${styles.contenedor_card}`}>
              <div className="card-body">
                <p className={styles.text}>
                  Id: <span>{usuario.id_usuario}</span>
                </p>
                <p className={styles.text}>
                  Nombres: <span>{usuario.nombre}</span>
                </p>
                <p className={styles.text}>
                  Apellidos: <span>{usuario.apellido}</span>
                </p>
                <p className={styles.text}>
                  Teléfono: <span>{usuario.telefono}</span>
                </p>
                <p className={styles.text}>
                  Email: <span>{usuario.email}</span>
                </p>
                <p className={styles.text}>
                  Rol: <span>{usuario.rol ? usuario.rol.nombre : "N/A"}</span>
                </p>

                <div className="row pt-3">
                  <div className="col justify-content-start align-items-center ">
                    <div className="">
                      <strong className={`${styles.textoEstado}`}>
                        {" "}
                        Estado{" "}
                      </strong>
                    </div>
                    <div className="">
                    {usuario.rol && usuario.rol.nombre === "Administrador" ? (
                      <img
                        width="50px"
                        src={crossing_out}
                        alt="No permitido"
                        style={{ marginLeft: "18px" }}
                      />
                    ) : (
                      <BotonCambioEstado
                        id={usuario.id_usuario}
                        isChecked={usuario.estado}
                        nombreRegistro={"usuario"}
                        ruta={`/usuarios/estado/${usuario.id_usuario}`}
                      />
                    )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div
                    className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                  >
                    <BotonNegro
                      text="Editar"
                      modalToOpen={usuario.estado ? "#modalEditar" : ""}
                      onClick={() => handleEditClick(usuario)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
        <EditarUsuario editarUsuario={editarUsuario} />
      </div>

      <div className="seccion4">
        {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
        <Paginador setDatosFiltrar={setUsuariosFiltrar} datos={usuarios} />
      </div>
    </div>
  );
};
export default ListarUsuario;