// ------------------HERLYN NORBEY DAVID POSO
//-------------------10 de octubre 2023
//Nos permitira Agregar un rol, se podra agregar el rol mediante un formulario con sus respectivas validaciones donde se pediran los datos
//mas relevantes de este rol y luego se mostrara en la tabla listar roles
import "../../css-general/cssgeneral.css";
import "../../css-general/inicio_style.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import AlertaError from "../chared/AlertaError";
import { validarEspaciosVacios } from "../../Validations/validations";
import HeaderModals from "../chared/HeaderModals";
import CheckBox from "../chared/checkBox/CheckBox";
import { Modal } from 'react-bootstrap';
import BotonVerde from '../chared/BotonVerde';
import useRol from '../../hooks/useRol';


//Componente
function AgregarRol() {

    const { agregarRol } = useRol();

    /// Funcionalidad para cerra el modal
    const [show, setShow] = useState(false);

    const handleClose = () => { 
        setSeleccionarPermisos([])
        setErrorMensaje(null);
        setShow(false)
    };
    const handleShow = () => setShow(true);
  //Estado para el seleccionar permisos
  const [seleccionarPermisos, setSeleccionarPermisos] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState(null);

  const {
    register, //Regitra o identifica cada elemento o cada input
    handleSubmit, //Para manejar el envio del formulario
    formState: { errors }, //Ver errores que tiene el formulario
    setValue,
    trigger,
    reset,
  } = useForm({
    mode: "onChange",
  });

  //Función que se ejecuta cuando alguien intenta enviar el formulario
  const onSubmit = async (data) => {
    const { nombre } = data;

    // Validación que manda un alerta que al menos se debe seleccionar un permiso
    if (seleccionarPermisos.length === 0) {
      setErrorMensaje("Debes seleccionar al menos un permiso");
      return;
    }

    agregarRol(
        {
          nombre: nombre.trim(),
          permisos: seleccionarPermisos,
        },
        reset,
        handleClose
      );
      //Luego de mandarlo se cierra el modal

    //   setSeleccionarPermisos([]);
      setErrorMensaje(null);

  };

  const handlePermisoChange = (permiso, isChecked) => {
    if (isChecked) {
      setSeleccionarPermisos([...seleccionarPermisos, permiso]);
    } else {
      setSeleccionarPermisos(seleccionarPermisos.filter((p) => p !== permiso));
    }
  };

  return (
      <div>
            <BotonVerde text={'Agregar rol'} onClick={handleShow} />
            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                }}
                className='modal d-flex align-items-center justify-content-center'
                id='myModal'
            >
                  <div className='modal-content'>
                      <HeaderModals title={'Agregar rol'} handleClose={() => {
                        reset();
                        handleClose();
                    }}
                />
                      <div>
                          <div className='modal-body'>
                              <form
                                  className='row g-3 needs-validation'
                              >
                                  <div className='mb-3' name='divNombre'>
                                      <label
                                          htmlFor='nombreGuardar'
                                          className='col-form-label'
                                      >
                                          Nombre del rol: *
                                      </label>
                                      <input
                                          name='nombre'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          //Register es una función, nos devuelve propiedades para asignar esas propiedades al input se pone . . .
                                          {...register('nombre', {
                                              required: {
                                                  // Es una propiedad que indica que el campo es obligatorio.
                                                  value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                  message:
                                                      'El nombre es obligatorio',
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
                                              setValue(
                                                  'nombre',
                                                  inputValue
                                              );
                                              trigger('nombre');
                                          }}
                                      />
                                      {errors.nombre && (
                                          <AlertaError
                                              message={errors.nombre.message}
                                          />
                                      )}
                                  </div>
                                  {/* se seleccionan los permisos que va tener ese rol creado */}
                                  <label>Seleccionar permisos: *</label>
                                  {errorMensaje && (
                                      <AlertaError message={errorMensaje} />
                                  )}
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
                                              checked={seleccionarPermisos.includes(
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
                                              checked={seleccionarPermisos.includes(
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
                                              checked={seleccionarPermisos.includes(
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
                                              checked={seleccionarPermisos.includes(
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
                                              checked={seleccionarPermisos.includes(
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
                                              checked={seleccionarPermisos.includes(
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
                                              checked={seleccionarPermisos.includes(
                                                  'ordenes'
                                              )}
                                          />
                                      </div>
                                  </div>
                                  <div className='modal-footer'>
                                    <CancelarModal
                                        modalToCancel='myModal'
                                        reset={reset}
                                        handleClose={handleClose}
                                    />
                                    <GuardarModal onSubmit={handleSubmit(onSubmit)}/>
                                </div>
                              </form>
                          </div>
                      </div>
          </div>
          </Modal>
      </div>
  );
}
export default AgregarRol;
