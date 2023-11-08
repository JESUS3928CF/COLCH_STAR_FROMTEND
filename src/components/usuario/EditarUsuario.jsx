// ------------------HERLYN NORBEY DAVID POSO
//-------------------10 de octubre 2023
//Nos permitira editar un usuario, se podra editar el usuario mediante un formulario con sus respectivas validaciones donde se ingresaran los datos a editar
//de este usuario y luego se mostrara en la tabla listar usuarios los cambios realizados
import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { validarEspaciosVacios } from "../../Validations/validations";
import AlertaError from "../chared/AlertaError";

//Componente
const EditarUsuario = ({ editarUsuario }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Añade esta función para actualizar dinámicamente los valores
  } = useForm();
  const idAdministrador = 1;
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a tu API para obtener los roles
    axios
      .get("http://localhost:3000/api/rol")
      .then((response) => {
        setRoles(response.data); // Actualiza el estado con la lista de roles
      })
      .catch((error) => {
        console.error("Error al obtener los roles", error);
      });
  }, []);

    // Cuando editarUsuario cambia, actualiza los valores del formulario
  useEffect(() => {
    if (editarUsuario) {
      setValue("nombre", editarUsuario.nombre);
      setValue("apellido", editarUsuario.apellido);
      setValue("telefono", editarUsuario.telefono);
      setValue("email", editarUsuario.email);
      setValue("fk_rol", editarUsuario.fk_rol);
    }
  }, [editarUsuario]);

  const esAdministrador =
  editarUsuario && editarUsuario.fk_rol === idAdministrador;

    /// Función para guardar el cliente en la DB
  const onSubmit = (data) => {
    const { nombre, apellido, telefono, email, fk_rol } = data;

        // Ruta
    if (editarUsuario.id_usuario) {
      axios
        .patch(
          `http://localhost:3000/api/usuarios/${editarUsuario.id_usuario}`,
          {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.trim(),
            email: email.trim(),
            fk_rol: fk_rol,
          }
        )
        .then((response) => {
          console.log("Usuario Actualizado:", response.data);
          Swal.fire({
            title: "Usuario Actualizado",
            text: response.data.message,
            icon: "success",
          }).then(() => {
            location.reload();
          });
        })
        .catch((error) => {
          console.error("Error al actualizar el usuario", error);
          if (error.response && error.response.status === 400) {
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
            }).then(() => {
              location.reload();
            });
          }
        });
    } else {
      console.error("No se pudo obtener el ID del usuario");
    }
  };

  return (
    <div>
          {/* modal de editar usuarios */}
      <div className="modal" id="modalEditar">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="editar edi">
              <h5 className="modal-title">Editar datos del usuario</h5>
              <button
                type="button"
                id="xEditar"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="row g-3 needs-validation"
                action=""
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-md-6" name="divNombre">
                  <label htmlFor="nombreEditar" className="col-form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreEditar"
                    name="nombre"
                    placeholder=""
                    //register es una funcion, nos devuelve propiedades, para asigar esas propiedades al input  se pone . . .
                    //  identificador Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                    {...register("nombre", {
                      required: {  // Es una propiedad que indica que el campo es obligatorio. 
                        value: true,  // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                        message: "El nombre es obligatorio",  // es un mensaje que se mostrará si la validación falla.
                      },
                      validate: (value) => {
                        return validarEspaciosVacios(value);
                      },
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message:
                          "El nombre no puede contener números ni caracteres especiales",
                      },
                    })}
                  />
                  {errors.nombre && (
                    <AlertaError message={errors.nombre.message} />
                  )}
                </div>
                <div className="col-md-6" name="divApellido">
                  <label htmlFor="apellidoEditar" className="col-form-label">
                    Apellido:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellidoEditar"
                    name="apellido"
                    placeholder=""
                    {...register("apellido", {
                      required: {
                        value: true,
                        message: "El apellido es obligatorio",
                      },
                      validate: (value) => {
                        return validarEspaciosVacios(value);
                      },
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message:
                          "El apellido no puede contener números ni caracteres especiales",
                      },
                    })}
                  />
                  {errors.apellido && (
                    <AlertaError message={errors.apellido.message} />
                  )}
                </div>
                <div className="col-md-6" name="divTelefono">
                  <label htmlFor="telefonoEditar" className="col-form-label">
                    Teléfono:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefonoEditar"
                    name="telefono"
                    placeholder=""
                    {...register("telefono", {
                      required: {
                        value: true,
                        message: "El telefono es obligatorio",
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "No se permiten letras ni espacios en blanco",
                      },
                      validate: (value) => {
                        const telefonoSinEspacios = value.replace(/\s/g, "");
                        if (
                          telefonoSinEspacios.length < 7 ||
                          telefonoSinEspacios.length > 11
                        ) {
                          return "El telefono debe tener mínimo 7 dígitos y máximo 12";
                        }
                        return true;
                      },
                    })}
                  />
                  {errors.telefono && (
                    <AlertaError message={errors.telefono.message} />
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="emailEditar" className="col-form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailEditar"
                    name="email"
                    placeholder=""
                    {...register("email", {
                      required: {
                        value: true,
                        message: "El email es obligatorio",
                      },
                      validate: (value) => {
                        return validarEspaciosVacios(value);
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "El Email no tiene un formato válido",
                      },
                    })}
                  />
                  {errors.email && (
                    <AlertaError message={errors.email.message} />
                  )}
                </div>
                {!esAdministrador && (
                  <div className="mb-3">
                    <label htmlFor="rol" className="col-form-label">
                      Rol:
                    </label>
                    <select
                      name="rol"
                      className="form-control"
                      {...register("fk_rol", {
                        required: {
                          value: true,
                          message: "Debe seleccionar un rol",
                        },
                      })}
                    >
                      <option value="">Seleccionar rol</option>
                      {roles.map((rol) => {
                        if (rol.nombre !== "Administrador") {
                          return (
                            <option key={rol.id_rol} value={rol.id_rol}>
                              {rol.nombre}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </select>
                    {errors.fk_rol && (
                      <AlertaError message={errors.fk_rol.message} />
                    )}
                  </div>
                )}
                <div className="modal-footer">
                  <CancelarModal />
                  <GuardarModal />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;