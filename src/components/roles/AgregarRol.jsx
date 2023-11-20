// ------------------HERLYN NORBEY DAVID POSO
//-------------------10 de octubre 2023
//Nos permitira Agregar un rol, se podra agregar el rol mediante un formulario con sus respectivas validaciones donde se pediran los datos
//mas relevantes de este rol y luego se mostrara en la tabla listar roles
import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import AlertaError from '../chared/AlertaError';
import Swal from 'sweetalert2';
import { validarEspaciosVacios } from '../../Validations/validations';
import HeaderModals from '../chared/HeaderModals';
import useAuth from "../../hooks/useAuth";
import CheckBox from "../chared/checkBox/CheckBox";

//Componente
function AgregarRol() {

  //Estado para el seleccionar permisos
  const [seleccionarPermisos, setSeleccionarPermisos] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState(null);
  const { config } = useAuth();

  const {
    register, //Regitra o identifica cada elemento o cada input
    handleSubmit,  //Para manejar el envio del formulario
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

    try {
      // la ruta por donde voya mandar el objeto o el registro nuevo data
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/rol`, {
        nombre: nombre.trim(),
        permisos: seleccionarPermisos,
      }, config);
      //Luego de mandarlo se cierra el modal

      reset(); //Luego de ser agregado y mandado resetea el formulario
      setSeleccionarPermisos([]);
      setErrorMensaje(null);

      // Lanzar alerta del rol agregado
      Swal.fire({
        title: "Rol agregado",
        text: res.data.message,
        icon: "success",
      }).then(() => { //El then se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
        location.reload(); //  recarga la pagina
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "Ya existe este Rol",
        icon: "error",
      })
    }
  }

  const handlePermisoChange = (permiso, isChecked) => {
    if (isChecked) {
      setSeleccionarPermisos([...seleccionarPermisos, permiso]);
    } else {
      setSeleccionarPermisos(seleccionarPermisos.filter((p) => p !== permiso));
    }
  }

  return (
      <div>
          {/* modal agregar proveedor */}
          <div className='modal' id='myModal'>
              <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                      <HeaderModals title={'Agregar Rol'} />
                      <div className='formulario'>
                          <div className='modal-body'>
                              <form
                                  className='row g-3 needs-validation'
                                  onSubmit={handleSubmit(onSubmit)}
                              >
                                  <div className='mb-3' name='divNombre'>
                                      <label
                                          htmlFor='nombreGuardar'
                                          className='col-form-label'
                                      >
                                          Nombre del Rol: *
                                      </label>
                                      <input
                                          name='nombre'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          //Register es una funcion, nos devuelve propiedades para asignar esas propiedades al input se pone . . .
                                          {...register('nombre', {
                                              required: {
                                                  // Es una propiedad que indica que el campo es obligatorio.
                                                  value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                  message:
                                                      'El nombre es obligatorio',
                                              },
                                              validate: (value) => {
                                                  return validarEspaciosVacios(
                                                      value
                                                  );
                                              },
                                              pattern: {
                                                  value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                                                  message:
                                                      'El nombre no puede contener números ni caracteres especiales',
                                              },
                                          })}
                                          onChange={(e) => {
                                              setValue(
                                                  'nombre',
                                                  e.target.value
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
                                              text={'usuario'}
                                              onChange={(e) =>
                                                  handlePermisoChange(
                                                      e.target.value,
                                                      e.target.checked
                                                  )
                                              }
                                          />
                                      </div>
                                      <div className='form-check form-switch'>
                                          <CheckBox
                                              text={'rol'}
                                              onChange={(e) =>
                                                  handlePermisoChange(
                                                      e.target.value,
                                                      e.target.checked
                                                  )
                                              }
                                          />
                                      </div>
                                      <div className='form-check form-switch'>
                                          <CheckBox
                                              text={'proveedor'}
                                              onChange={(e) =>
                                                  handlePermisoChange(
                                                      e.target.value,
                                                      e.target.checked
                                                  )
                                              }
                                          />
                                      </div>
                                      <div className='form-check form-switch'>
                                          <CheckBox
                                              text={'producto'}
                                              onChange={(e) =>
                                                  handlePermisoChange(
                                                      e.target.value,
                                                      e.target.checked
                                                  )
                                              }
                                          />
                                      </div>
                                  </div>
                                  <div className='col-md-6'>
                                      <div className='form-check form-switch'>
                                          <CheckBox
                                              text={'cliente'}
                                              onChange={(e) =>
                                                  handlePermisoChange(
                                                      e.target.value,
                                                      e.target.checked
                                                  )
                                              }
                                          />
                                      </div>
                                      <div className='form-check form-switch'>
                                          <CheckBox
                                              text={'compra'}
                                              onChange={(e) =>
                                                  handlePermisoChange(
                                                      e.target.value,
                                                      e.target.checked
                                                  )
                                              }
                                          />
                                      </div>
                                      <div className='form-check form-switch'>
                                          <CheckBox
                                              text={'orden'}
                                              onChange={(e) =>
                                                  handlePermisoChange(
                                                      e.target.value,
                                                      e.target.checked
                                                  )
                                              }
                                          />
                                      </div>
                                  </div>
                                  <div className='modal-footer'>
                                      <CancelarModal
                                          modalToCancel={'myModal'}
                                      />
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
}
export default AgregarRol;
