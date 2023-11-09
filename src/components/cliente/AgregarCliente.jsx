// ------------------HERLYN NORBEY DAVID POSO
//-------------------26 de septiembre 2023
//Nos permitira Agregar un cliente, de ser necesario se podra agregar un cliente mediante un formulario donde se pediran datos
//mas relevantes de este cliente y luego mostrarlo en la tabla listar
import styles from "../../pages/clientes.module.css";
import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import AlertaError from "../chared/AlertaError";
import Swal from "sweetalert2";
import { validarEspaciosVacios } from "../../Validations/validations";
import HeaderModals from "../chared/HeaderModals";

//Componente
const AgregarCliente = () => {
  const {
    register, //Regitra o identifica cada elemento o cada input
    handleSubmit, //Para manejar el envio del formulario
    formState: { errors }, //Ver errores que tiene el formulario
    reset, //Resetea el formulario
  } = useForm();

  //Función que se ejecuta cuando alguien intenta enviar el formulario
  const onSubmit = async (data) => {
    const {
      nombre,
      apellido,
      identificacion,
      telefono,
      email,
      direccion,
      tipoIdentificacion,
    } = data;

    try {
      // la ruta por donde voya mandar el objeto o el registro nuevo data
      const res = await axios.post("http://localhost:3000/api/clientes", {
        identificacion: identificacion.trim(),
        tipoIdentificacion: tipoIdentificacion.trim(),
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim(),
        email: email.trim(),
        direccion: direccion.trim(),
      });
      //Luego de mandarlo se cierra el modal

      reset(); //Luego de ser agregado y mandado resetea el formulario

      // Lanzar alerta del producto agregado
      Swal.fire({
        title: "Cliente agregado",
        text: res.data.message,
        icon: "success",
      }).then(() => {
        //El then se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
        location.reload(); //  recarga la pagina
      });
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
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
          location.reload();
        });
      }
    }
  };
  return (
    <div>
      {/* modal agregar proveedor */}

      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <HeaderModals title={"Agregar Cliente"} />
            <div>
              <div className="modal-body">
                {/* <!-- formulario para agregar un usuario --> */}
                <form
                  className="row g-3 needs-validation"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-3" name="divIdentificacion">
                    <label
                      htmlFor="identificacionGuardar"
                      className="col-form-label"
                    >
                      Identificación: *
                    </label>

                    <br />

                    <div className="row">
                      <div className="col-md-2">
                        <select
                          style={{ width: 80, height: 40 }}
                          id="tipoIdentificacion"
                          {...register("tipoIdentificacion", {
                            required: {
                              // Es una propiedad que indica que el campo es obligatorio.
                              value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                              message:
                                "El tipo de identificación es obligatoria", // es un mensaje que se mostrará si la validación falla.
                            },
                          })}
                        >
                          <option value="C.C.">C.C. </option>
                          <option value="C.E.">C.E. </option>
                        </select>
                      </div>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control "
                          name="identificacion"
                          placeholder=". . ."
                          //register es una funcion, nos devuelve propiedades, para asigar esas propiedades al input  se pone . . .
                          //  identificador Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                          {...register("identificacion", {
                            required: {
                              // Es una propiedad que indica que el campo es obligatorio.
                              value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                              message: "La Identificación es obligatoria", // es un mensaje que se mostrará si la validación falla.
                            },
                            pattern: {
                              value: /^\d+$/, //expreción regular para prohibir letras y espacios en blamco
                              message:
                                "No puede contener Letras ni  espacios en blanco",
                            },
                            validate: (value) => {
                              if (value.length < 6 || value.length > 11) {
                                return "La Identificación debe tener entre 6 y 11 dígitos";
                              }
                              return true; // La validación pasa si cumple ambas condiciones
                            },
                          })}
                        />
                      </div>

                      {errors.identificacion && (
                        <AlertaError message={errors.identificacion.message} /> //muestra el mensaje de validacion
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="col-form-label">
                      Nombres: *
                    </label>
                    <input
                      name="nombre"
                      type="text"
                      className="form-control"
                      placeholder=". . ."
                      //Register es una funcion, nos devuelve propiedades para asignar esas propiedades al input se pone . . .
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "El nombre es obligatorio",
                        },
                        validate: (value) => {
                          return validarEspaciosVacios(value);
                        },
                        pattern: {
                          value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                          message:
                            "El nombre no puede contener números ni caracteres especiales",
                        },
                      })}
                    />
                    {errors.nombre && (
                      <AlertaError message={errors.nombre.message} />
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="apellido" className="col-form-label">
                      Apellidos: *
                    </label>
                    <input
                      name="apellido"
                      type="text"
                      className="form-control"
                      placeholder=". . ."
                      {...register("apellido", {
                        required: {
                          value: true,
                          message: "El apellido es obligatorio",
                        },
                        validate: (value) => {
                          // valida espacios
                          return validarEspaciosVacios(value);
                        },
                        pattern: {
                          value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                          message:
                            "El apellido no puede contener números ni caracteres especiales",
                        },
                      })}
                    />
                    {errors.apellido && (
                      <AlertaError message={errors.apellido.message} />
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="telefono" className="col-form-label">
                      Teléfono: *
                    </label>
                    <input
                      name="telefono"
                      type="text"
                      className="form-control"
                      placeholder=". . ."
                      {...register("telefono", {
                        required: {
                          value: true,
                          message: "El telefono es obligatorio",
                        },
                        pattern: {
                          value: /^\d+$/,
                          message:
                            "No se permiten letras ni espacios en blanco",
                        },
                        validate: (value) => {
                          const telefonoSinEspacios = value.replace(/\s/g, ""); // Eliminar espacios en blanco
                          if (
                            telefonoSinEspacios.length < 7 ||
                            telefonoSinEspacios.length > 11
                          ) {
                            return "El telefono debe tener minimo 7 digitos y maximo 12";
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
                    <label htmlFor="direccion" className="col-form-label">
                      Dirección: *
                    </label>
                    <input
                      name="direccion"
                      type="text"
                      className="form-control"
                      placeholder=". . ."
                      {...register("direccion", {
                        required: {
                          value: true,
                          message: "La dirección es obligatoria",
                        },
                        validate: (value) => {
                          return validarEspaciosVacios(value);
                        },
                      })}
                    />
                    {errors.direccion && (
                      <AlertaError message={errors.direccion.message} />
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="col-form-label">
                      Email: *
                    </label>
                    <input
                      name="email"
                      type="text"
                      className="form-control"
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

                  <div className="modal-footer">
                    <CancelarModal modalToCancel="myModal" />
                    <GuardarModal />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AgregarCliente;
