// ------------------HERLYN NORBEY DAVID POSO
//-------------------10 de octubre 2023
//Nos permitirá editar un rol, se podrá editar el rol mediante un formulario con sus respectivas validaciones donde se ingresaran los datos a editar
//de este rol y luego se mostrara en la tabla listar roles los cambios realizados
import "../../css-general/cssgeneral.css";
import "../../css-general/inicio_style.css";
import { useState, useEffect } from "react";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import { useForm } from "react-hook-form";
import AlertaError from "../chared/AlertaError";
import { validarEspaciosVacios } from "../../Validations/validations";
import CheckBox from "../chared/checkBox/CheckBox";
import useRoles from "../../hooks/useRol";
import { Modal } from "react-bootstrap";
import HeaderModals from "../chared/HeaderModals";

//Componente
function EditarRol({ editarRol, handleClose, show }) {
  const { editarRoles } = useRoles();

  const {
    register, //Regitra o identifica cada elemento o cada input
    handleSubmit, //Para manejar el envio del formulario
    formState: { errors }, //Ver errores que tiene el formulario
    setValue,
    trigger,
    reset, //Resetea el formulario
  } = useForm({
    mode: "onChange",
  });

  // a la hora del editar el rol del administrador no va aparecer el rol
  const [permisos, setPermisos] = useState([]);
  const [errorPermisos, setErrorPermisos] = useState(null);
  const esRolAdministrador = editarRol && editarRol.nombre === "Administrador";
  const tituloPermisos = esRolAdministrador
    ? "Editar rol Administrador"
    : "Editar permisos del rol";

  // Cuando editarRol cambia, actualiza los valores del formulario
  useEffect(() => {
    if (editarRol) {
      setValue("nombre", editarRol.nombre);
      setPermisos(editarRol.permisos);
    }
  }, [editarRol, show]);

  const handlePermisoChange = (permiso, isChecked) => {
    if (isChecked) {
      setPermisos([...permisos, permiso]);
    } else {
      setPermisos(permisos.filter((p) => p !== permiso));
    }
  };

  /// Función para guardar el cliente en la DB
  const onSubmit = (data) => {
    editarRoles(
      data,
      editarRol,
      permisos,
      setErrorPermisos,
      esRolAdministrador,
      handleClose
    );
  };

  return (
      <div>
          {/* modal de editar roles */}
          <Modal
              show={show}
              onHide={() => {
                  reset();
                  handleClose();
                  setErrorPermisos(null);
              }}
              className='modal d-flex align-items-center justify-content-center'
              id='modalEditar'
          >
              <div className='modal-content'>
                  <HeaderModals
                      title={'Editar rol'}
                      handleClose={() => {
                          reset();
                          handleClose();
                           setErrorPermisos(null);
                      }}
                  />

                  <div className='modal-body'>
                      <form
                          className='row g-3 needs-validation'
                          action=''
                      >
                          <div className='mb-3' name='divNombre'>
                              <label
                                  htmlFor='nombreEditar'
                                  className='col-form-label'
                              >
                                  Nombre del rol: *
                              </label>
                              <input
                                  type='text'
                                  name='nombre'
                                  className='form-control'
                                  placeholder='. . .'
                                  //register es una funcion, nos devuelve propiedades, para asigar esas propiedades al input  se pone . . .
                                  //  identificador Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                                  {...register('nombre', {
                                      required: {
                                          // Es una propiedad que indica que el campo es obligatorio.
                                          value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                          message: 'El nombre es obligatorio', // es un mensaje que se mostrará si la validación falla.
                                      },
                                      validate: (value) => {
                                        if (value.trim().length < 3 || value.length > 20) {
                                            return 'El rol debe tener entre 3 y 20 caracteres';
                                        }
                                        if (!/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(value)) {
                                            return 'El rol solo puede tener letras';
                                        }
                                        if (value.includes(" ")) {
                                            return validarEspaciosVacios(value);
                                        }
                                        
                                        return true;
                                    },
                                  })}
                                  onChange={(e) => {
                                    const inputValue = e.target.value.slice(0,21)
                                      setValue('nombre', inputValue);
                                      trigger('nombre');
                                  }}
                              />
                              {errors.nombre && (
                                  <AlertaError
                                      message={errors.nombre.message}
                                  />
                              )}
                          </div>
                          <div className='container'>
                              {!esRolAdministrador && (
                                  <div>
                                      <label htmlFor=''>
                                          Seleccionar permisos: *
                                      </label>
                                      {errorPermisos && (
                                          <AlertaError
                                              message={errorPermisos}
                                          />
                                      )}
                                      <div className='row'>
                                          <div className='col-md-6'>
                                              <div className='form-check form-switch'>
                                                  <CheckBox
                                                      text={'usuarios'}
                                                      onChange={(e) =>
                                                          handlePermisoChange(
                                                              e.target.value,
                                                              e.target.checked
                                                          )
                                                      }
                                                      checked={permisos.includes(
                                                          'usuarios'
                                                      )}
                                                  />
                                              </div>
                                              <div className='form-check form-switch'>
                                                  <CheckBox
                                                      text={'roles'}
                                                      onChange={(e) =>
                                                          handlePermisoChange(
                                                              e.target.value,
                                                              e.target.checked
                                                          )
                                                      }
                                                      checked={permisos.includes(
                                                          'roles'
                                                      )}
                                                  />
                                              </div>
                                              <div className='form-check form-switch'>
                                                  <CheckBox
                                                      text={'proveedores'}
                                                      onChange={(e) =>
                                                          handlePermisoChange(
                                                              e.target.value,
                                                              e.target.checked
                                                          )
                                                      }
                                                      checked={permisos.includes(
                                                          'proveedores'
                                                      )}
                                                  />
                                              </div>
                                              <div className='form-check form-switch'>
                                                  <CheckBox
                                                      text={'productos'}
                                                      onChange={(e) =>
                                                          handlePermisoChange(
                                                              e.target.value,
                                                              e.target.checked
                                                          )
                                                      }
                                                      checked={permisos.includes(
                                                          'productos'
                                                      )}
                                                  />
                                              </div>
                                          </div>
                                          <div className='col-md-6'>
                                              <div className='form-check form-switch'>
                                                  <CheckBox
                                                      text={'clientes'}
                                                      onChange={(e) =>
                                                          handlePermisoChange(
                                                              e.target.value,
                                                              e.target.checked
                                                          )
                                                      }
                                                      checked={permisos.includes(
                                                          'clientes'
                                                      )}
                                                  />
                                              </div>
                                              <div className='form-check form-switch'>
                                                  <CheckBox
                                                      text={'compras'}
                                                      onChange={(e) =>
                                                          handlePermisoChange(
                                                              e.target.value,
                                                              e.target.checked
                                                          )
                                                      }
                                                      checked={permisos.includes(
                                                          'compras'
                                                      )}
                                                  />
                                              </div>
                                              <div className='form-check form-switch'>
                                                  <CheckBox
                                                      text={'ordenes'}
                                                      onChange={(e) =>
                                                          handlePermisoChange(
                                                              e.target.value,
                                                              e.target.checked
                                                          )
                                                      }
                                                      checked={permisos.includes(
                                                          'ordenes'
                                                      )}
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              )}
                          </div>

                          <div className='modal-footer'>
                              <CancelarModal
                                  handleClose={() => {
                                      setErrorPermisos(null);
                                      handleClose();
                                  }}
                                  reset={reset}
                              />
                              <GuardarModal onSubmit={handleSubmit(onSubmit)}/>
                          </div>
                      </form>
                  </div>
              </div>
          </Modal>
      </div>
  );
}
export default EditarRol;
