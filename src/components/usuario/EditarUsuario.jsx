// ------------------HERLYN NORBEY DAVID POSO
//-------------------10 de octubre 2023
//Nos permitira editar un usuario, se podra editar el usuario mediante un formulario con sus respectivas validaciones donde se ingresaran los datos a editar
//de este usuario y luego se mostrara en la tabla listar usuarios los cambios realizados
import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import { useForm } from "react-hook-form";
import { validarEspaciosVacios } from "../../Validations/validations";
import AlertaError from "../chared/AlertaError";
import useAuth from "../../hooks/useAuth";
import { Modal } from "react-bootstrap";
import HeaderModals from "../chared/HeaderModals";
import useUsuario from "../../hooks/useUsuario";

const EditarUsuario = ({ editarUsuario, handleClose, show }) => {
  const { editarUsuarios } = useUsuario();

  const { config } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset, //Resetea el formulario
  } = useForm({
    mode: "onChange",
  });

  const [roles, setRoles] = useState([]);
  const [idAdministrador, setIdAdministrador] = useState(null);
  const [esAdministrador, setEsAdministrador] = useState(false);
  const [selectedRol, setSelectedRol] = useState("");

  let rol = {};

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/rol`, config)
      .then((response) => {
        setRoles(response.data);

        const administrador = response.data.find(
          (rol) => rol.nombre === "Administrador"
        );

        if (administrador) {
          setIdAdministrador(administrador.id_rol);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los roles", error);
      });
  }, []);

  useEffect(() => {
    if (editarUsuario) {
      /// Obtener el rol actual
      rol = roles.find((rol) => rol.id_rol == editarUsuario.fk_rol);

      setValue("nombre", editarUsuario.nombre);
      setValue("apellido", editarUsuario.apellido);
      setValue("telefono", editarUsuario.telefono);
      setValue("email", editarUsuario.email);

      setValue("fk_rol", rol.estado ? editarUsuario.fk_rol : "");

      setEsAdministrador(editarUsuario.fk_rol === idAdministrador);
    }
  }, [editarUsuario, idAdministrador, show]);

  const onSubmit = (data) => {
    editarUsuarios(data, editarUsuario, handleClose);
  };

  return (
    <div>
      {/* modal de editar usuarios */}
      <Modal
        show={show}
        onHide={() => {
          reset();
          handleClose();
        }}
        className="modal d-flex align-items-center justify-content-center"
        id="modalEditar"
      >
        <div className="modal-content">
          <HeaderModals
            title={"Editar usuario"}
            handleClose={() => {
              reset();
              handleClose();
            }}
          />
          <div className="modal-body">
            <form
              className="row g-3 needs-validation"
              action=""
            >
              <div className="col-md-6" name="divNombre">
                <label htmlFor="nombreEditar" className="col-form-label">
                  Nombres: *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreEditar"
                  name="nombre"
                  placeholder=". . ."
                  //register es una funcion, nos devuelve propiedades, para asigar esas propiedades al input  se pone . . .
                  //  identificador Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                  {...register("nombre", {
                    required: {
                      // Es una propiedad que indica que el campo es obligatorio.
                      value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                      message: "El nombre es obligatorio", // es un mensaje que se mostrará si la validación falla.
                    },
                    validate: (value) => {
                      if (value.trim().length < 3 || value.length > 20) {
                        return "El nombre debe tener entre 3 y 20 caracteres";
                      }
                      if (!/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(value)) {
                        return "El nombre solo puede tener letras";
                      }
                      if (value.includes(" ")) {
                        return validarEspaciosVacios(value);
                      }

                      return true;
                    },
                  })}
                  onChange={(e) => {
                    const inputValue = e.target.value.slice(0, 21);
                    setValue("nombre", inputValue);
                    trigger("nombre");
                  }}
                />
                {errors.nombre && (
                  <AlertaError message={errors.nombre.message} />
                )}
              </div>
              <div className="col-md-6" name="divApellido">
                <label htmlFor="apellidoEditar" className="col-form-label">
                  Apellidos: *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellidoEditar"
                  name="apellido"
                  placeholder=". . ."
                  {...register("apellido", {
                    required: {
                      value: true,
                      message: "El apellido es obligatorio",
                    },
                    validate: (value) => {
                        if (value.trim().length < 3 || value.length > 20) {
                            return 'El apellido debe tener entre 3 y 20 caracteres';
                        }
                        if (!/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(value)) {
                            return 'El apellido solo puede tener letras';
                        }
                        if (value.includes(" ")) {
                            return validarEspaciosVacios(value);
                        }
                        
                        return true;
                    },
                  })}
                  onChange={(e) => {
                    const inputValue = e.target.value.slice(0, 21);
                    setValue("apellido", inputValue);
                    trigger("apellido");
                  }}
                />
                {errors.apellido && (
                  <AlertaError message={errors.apellido.message} />
                )}
              </div>
              <div className="col-md-6" name="divTelefono">
                <label htmlFor="telefonoEditar" className="col-form-label">
                  Teléfono: *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telefonoEditar"
                  name="telefono"
                  placeholder=". . ."
                  {...register("telefono", {
                    required: {
                      value: true,
                      message: "El teléfono es obligatorio",
                    },
                    validate: (value) => {
                        if (value.includes(" ")) {
                            return 'No se permiten espacios en blanco';
                        }
                        if (!/^\d+$/.test(value)) {
                            return 'El télefono solo puede tener números';
                        }
                        if (value.startsWith("0")) {
                            return 'El teléfono no puede iniciar con 0';
                        }
                        if (value.length < 7 || value.length > 10) {
                            return 'El teléfono debe tener entre 7 y 10 dígitos';
                        }
                        return true;
                    },
                  })}
                  onChange={(e) => {
                    const inputValue = e.target.value.slice(0, 11);
                    setValue("telefono", inputValue);
                    trigger("telefono");
                  }}
                />
                {errors.telefono && (
                  <AlertaError message={errors.telefono.message} />
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="emailEditar" className="col-form-label">
                Correo electrónico: *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emailEditar"
                  name="email"
                  placeholder=". . ."
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El email es obligatorio",
                    },
                    validate: (value) => {
                      return validarEspaciosVacios(value);
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "El correo electrónico no tiene un formato válido",
                    },
                  })}
                  onChange={(e) => {
                    setValue("email", e.target.value);
                    trigger("email");
                  }}
                />
                {errors.email && <AlertaError message={errors.email.message} />}
              </div>
              {!esAdministrador && (
                <div className="mb-3">
                  <label htmlFor="rol" className="col-form-label">
                    Rol: *
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
                    onChange={(e) => setSelectedRol(e.target.value)}
                  >
                    <option value={""}>Seleccionar rol</option>

                    {roles.map((rol) => {
                      if (rol.nombre !== "Administrador" && rol.estado) {
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
                <CancelarModal handleClose={handleClose} reset={reset} />
                <GuardarModal onSubmit={handleSubmit(onSubmit)}/>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditarUsuario;
