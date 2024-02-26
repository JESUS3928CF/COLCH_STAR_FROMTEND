// ------------------HERLYN NORBEY DAVID POSO
//-------------------26 de septiembre 2023
//Nos permitirá Agregar un cliente, de ser necesario se podrá agregar un cliente mediante un formulario donde se pedirán datos
//mas relevantes de este cliente y luego mostrarlo en la tabla listar
import "../../css-general/cssgeneral.css";
import { useForm } from "react-hook-form";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import AlertaError from "../chared/AlertaError";
import { validarEspaciosVacios } from "../../Validations/validations";
import HeaderModals from "../chared/HeaderModals";
import useClientes from "../../hooks/useCliente";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import BotonVerde from "../chared/BotonVerde";

//Componente
const AgregarCliente = () => {
  const { agregarCliente } = useClientes();

  /// Funcionalidad para cerra el modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register, //Registra o identifica cada elemento o cada input
    handleSubmit, //Para manejar el envió del formulario
    formState: { errors }, //Ver errores que tiene el formulario
    setValue,
    trigger,
    reset, //Resetea el formulario
  } = useForm({
    mode: "onChange",
  });

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

    agregarCliente(
      {
        identificacion: identificacion.trim(),
        tipoIdentificacion: tipoIdentificacion.trim(),
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim(),
        email: email.trim(),
        direccion: direccion.trim(),
      },
      reset,
      handleClose
    );
  };
  return (
    <div>
      {/* modal agregar proveedor */}

      <BotonVerde text={"Agregar cliente"} onClick={handleShow} />

      <Modal
        show={show}
        onHide={() => {
          reset();
          handleClose();
        }}
        className="modal d-flex align-items-center justify-content-center"
        id="myModal"
      >
        <div className="modal-content">
          <HeaderModals
            title={"Agregar cliente"}
            handleClose={() => {
              reset();
              handleClose();
            }}
          />
          <div>
            <div className="modal-body">
              {/* <!-- formulario para agregar un usuario --> */}
              <form
                className="row g-3 needs-validation"
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
                        style={{
                          width: 80,
                          height: 40,
                        }}
                        id="tipoIdentificacion"
                        {...register("tipoIdentificacion", {
                          required: {
                            value: true,
                            message: "El tipo de identificación es obligatorio",
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
                        {...register("identificacion", {
                          required: {
                            value: true, // Expresión regular para prohibir letras y espacios en blanco
                            message: "La identificación es obligatoria",
                          },
                          validate: (value) => {
                            if (value.includes(" ")) {
                                return 'No se permiten espacios en blanco';
                            }
                            // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                            if (!/^\d+$/.test(value)) {
                                return 'La identificación solo puede contener números';
                            }
                            if (value.startsWith("0")) {
                                return 'La identificación no puede iniciar con 0';
                            }
                            if (value.length < 6 || value.length > 10) {
                                return 'La identificación debe tener entre 6 y 10 dígitos';
                            }
                            return true;
                        },
                    })}
                        onChange={(e) => {
                          const inputValue = e.target.value.slice(0, 11);
                          setValue("identificacion", inputValue);
                          trigger("identificacion");
                        }}
                      />
                    </div>

                    {errors.identificacion && (
                      <AlertaError message={errors.identificacion.message} />
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
                    {...register("nombre", {
                      required: {
                        value: true,
                        message: "El nombre es obligatorio",
                      },
                      validate: (value) => {
                        if (value.trim().length < 3 || value.length > 20) {
                            return 'El nombre debe tener entre 3 y 20 caracteres';
                        }
                        if (!/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(value)) {
                            return 'El nombre solo puede tener letras';
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
                        if (value.trim().length < 4 || value.length > 50) {
                            return 'La dirección debe tener entre 4 y 50 caracteres';
                        }
                        if (value.includes(" ")) {
                            return validarEspaciosVacios(value);
                        }
                        return true;
                    },
                })}
                onChange={(e) => {
                    const inputValue = e.target.value.slice(0, 51); // Limitar la longitud máxima
                    setValue('direccion', inputValue);
                    trigger('direccion');
                }}
                  />
                  {errors.direccion && (
                    <AlertaError message={errors.direccion.message} />
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="col-form-label">
                  Correo electrónico: *
                  </label>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder=". . ."
                    {...register("email", {
                      required: {
                        value: true,
                        message: "El correo electrónico es obligatorio",
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
                  {errors.email && (
                    <AlertaError message={errors.email.message} />
                  )}
                </div>

                <div className="modal-footer">
                  <CancelarModal
                    modalToCancel="myModal"
                    reset={reset}
                    handleClose={handleClose}
                  />
                  <GuardarModal onSubmit={handleSubmit(onSubmit)} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AgregarCliente;
