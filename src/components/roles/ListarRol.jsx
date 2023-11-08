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
import Header from "../chared/header/Header";
import crossing_out from "../roles/crossing_out.svg";


const ListarRol = () => {
  // Estado de la barra de búsqueda
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

  // Estado para editar
  const [editarRol, setEditarRol] = useState("");

  // Al hacer clic en editar, trae el rol y lo guarda en setEditarRol
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
        <Header titulo="Gestión de Roles" />

        <div className="container-fluid">
          <div className="row">
            <div className={`${styles.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}>
              <button
                type="button"
                className="btn-a"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                Agregar Rol
              </button>
            </div>

            <div className={`${styles.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}>
              <Buscador
                setDatosFiltrar={setRolesFiltrar}
                datos={rol}
                camposFiltrar={["nombre", "fecha_creacion"]}
              />
            </div>
          </div>
        </div>

        <div className="tabla">
          <table className="table caption-top ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Roles</th>
                <th scope="col" className="text-center">
                  Permisos
                </th>
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
                    {rol.nombre === "Administrador" ? (
                      <img width="50px"  src={crossing_out} alt="No permitido" style={{ marginLeft: '18px' }}/>
                    ) : (
                      <BotonCambioEstado
                        id={rol.id_rol}
                        isChecked={rol.estado}
                        nombreRegistro="rol"
                        ruta={`/rol/estado/${rol.id_rol}`}
                      />
                    )}
                  </td>
                  <td>
                    {rol.nombre === "Administrador" ? (
                      <img width="50px" src={crossing_out} alt="No permitido" style={{ marginLeft: '18px' }}/>
                    ):(
                      <BotonNegro
                        text="Editar"
                        modalToOpen={rol.estado ? "#modalEditar" : ""}
                        onClick={() => handleEditClick(rol)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <EditarRol editarRol={editarRol} />
      </div>
      <div className="seccion4">
        <Paginador setDatosFiltrar={setRolesFiltrar} datos={rol} />
      </div>
    </div>
  );
};

export default ListarRol;

// import "../../css-general/cssgeneral.css";
// import "../../css-general/inicio_style.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import styles from "../../pages/Roles.module.css";
// import BotonCambioEstado from "../chared/BotonCambioEstado";
// import EditarRol from "./EditarRol";
// import Buscador from "../chared/Buscador";
// import Paginador from "../chared/Paginador";
// import BotonNegro from "../chared/BotonNegro";
// import Swal from "sweetalert2";
// import Header from "../chared/header/Header";
// import crossing_out from "../roles/crossing_out.svg";

// const ListarRol = () => {
//   // Estado de la barra de búsqueda
//   const [rolesFiltrar, setRolesFiltrar] = useState([]);
//   const [rol, setRoles] = useState([]);

//   useEffect(() => {
//     // Realiza una solicitud al backend para obtener la lista de usuarios
//     axios
//       .get("http://localhost:3000/api/rol")
//       .then((response) => {
//         // Actualiza el estado con la lista de usuarios
//         setRoles(response.data);
//         setRolesFiltrar(response.data.slice(0, 10));
//       })
//       .catch((error) => {
//         console.error("Error al obtener la lista de roles:", error);
//       });
//   }, []);

//   // Estado para editar
//   const [editarRol, setEditarRol] = useState("");

//   // Al hacer clic en editar, trae el rol y lo guarda en setEditarRol
//   const handleEditClick = (rol) => {
//     if (!rol.estado) {
//       return Swal.fire(
//         "Acción inválida!",
//         "Este rol no se puede editar porque está inhabilitado",
//         "error"
//       );
//     }
//     setEditarRol(rol);
//   };

//   return (
//     <div>
//       <div className="contenedor">
//         <Header titulo="Gestión de Roles" />

//         <div className="container-fluid">
//           <div className="row">
//             <div className={`${styles.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}>
//               <button
//                 type="button"
//                 className="btn-a"
//                 data-bs-toggle="modal"
//                 data-bs-target="#myModal"
//               >
//                 Agregar Rol
//               </button>
//             </div>

//             <div className={`${styles.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}>
//               <Buscador
//                 setDatosFiltrar={setRolesFiltrar}
//                 datos={rol}
//                 camposFiltrar={["nombre", "fecha_creacion"]}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="tabla">
//           <table className="table caption-top ">
//             <thead>
//               <tr>
//                 <th scope="col">ID</th>
//                 <th scope="col">Roles</th>
//                 <th scope="col" className="text-center">
//                   Permisos
//                 </th>
//                 <th scope="col">Fecha de creación</th>
//                 <th scope="col">Estado</th>
//                 <th scope="col">Editar</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rolesFiltrar.map((rol) => (
//                 <tr key={rol.id_rol}>
//                   <td>{rol.id_rol}</td>
//                   <td>{rol.nombre}</td>
//                   <td>
//                     {rol.permisos.map((permiso, index) =>
//                       index === rol.permisos.length - 1
//                         ? permiso
//                         : permiso + ", "
//                     )}
//                   </td>
//                   <td>{rol.fecha_creacion}</td>
//                   <td>
//                     {rol.nombre === "Administrador" ? (
//                       <img width="50px" src={crossing_out} alt="No permitido" style={{ marginLeft: '18px' }} />
//                     ) : (
//                       <BotonCambioEstado
//                         id={rol.id_rol}
//                         isChecked={rol.estado}
//                         nombreRegistro="rol"
//                         ruta={`/rol/estado/${rol.id_rol}`}
//                       />
//                     )}
//                   </td>
//                   <td>
//                     {rol.nombre === "Administrador" ? (
//                       <img width="50px" src={crossing_out} alt="No permitido" style={{ marginLeft: '18px' }}/>
//                     ):(
//                       <BotonNegro
//                         text="Editar"
//                         modalToOpen={rol.estado ? "#modalEditar" : ""}
//                         onClick={() => handleEditClick(rol)}
//                       />
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <EditarRol editarRol={editarRol} />
//       </div>
//       <div className="seccion4">
//         <Paginador setDatosFiltrar={setRolesFiltrar} datos={rol} />
//       </div>
//     </div>
//   );
// };

// export default ListarRol;
