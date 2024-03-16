import { createContext, useEffect, useState } from "react";
import usuarioAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
const usuariosContext = createContext();
import axios from "axios";
import useMovimientos from '../hooks/useMovimientos';


const UsuariosProvider = ({ children }) => {
  const { config, auth } = useAuth();
  const {consultarMovimientos,notificaciones,notificacion}= useMovimientos()


  // primer state
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  // función para obtener los clientes solo cuando se carge el componente

  const consultarUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const { data } = await usuarioAxios.get("/usuarios", config);

      setUsuarios(data);
    } catch (error) {
      Swal.fire({
          title: 'Error',
          text: 'Error al consultar los usuarios. Vuelva a intentarlo.',
          icon: 'error',
      });
    }
  };
  useEffect(() => {
    consultarUsuarios();
  }, [auth]);

  const agregarUsuario = async (usuario, reset, handleClose) => {
    try {
      const res = await usuarioAxios.post("/usuarios", usuario, config);

      // Lanzar alerta del producto agregado
      Swal.fire({
        title: "Usuario agregado",
        text: res.data.message,
        icon: "success",
      }).then(() => {
        reset();
        consultarUsuarios();
        notificaciones(notificacion+1)
        consultarMovimientos()
        handleClose();
      });
    } catch (err) {
      if (err.response && err.response.status === 403) {
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
        });
      } else {
        // En caso de otros errores, muestra una alerta genérica de error
        Swal.fire({
          title: "Error",
          text: "Hubo un error",
          icon: "error",
        }).then(() => {
          handleClose();
        });
      }
    }
  };

  const editarUsuarios = (data, editarUsuario, handleClose) => {
    const { nombre, apellido, telefono, email, fk_rol } = data;

    if (editarUsuario.id_usuario) {
      axios
        .patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${
            editarUsuario.id_usuario
          }`,
          {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.trim(),
            email: email.trim(),
            fk_rol: fk_rol,
          },
          config
        )
        .then((response) => {
          Swal.fire({
            title: "Usuario Actualizado",
            text: response.data.message,
            icon: "success",
          }).then(() => {
            consultarUsuarios();
            notificaciones(notificacion+1)
            consultarMovimientos()
            handleClose();
          });
        })
        .catch((error) => {
          console.error("Error al actualizar el usuario", error);
          if (error.response && error.response.status === 403) {
            Swal.fire({
              title: "Error",
              text: error.response.data.message,
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Hubo un error",
              icon: "error",
            })
          }
        });
    } else {
      console.error("No se pudo obtener el ID del usuario");
    }
  };

  const editarEstado = (id) => {
    let usuarioEditado = usuarios.find((usuario) => usuario.id_usuario === id);
    usuarioEditado.estado = !usuarioEditado.estado;

    const usuarioActualizado = usuarios.map((usuario) =>
      usuario.id_usuario == id ? usuarioEditado : usuario
    );

    setUsuarios(usuarioActualizado);
    notificaciones(notificacion+1)
    consultarMovimientos()

  };

  return (
      <usuariosContext.Provider
          value={{
              usuarios,
              editarEstado,
              agregarUsuario,
              editarUsuarios,
              consultarUsuarios,
              busqueda, 
              setBusqueda
          }}
      >
          {children}
      </usuariosContext.Provider>
  );
};

export { UsuariosProvider };
export default usuariosContext;
