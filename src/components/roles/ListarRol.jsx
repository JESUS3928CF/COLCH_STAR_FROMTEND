import "../../css-general/cssgeneral.css";
import "../../css-general/inicio_style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../pages/Roles.module.css";
import BotonCambioEstado from "../chared/BotonCambioEstado";
import EditarRol from "./EditarRol";
import Buscador from "../chared/Buscador";
import Paginador from "../chared/Paginador";
import BotonNegro from "../chared/BotonNegro";
import Swal from "sweetalert2";

const ListarRol = () => {
  //Estado de la barra de busqueda
  const [rolesFiltrar, setRolesFiltrar] = useState([]);

  const [rol, setRoles] = useState([]);

  useEffect(() => {
    // Realiza una solicitud al backend para obtener la lista de usuarios
    axios
      .get("http://localhost:3000/api/rol")
      .then((response) => {
        // Actualiza el estado con la lista de usuarios
        setRoles(response.data);

        setRolesFiltrar(response.data.slice(0, 10));
      })
      .catch((error) => {
        console.error("Error al obtener la lista de roles:", error);
      });
  }, []);

  //Estado para editar
  const [editarRol, setEditarRol] = useState("");

  //Al hacer click  en editar trae el cliente y lo guarda en setCliente
  const handleEditClick = (rol) => {
    if (!rol.estado) {
      return Swal.fire(
        "Acción inválida!",
        "Este rol no se puede editar porque está inhabilitado",
        "error"
      );
    }
    setEditarRol(rol);
  };
  return (
    <div>
      <div className="contenedor">
        <h1 className="titulo">Roles</h1>

        {/* botón agregar */}
        <div className="container-fluid seccion2" style={{ width: 0 }}>
          <div className={styles.ap}>
            <button
              type="button"
              className="btn-a"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Agregar Rol
            </button>
          </div>

          {/* Boton para Buscar/filtrar */}
          <div className={styles.buscador}>
            {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
            <Buscador
              setDatosFiltrar={setRolesFiltrar}
              datos={rol}
              camposFiltrar={["nombre", "fecha_creacion"]}
            />
          </div>
        </div>

        {/* tabla  para listar el producto */}
        <div className="tabla">
          <table className="table caption-top ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Roles</th>
                <th scope="col" className="text-center">Permisos</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Estado</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {rolesFiltrar.map((rol) => (
                <tr key={rol.id_rol}>
                  <td>{rol.id_rol}</td>
                  <td>{rol.nombre}</td>
                  <td>
                    {rol.permisos.map((permiso, index) =>
                      index === rol.permisos.length - 1
                        ? permiso
                        : permiso + ", "
                    )}
                  </td>

                  <td>{rol.fecha_creacion}</td>
                  <td>
                    <BotonCambioEstado
                      id={rol.id_rol}
                      isChecked={rol.estado}
                      nombreRegistro={"rol"}
                      ruta={`/rol/estado/${rol.id_rol}`}
                    />
                  </td>
                  <td>
                    <BotonNegro
                      text="Editar"
                      modalToOpen={rol.estado ? "#modalEditar" : ""}
                      onClick={() => handleEditClick(rol)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <EditarRol editarRol={editarRol} />
      </div>
      <div className="seccion4">
        {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
        <Paginador setDatosFiltrar={setRolesFiltrar} datos={rol} />
      </div>
    </div>
  );
};

export default ListarRol;
