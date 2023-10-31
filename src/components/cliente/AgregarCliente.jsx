import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import Swal from 'sweetalert2';
import { validarEspaciosVacios } from '../../Validations/validations';


//Componente
const AgregarCliente = () => {
  const {
    register,  //Regitra o identifica cada elemento o cada input
    handleSubmit,   //Para manejar el envio del formulario
    formState: { errors },  //Ver errores que tiene el formulario
    reset, //Resetea el formulario
  } = useForm();

  //Función que se ejecuta cuando alguien intenta enviar el formulario
  const onSubmit = async (data) => {

    const {nombre,apellido,cedula,telefono,email,direccion} = data


    try {
      // la ruta por donde voya mandar el objeto o el registro nuevo data
      const res = await axios.post('http://localhost:3000/api/clientes', {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        cedula: cedula.trim(),
        telefono: telefono.trim(),
        email: email.trim(),
        direccion: direccion.trim()
      });
      //Luego de mandarlo se cierra el modal

      reset();   //Luego de ser agregado y mandado resetea el formulario

      // Lanzar alerta del producto agregado
      Swal.fire({
        title: 'Cliente agregado',
        text: res.data.message,
        icon: 'success',
    }).then(() => {  //El then se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
        location.reload(); //  recarga la pagina
    });

    } catch (err) {
          console.log(err)
          Swal.fire({
            title: 'Error',
            text: "Hubo un error",
            icon: 'Vuelva a intentarlo',
        }).then( //el then se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
            location.reload() //  recarga la pagina
        );
    }
  };

  return (
      <div>
          {/* modal agregar proveedor */}

          <div className='modal' id='myModal'>
              <div className='modal-dialog modal-dialog-centered '>
                  <div className='modal-content'>
                      <div className='agregar agr'>
                          <h5 className='modal-title' id='exampleModalLabel'>
                              Agregar cliente
                          </h5>
                          <button
                              type='button'
                              id='xAgregar'
                              className='btn-close'
                              data-bs-dismiss='modal'
                              aria-label='Close'
                          ></button>
                      </div>
                      <div className='formulario'>
                          <div className='modal-body'>
                              <form className='row g-3 needs-validation' onSubmit={handleSubmit(onSubmit)}>
                              {/* <div className='col-md-6 '>
                                      <label
                                          htmlFor='cedula'
                                          className='col-form-label'
                                      >
                                          Tipo de documento:*
                                      </label>
                                      <input
                                          name='cedula'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          {...register('cedula', {
                                              required:{
                                                value: true,
                                                message:'La cedula es obligatoria',
                                              },
                                            pattern:{
                                              value: /^\d+$/,
                                              message: 'No se permiten letras ni espacios en blanco',
                                            },
                                            validate: (value) => {
                                              const cedulaSinEspacios = value.replace(/\s/g, ''); // Eliminar espacios en blanco
                                              if (cedulaSinEspacios.length < 7 || cedulaSinEspacios.length > 11) {
                                                return 'La cédula debe tener minimo 7 digitos y maximo 11';
                                              }
                                              return true;
                                            },
                                          })}
                                      />
                                      {errors.cedula && (
                                          <AlertaError
                                              message={errors.cedula.message}
                                          />
                                      )}
                                  </div> */}
                              <div className='col-md-6'>
                                      <label
                                          htmlFor='cedula'
                                          className='col-form-label'
                                      >
                                          Cedula:*
                                      </label>
                                      <input
                                          name='cedula'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          {...register('cedula', {
                                              required:{
                                                value: true,
                                                message:'La cedula es obligatoria',
                                              },
                                            pattern:{
                                              value: /^\d+$/,
                                              message: 'No se permiten letras ni espacios en blanco',
                                            },
                                            validate: (value) => {
                                              const cedulaSinEspacios = value.replace(/\s/g, ''); // Eliminar espacios en blanco
                                              if (cedulaSinEspacios.length < 7 || cedulaSinEspacios.length > 11) {
                                                return 'La cédula debe tener minimo 7 digitos y maximo 11';
                                              }
                                              return true;
                                            },
                                          })}
                                      />
                                      {errors.cedula && (
                                          <AlertaError
                                              message={errors.cedula.message}
                                          />
                                      )}
                                  </div>
                                  <div className='col-md-6'>
                                      <label
                                          htmlFor='nombre'
                                          className='col-form-label'
                                      >
                                          Nombre:*
                                      </label>
                                      <input
                                          name='nombre'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          //Register es una funcion, nos devuelve propiedades para asignar esas propiedades al input se pone . . .
                                          {...register('nombre', {
                                              required: {
                                                  value: true,
                                                  message:
                                                      'El nombre es obligatorio',
                                              },
                                              validate: (value) => {
                                                  return validarEspaciosVacios(value);
                                              },
                                              pattern: {
                                                value:  /^[A-Za-z\s]+$/,
                                                message: "El nombre no puede contener números ni caracteres especiales"
                                              }
                                          })}
                                      />
                                      {errors.nombre && (
                                          <AlertaError
                                              message={errors.nombre.message}
                                          />
                                      )}
                                  </div>
                                  <div className='col-md-6'>
                                      <label
                                          htmlFor='apellido'
                                          className='col-form-label'
                                      >
                                          Apellido:*
                                      </label>
                                      <input
                                          name='apellido'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          {...register('apellido', {
                                              required:{
                                                   value: true,
                                                  message:'El apellido es obligatorio',
                                                },
                                                validate: (value) => {
                                                    // valida espacios
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
                                  
                                  <div className='col-md-6'>
                                      <label
                                          htmlFor='telefono'
                                          className='col-form-label'
                                      >
                                          Teléfono:*
                                      </label>
                                      <input
                                          name='telefono'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
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
                                  <div className='col-md-6'>
                                      <label
                                          htmlFor='email'
                                          className='col-form-label'
                                      >
                                          Email:*
                                      </label>
                                      <input
                                          name='email'
                                          type='email'
                                          className='form-control'
                                          placeholder='. . .'
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
                                  <div className='col-md-6'>
                                      <label
                                          htmlFor='direccion'
                                          className='col-form-label'
                                      >
                                          Dirección:*
                                      </label>
                                      <input
                                          name='direccion'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          {...register('direccion', {
                                              required:{
                                                  value: true,
                                                  message: 'La dirección es obligatoria',
                                                },
                                                validate: (value) => {
                                                  return validarEspaciosVacios(value);
                                              }
                                          })}
                                      />
                                      {errors.direccion && (
                                          <AlertaError
                                              message={errors.direccion.message}
                                          />
                                      )}
                                  </div>

                                  <div className='modal-footer'>
                                      <CancelarModal />
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

export default AgregarCliente