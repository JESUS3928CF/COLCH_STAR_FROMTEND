import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import React from "react";
import axios from "axios";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { validarEspaciosVacios } from "../../Validations/validations";
import { useEffect } from "react";
import AlertaError from "../chared/AlertaError";

const EditarUsuario = ({ editarUsuario }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Añade esta función para actualizar dinámicamente los valores
  } = useForm();

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

  /// Función para guardar el cliente en la DB
  const onSubmit = (data) => {
    const { nombre, apellido, telefono, email, fk_rol } = data

    // Ruta
    if (editarUsuario.id_usuario) {
      axios
        .patch(
          `http://localhost:3000/api/usuarios/${editarUsuario.id_usuario}`,
          {
            // Campos en los que realiza el cambio
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.trim(),
            email: email.trim(),
            fk_rol: fk_rol,
          }
        )
        .then((response) => {
          console.log("Usuario actualizado:", response.data);
          Swal.fire({
            title: "Usuario actualizado",
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
        }else{
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error',
            icon: 'error',
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
              {/* <!-- formulario para editar los datos de la tabla Usuarios --> */}
              <form className="row g-3 needs-validation" action='' onSubmit={handleSubmit(onSubmit)}>
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
                    {...register('nombre', {
                        required: {
                            value: true,
                            message:
                                'El nombre es obligatorio',
                        },
                        validate: (value) => {
                            return validarEspaciosVacios(
                                value
                            );
                        },
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                                'El nombre no puede contener números ni caracteres especiales',
                        },
                    })}
                />
                {errors.nombre && (
                    <AlertaError
                        message={errors.nombre.message}
                    />
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
                    {...register('apellido', {
                        required:{
                          value: true,
                          message:'El apellido es obligatorio',
                        },
                        validate: (value) => {
                          return validarEspaciosVacios(value);
                      },
                      pattern:{
                        value: /^[A-Za-z\s]+$/,
                        message: "El apellido no puede contener números ni caracteres especiales"
                      }
                    })}
                  />
                   {errors.apellido && (
                          <AlertaError
                              message={errors.apellido.message}
                          />
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
                    {...register('telefono', {
                        required:{
                          value: true,
                          message:'El telefono es obligatorio',
                        },
                      pattern:{
                        value: /^\d+$/,
                        message: 'No se permiten letras ni espacios en blanco',
                      },
                      validate: (value) => {
                        const telefonoSinEspacios = value.replace(/\s/g, ''); // Eliminar espacios en blanco
                        if (telefonoSinEspacios.length < 7 || telefonoSinEspacios.length > 11) {
                          return 'El telefono debe tener minimo 7 digitos y maximo 12';
                        }
                        return true;
                      },
                    })}
                  />
                  {errors.telefono && (
                      <AlertaError
                          message={errors.telefono.message}
                      />
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
                    {...register('email', {
                        required:{
                          value: true,
                          message:'El email es obligatorio',
                        },
                        validate: (value) => {
                          return validarEspaciosVacios(value);
                      },
                      pattern:{
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "El Email no tiene un formato válido"
                      }
                    })}
                />
                {errors.email && (
                    <AlertaError
                        message={errors.email.message}
                    />
                )}
              </div>
                {/* <label for="exampleDataList" className="form-label">
                  Estado:
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="1">Habilitar</option>
                  <option value="2">Inhabilitar</option>
                </select>
                <div className="mb-3" name="divselectRol">
                  <label for="rolEditar" className="col-form-label">
                    Rol:
                  </label>
                  <select className="form-control" name="selectRolEditar">
                    <option value="">Seleccionar rol</option>
                    <option value="2">Empleado</option>
                    <option value="3">Vendedor</option>
                    <option value="4">Comprador</option>
                  </select>
                </div> */} 

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
