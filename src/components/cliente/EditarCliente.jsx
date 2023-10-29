import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import axios from 'axios'
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form'
import { validarEspaciosVacios } from '../../Validations/validations'
import { useEffect } from 'react'
import AlertaError from '../chared/AlertaError'


//Componente
const EditarCliente = ({editarCliente}) => {


    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // Añade esta función para actualizar dinámicamente los valores
    } = useForm();

    // Cuando editarCliente cambia, actualiza los valores del formulario
    useEffect(() => {
        if (editarCliente) {
            setValue('nombre', editarCliente.nombre);
            setValue('apellido', editarCliente.apellido);
            setValue('cedula', editarCliente.cedula);
            setValue('telefono', editarCliente.telefono);
            setValue('email', editarCliente.email);
            setValue('direccion', editarCliente.direccion);

        }
    }, [editarCliente]);


    /// Función para guardar el cliente en la DB
    const onSubmit = (data) => {

        const {nombre,apellido,cedula,telefono,email,direccion} = data


        // Ruta
        if (editarCliente.id_cliente) {
            axios
                .patch(`http://localhost:3000/api/clientes/${editarCliente.id_cliente}`, {
                    // Campos en los que realiza el cambio
                    nombre: nombre.trim(),
                    apellido: apellido.trim(),
                    cedula: cedula.trim(),
                    telefono: telefono.trim(),
                    email: email.trim(),
                    direccion: direccion.trim()
                })
                .then((response) => {
                    console.log('Cliente actualizado:', response.data);
                    Swal.fire({
                        title: 'Cliente actualizado',
                        text: response.data.message,
                        icon: 'success',
                    }).then(() => {
                        location.reload();
                    });
                })
                .catch((error) => {
                    console.error('Error al actualizar el cliente', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al actualizar el cliente',
                        icon: 'error',
                    });
                });
        } else {
            console.error('No se pudo obtener el ID del cliente');
        }
    }


  return (
      <div>
          {/* modal de editar proveedor */}
          <div className='modal' id='modalEditar'>
              <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                      <div className='editar edi'>
                          <h5 className='modal-title'>
                              Editar datos del cliente
                          </h5>
                          <button
                              type='button'
                              id='xEditar'
                              className='btn-close'
                              data-bs-dismiss='modal'
                              aria-label='Close'
                          ></button>
                      </div>
                      <div className='modal-body'>
                          {/* <!-- formulario para editar los datos de la tabla clientes --> */}
                          <form action='' onSubmit={handleSubmit(onSubmit)}>
                              <div className='mb-3' name='divNombre'>
                                  <label
                                      htmlFor='nombreEditar'
                                      className='col-form-label'
                                  >
                                      Nombre:
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='nombreEditar'
                                      name='nombre'
                                      placeholder=''
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
                              <div className='mb-3' name='divApellido'>
                                  <label
                                      htmlFor='apellidoEditar'
                                      className='col-form-label'
                                  >
                                      Apellido:
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='apellidoEditar'
                                      name='apellido'
                                      placeholder=''
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
                              <div className='mb-3'>
                                  <label
                                      htmlFor='cedulaEditar'
                                      className='col-form-label'
                                  >
                                      Cedula:*
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='cedulaEditar'
                                      name='cedula'
                                      placeholder=''
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
                              <div className='mb-3'>
                                  <label
                                      htmlFor='telefonoEditar'
                                      className='col-form-label'
                                  >
                                      Teléfono:
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='telefonoEditar'
                                      name='telefono'
                                      placeholder=''
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
                              <div className='mb-3'>
                                  <label
                                      htmlFor='emailEditar'
                                      className='col-form-label'
                                  >
                                      Email:
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='emailEditar'
                                      name='email'
                                      placeholder=''
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
                              <div className='mb-3'>
                                  <label
                                      htmlFor='direccionEditar'
                                      className='col-form-label'
                                  >
                                      Dirección:
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='direccionEditar'
                                      name='direccion'
                                      placeholder=''
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
  );
}

export default EditarCliente